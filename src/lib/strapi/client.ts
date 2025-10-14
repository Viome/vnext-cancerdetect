/**
 * Strapi HTTP Client
 * 
 * Main HTTP client class built on Axios with comprehensive error handling,
 * request/response interceptors, retry logic, and debug logging.
 */

import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios"
import { getStrapiConfig, validateStrapiConfig, type StrapiConfig } from "./config"
import { ErrorFactory, isRetriableError } from "./errors"
import type {
  StrapiCollectionResponse,
  StrapiSingleResponse,
  StrapiQueryParams,
} from "./types"
import { buildQueryString, isServer } from "./utils"

/**
 * Main Strapi client class
 */
export class StrapiClient {
  private axiosInstance: AxiosInstance
  private config: StrapiConfig
  private requestCount = 0

  constructor(config?: Partial<StrapiConfig>) {
    this.config = { ...getStrapiConfig(), ...config }
    validateStrapiConfig(this.config)

    this.axiosInstance = axios.create({
      baseURL: `${this.config.baseURL}/api`,
      timeout: this.config.timeout,
      headers: {
        "Content-Type": "application/json",
        ...(this.config.apiToken && {
          Authorization: `Bearer ${this.config.apiToken}`,
        }),
        ...this.config.headers,
      },
    })

    this.setupInterceptors()
  }

