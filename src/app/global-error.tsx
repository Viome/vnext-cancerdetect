'use client'

/**
 * Global error boundary for the root layout
 * This catches errors that occur in the root layout itself
 */

import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string }
}) {
  useEffect(() => {
    // Log to console for debugging
    console.error('[Global Error Boundary] Error caught:', {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
    });
    
    // Log the error to Sentry
    console.log('[Global Error Boundary] Sending error to Sentry...');
    try {
      const eventId = Sentry.captureException(error);
      console.log('[Global Error Boundary] Error sent to Sentry. Event ID:', eventId);
    } catch (err) {
      console.error('[Global Error Boundary] Failed to send error to Sentry:', err);
    }
  }, [error])

  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center p-8">
          <div className="max-w-md text-center">
            <h1 className="mb-4 text-2xl font-bold">Something went wrong!</h1>
            <p className="mb-6 text-gray-600">
              We apologize for the inconvenience. Our team has been notified and is working on a fix.
            </p>
            <a
              href="/"
              className="inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Go to home page
            </a>
          </div>
        </div>
      </body>
    </html>
  )
}

