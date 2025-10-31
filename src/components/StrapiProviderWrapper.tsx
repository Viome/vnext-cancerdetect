/**
 * Strapi Provider Wrapper
 * 
 * Wraps the application with Strapi provider for SWR configuration
 * and global error handling.
 */

"use client"

import { type ReactNode } from "react"
import * as Sentry from '@sentry/nextjs'
import { StrapiProvider } from "@/lib/strapi"

interface StrapiProviderWrapperProps {
  children: ReactNode
}

export default function StrapiProviderWrapper({
  children,
}: StrapiProviderWrapperProps) {
  return (
    <StrapiProvider
      swrConfig={{
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        refreshInterval: 0,
        dedupingInterval: 2000,
        errorRetryCount: 3,
        errorRetryInterval: 5000,
      }}
      onError={(error) => {
        // Log errors in development
        if (process.env.NODE_ENV === "development") {
          console.error("[Strapi Provider Error]", {
            message: error.message,
            code: error.code,
            statusCode: error.statusCode,
            details: error.details,
          })
        }

        // Capture errors in Sentry (both development and production)
        console.error('[StrapiProvider] Error caught:', {
          message: error.message,
          code: error.code,
          statusCode: error.statusCode,
          details: error.details,
        });
        
        const eventId = Sentry.captureException(error, {
          tags: {
            component: 'StrapiProvider',
            error_type: 'strapi_provider_error',
          },
          extra: {
            message: error.message,
            code: error.code,
            statusCode: error.statusCode,
            details: error.details,
          },
        });
        
        if (process.env.NODE_ENV === 'development') {
          console.log('[StrapiProvider] Sentry event ID:', eventId);
        }
      }}
    >
      {children}
    </StrapiProvider>
  )
}

