/**
 * useBlogArticles Hook
 * 
 * Custom hook for fetching blog articles from Strapi.
 */

"use client"

import useSWR from "swr"
import {
  fetchBlogArticles,
  fetchBlogArticleBySlug,
  fetchFeaturedBlogArticles,
  type StrapiBlogArticle,
} from "@/lib/strapi/services"

/**
 * Hook to fetch paginated blog articles
 */
export function useBlogArticles(page: number = 1, pageSize: number = 10) {
  const { data, error, isLoading, mutate } = useSWR<StrapiBlogArticle[] | null>(
    `blog-articles-${page}-${pageSize}`,
    () => fetchBlogArticles(page, pageSize),
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000, // Cache for 30 seconds
    }
  )

  return {
    articles: data,
    isLoading,
    error,
    refetch: mutate,
  }
}

/**
 * Hook to fetch a single blog article by slug
 */
export function useBlogArticle(slug: string | null) {
  const { data, error, isLoading, mutate } = useSWR<StrapiBlogArticle | null>(
    slug ? `blog-article-${slug}` : null,
    () => (slug ? fetchBlogArticleBySlug(slug) : null),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // Cache for 1 minute
    }
  )

  return {
    article: data,
    isLoading,
    error,
    refetch: mutate,
  }
}

/**
 * Hook to fetch featured blog articles
 */
export function useFeaturedBlogArticles(limit: number = 3) {
  const { data, error, isLoading, mutate } = useSWR<StrapiBlogArticle[] | null>(
    `featured-blog-articles-${limit}`,
    () => fetchFeaturedBlogArticles(limit),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // Cache for 1 minute
    }
  )

  return {
    articles: data,
    isLoading,
    error,
    refetch: mutate,
  }
}

