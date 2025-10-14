/**
 * Strapi Error Handling System
 * 
 * Custom error classes with detailed error information, error factory for creating
 * appropriate error instances, and error code enumeration.
 */

import type { AxiosError } from "axios"

/**
 * Error codes for different types of Strapi errors
 */
export enum StrapiErrorCode {
  // Network errors
  NETWORK_ERROR = "NETWORK_ERROR",
  TIMEOUT = "TIMEOUT",
  CONNECTION_REFUSED = "CONNECTION_REFUSED",

  // HTTP 4xx errors
  BAD_REQUEST = "BAD_REQUEST",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
  METHOD_NOT_ALLOWED = "METHOD_NOT_ALLOWED",
  CONFLICT = "CONFLICT",
  UNPROCESSABLE_ENTITY = "UNPROCESSABLE_ENTITY",
  TOO_MANY_REQUESTS = "TOO_MANY_REQUESTS",

  // HTTP 5xx errors
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  BAD_GATEWAY = "BAD_GATEWAY",
  SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE",
  GATEWAY_TIMEOUT = "GATEWAY_TIMEOUT",

  // Client errors
  INVALID_RESPONSE = "INVALID_RESPONSE",
  PARSE_ERROR = "PARSE_ERROR",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
}

/**
 * Detailed error information
 */
export interface ErrorDetails {
  code: StrapiErrorCode
  statusCode?: number
  endpoint?: string
  method?: string
  params?: any
  timestamp: string
  requestId?: string
  retryAfter?: number
  validationErrors?: Record<string, string[]>
  [key: string]: any
}

/**
 * Base Strapi error class
 */
export class StrapiError extends Error {
  public readonly code: StrapiErrorCode
  public readonly statusCode?: number
  public readonly details: ErrorDetails
  public readonly originalError?: Error

  constructor(
    message: string,
    code: StrapiErrorCode = StrapiErrorCode.UNKNOWN_ERROR,
    statusCode?: number,
    details?: Partial<ErrorDetails>,
    originalError?: Error
  ) {
    super(message)
    this.name = this.constructor.name
    this.code = code
    this.statusCode = statusCode
    this.originalError = originalError

    this.details = {
      code,
      statusCode,
      timestamp: new Date().toISOString(),
      ...details,
    }

    // Maintains proper stack trace for where error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }

    // Set prototype explicitly for custom error classes
    Object.setPrototypeOf(this, StrapiError.prototype)
  }

  /**
   * Convert error to JSON for logging or transmission
   */
  toJSON(): object {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
      details: this.details,
      stack: this.stack,
    }
  }

  /**
   * Get a user-friendly error message
   */
  getUserMessage(): string {
    return this.message
  }
}

/**
 * Network error (no response from server)
 */
export class NetworkError extends StrapiError {
  constructor(
    message: string = "Network error occurred",
    details?: Partial<ErrorDetails>,
    originalError?: Error
  ) {
    super(message, StrapiErrorCode.NETWORK_ERROR, undefined, details, originalError)
    Object.setPrototypeOf(this, NetworkError.prototype)
  }

  getUserMessage(): string {
    return "Unable to connect to the server. Please check your internet connection."
  }
}

/**
 * Timeout error
 */
export class TimeoutError extends StrapiError {
  constructor(
    message: string = "Request timeout",
    details?: Partial<ErrorDetails>,
    originalError?: Error
  ) {
    super(message, StrapiErrorCode.TIMEOUT, 408, details, originalError)
    Object.setPrototypeOf(this, TimeoutError.prototype)
  }

  getUserMessage(): string {
    return "The request took too long. Please try again."
  }
}

/**
 * Authentication error (401)
 */
export class AuthenticationError extends StrapiError {
  constructor(
    message: string = "Authentication required",
    details?: Partial<ErrorDetails>,
    originalError?: Error
  ) {
    super(message, StrapiErrorCode.UNAUTHORIZED, 401, details, originalError)
    Object.setPrototypeOf(this, AuthenticationError.prototype)
  }

  getUserMessage(): string {
    return "Please log in to continue."
  }
}

/**
 * Authorization error (403)
 */
export class AuthorizationError extends StrapiError {
  constructor(
    message: string = "Access forbidden",
    details?: Partial<ErrorDetails>,
    originalError?: Error
  ) {
    super(message, StrapiErrorCode.FORBIDDEN, 403, details, originalError)
    Object.setPrototypeOf(this, AuthorizationError.prototype)
  }

  getUserMessage(): string {
    return "You don't have permission to access this resource."
  }
}

/**
 * Not found error (404)
 */
export class NotFoundError extends StrapiError {
  constructor(
    message: string = "Resource not found",
    details?: Partial<ErrorDetails>,
    originalError?: Error
  ) {
    super(message, StrapiErrorCode.NOT_FOUND, 404, details, originalError)
    Object.setPrototypeOf(this, NotFoundError.prototype)
  }

  getUserMessage(): string {
    return "The requested resource was not found."
  }
}

/**
 * Validation error (400 or 422)
 */
export class ValidationError extends StrapiError {
  constructor(
    message: string = "Validation failed",
    validationErrors?: Record<string, string[]>,
    details?: Partial<ErrorDetails>,
    originalError?: Error
  ) {
    super(
      message,
      StrapiErrorCode.VALIDATION_ERROR,
      422,
      { ...details, validationErrors },
      originalError
    )
    Object.setPrototypeOf(this, ValidationError.prototype)
  }

  getUserMessage(): string {
    return "Please check your input and try again."
  }

