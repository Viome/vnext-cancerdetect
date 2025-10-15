/**
 * Blogs Service
 *
 * Service for fetching blog articles from Strapi CMS.
 */

import { strapiClient } from "../client";
import type { StrapiMedia } from "../types";

/**
 * Blog article interface (Strapi v5 format)
 */
export interface StrapiBlogArticle {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  subtitle?: string;
  description?: string;
  content?: string;
  body?: any[];
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  displayDate?: string;
  duration?: number;
  featuredImage?: {
    url?: string;
    alt?: string;
    formats?: any;
  } | null;
  author?: {
    name: string;
    slug?: string;
  };
  authors?: Array<{
    name: string;
    slug?: string;
  }>;
  primaryCategory?: {
    name: string;
    slug: string;
  } | null;
  categories?: Array<{
    name: string;
    slug: string;
  }>;
  tags?: Array<{
    name: string;
    slug: string;
  }>;
}

/**
 * Fetch all blog articles with pagination
 */
export async function fetchBlogArticles(
  page: number = 1,
  pageSize: number = 10
): Promise<StrapiBlogArticle[] | null> {
  try {
    console.log(page, pageSize, "page, pageSize");
    const response = await strapiClient.getCollection<StrapiBlogArticle>(
      "/blogs",
      {
        pagination: { page, pageSize },
        populate: "*", // Populate all fields
        sort: ["publishedAt:desc"],
        publicationState: "live",
      }
    );

    if (!response.data || response.data.length === 0) {
      return null;
    }

    const articles = response.data.map((article: any) => {
      // Strapi v5 returns data directly, not nested in attributes
      const data = article.attributes || article;

      return {
        id: article.id || data.id,
        documentId: article.documentId || data.documentId,
        title: data.title,
        slug: data.slug,
        subtitle: data.subtitle,
        description: data.description,
        content: data.content,
        body: data.body,
        publishedAt: data.publishedAt,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        displayDate: data.displayDate,
        duration: data.duration,
        // Featured image - extract the URL
        featuredImage: data.featuredImage
          ? {
              url:
                data.featuredImage.url ||
                data.featuredImage.formats?.medium?.url ||
                data.featuredImage.formats?.large?.url,
              alt: data.featuredImage.alternativeText || data.featuredImage.alt,
              formats: data.featuredImage.formats,
            }
          : null,
        // Authors array
        authors: data.authors || [],
        author: data.authors?.[0] || data.author,
        // Primary category
        primaryCategory: data.primaryCategory
          ? {
              name: data.primaryCategory.name,
              slug: data.primaryCategory.slug,
            }
          : null,
        // Categories (for compatibility)
        categories: data.secondaryCategories || data.categories || [],
        tags: data.tags || [],
      };
    });

    return articles;
  } catch (error) {
    console.error("Error fetching blog articles:", error);
    return null;
  }
}

/**
 * Fetch a single blog article by slug
 */
export async function fetchBlogArticleBySlug(
  slug: string
): Promise<StrapiBlogArticle | null> {
  try {
    console.log("🔍 Fetching blog article by slug:", slug);

    const response = await strapiClient.findOne<StrapiBlogArticle>(
      "/blogs",
      { slug },
      {
        populate: "*",
      }
    );

    if (!response || !response.data) {
      return null;
    }

    // Strapi v5 returns data directly, not nested in attributes
    const responseData: any = response.data;
    const data = responseData.attributes || responseData;

    const article = {
      id: responseData.id || data.id,
      documentId: responseData.documentId || data.documentId,
      title: data.title,
      slug: data.slug,
      subtitle: data.subtitle,
      description: data.description,
      content: data.content,
      body: data.body,
      publishedAt: data.publishedAt,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      displayDate: data.displayDate,
      duration: data.duration,
      // Featured image - extract the URL
      featuredImage: data.featuredImage
        ? {
            url:
              data.featuredImage.url ||
              data.featuredImage.formats?.medium?.url ||
              data.featuredImage.formats?.large?.url,
            alt: data.featuredImage.alternativeText || data.featuredImage.alt,
            formats: data.featuredImage.formats,
          }
        : null,
      // Authors array
      authors: data.authors || [],
      author: data.authors?.[0] || data.author,
      // Primary category
      primaryCategory: data.primaryCategory
        ? {
            name: data.primaryCategory.name,
            slug: data.primaryCategory.slug,
          }
        : null,
      // Categories (for compatibility)
      categories: data.secondaryCategories || data.categories || [],
      tags: data.tags || [],
    };

    return article;
  } catch (error) {
    if (error && typeof error === "object" && "response" in error) {
      console.error("Response details:", (error as any).response?.data);
    }
    return null;
  }
}

/**
 * Fetch blog articles by an array of slugs
 * Returns articles in the same order as the slugs array
 */
