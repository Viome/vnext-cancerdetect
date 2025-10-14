/**
 * Products Service
 * 
 * Service for fetching the Cancer Detect product from Strapi CMS.
 */

import { strapiClient } from "../client"
import type { StrapiMedia } from "../types"

/**
 * Product interface
 */
export interface StrapiProduct {
  id: number
  name: string
  slug: string
  description?: string
  shortDescription?: string
  price?: number
  sku?: string
  shopifyProductId?: string
  shopifyVariantId?: string
  features?: Array<{
    id: number
    title: string
    description?: string
    icon?: string
  }>
  images?: {
    data: Array<{
      id: number
      attributes: StrapiMedia
    }>
  }
  featuredImage?: {
    data: {
      id: number
      attributes: StrapiMedia
    }
  }
  publishedAt: string
  createdAt: string
  updatedAt: string
}

/**
 * Fetch the Cancer Detect product
 */
export async function fetchCancerDetectProduct(): Promise<StrapiProduct | null> {
  try {
    const response = await strapiClient.findOne<StrapiProduct>(
      "/products",
      { slug: "cancer-detect" },
      {
        populate: ["featuredImage", "images", "features"],
        publicationState: "live",
      }
    )

    if (!response || !response.data) {
      console.warn('Cancer Detect product not found')
      return null
    }

    return {
      ...response.data.attributes,
      id: response.data.id,
    }
  } catch (error) {
    console.error("Error fetching Cancer Detect product:", error)
    return null
  }
}

/**
 * Fetch Cancer Detect product with caching
 * Uses Next.js cache for 10 minutes
 */
export async function fetchCancerDetectProductCached(): Promise<StrapiProduct | null> {
  try {
    const response = await strapiClient.get<{ data: { id: number; attributes: StrapiProduct } }>(
      "/products?filters[slug][$eq]=cancer-detect&populate=featuredImage,images,features&publicationState=live",
      undefined,
      {
        next: {
          revalidate: 600, // Cache for 10 minutes
          tags: ["cancer-detect-product"],
        },
      } as any
    )

    if (!response?.data) {
      console.warn('Cancer Detect product not found')
      return null
    }

    const products = Array.isArray(response.data) ? response.data : [response.data]
    
    if (products.length === 0) {
      return null
    }

    return {
      ...products[0].attributes,
      id: products[0].id,
    }
  } catch (error) {
    console.error("Error fetching Cancer Detect product:", error)
    return null
  }
}

