/**
 * Strapi Configuration
 * 
 * Configuration management, environment variable handling, and default settings
 * for both Axios client and SWR.
 */

import type { SWRConfiguration } from "swr"

/**
 * Main Strapi configuration interface
 */
export interface StrapiConfig {
  baseURL: string
  apiToken?: string
  timeout?: number
  maxRetries?: number
  retryDelay?: number
  headers?: Record<string, string>
  debug?: boolean
}

/**
 * Default configuration for the Strapi client
 */
export const DEFAULT_CONFIG: Partial<StrapiConfig> = {
  timeout: 30000, // 30 seconds
  maxRetries: 3, // Retry failed requests 3 times
  retryDelay: 1000, // 1 second between retries
  debug: process.env.NODE_ENV === "development",
}

/**
 * Default configuration for SWR
 */
export const DEFAULT_SWR_CONFIG: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  refreshInterval: 0,
  dedupingInterval: 2000,
  errorRetryCount: 3,
  errorRetryInterval: 5000,
  shouldRetryOnError: true,
}

/**
 * Cache key prefix for SWR
 */
export const CACHE_KEY_PREFIX = "strapi:"

/**
 * Common API endpoints
 */
export const API_ENDPOINTS = {
  UPLOAD: "/upload",
  USERS: "/users",
  AUTH: {
    LOGIN: "/auth/local",
    REGISTER: "/auth/local/register",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    EMAIL_CONFIRMATION: "/auth/email-confirmation",
    SEND_EMAIL_CONFIRMATION: "/auth/send-email-confirmation",
  },
  USERS_ME: "/users/me",
} as const

/**
 * Get Strapi configuration from environment variables
 */
export function getStrapiConfig(): StrapiConfig {
  const baseURL =
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    process.env.STRAPI_URL ||
    "http://localhost:1337"

  const apiToken =
    process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || process.env.STRAPI_API_TOKEN

  return {
    baseURL: baseURL.replace(/\/$/, ""), // Remove trailing slash
    apiToken,
    ...DEFAULT_CONFIG,
  }
}

/**
 * Validate Strapi configuration
 */
export function validateStrapiConfig(config: StrapiConfig): void {
  if (!config.baseURL) {
    throw new Error(
      "Strapi baseURL is required. Set NEXT_PUBLIC_STRAPI_URL or STRAPI_URL environment variable."
    )
  }

  try {
    new URL(config.baseURL)
  } catch {
    throw new Error(`Invalid Strapi baseURL: ${config.baseURL}`)
  }
}

