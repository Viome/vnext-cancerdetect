/**
 * Strapi Integration - Main Export File
 * 
 * Central export point for all Strapi integration functionality.
 */

// Client
export { StrapiClient, getStrapiClient, resetStrapiClient, strapiClient } from "./client"

// Configuration
export {
  getStrapiConfig,
  validateStrapiConfig,
  DEFAULT_CONFIG,
  DEFAULT_SWR_CONFIG,
  CACHE_KEY_PREFIX,
  API_ENDPOINTS,
  type StrapiConfig,
} from "./config"

// Errors
export {
  StrapiError,
  NetworkError,
  TimeoutError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ValidationError,
  RateLimitError,
  ServerError,
  ParseError,
  ErrorFactory,
  StrapiErrorCode,
  isStrapiError,
  isNetworkError,
  isRetriableError,
  type ErrorDetails,
} from "./errors"

// Hooks
export {
  useStrapiCollection,
  useStrapiSingle,
  useStrapiById,
  useStrapiInfinite,
  useStrapiSearch,
  useStrapiPrefetch,
  useStrapiCache,
  useOptimisticUpdate,
  strapiCache,
} from "./hooks"

// Provider
export {
  StrapiProvider,
  StrapiErrorBoundary,
  StrapiProviderWithErrorBoundary,
  type StrapiProviderProps,
  type StrapiErrorBoundaryProps,
  type StrapiProviderWithErrorBoundaryProps,
} from "./provider"

// Types
export type {
  StrapiEntity,
  StrapiPagination,
  StrapiMeta,
  StrapiResponse,
  StrapiCollectionResponse,
  StrapiSingleResponse,
  StrapiMediaFormat,
  StrapiMedia,
  StrapiFilters,
  StrapiSort,
  StrapiPopulate,
  StrapiPaginationParams,
  StrapiQueryParams,
  FetchOptions,
  NormalizedData,
  PaginationInfo,
} from "./types"

// Utils
export {
  normalizeEntity,
  normalizeEntities,
  normalizeCollectionResponse,
  normalizeSingleResponse,
  extractPaginationInfo,
  buildQueryString,
  populateBuilder,
  filterBuilder,
  getStrapiMediaUrl,
  getStrapiMediaFormatUrl,
  createCacheKey,
  deepMerge,
  debounce,
  isServer,
  isClient,
  safeJsonParse,
  retryWithBackoff,
} from "./utils"

