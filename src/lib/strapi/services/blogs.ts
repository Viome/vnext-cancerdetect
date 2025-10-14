/**
 * Blogs Service
 * 
 * Service for fetching blog articles from Strapi CMS.
 */

import { strapiClient } from "../client"
import type { StrapiMedia } from "../types"

/**
 * Blog article interface
 */
export interface StrapiBlogArticle {
  id: number
  title: string
  slug: string
  description?: string
  content?: string
  publishedAt: string
  createdAt: string
  updatedAt: string
  featuredImage?: {
    data: {
      id: number
      attributes: StrapiMedia
    }
  }
  author?: {
    data: {
      id: number
      attributes: {
        name: string
        email?: string
        avatar?: StrapiMedia
      }
    }
  }
  categories?: {
    data: Array<{
      id: number
      attributes: {
        name: string
        slug: string
      }
    }>
  }
  tags?: {
    data: Array<{
      id: number
      attributes: {
        name: string
        slug: string
      }
    }>
  }
}

/**
 * Fetch all blog articles with pagination
 */
export async function fetchBlogArticles(
  page: number = 1,
  pageSize: number = 10
): Promise<StrapiBlogArticle[] | null> {
  try {
    const response = await strapiClient.getCollection<StrapiBlogArticle>(
      "/blogs",
      {
        pagination: { page, pageSize },
        populate: ["featuredImage", "author", "author.avatar", "categories", "tags"],
        sort: ["publishedAt:desc"],
        publicationState: "live",
      }
    )

    if (!response.data || response.data.length === 0) {
      console.warn("No blog articles found")
      return null
    }

    return response.data.map((article) => ({
      ...article.attributes,
      id: article.id,
    }))
  } catch (error) {
    console.error("Error fetching blog articles:", error)
    return null
  }
}

/**
 * Fetch a single blog article by slug
 */
export async function fetchBlogArticleBySlug(
  slug: string
): Promise<StrapiBlogArticle | null> {
  try {
    const response = await strapiClient.findOne<StrapiBlogArticle>(
      "/blogs",
      { slug },
      {
        populate: ["featuredImage", "author", "author.avatar", "categories", "tags"],
        publicationState: "live",
      }
    )

    if (!response || !response.data) {
      console.warn(`Blog article with slug "${slug}" not found`)
      return null
    }

    return {
      ...response.data.attributes,
      id: response.data.id,
    }
  } catch (error) {
    console.error(`Error fetching blog article with slug "${slug}":`, error)
    return null
  }
}

/**
 * Fetch blog articles by category
 */
export async function fetchBlogArticlesByCategory(
  categorySlug: string,
  page: number = 1,
  pageSize: number = 10
): Promise<StrapiBlogArticle[] | null> {
  try {
    const response = await strapiClient.find<StrapiBlogArticle>(
      "/blogs",
      {
        categories: {
          slug: categorySlug,
        },
      },
      {
        pagination: { page, pageSize },
        populate: ["featuredImage", "author", "categories", "tags"],
        sort: ["publishedAt:desc"],
        publicationState: "live",
      }
    )

    if (!response.data || response.data.length === 0) {
      return null
    }

    return response.data.map((article) => ({
      ...article.attributes,
      id: article.id,
    }))
  } catch (error) {
    console.error(`Error fetching blog articles by category "${categorySlug}":`, error)
    return null
  }
}

/**
 * Fetch featured blog articles
 */
export async function fetchFeaturedBlogArticles(
  limit: number = 3
): Promise<StrapiBlogArticle[] | null> {
  try {
    const response = await strapiClient.find<StrapiBlogArticle>(
      "/blogs",
      {
        featured: true,
      },
      {
        pagination: { pageSize: limit },
        populate: ["featuredImage", "author", "categories"],
        sort: ["publishedAt:desc"],
        publicationState: "live",
      }
    )

    if (!response.data || response.data.length === 0) {
      return null
    }

    return response.data.map((article) => ({
      ...article.attributes,
      id: article.id,
    }))
  } catch (error) {
    console.error("Error fetching featured blog articles:", error)
    return null
  }
}

/**
 * Search blog articles
 */
export async function searchBlogArticles(
  searchTerm: string,
  page: number = 1,
  pageSize: number = 10
): Promise<StrapiBlogArticle[] | null> {
  try {
    const response = await strapiClient.find<StrapiBlogArticle>(
      "/blogs",
      {
        $or: [
          { title: { $containsi: searchTerm } },
          { description: { $containsi: searchTerm } },
          { content: { $containsi: searchTerm } },
        ],
      },
      {
        pagination: { page, pageSize },
        populate: ["featuredImage", "author", "categories"],
        sort: ["publishedAt:desc"],
        publicationState: "live",
      }
    )

    if (!response.data || response.data.length === 0) {
      return null
    }

    return response.data.map((article) => ({
      ...article.attributes,
      id: article.id,
    }))
  } catch (error) {
    console.error(`Error searching blog articles with term "${searchTerm}":`, error)
    return null
  }
}

