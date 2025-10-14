/**
 * Strapi React Hooks
 * 
 * SWR-based React hooks for client-side data fetching with caching,
 * revalidation, prefetching, and cache management.
 */

"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import useSWR, { type SWRResponse, mutate } from "swr"
import useSWRInfinite, { type SWRInfiniteResponse } from "swr/infinite"
import { getStrapiClient } from "./client"
import { CACHE_KEY_PREFIX } from "./config"
import type {
  FetchOptions,
  NormalizedData,
  PaginationInfo,
  StrapiCollectionResponse,
  StrapiQueryParams,
  StrapiSingleResponse,
} from "./types"
import {
  createCacheKey,
  debounce,
  extractPaginationInfo,
  normalizeCollectionResponse,
  normalizeSingleResponse,
} from "./utils"

/**
 * Get Strapi client for hooks (client-side only)
 */
function getClient() {
  return getStrapiClient({
    baseURL: process.env.NEXT_PUBLIC_STRAPI_URL,
    apiToken: process.env.NEXT_PUBLIC_STRAPI_API_TOKEN,
  })
}

/**
 * Hook to fetch a collection of entities
 */
export function useStrapiCollection<T = any>(
  endpoint: string | null,
  options?: FetchOptions
): SWRResponse & {
  normalizedData?: Array<NormalizedData<T> & { id: number }>
  pagination?: PaginationInfo | null
} {
  const client = getClient()
  const cacheKey = endpoint ? createCacheKey(endpoint, options?.params) : null

  const swr = useSWR(
    cacheKey,
    async () => {
      if (!endpoint) return null
      return client.getCollection<T>(endpoint, options?.params, options?.config)
    },
    options?.swrConfig
  )

  const normalizedData = useMemo(() => {
    if (!swr.data) return undefined
    return normalizeCollectionResponse(swr.data as StrapiCollectionResponse<T>)
  }, [swr.data])

  const pagination = useMemo(() => {
    if (!swr.data) return null
    return extractPaginationInfo((swr.data as any)?.meta)
  }, [swr.data])

  return {
    ...swr,
    normalizedData,
    pagination,
  }
}

/**
 * Hook to fetch a single entity
 */
export function useStrapiSingle<T = any>(
  endpoint: string | null,
  options?: FetchOptions
): SWRResponse & {
  normalizedData?: (NormalizedData<T> & { id: number }) | null
} {
  const client = getClient()
  const cacheKey = endpoint ? createCacheKey(endpoint, options?.params) : null

  const swr = useSWR(
    cacheKey,
    async () => {
      if (!endpoint) return null
      return client.getSingle<T>(endpoint, options?.params, options?.config)
    },
    options?.swrConfig
  )

  const normalizedData = useMemo(() => {
    if (!swr.data) return undefined
    return normalizeSingleResponse(swr.data as StrapiSingleResponse<T>)
  }, [swr.data])

  return {
    ...swr,
    normalizedData,
  }
}

/**
 * Hook to fetch an entity by ID
 */
export function useStrapiById<T = any>(
  endpoint: string | null,
  id: string | number | null,
  options?: FetchOptions
): SWRResponse & {
  normalizedData?: (NormalizedData<T> & { id: number }) | null
} {
  const client = getClient()
  const fullEndpoint = endpoint && id ? `${endpoint}/${id}` : null
  const cacheKey = fullEndpoint ? createCacheKey(fullEndpoint, options?.params) : null

  const swr = useSWR(
    cacheKey,
    async () => {
      if (!endpoint || !id) return null
      return client.getById<T>(endpoint, id, options?.params, options?.config)
    },
    options?.swrConfig
  )

  const normalizedData = useMemo(() => {
    if (!swr.data) return undefined
    return normalizeSingleResponse(swr.data as StrapiSingleResponse<T>)
  }, [swr.data])

  return {
    ...swr,
    normalizedData,
  }
}

/**
 * Hook for infinite scroll pagination
 */
