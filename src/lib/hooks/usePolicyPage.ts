/**
 * usePolicyPage Hook
 * 
 * Custom hook for fetching policy pages from Strapi.
 */

"use client"

import useSWR from "swr"
import {
  fetchPolicyPageBySlug,
  fetchPrivacyPolicy,
  fetchTermsOfService,
  fetchCookiePolicy,
  type StrapiPolicyPage,
} from "@/lib/strapi/services"

/**
 * Hook to fetch a policy page by slug
 */
export function usePolicyPage(slug: string | null) {
  const { data, error, isLoading, mutate } = useSWR<StrapiPolicyPage | null>(
    slug ? `policy-page-${slug}` : null,
    () => (slug ? fetchPolicyPageBySlug(slug) : null),
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000, // Cache for 5 minutes
    }
  )

  return {
    policy: data,
    isLoading,
    error,
    refetch: mutate,
  }
}

/**
 * Hook to fetch privacy policy
 */
export function usePrivacyPolicy() {
  const { data, error, isLoading, mutate } = useSWR<StrapiPolicyPage | null>(
    "privacy-policy",
    fetchPrivacyPolicy,
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000, // Cache for 5 minutes
    }
  )

  return {
    policy: data,
    isLoading,
    error,
    refetch: mutate,
  }
}

/**
 * Hook to fetch terms of service
 */
export function useTermsOfService() {
  const { data, error, isLoading, mutate } = useSWR<StrapiPolicyPage | null>(
    "terms-of-service",
    fetchTermsOfService,
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000, // Cache for 5 minutes
    }
  )

  return {
    policy: data,
    isLoading,
    error,
    refetch: mutate,
  }
}

/**
 * Hook to fetch cookie policy
 */
export function useCookiePolicy() {
  const { data, error, isLoading, mutate } = useSWR<StrapiPolicyPage | null>(
    "cookie-policy",
    fetchCookiePolicy,
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000, // Cache for 5 minutes
    }
  )

  return {
    policy: data,
    isLoading,
    error,
    refetch: mutate,
  }
}

