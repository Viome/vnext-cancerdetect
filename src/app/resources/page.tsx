import { Metadata } from "next";
// import FooterData from "@/data/footer.json";

import {
  fetchBlogArticles,
  fetchBlogArticlesByCategory,
  fetchBlogArticlesBySlugs,
  fetchBlogArticleBySlug,
  type StrapiBlogArticle,
} from "@/lib/strapi/services";

import BlogArticles from "@/components/blog/BlogArticles";
import BlogHero from "@/components/blog/BlogHero";
import BlogHead from "@/components/blog/BlogHead";

// import Footer from "@/components/footer/footer";

interface BlogIndexPageProps {
  searchParams: Promise<{ page?: string; category?: string }>;
  params?: Promise<{ slug?: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Resources | Oral & Throat Cancer Information",
    description:
      "Explore comprehensive resources about oral health and throat cancer. Learn about prevention, early detection, and maintaining optimal oral health through expert articles and research-backed insights.",
    alternates: {
      canonical: "/resources",
    },
    openGraph: {
      title: "Resources | Oral & Throat Cancer Information",
      description:
        "Explore comprehensive resources about oral health and throat cancer. Learn about prevention, early detection, and maintaining optimal oral health through expert articles and research-backed insights.",
      url: "/resources",
      siteName: "Cancer Detect",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Resources | Oral & Throat Cancer Information",
      description:
        "Explore comprehensive resources about oral health and throat cancer. Learn about prevention, early detection, and maintaining optimal oral health through expert articles and research-backed insights.",
    },
  };
}

// Helper function to extract categories from blog articles
function extractCategories(articles: StrapiBlogArticle[]) {
  const categoryMap = new Map();

  articles.forEach((article) => {
    // Check primaryCategory first (Strapi v5 format)
    if (article.primaryCategory) {
      const { slug, name } = article.primaryCategory;
      if (slug && name && !categoryMap.has(slug)) {
        categoryMap.set(slug, { slug, name });
      }
    }

    // Also check categories array for secondary categories
    const categories = article.categories || [];
    categories.forEach((cat) => {
      const slug = cat.slug;
      const name = cat.name;
      if (slug && name && !categoryMap.has(slug)) {
        categoryMap.set(slug, { slug, name });
      }
    });
  });

  return Array.from(categoryMap.values());
}

// Helper function to calculate pagination
function calculatePagination(
  totalItems: number,
  currentPage: number,
  pageSize: number
) {
  const pageCount = Math.ceil(totalItems / pageSize);
  return {
    page: currentPage,
    pageSize,
    pageCount,
    total: totalItems,
  };
}