export async function fetchBlogArticlesBySlugs(
  slugs: string[]
): Promise<StrapiBlogArticle[] | null> {
  try {
    if (!slugs || slugs.length === 0) {
      console.log("⚠️ No slugs provided");
      return null;
    }

    console.log(`🔍 Fetching articles for slugs:`, slugs);

    const response = await strapiClient.find<StrapiBlogArticle>(
      "/blogs",
      {
        slug: {
          $in: slugs,
        },
      },
      {
        populate: "*",
      }
    );

    if (!response.data || response.data.length === 0) {
      console.log(`⚠️ No articles found for slugs:`, slugs);
      return null;
    }

    const articles = response.data.map((article: any) => {
      // Strapi v5 returns data directly, not nested in attributes
      const data = article.attributes || article;
      return {
        id: article.id || data.id,
        documentId: article.documentId || data.documentId,
        title: data.title,
        slug: data.slug,
        subtitle: data.subtitle,
        description: data.description,
        content: data.content,
        body: data.body,
        publishedAt: data.publishedAt,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        displayDate: data.displayDate,
        duration: data.duration,
        // Featured image - extract the URL
        featuredImage: data.featuredImage
          ? {
              url:
                data.featuredImage.url ||
                data.featuredImage.formats?.medium?.url ||
                data.featuredImage.formats?.large?.url,
              alt: data.featuredImage.alternativeText || data.featuredImage.alt,
              formats: data.featuredImage.formats,
            }
          : null,
        // Authors array
        authors: data.authors || [],
        author: data.authors?.[0] || data.author,
        // Primary category
        primaryCategory: data.primaryCategory
          ? {
              name: data.primaryCategory.name,
              slug: data.primaryCategory.slug,
            }
          : null,
        // Categories (for compatibility)
        categories: data.secondaryCategories || data.categories || [],
        tags: data.tags || [],
      };
    });

    // Create a map for quick lookup by slug
    const articlesMap = new Map<string, StrapiBlogArticle>();
    articles.forEach((article) => {
      articlesMap.set(article.slug, article);
    });

    // Sort articles according to the order of slugs array
    const sortedArticles = slugs
      .map((slug) => articlesMap.get(slug))
      .filter((article): article is StrapiBlogArticle => article !== undefined);

    console.log(
      `✅ Returning ${sortedArticles.length} articles in the order of provided slugs`
    );
    return sortedArticles;
  } catch (error) {
    console.error(`❌ Error fetching articles by slugs:`, error);
    if (error && typeof error === "object" && "response" in error) {
      console.error("Response details:", (error as any).response?.data);
    }
    return null;
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
    console.log(`🔍 Fetching category: "${categorySlug}"`);

    const response = await strapiClient.find<StrapiBlogArticle>(
      "/blogs",
      {
        primaryCategory: {
          slug: {
            $eq: categorySlug,
          },
        },
      },
      {
        pagination: { page, pageSize },
        populate: "*",
        sort: ["publishedAt:desc"],
      }
    );

    if (!response.data || response.data.length === 0) {
      console.log(`⚠️ No articles found for category: "${categorySlug}"`);
      return null;
    }

    const articles = response.data.map((article: any) => {
      // Strapi v5 returns data directly, not nested in attributes
      const data = article.attributes || article;
      return {
        id: article.id || data.id,
        documentId: article.documentId || data.documentId,
        title: data.title,
        slug: data.slug,
        subtitle: data.subtitle,
        description: data.description,
        content: data.content,
        body: data.body,
        publishedAt: data.publishedAt,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        displayDate: data.displayDate,
        duration: data.duration,
        // Featured image - extract the URL
        featuredImage: data.featuredImage
          ? {
              url:
                data.featuredImage.url ||
                data.featuredImage.formats?.medium?.url ||
                data.featuredImage.formats?.large?.url,
              alt: data.featuredImage.alternativeText || data.featuredImage.alt,
              formats: data.featuredImage.formats,
            }
          : null,
        // Authors array
        authors: data.authors || [],
        author: data.authors?.[0] || data.author,
        // Primary category
        primaryCategory: data.primaryCategory
          ? {
              name: data.primaryCategory.name,
              slug: data.primaryCategory.slug,
            }
          : null,
        // Categories (for compatibility)
        categories: data.secondaryCategories || data.categories || [],
        tags: data.tags || [],
      };
    });
    console.log(
      `✅ Returning ${articles.length} articles for "${categorySlug}"`
    );
    return articles;
  } catch (error) {
    console.error(`❌ Error fetching category "${categorySlug}":`, error);
    if (error && typeof error === "object" && "response" in error) {
      console.error("Response details:", (error as any).response?.data);
    }
    return null;
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
    );

    if (!response.data || response.data.length === 0) {
      return null;
    }

    return response.data.map((article) => ({
      ...article.attributes,
      id: article.id,
    }));
  } catch (error) {
    console.error("Error fetching featured blog articles:", error);
    return null;
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
    );

    if (!response.data || response.data.length === 0) {
      return null;
    }

    return response.data.map((article) => ({
      ...article.attributes,
      id: article.id,
    }));
  } catch (error) {
    console.error(
      `Error searching blog articles with term "${searchTerm}":`,
      error
    );
    return null;
  }
}