  /**
   * Setup request and response interceptors
   */
  private setupInterceptors(): void {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        this.requestCount++

        if (this.config.debug) {
          console.log(`[Strapi Request #${this.requestCount}]`, {
            method: config.method?.toUpperCase(),
            url: config.url,
            params: config.params,
            headers: config.headers,
          })
        }

        // Add request timestamp for performance tracking
        ;(config as any).metadata = { startTime: Date.now() }

        return config
      },
      (error) => {
        if (this.config.debug) {
          console.error("[Strapi Request Error]", error)
        }
        return Promise.reject(ErrorFactory.fromError(error))
      }
    )

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => {
        const duration = Date.now() - (response.config as any).metadata?.startTime

        if (this.config.debug) {
          console.log(`[Strapi Response]`, {
            status: response.status,
            url: response.config.url,
            duration: `${duration}ms`,
            data: response.data,
          })
        }

        return response
      },
      async (error) => {
        const duration = Date.now() - (error.config as any)?.metadata?.startTime

        if (this.config.debug) {
          console.error(`[Strapi Response Error]`, {
            status: error.response?.status,
            url: error.config?.url,
            duration: duration ? `${duration}ms` : "N/A",
            error: error.response?.data || error.message,
          })
        }

        const strapiError = ErrorFactory.fromAxiosError(error)

        // Retry logic for retriable errors
        if (
          isRetriableError(strapiError) &&
          error.config &&
          !error.config.__isRetry
        ) {
          return this.retryRequest(error.config)
        }

        return Promise.reject(strapiError)
      }
    )
  }

  /**
   * Retry failed requests with exponential backoff
   */
  private async retryRequest(
    config: AxiosRequestConfig & { __retryCount?: number; __isRetry?: boolean }
  ): Promise<any> {
    const retryCount = config.__retryCount || 0
    const maxRetries = this.config.maxRetries || 3

    if (retryCount >= maxRetries) {
      return Promise.reject(
        ErrorFactory.fromError(
          new Error(`Max retries (${maxRetries}) exceeded`),
          {
            endpoint: config.url,
            method: config.method?.toUpperCase(),
          }
        )
      )
    }

    config.__retryCount = retryCount + 1
    config.__isRetry = true

    // Exponential backoff
    const delay = (this.config.retryDelay || 1000) * Math.pow(2, retryCount)

    if (this.config.debug) {
      console.log(
        `[Strapi Retry] Attempt ${config.__retryCount}/${maxRetries} after ${delay}ms`
      )
    }

    await new Promise((resolve) => setTimeout(resolve, delay))

    return this.axiosInstance.request(config)
  }

  /**
   * Generic GET request
   */
  async get<T = any>(
    endpoint: string,
    params?: StrapiQueryParams,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const queryString = buildQueryString(params)
    const url = `${endpoint}${queryString}`

    const response = await this.axiosInstance.get<T>(url, config)
    return response.data
  }

  /**
   * Get collection with normalized response
   */
  async getCollection<T = any>(
    endpoint: string,
    params?: StrapiQueryParams,
    config?: AxiosRequestConfig
  ): Promise<StrapiCollectionResponse<T>> {
    return this.get<StrapiCollectionResponse<T>>(endpoint, params, config)
  }

  /**
   * Get single entity with normalized response
   */
  async getSingle<T = any>(
    endpoint: string,
    params?: StrapiQueryParams,
    config?: AxiosRequestConfig
  ): Promise<StrapiSingleResponse<T>> {
    return this.get<StrapiSingleResponse<T>>(endpoint, params, config)
  }

  /**
   * Get entity by ID
   */
  async getById<T = any>(
    endpoint: string,
    id: string | number,
    params?: StrapiQueryParams,
    config?: AxiosRequestConfig
  ): Promise<StrapiSingleResponse<T>> {
    const url = `${endpoint}/${id}`
    return this.get<StrapiSingleResponse<T>>(url, params, config)
  }

  /**
   * Find entities with filters
   */
  async find<T = any>(
    endpoint: string,
    filters?: Record<string, any>,
    params?: StrapiQueryParams,
    config?: AxiosRequestConfig
  ): Promise<StrapiCollectionResponse<T>> {
    const queryParams = {
      ...params,
      filters: { ...params?.filters, ...filters },
    }
    return this.getCollection<T>(endpoint, queryParams, config)
  }

  /**
   * Find one entity with filters
   */
  async findOne<T = any>(
    endpoint: string,
    filters?: Record<string, any>,
    params?: StrapiQueryParams,
    config?: AxiosRequestConfig
  ): Promise<StrapiSingleResponse<T> | null> {
    const queryParams = {
      ...params,
      filters: { ...params?.filters, ...filters },
      pagination: { pageSize: 1 },
    }

    const response = await this.getCollection<T>(endpoint, queryParams, config)

    if (!response.data || response.data.length === 0) {
      return null
    }

    return {
      data: response.data[0],
      meta: response.meta,
    }
  }

  /**
   * POST request
   */
  async post<T = any>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.post<T>(endpoint, data, config)
    return response.data
  }

  /**
   * PUT request
   */
  async put<T = any>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.put<T>(endpoint, data, config)
    return response.data
  }

  /**
   * DELETE request
   */
  async delete<T = any>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.delete<T>(endpoint, config)
    return response.data
  }

  /**
   * Update configuration
   */
  updateConfig(config: Partial<StrapiConfig>): void {
    this.config = { ...this.config, ...config }

    if (config.baseURL) {
      this.axiosInstance.defaults.baseURL = `${config.baseURL}/api`
    }

    if (config.timeout) {
      this.axiosInstance.defaults.timeout = config.timeout
    }

    if (config.apiToken !== undefined) {
      if (config.apiToken) {
        this.axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${config.apiToken}`
      } else {
        delete this.axiosInstance.defaults.headers.common["Authorization"]
      }
    }

    if (config.headers) {
      Object.assign(this.axiosInstance.defaults.headers.common, config.headers)
    }
  }

  /**
   * Set authentication token
   */
  setAuthToken(token: string): void {
    this.config.apiToken = token
    this.axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`
  }

  /**
   * Clear authentication token
   */
  clearAuthToken(): void {
    this.config.apiToken = undefined
    delete this.axiosInstance.defaults.headers.common["Authorization"]
  }

  /**
   * Get axios instance for advanced usage
   */
  getAxiosInstance(): AxiosInstance {
    return this.axiosInstance
  }

  /**
   * Get current configuration
   */
  getConfig(): StrapiConfig {
    return { ...this.config }
  }

  /**
   * Cleanup (cancel pending requests, etc.)
   */
  cleanup(): void {
    // Future: Implement request cancellation if needed
    if (this.config.debug) {
      console.log("[Strapi Client] Cleanup called")
    }
  }
}

/**
 * Singleton instance management
 */
let clientInstance: StrapiClient | null = null

/**
 * Get or create Strapi client singleton
 */
export function getStrapiClient(config?: Partial<StrapiConfig>): StrapiClient {
  if (!clientInstance) {
    clientInstance = new StrapiClient(config)
  } else if (config) {
    clientInstance.updateConfig(config)
  }

  return clientInstance
}

/**
 * Reset the singleton instance (useful for testing)
 */
export function resetStrapiClient(): void {
  if (clientInstance) {
    clientInstance.cleanup()
    clientInstance = null
  }
}

/**
 * Default client instance (server-side safe)
 */
export const strapiClient = isServer()
  ? new StrapiClient()
  : getStrapiClient()

