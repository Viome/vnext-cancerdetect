"use client"

import { useRouter } from "next/navigation"
import { useCallback, useRef } from "react"

interface UseHoverPrefetchOptions {
  /**
   * Delay in milliseconds before prefetching starts
   * @default 150
   */
  delay?: number
  /**
   * Whether to enable prefetching
   * @default true
   */
  enabled?: boolean
}

/**
 * Custom hook for hover-based prefetching using Next.js router
 * 
 * This hook provides optimized hover-based prefetching with:
 * - Configurable delay to avoid unnecessary prefetches
 * - Automatic deduplication to prevent multiple prefetches of the same URL
 * - External link detection and skipping
 * - Memory cleanup to prevent memory leaks
 * 
 * @param url - The URL to prefetch
 * @param options - Configuration options
 * @returns Object with onMouseEnter and onMouseLeave handlers
 */
export function useHoverPrefetch(
  url: string | undefined,
  options: UseHoverPrefetchOptions = {}
) {
  const { delay = 150, enabled = true } = options
  const router = useRouter()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const prefetchedRef = useRef<Set<string>>(new Set())

  const handleMouseEnter = useCallback(() => {
    if (!enabled || !url || url === "#" || prefetchedRef.current.has(url)) {
      return
    }

    if (
      url.startsWith("http://") ||
      url.startsWith("https://") ||
      url.startsWith("mailto:") ||
      url.startsWith("tel:")
    ) {
      return
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      try {
        router.prefetch(url)
        prefetchedRef.current.add(url)
      } catch (error) {
        console.warn("Failed to prefetch URL:", url, error)
      }
    }, delay)
  }, [url, delay, enabled, router])

  const handleMouseLeave = useCallback(() => {
    // Clear the timeout if the user moves away before prefetching
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  // Cleanup on unmount
  const cleanup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  return {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    cleanup,
  }
}

/**
 * Hook for prefetching multiple URLs on hover
 * 
 * Useful for dropdown menus, navigation sections, or any component that contains
 * multiple links that should be prefetched when the user hovers over the container.
 * 
 * @param urls - Array of URLs to prefetch (undefined/null URLs are filtered out)
 * @param options - Configuration options
 * @returns Object with onMouseEnter and onMouseLeave handlers
 */
export function useMultipleHoverPrefetch(
  urls: (string | undefined)[],
  options: UseHoverPrefetchOptions = {}
) {
  const { delay = 150, enabled = true } = options
  const router = useRouter()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const prefetchedRef = useRef<Set<string>>(new Set())

  const handleMouseEnter = useCallback(() => {
    if (!enabled) return

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      urls.forEach((url) => {
        if (
          !url ||
          url === "#" ||
          prefetchedRef.current.has(url) ||
          url.startsWith("http://") ||
          url.startsWith("https://") ||
          url.startsWith("mailto:") ||
          url.startsWith("tel:")
        ) {
          return
        }

        try {
          router.prefetch(url)
          prefetchedRef.current.add(url)
        } catch (error) {
          console.warn("Failed to prefetch URL:", url, error)
        }
      })
    }, delay)
  }, [urls, delay, enabled, router])

  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  return {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  }
}
