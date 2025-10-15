import Link from "next/link";

import BlogArticle from "./BlogArticle";

interface BlogArticlesProps {
  articles: any[];
  title?: string;
  limit?: number;
  skip?: number;
  infinite?: boolean;
  excludedBlogs?: string[];
  pagination?: any;
  currentPage?: number;
  selectedCategory?: string | null;
}

export default function BlogArticles({
  articles,
  title,
  limit = 100,
  skip = 0,
  excludedBlogs = [],
  pagination,
  currentPage = 1,
  selectedCategory,
}: BlogArticlesProps) {
  const cms = process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:1337";
  const displayArticles = articles
    .slice(skip, limit + skip)
    .filter((article) => !excludedBlogs.includes(article.slug));

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4 lg:gap-4">
      {title && (
        <div className="col-span-full">
          <h2
            className="text-2xl lg:text-3xl font-normal pb-10 lg:pb-2"
            style={{
              fontFamily:
                "var(--font-twk-lausanne), ui-sans-serif, system-ui, -apple-system, blinkmacsystemfont, 'Segoe UI', 'Roboto', 'Helvetica Neue', arial, 'Noto Sans', sans-serif",
              fontWeight: 300,
            }}
          >
            {title}
          </h2>
        </div>
      )}

      {displayArticles.map((article, i) => (
        <BlogArticle key={i} blog={article} cms={cms} />
      ))}

      {/* Pagination */}
      {pagination && pagination.pageCount > 1 && (
        <div className="col-span-full flex justify-center items-center mt-16">
          <div className="flex items-center space-x-1">
            {/* Previous Page */}
            {currentPage > 1 ? (
              <Link
                href={
                  selectedCategory
                    ? `/blog?category=${selectedCategory}&page=${currentPage - 1}`
                    : `/blog?page=${currentPage - 1}`
                }
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                ←
              </Link>
            ) : (
              <span className="px-3 py-1 text-sm text-gray-300">←</span>
            )}

            {/* Page Numbers */}
            {Array.from(
              { length: Math.min(pagination.pageCount, 7) },
              (_, i) => {
                const pageNum =
                  Math.max(
                    1,
                    Math.min(pagination.pageCount - 6, currentPage - 3)
                  ) + i;
                if (pageNum > pagination.pageCount) return null;

                const href = selectedCategory
                  ? `/blog?category=${selectedCategory}&page=${pageNum}`
                  : `/blog?page=${pageNum}`;

                return (
                  <Link
                    key={pageNum}
                    href={href}
                    className={`px-3 py-1 text-sm transition-colors ${
                      pageNum === currentPage
                        ? "text-black font-medium border-b-2 border-gray-900"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {pageNum}
                  </Link>
                );
              }
            )}

            {/* Next Page */}
            {currentPage < pagination.pageCount ? (
              <Link
                href={
                  selectedCategory
                    ? `/blog?category=${selectedCategory}&page=${currentPage + 1}`
                    : `/blog?page=${currentPage + 1}`
                }
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                →
              </Link>
            ) : (
              <span className="px-3 py-1 text-sm text-gray-300">→</span>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
