/**
 * Strapi Services - Main Export
 * 
 * Central export point for all Strapi service functions.
 */

// Blog services
export {
  fetchBlogArticles,
  fetchBlogArticleBySlug,
  fetchBlogArticlesByCategory,
  fetchFeaturedBlogArticles,
  searchBlogArticles,
  type StrapiBlogArticle,
} from "./blogs"

// Policy services
export {
  fetchPolicyPages,
  fetchPolicyPageBySlug,
  fetchPrivacyPolicy,
  fetchTermsOfService,
  fetchCookiePolicy,
  type StrapiPolicyPage,
} from "./policy"

// Product services
export {
  fetchCancerDetectProduct,
  fetchCancerDetectProductCached,
  type StrapiProduct,
} from "./products"

