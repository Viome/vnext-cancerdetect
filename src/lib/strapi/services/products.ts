/**
 * Products Service
 * 
 * Service for fetching the Cancer Detect product from Strapi CMS.
 */

import { strapiClient } from "../client"

/**
 * Strapi Media Format
 */
interface MediaFormat {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: string | null
  size: number
  width: number
  height: number
  sizeInBytes: number
}

/**
 * Strapi Media Object
 */
interface StrapiMediaObject {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  width: number
  height: number
  formats: {
    large?: MediaFormat
    small?: MediaFormat
    medium?: MediaFormat
    thumbnail?: MediaFormat
  }
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: any
  createdAt: string
  updatedAt: string
  publishedAt: string
}

/**
 * Product interface matching actual Strapi response
 */
export interface StrapiProduct {
  id: number
  documentId: string
  name: string
  slug: string
  description?: string
  longDescription?: string
  currentPrice?: string
  comparePrice?: string | null
  variantId?: string
  productSku?: string
  salesMessage?: string
  mobilePromo?: string | null
  mobileMeta?: any
  upsellSlug?: string | null
  upsellMeta?: any
  heroDescriptionComponent?: any
  heroDescription?: string | null
  productType?: string
  hasInteractiveElement?: boolean
  productMetaData?: {
    shopifyApiId?: string
  }
  shopifySubscriptionPlan?: any
  buyingOptions?: any[]
  productImage?: StrapiMediaObject
  productHeroImages?: StrapiMediaObject[]
  heroProductImage?: StrapiMediaObject[]
  productAltImage?: StrapiMediaObject[]
  addons?: any[]
  optionalAddons?: any[]
  upsellProduct?: any
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
        populate: "*",
        publicationState: "live",
      }
    )

    if (!response || !response.data) {
      console.warn('Cancer Detect product not found')
      return null
    }

    // Check if data has attributes (V4 format) or is flat (V5 format)
    const productData = response.data.attributes 
      ? { ...response.data.attributes, id: response.data.id }
      : response.data
    
    return productData as StrapiProduct
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
    const response = await strapiClient.get<{ data: { id: number; attributes?: StrapiProduct } | { id: number; attributes?: StrapiProduct }[] }>(
      "/products?filters[slug][$eq]=cancer-detect&populate=*&publicationState=live",
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

    // Check if data has attributes (V4 format) or is flat (V5 format)
    const productData = products[0].attributes 
      ? { ...products[0].attributes, id: products[0].id }
      : products[0]

    return productData as StrapiProduct
  } catch (error) {
    console.error("Error fetching Cancer Detect product:", error)
    return null
  }
}

