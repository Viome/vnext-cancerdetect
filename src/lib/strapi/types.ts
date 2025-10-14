/**
 * Strapi TypeScript Type Definitions
 * 
 * Complete type definitions for Strapi API responses, entities, and query parameters.
 */

import type { AxiosRequestConfig } from "axios"

/**
 * Base Strapi entity with id and attributes
 */
export interface StrapiEntity<T = Record<string, any>> {
  id: number
  attributes: T
}

/**
 * Strapi pagination information
 */
export interface StrapiPagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

/**
 * Strapi metadata
 */
export interface StrapiMeta {
  pagination?: StrapiPagination
  [key: string]: any
}

/**
 * Base Strapi response
 */
export interface StrapiResponse<T> {
  data: T
  meta: StrapiMeta
}

/**
 * Strapi collection response (array of entities)
 */
export interface StrapiCollectionResponse<T = Record<string, any>> {
  data: Array<StrapiEntity<T>>
  meta: StrapiMeta
}

/**
 * Strapi single entity response
 */
export interface StrapiSingleResponse<T = Record<string, any>> {
  data: StrapiEntity<T>
  meta: StrapiMeta
}

/**
 * Strapi media/image format
 */
export interface StrapiMediaFormat {
  name: string
  hash: string
  ext: string
  mime: string
  width: number
  height: number
  size: number
  path: string | null
  url: string
}

/**
 * Strapi media/image data
 */
export interface StrapiMedia {
  id: number
  name: string
  alternativeText: string | null
  caption: string | null
  width: number
  height: number
  formats: {
    thumbnail?: StrapiMediaFormat
    small?: StrapiMediaFormat
    medium?: StrapiMediaFormat
    large?: StrapiMediaFormat
    [key: string]: StrapiMediaFormat | undefined
  }
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  createdAt: string
  updatedAt: string
}

/**
 * Query parameter filters
 */
export type StrapiFilters = Record<string, any>

/**
 * Query parameter sort options
 */
export type StrapiSort = string | string[]

/**
 * Query parameter populate options
 */
export type StrapiPopulate = string | string[] | Record<string, any> | "*"

/**
 * Query parameter pagination options
 */
export interface StrapiPaginationParams {
  page?: number
  pageSize?: number
  start?: number
  limit?: number
  withCount?: boolean
}

/**
 * Complete query parameters for Strapi API
 */
export interface StrapiQueryParams {
  filters?: StrapiFilters
  sort?: StrapiSort
  populate?: StrapiPopulate
  fields?: string[]
  pagination?: StrapiPaginationParams
  publicationState?: "live" | "preview"
  locale?: string
  [key: string]: any
}

/**
 * Fetch options for Strapi hooks and client
 */
export interface FetchOptions {
  params?: StrapiQueryParams
  config?: AxiosRequestConfig
  swrConfig?: {
    revalidateOnFocus?: boolean
    revalidateOnMount?: boolean
    revalidateOnReconnect?: boolean
    refreshInterval?: number
    dedupingInterval?: number
    errorRetryCount?: number
    errorRetryInterval?: number
    [key: string]: any
  }
}

/**
 * Normalized data type (entity with flattened attributes)
 */
export type NormalizedData<T> = T & { id: number }

/**
 * Pagination info returned by hooks
 */
export interface PaginationInfo {
  page: number
  pageSize: number
  pageCount: number
  total: number
  hasNextPage: boolean
  hasPrevPage: boolean
  totalPages: number
}

