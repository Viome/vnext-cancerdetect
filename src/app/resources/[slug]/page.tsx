import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { stripHtml } from "string-strip-html";

import { getBlogBySlug } from "@/lib/cms";

// import { DEFAULT_OG_IMAGE } from "@/components/Common/Metadata/utils";

import BlogBody from "@/components/blog/BlogBody";
import BlogBottom from "@/components/blog/BlogBottom";
import BlogBreadcrumb from "@/components/blog/BlogBreadcrumb";
import ProgressBar from "@/components/blog/ProgressBar";
import BlogHeader from "@/components/blog/BlogHeader";
import { DEFAULT_OG_IMAGE } from "@/lib/utils/constants";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const item = await getBlogBySlug(slug)

  if (!item) {
    return {
      title: "Blog Post Not Found | Viome",
      description: "The blog post you're looking for doesn't exist.",
      alternates: {
        canonical: `https://cancerdetect.viome.com/resources/${slug}`,
      },
      openGraph: {
        images: [DEFAULT_OG_IMAGE],
        url: `https://cancerdetect.viome.com/resources/${slug}`,
      },
      twitter: {
        card: "summary_large_image",
        images: [DEFAULT_OG_IMAGE.url],
      },
    }
  }

  const blog: any = (item as any).attributes ?? item
  const metaDescription = stripHtml(blog?.metaDescription || "").result
  const featuredImage = blog.featuredImage?.data?.attributes || blog.featuredImage
  const featuredImageSrc = featuredImage?.formats?.large?.url || featuredImage?.url
  const cms = process.env.NEXT_PUBLIC_CMS_URL || "https://cms.viome.com"

  const ogImage = featuredImageSrc
    ? {
        url: featuredImageSrc.startsWith("http") ? featuredImageSrc : `${cms}${featuredImageSrc}`,
        width: 1200,
        height: 630,
        alt: blog.title,
      }
    : DEFAULT_OG_IMAGE

  // Get dates for article metadata
  const publishedDate = blog.displayDate || blog.publishedAt || blog.createdAt
  const publishedTime = publishedDate ? new Date(publishedDate).toISOString() : undefined
  const modifiedTime = blog.updatedAt ? new Date(blog.updatedAt).toISOString() : undefined

  // Extract authors for Open Graph metadata
  const authorsData = blog.authors?.data || blog.authors || []
  const authors = authorsData
    .map((author: any) => {
      // Handle different author data structures
      const authorName = author?.attributes?.name || author?.name || author
      return typeof authorName === 'string' ? authorName : null
    })
    .filter((name: string | null): name is string => name !== null)

  return {
    metadataBase: new URL('https://cancerdetect.viome.com/'),
    title: `${blog.title} | Viome Blog`,
    description: metaDescription || `Read ${blog.title} on the Viome blog.`,
    alternates: {
      canonical: `https://cancerdetect.viome.com/resources/${slug}`,
    },
    openGraph: {
      title: blog.title,
      description: metaDescription || `Read ${blog.title} on the Viome blog.`,
      images: [ogImage],
      type: "article",
      url: `https://cancerdetect.viome.com/resources/${slug}`,
      siteName: "Cancerdetect",
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(authors.length > 0 && { authors }),
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: metaDescription || `Read ${blog.title} on the Viome blog.`,
      images: [ogImage.url],
    },
  }
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = await getBlogBySlug(slug);
  if (!item) return notFound();

  const blog: any = (item as any).attributes ?? item;
  const metaDescription = stripHtml(blog?.metaDescription || "").result;
  const articleCategory =
    blog.primaryCategory?.data?.attributes || blog.primaryCategory;
  const categoryTitle = articleCategory?.name || articleCategory?.title;
  const categorySlug = articleCategory?.slug;
  const authors = blog.authors?.data || blog.authors || [];
  const featuredImage =
    blog.featuredImage?.data?.attributes || blog.featuredImage;
  const featuredImageSrc =
    featuredImage?.formats?.large?.url || featuredImage?.url;
  const cms = process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:1337";

  const articleDate = blog.displayDate
    ? new Date(blog.displayDate).toISOString()
    : new Date().toISOString();

  return (
    <>
      <div className="blog viome viome3 py-10 lg:py-12">
        <ProgressBar />

        <BlogBreadcrumb />
        <article
          style={{
            width: "calc(100% - 30px)",
            margin: "auto",
            maxWidth: "860px",
          }}
        >
          <BlogHeader
            blog={blog}
            categorySlug={categorySlug}
            authors={authors}
          />

          {!blog.hideTopFeaturedImage && featuredImageSrc && (
            <div className="my-8 lg:my-12">
              <Image
                src={
                  featuredImageSrc.startsWith("http")
                    ? featuredImageSrc
                    : `${cms}${featuredImageSrc}`
                }
                alt={blog.title}
                width={1200}
                height={600}
                className="w-full h-auto rounded"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          )}

          <BlogBody content={blog.body} />
          {blog.external_html && (
            <div className="my-6">
              <div dangerouslySetInnerHTML={{ __html: blog.external_html }} />
            </div>
          )}

          <BlogBottom blog={blog} cms={cms} />
          {blog.references?.length ? (
            <section className="mt-10">
              <h2
                className="text-xl font-medium mb-4"
                style={{
                  fontFamily:
                    "var(--font-twk-lausanne), ui-sans-serif, system-ui, -apple-system, blinkmacsystemfont, 'Segoe UI', 'Roboto', 'Helvetica Neue', arial, 'Noto Sans', sans-serif",
                }}
              >
                References
              </h2>
              <ul className="space-y-2">
                {blog.references.map((ref: any, i: number) => (
                  <li key={i} className="text-sm">
                    {ref.url ? (
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-green-600 hover:text-green-700 transition-colors"
                        style={{
                          fontFamily:
                            "var(--font-twk-lausanne), ui-sans-serif, system-ui, -apple-system, blinkmacsystemfont, 'Segoe UI', 'Roboto', 'Helvetica Neue', arial, 'Noto Sans', sans-serif",
                        }}
                      >
                        {ref.title}
                      </a>
                    ) : (
                      <span
                        style={{
                          fontFamily:
                            "var(--font-twk-lausanne), ui-sans-serif, system-ui, -apple-system, blinkmacsystemfont, 'Segoe UI', 'Roboto', 'Helvetica Neue', arial, 'Noto Sans', sans-serif",
                        }}
                      >
                        {ref.title}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </article>
      </div>
    </>
  );
}
