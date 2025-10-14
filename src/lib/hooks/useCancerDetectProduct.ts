/**
 * useCancerDetectProduct Hook
 * 
 * Custom hook for fetching the Cancer Detect product from Strapi.
 */

"use client"

import useSWR from "swr"
import { fetchCancerDetectProduct, type StrapiProduct } from "@/lib/strapi/services"

/**
 * Hook to fetch the Cancer Detect product
 */
export function useCancerDetectProduct() {
  const { data, error, isLoading, mutate } = useSWR<StrapiProduct | null>(
    "cancer-detect",
    fetchCancerDetectProduct,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000, // Cache for 1 minute
    }
  )

  return {
    product: data,
    isLoading,
    error,
    refetch: mutate,
  }
}