export function useStrapiInfinite<T = any>(
  endpoint: string | null,
  options?: FetchOptions & { pageSize?: number }
): SWRInfiniteResponse & {
  allData?: Array<NormalizedData<T> & { id: number }>
  hasMore?: boolean
  totalItems?: number
  loadMore?: () => void
} {
  const client = getClient()
  const pageSize = options?.pageSize || 25

  const getKey = (pageIndex: number, previousPageData: any) => {
    if (!endpoint) return null

    // First page
    if (pageIndex === 0) {
      return createCacheKey(endpoint, {
        ...options?.params,
        pagination: { page: 1, pageSize },
      })
    }

    // Reached the end
    if (previousPageData && !previousPageData.data?.length) return null

    // Next page
    return createCacheKey(endpoint, {
      ...options?.params,
      pagination: { page: pageIndex + 1, pageSize },
    })
  }

  const fetcher = async (key: string) => {
    if (!endpoint) return null

    // Extract page number from cache key
    const match = key.match(/page[=:](\d+)/)
    const page = match ? parseInt(match[1], 10) : 1

    return client.getCollection<T>(
      endpoint,
      {
        ...options?.params,
        pagination: { page, pageSize },
      },
      options?.config
    )
  }

  const swr = useSWRInfinite(getKey, fetcher, {
    revalidateFirstPage: false,
    ...options?.swrConfig,
  })

  const allData = useMemo(() => {
    if (!swr.data) return undefined

    const normalized: Array<NormalizedData<T> & { id: number }> = []
    swr.data.forEach((response) => {
      if (response?.data) {
        normalized.push(...normalizeCollectionResponse(response))
      }
    })

    return normalized
  }, [swr.data])

  const lastPage = swr.data?.[swr.data.length - 1]
  const pagination = lastPage ? extractPaginationInfo(lastPage.meta) : null
  const hasMore = pagination?.hasNextPage ?? false
  const totalItems = pagination?.total

  const loadMore = useCallback(() => {
    if (!swr.isLoading && hasMore) {
      swr.setSize(swr.size + 1)
    }
  }, [swr, hasMore])

  return {
    ...swr,
    allData,
    hasMore,
    totalItems,
    loadMore,
  }
}

/**
 * Hook for search with debouncing
 */
export function useStrapiSearch<T = any>(
  endpoint: string | null,
  searchTerm: string,
  searchFields: string[],
  options?: FetchOptions & { debounceMs?: number }
): SWRResponse & {
  normalizedData?: Array<NormalizedData<T> & { id: number }>
  isSearching?: boolean
} {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm)
  const debounceMs = options?.debounceMs || 300

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, debounceMs)

    return () => clearTimeout(handler)
  }, [searchTerm, debounceMs])

  const client = getClient()

  // Build search filters
  const searchFilters = useMemo(() => {
    if (!debouncedSearchTerm || searchFields.length === 0) return undefined

    return {
      $or: searchFields.map((field) => ({
        [field]: { $containsi: debouncedSearchTerm },
      })),
    }
  }, [debouncedSearchTerm, searchFields])

  const params: StrapiQueryParams = {
    ...options?.params,
    filters: {
      ...options?.params?.filters,
      ...searchFilters,
    },
  }

  const cacheKey =
    endpoint && debouncedSearchTerm ? createCacheKey(endpoint, params) : null

  const swr = useSWR(
    cacheKey,
    async () => {
      if (!endpoint || !debouncedSearchTerm) return null
      return client.getCollection<T>(endpoint, params, options?.config)
    },
    options?.swrConfig
  )

  const normalizedData = useMemo(() => {
    if (!swr.data) return undefined
    return normalizeCollectionResponse(swr.data as StrapiCollectionResponse<T>)
  }, [swr.data])

  const isSearching = searchTerm !== debouncedSearchTerm || swr.isLoading

  return {
    ...swr,
    normalizedData,
    isSearching,
  }
}

/**
 * Hook for prefetching data
 */