  getValidationErrors(): Record<string, string[]> | undefined {
    return this.details.validationErrors
  }
}

/**
 * Rate limit error (429)
 */
export class RateLimitError extends StrapiError {
  constructor(
    message: string = "Too many requests",
    retryAfter?: number,
    details?: Partial<ErrorDetails>,
    originalError?: Error
  ) {
    super(
      message,
      StrapiErrorCode.TOO_MANY_REQUESTS,
      429,
      { ...details, retryAfter },
      originalError
    )
    Object.setPrototypeOf(this, RateLimitError.prototype)
  }

  getUserMessage(): string {
    const retryAfter = this.details.retryAfter
    if (retryAfter) {
      return `Too many requests. Please try again in ${retryAfter} seconds.`
    }
    return "Too many requests. Please try again later."
  }
}

/**
 * Server error (500+)
 */
export class ServerError extends StrapiError {
  constructor(
    message: string = "Server error occurred",
    statusCode: number = 500,
    details?: Partial<ErrorDetails>,
    originalError?: Error
  ) {
    super(
      message,
      StrapiErrorCode.INTERNAL_SERVER_ERROR,
      statusCode,
      details,
      originalError
    )
    Object.setPrototypeOf(this, ServerError.prototype)
  }

  getUserMessage(): string {
    return "A server error occurred. Please try again later."
  }
}

/**
 * Parse error (invalid response)
 */
export class ParseError extends StrapiError {
  constructor(
    message: string = "Failed to parse response",
    details?: Partial<ErrorDetails>,
    originalError?: Error
  ) {
    super(message, StrapiErrorCode.PARSE_ERROR, undefined, details, originalError)
    Object.setPrototypeOf(this, ParseError.prototype)
  }

  getUserMessage(): string {
    return "Failed to process server response."
  }
}

/**
 * Error factory for creating appropriate error instances
 */
export class ErrorFactory {
  /**
   * Create error from HTTP status code
   */
  static fromStatusCode(
    statusCode: number,
    message?: string,
    details?: Partial<ErrorDetails>,
    originalError?: Error
  ): StrapiError {
    switch (statusCode) {
      case 400:
        return new ValidationError(
          message || "Bad request",
          undefined,
          details,
          originalError
        )
      case 401:
        return new AuthenticationError(
          message || "Authentication required",
          details,
          originalError
        )
      case 403:
        return new AuthorizationError(
          message || "Access forbidden",
          details,
          originalError
        )
      case 404:
        return new NotFoundError(
          message || "Resource not found",
          details,
          originalError
        )
      case 408:
        return new TimeoutError(message || "Request timeout", details, originalError)
      case 422:
        return new ValidationError(
          message || "Validation failed",
          undefined,
          details,
          originalError
        )
      case 429:
        return new RateLimitError(
          message || "Too many requests",
          undefined,
          details,
          originalError
        )
      case 500:
      case 502:
      case 503:
      case 504:
        return new ServerError(
          message || "Server error",
          statusCode,
          details,
          originalError
        )
      default:
        return new StrapiError(
          message || `HTTP error ${statusCode}`,
          StrapiErrorCode.UNKNOWN_ERROR,
          statusCode,
          details,
          originalError
        )
    }
  }

  /**
   * Create error from Axios error
   */
  static fromAxiosError(error: AxiosError): StrapiError {
    const details: Partial<ErrorDetails> = {
      endpoint: error.config?.url,
      method: error.config?.method?.toUpperCase(),
      params: error.config?.params,
    }

    // Network error (no response)
    if (!error.response) {
      if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
        return new TimeoutError("Request timeout", details, error)
      }
      return new NetworkError(
        error.message || "Network error occurred",
        details,
        error
      )
    }

    // Extract error message from response
    const responseData = error.response.data as any
    let message = error.message

    if (responseData) {
      if (typeof responseData === "string") {
        message = responseData
      } else if (responseData.error?.message) {
        message = responseData.error.message
      } else if (responseData.message) {
        message = responseData.message
      }

      // Extract validation errors if present
      if (responseData.error?.details) {
        details.validationErrors = responseData.error.details
      }

      // Extract retry-after header for rate limiting
      const retryAfter = error.response.headers?.["retry-after"]
      if (retryAfter) {
        details.retryAfter = parseInt(retryAfter, 10)
      }
    }

    return ErrorFactory.fromStatusCode(
      error.response.status,
      message,
      details,
      error
    )
  }

  /**
   * Create error from generic Error
   */
  static fromError(error: Error, details?: Partial<ErrorDetails>): StrapiError {
    if (error instanceof StrapiError) {
      return error
    }

    if ((error as any).isAxiosError) {
      return ErrorFactory.fromAxiosError(error as AxiosError)
    }

    return new StrapiError(
      error.message || "Unknown error occurred",
      StrapiErrorCode.UNKNOWN_ERROR,
      undefined,
      details,
      error
    )
  }
}

/**
 * Check if error is a Strapi error
 */
export function isStrapiError(error: any): error is StrapiError {
  return error instanceof StrapiError
}

/**
 * Check if error is a network error
 */
export function isNetworkError(error: any): error is NetworkError {
  return error instanceof NetworkError
}

/**
 * Check if error is retriable
 */
export function isRetriableError(error: any): boolean {
  if (!isStrapiError(error)) return false

  return (
    error instanceof NetworkError ||
    error instanceof TimeoutError ||
    error instanceof ServerError ||
    (error.statusCode !== undefined &&
      (error.statusCode >= 500 || error.statusCode === 408 || error.statusCode === 429))
  )
}

