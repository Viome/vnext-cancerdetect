import BlogArticle from "./BlogArticle"

interface BlogHeroProps {
  blog?: any
  blogs: {
    blogs: any[]
    slug?: string
    title?: string
  }
  featured?: any[]
  limit?: number
}

export default function BlogHero({
  blog,
  blogs,
  featured = [],
  limit = 3,
}: BlogHeroProps) {
  if (!blog) {
    return null
  }

  let blogArticles = blogs.blogs
  if (!blogArticles) {
    return null
  }

  if (blog) {
    blogArticles = [...new Set([blog, ...blogArticles])]
  }

  return (
    <section className="mb-4 lg:mb-8">
      <BlogArticle blog={blogArticles[0]} isHero={true} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4 lg:gap-4 mt-8">
        {featured.map((article, index) => (
          <BlogArticle key={`featured-${index}`} blog={article} />
        ))}
        {blogArticles
          .slice(1, limit - featured.length + 1)
          .map((article, index) => {
            if (featured.some((f) => f.slug === article.slug)) {
              return null
            }
            return <BlogArticle key={`additional-${index}`} blog={article} />
          })}
      </div>
    </section>
  )
}
