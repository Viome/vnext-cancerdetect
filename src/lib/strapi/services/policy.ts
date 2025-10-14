/**
 * Policy Service
 * 
 * Service for fetching policy pages from Strapi CMS.
 */

import { strapiClient } from "../client"
import type { BlocksContent } from "@strapi/blocks-react-renderer"

/**
 * Policy page interface
 */
export interface StrapiPolicyPage {
  id: number
  title?: string
  InternalName?: string
  slug: string
  content: string | BlocksContent
  metaTitle?: string
  metaDescription?: string
  publishedAt: string
  createdAt: string
  updatedAt: string
}

/**
 * Fetch all policy pages
 */
export async function fetchPolicyPages(): Promise<StrapiPolicyPage[] | null> {
  try {
    const response = await strapiClient.getCollection<StrapiPolicyPage>(
      "/policies",
      {
        sort: ["title:asc"],
        publicationState: "live",
      }
    )

    if (!response.data || response.data.length === 0) {
      console.warn("No policy pages found")
      return null
    }

    return response.data.map((policy) => ({
      ...(policy as any),
      title: (policy as any).InternalName || (policy as any).title,
    }))
  } catch (error) {
    console.error("Error fetching policy pages:", error)
    return null
  }
}

/**
 * Fetch a single policy page by slug
 */
export async function fetchPolicyPageBySlug(
  slug: string
): Promise<StrapiPolicyPage | null> {
  try {
    const response = await strapiClient.findOne<StrapiPolicyPage>(
      "/policies",
      { slug },
      {
        publicationState: "live",
      }
    )

    if (!response || !response.data) {
      console.warn(`Policy page with slug "${slug}" not found`)
      return null
    }

    const policyData = response.data as any
    return {
      ...policyData,
      title: policyData.InternalName || policyData.title,
    }
  } catch (error) {
    console.error(`Error fetching policy page with slug "${slug}":`, error)
    return null
  }
}

/**
 * Fetch privacy policy
 */
export async function fetchPrivacyPolicy(): Promise<StrapiPolicyPage | null> {
  return fetchPolicyPageBySlug("privacy-policy")
}

/**
 * Fetch terms of service
 */
export async function fetchTermsOfService(): Promise<StrapiPolicyPage | null> {
  return fetchPolicyPageBySlug("terms-of-service")
}

/**
 * Fetch cookie policy
 */
export async function fetchCookiePolicy(): Promise<StrapiPolicyPage | null> {
  return fetchPolicyPageBySlug("cookie-policy")
}