export function useStrapiPrefetch() {
  const client = getClient()

  const prefetchCollection = useCallback(
    async <T = any>(endpoint: string, options?: FetchOptions) => {
      const cacheKey = createCacheKey(endpoint, options?.params)
      await mutate(
        cacheKey,
        client.getCollection<T>(endpoint, options?.params, options?.config),
        { revalidate: false }
      )
    },
    [client]
  )

  const prefetchSingle = useCallback(
    async <T = any>(endpoint: string, options?: FetchOptions) => {
      const cacheKey = createCacheKey(endpoint, options?.params)
      await mutate(
        cacheKey,
        client.getSingle<T>(endpoint, options?.params, options?.config),
        { revalidate: false }
      )
    },
    [client]
  )

  return {
    prefetchCollection,
    prefetchSingle,
  }
}

/**
 * Hook for cache management
 */
export function useStrapiCache() {
  const invalidate = useCallback(
    async (endpoint: string, params?: StrapiQueryParams) => {
      const cacheKey = createCacheKey(endpoint, params)
      return mutate(cacheKey)
    },
    []
  )

  const invalidateAll = useCallback(() => {
    mutate(
      (key) =>
        typeof key === "string" && key.startsWith(CACHE_KEY_PREFIX),
      undefined,
      { revalidate: true }
    )
  }, [])

  const update = useCallback(
    async <T = any>(
      endpoint: string,
      data: T,
      params?: StrapiQueryParams
    ) => {
      const cacheKey = createCacheKey(endpoint, params)
      return mutate(cacheKey, data, { revalidate: false })
    },
    []
  )

  const remove = useCallback(
    async (endpoint: string, params?: StrapiQueryParams) => {
      const cacheKey = createCacheKey(endpoint, params)
      return mutate(cacheKey, undefined, { revalidate: false })
    },
    []
  )

  return {
    invalidate,
    invalidateAll,
    update,
    remove,
  }
}

/**
 * Hook for optimistic updates
 */
export function useOptimisticUpdate() {
  const optimisticUpdate = useCallback(
    async <T = any>(
      endpoint: string,
      updater: (currentData: T) => T,
      params?: StrapiQueryParams
    ) => {
      const cacheKey = createCacheKey(endpoint, params)

      await mutate(
        cacheKey,
        async (currentData: any) => {
          return updater(currentData)
        },
        { revalidate: false }
      )
    },
    []
  )

  return {
    optimisticUpdate,
  }
}

/**
 * Global cache operations (non-hook functions)
 */
export const strapiCache = {
  /**
   * Invalidate cache for specific endpoint
   */
  invalidate: async (endpoint: string, params?: StrapiQueryParams) => {
    const cacheKey = createCacheKey(endpoint, params)
    return mutate(cacheKey)
  },

  /**
   * Invalidate all Strapi caches
   */
  invalidateAll: () => {
    mutate(
      (key) =>
        typeof key === "string" && key.startsWith(CACHE_KEY_PREFIX),
      undefined,
      { revalidate: true }
    )
  },

  /**
   * Update cache with new data
   */
  update: <T = any>(
    endpoint: string,
    data: T,
    params?: StrapiQueryParams
  ) => {
    const cacheKey = createCacheKey(endpoint, params)
    return mutate(cacheKey, data, { revalidate: false })
  },

  /**
   * Clear cache for specific endpoint
   */
  clear: (endpoint: string, params?: StrapiQueryParams) => {
    const cacheKey = createCacheKey(endpoint, params)
    return mutate(cacheKey, undefined, { revalidate: false })
  },

  /**
   * Prefetch data
   */
  prefetch: async <T = any>(
    endpoint: string,
    options?: FetchOptions
  ) => {
    const client = getClient()
    const cacheKey = createCacheKey(endpoint, options?.params)
    await mutate(
      cacheKey,
      client.getCollection<T>(endpoint, options?.params, options?.config),
      { revalidate: false }
    )
  },
}

