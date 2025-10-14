/**
 * Strapi React Provider
 * 
 * React provider component for global SWR configuration and error handling.
 */

"use client"

import React, { Component, type ReactNode } from "react"
import { SWRConfig, type SWRConfiguration } from "swr"
import { DEFAULT_SWR_CONFIG } from "./config"
import { StrapiError } from "./errors"

/**
 * Props for StrapiProvider
 */
export interface StrapiProviderProps {
  children: ReactNode
  swrConfig?: SWRConfiguration
  onError?: (error: StrapiError) => void
}

/**
 * Strapi Provider Component
 * 
 * Wraps the application with SWR configuration for Strapi hooks.
 */
export function StrapiProvider({
  children,
  swrConfig = {},
  onError,
}: StrapiProviderProps) {
  const mergedConfig: SWRConfiguration = {
    ...DEFAULT_SWR_CONFIG,
    ...swrConfig,
    onError: (error) => {
      // Call custom error handler if provided
      if (onError) {
        onError(error as StrapiError)
      }

      // Log error in development
      if (process.env.NODE_ENV === "development") {
        console.error("[Strapi Error]", error)
      }

      // Call SWR's onError if provided in config
      if (swrConfig.onError) {
        swrConfig.onError(error, "", {} as any)
      }
    },
  }

  return <SWRConfig value={mergedConfig}>{children}</SWRConfig>
}

/**
 * Props for StrapiErrorBoundary
 */
export interface StrapiErrorBoundaryProps {
  children: ReactNode
  fallback?: (error: Error, reset: () => void) => ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

/**
 * State for StrapiErrorBoundary
 */
interface StrapiErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

/**
 * Error Boundary for Strapi-related errors
 */
export class StrapiErrorBoundary extends Component<
  StrapiErrorBoundaryProps,
  StrapiErrorBoundaryState
> {
  constructor(props: StrapiErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): StrapiErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log error
    console.error("[Strapi Error Boundary]", error, errorInfo)

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }

  resetError = (): void => {
    this.setState({ hasError: false, error: null })
  }

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.resetError)
      }

      return (
        <div
          style={{
            padding: "20px",
            margin: "20px",
            border: "1px solid #ff6b6b",
            borderRadius: "4px",
            backgroundColor: "#fff5f5",
          }}
        >
          <h2 style={{ color: "#c92a2a", margin: "0 0 10px 0" }}>
            Something went wrong
          </h2>
          <p style={{ margin: "0 0 10px 0" }}>{this.state.error.message}</p>
          <button
            onClick={this.resetError}
            style={{
              padding: "8px 16px",
              backgroundColor: "#c92a2a",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

/**
 * Combined provider with error boundary
 */
export interface StrapiProviderWithErrorBoundaryProps
  extends StrapiProviderProps {
  errorBoundaryFallback?: (error: Error, reset: () => void) => ReactNode
  onErrorBoundary?: (error: Error, errorInfo: React.ErrorInfo) => void
}

/**
 * Strapi Provider with Error Boundary
 * 
 * Convenience component that combines StrapiProvider and StrapiErrorBoundary.
 */
export function StrapiProviderWithErrorBoundary({
  children,
  swrConfig,
  onError,
  errorBoundaryFallback,
  onErrorBoundary,
}: StrapiProviderWithErrorBoundaryProps) {
  return (
    <StrapiErrorBoundary
      fallback={errorBoundaryFallback}
      onError={onErrorBoundary}
    >
      <StrapiProvider swrConfig={swrConfig} onError={onError}>
        {children}
      </StrapiProvider>
    </StrapiErrorBoundary>
  )
}

