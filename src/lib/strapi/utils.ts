/**
 * Strapi Utility Functions
 * 
 * Helper functions for data transformation, query building, and common operations.
 */

import qs from "qs"
import type {
  StrapiEntity,
  StrapiQueryParams,
  StrapiCollectionResponse,
  StrapiSingleResponse,
  NormalizedData,
  PaginationInfo,
  StrapiMedia,
} from "./types"

/**
 * Normalize a single Strapi entity (flatten attributes into main object)
 */
export function normalizeEntity<T>(
  entity: StrapiEntity<T> | null | undefined
): (NormalizedData<T> & { id: number }) | null {
  if (!entity) return null

  return {
    id: entity.id,
    ...entity.attributes,
  } as NormalizedData<T> & { id: number }
}

/**
 * Normalize an array of Strapi entities
 */
export function normalizeEntities<T>(
  entities: Array<StrapiEntity<T>> | null | undefined
): Array<NormalizedData<T> & { id: number }> {
  if (!entities || !Array.isArray(entities)) return []

  return entities.map((entity) => normalizeEntity(entity)).filter(Boolean) as Array<
    NormalizedData<T> & { id: number }
  >
}

/**
 * Normalize a collection response
 */
export function normalizeCollectionResponse<T>(
  response: StrapiCollectionResponse<T> | null | undefined
): Array<NormalizedData<T> & { id: number }> {
  if (!response?.data) return []
  return normalizeEntities(response.data)
}

/**
 * Normalize a single entity response
 */
export function normalizeSingleResponse<T>(
  response: StrapiSingleResponse<T> | null | undefined
): (NormalizedData<T> & { id: number }) | null {
  if (!response?.data) return null
  return normalizeEntity(response.data)
}

/**
 * Extract pagination info from response metadata
 */
export function extractPaginationInfo(
  meta: { pagination?: any } | undefined
): PaginationInfo | null {
  const pagination = meta?.pagination

  if (!pagination) return null

  return {
    page: pagination.page || 1,
    pageSize: pagination.pageSize || 25,
    pageCount: pagination.pageCount || 0,
    total: pagination.total || 0,
    hasNextPage: pagination.page < pagination.pageCount,
    hasPrevPage: pagination.page > 1,
    totalPages: pagination.pageCount || 0,
  }
}

/**
 * Build query string from Strapi query parameters
 */
export function buildQueryString(params?: StrapiQueryParams): string {
  if (!params || Object.keys(params).length === 0) return ""

  const queryString = qs.stringify(params, {
    encodeValuesOnly: true,
    arrayFormat: "brackets",
  })

  return queryString ? `?${queryString}` : ""
}

/**
 * Build populate query parameter
 */
export function populateBuilder(fields: string[]): string {
  return fields.join(",")
}

/**
 * Build filter query parameter
 */
export function filterBuilder(filters: Record<string, any>): Record<string, any> {
  return filters
}

/**
 * Get full URL for Strapi media
 */
export function getStrapiMediaUrl(
  media: StrapiMedia | string | null | undefined,
  baseURL?: string
): string | null {
  if (!media) return null

  const url = typeof media === "string" ? media : media.url

  if (!url) return null

  // If URL is already absolute, return it
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url
  }

  // Otherwise, prepend the base URL
  const base = baseURL || process.env.NEXT_PUBLIC_STRAPI_URL || ""
  return `${base}${url}`
}

/**
 * Get specific format URL for Strapi media
 */
export function getStrapiMediaFormatUrl(
  media: StrapiMedia | null | undefined,
  format: "thumbnail" | "small" | "medium" | "large" = "medium",
  baseURL?: string
): string | null {
  if (!media) return null

  const formatData = media.formats?.[format]
  if (!formatData) {
    // Fallback to original URL
    return getStrapiMediaUrl(media, baseURL)
  }

  return getStrapiMediaUrl(formatData.url, baseURL)
}

/**
 * Create cache key for SWR
 */
export function createCacheKey(
  endpoint: string,
  params?: StrapiQueryParams
): string {
  const baseKey = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint

  if (!params || Object.keys(params).length === 0) {
    return `strapi:${baseKey}`
  }

  const paramsString = qs.stringify(params, {
    encodeValuesOnly: true,
    arrayFormat: "brackets",
    sort: (a, b) => a.localeCompare(b), // Consistent ordering
  })

  return `strapi:${baseKey}?${paramsString}`
}

/**
 * Deep merge two objects
 */
export function deepMerge<T extends Record<string, any>>(
  target: T,
  source: Partial<T>
): T {
  const output = { ...target }

  Object.keys(source).forEach((key) => {
    const sourceValue = source[key as keyof T]
    const targetValue = target[key as keyof T]

    if (
      sourceValue &&
      typeof sourceValue === "object" &&
      !Array.isArray(sourceValue) &&
      targetValue &&
      typeof targetValue === "object" &&
      !Array.isArray(targetValue)
    ) {
      output[key as keyof T] = deepMerge(targetValue, sourceValue) as T[keyof T]
    } else if (sourceValue !== undefined) {
      output[key as keyof T] = sourceValue as T[keyof T]
    }
  })

  return output
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

/**
 * Check if code is running on server
 */
export function isServer(): boolean {
  return typeof window === "undefined"
}

/**
 * Check if code is running on client
 */
export function isClient(): boolean {
  return typeof window !== "undefined"
}

/**
 * Safe JSON parse with fallback
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T
  } catch {
    return fallback
  }
}

/**
 * Retry function with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 1000
): Promise<T> {
  let lastError: Error | undefined

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error
      if (i < maxRetries - 1) {
        const delay = delayMs * Math.pow(2, i)
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    }
  }

  throw lastError
}