export default async function BlogIndexPage({
  searchParams,
}: BlogIndexPageProps) {
  const { page, category } = await searchParams;
  const currentPage = parseInt(page || "1", 10);
  const pageSize = 100;
  const selectedCategory = category || null;

  // Define featured article slugs
  const topBlogSlug = "microplastics-the-invisible-threat-in-our-bodies";
  const featuredBlogSlugs = [
    "self-care-the-key-to-improving-womens-health",
    "precision-nutrition-4-reasons-why-your-diet-should-be-as-unique-as-you-are",
    "four-everyday-habits-that-are-sabotaging-your-fitness-gains",
  ];

  // Fetch all articles and featured articles in parallel
  const [allArticles, topBlog, ...featuredBlogsResults] = await Promise.all([
    fetchBlogArticles(1, 1000), // Fetch all articles for categories and fallback
    fetchBlogArticleBySlug(topBlogSlug), // Fetch the hero blog
    ...featuredBlogSlugs.map((slug) => fetchBlogArticleBySlug(slug)), // Fetch featured blogs
  ]);

  // Get all articles to extract categories
  const categories = extractCategories(allArticles || []);

  // Fetch articles based on specific article slugs for the main listing
  let items: StrapiBlogArticle[] = [];

  // Define the article slugs you want to fetch
  const articleSlugsToFetch = [
    "the-harmful-effects-of-poor-oral-health-on-your-quality-of-life",
    "hpv-and-oral-cancers",
    "does-drinking-alcohol-increase-oral-and-throat-cancer-risk",
    "how-quitting-smoking-can-improve-your-oral-health",
    "how-your-overall-health-starts-in-your-mouth",
    "6-ways-to-revolutionize-how-you-take-care-of-your-teeth",
    "signs-of-an-unhealthy-oral-microbiome-and-how-it-affects-your-health",
    "habits-that-can-harm-your-oral-health",
    "what-is-the-relationship-between-oral-diseases-and-the-oral-microbiome",
    "what-is-oral-and-throat-cancer",
    "oral-brain-axis-and-the-connections-to-your-health",
    "nutrition-and-oral-health-how-to-eat-for-a-healthy-smile",
    "maintaining-a-healthy-mouth-5-simple-tips",
    "have-you-heard-of-leaky-gum-syndrome",
    "the-importance-of-your-oral-microbiome",
    "viomes-oral-and-throat-cancer-detection-test-built-on-viomes",

    // Add more article slugs as needed
  ];

  if (articleSlugsToFetch.length > 0) {
    // Fetch articles by slugs
    const fetchedArticles = await fetchBlogArticlesBySlugs(articleSlugsToFetch);
    items = fetchedArticles || [];
    console.log("Fetched articles by slugs:", items);
  } else {
    items = allArticles || [];
  }

  // Calculate pagination
  const pagination = calculatePagination(items.length, currentPage, pageSize);

  // Fallback to first article if topBlog is not found

  const finalTopBlog =
    topBlog || (allArticles && allArticles.length > 0 ? allArticles[0] : null);

  // Build featured blogs array, filtering out nulls
  const featuredBlogs = featuredBlogsResults.filter(
    (blog): blog is StrapiBlogArticle => blog !== null
  );

  // If we don't have 3 featured blogs, fill with other articles
  if (featuredBlogs.length < 3 && allArticles && allArticles.length > 0) {
    const usedSlugs = [
      finalTopBlog?.slug,
      ...featuredBlogs.map((b) => b.slug),
    ].filter(Boolean);
    const additionalBlogs = allArticles
      .filter((blog) => !usedSlugs.includes(blog.slug))
      .slice(0, 3 - featuredBlogs.length);
    featuredBlogs.push(...additionalBlogs);
  }

  const excludedBlogs = [finalTopBlog, ...featuredBlogs]
    .map((item) => item?.slug)
    .filter((slug): slug is string => Boolean(slug));

  let skip = 3 - featuredBlogs.length;
  if (!finalTopBlog) {
    skip++;
  }

  const blogIndexData = {
    title: "The Viome Blog",
    subText:
      "The latest ideas, insights, and inspiration, expertly curated to empower you on your health journey. Learn more about systems biology and the many ways the microbiome plays a critical role in your health & wellness.",
    topBlog: finalTopBlog,
    featuredBlogs,
  };

  const recentBlogs = {
    blogs: selectedCategory
      ? items
      : items.filter((blog) => !excludedBlogs.includes(blog.slug)),
    slug: selectedCategory || undefined,
    title: selectedCategory
      ? categories.find((cat) => cat.slug === selectedCategory)?.name
      : "Most Recent",
  };

  return (
    <>
      <div className="blog viome viome3">
        <div className="max-w-[1280px] mx-auto mb-40 px-4 xl:px-0">
          {!selectedCategory && (
            <>
              <BlogHead
                title={blogIndexData.title}
                subText={blogIndexData.subText}
                isTop={true}
              />

              <BlogHero
                blog={blogIndexData.topBlog}
                blogs={recentBlogs}
                featured={blogIndexData.featuredBlogs}
                limit={3}
              />
            </>
          )}

          <section
            className={selectedCategory ? "py-12 lg:py-20" : "py-12 lg:py-24"}
          >
            <BlogHead
              categories={categories}
              title={
                selectedCategory
                  ? `Category: ${categories.find((cat) => cat.slug === selectedCategory)?.name}`
                  : "Most Recent"
              }
              category={{
                slug: selectedCategory,
                title: selectedCategory
                  ? categories.find((cat) => cat.slug === selectedCategory)
                      ?.name
                  : null,
              }}
            />
            <BlogArticles
              articles={
                articleSlugsToFetch.length > 0 ? items : recentBlogs.blogs
              }
              limit={pageSize}
              skip={articleSlugsToFetch.length > 0 ? 0 : skip}
              infinite={false}
              pagination={pagination}
              currentPage={currentPage}
              selectedCategory={selectedCategory}
              excludedBlogs={
                articleSlugsToFetch.length > 0 ? [] : excludedBlogs
              }
            />
          </section>
        </div>
      </div>
      {/* <Footer data={FooterData} compactFooter={false} /> */}
    </>
  );
}
