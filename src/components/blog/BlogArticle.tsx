import Image from "next/image";
import Link from "next/link";

interface BlogArticleProps {
  blog: any;
  cms?: string;
  isHero?: boolean;
  section?: boolean;
  isCompact?: boolean;
}

export default function BlogArticle({
  blog,
  cms,
  isHero = false,
  section = false,
  isCompact = false,
}: BlogArticleProps) {
  const blogData = blog.attributes ?? blog;
  const featuredImage =
    blogData.featuredImage?.data?.attributes || blogData.featuredImage;
  const featuredImageSrc =
    featuredImage?.formats?.medium?.url || featuredImage?.url;
  const category =
    blogData.primaryCategory?.data?.attributes || blogData.primaryCategory;
  const authors = blogData.authors?.data || blogData.authors || [];
  const cmsUrl =
    cms || process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:1337";

  const fullImageSrc = featuredImageSrc
    ? featuredImageSrc.startsWith("http")
      ? featuredImageSrc
      : `${cmsUrl}${featuredImageSrc}`
    : null;

  if (isHero) {
    return (
      <Link
        href={`/resources/${blogData.slug}`}
        className="block border-0 mb-4 bg-black text-white hover:bg-[#1f4855] transition-colors duration-300 group"
      >
        <div className="lg:grid lg:grid-cols-2">
          <div className="relative overflow-hidden h-[260px] md:h-[443px] lg:h-[426px]">
            {fullImageSrc && (
              <Image
                src={fullImageSrc}
                alt={blogData.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            )}
          </div>
          <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-start lg:h-[426px] gap-[12px]">
            <p
              className="uppercase text-lg mb-4"
              style={{
                fontFamily:
                  "var(--font-twk-lausanne), ui-sans-serif, system-ui, -apple-system, blinkmacsystemfont, 'Segoe UI', 'Roboto', 'Helvetica Neue', arial, 'Noto Sans', sans-serif",
                fontWeight: 300,
                color: "#717384",
              }}
            >
              {category?.name || category?.title}
            </p>
            <h2
              className="text-xl xl:text-3xl leading-tight mb-4"
              style={{
                fontFamily:
                  "var(--font-twk-lausanne), ui-sans-serif, system-ui, -apple-system, blinkmacsystemfont, 'Segoe UI', 'Roboto', 'Helvetica Neue', arial, 'Noto Sans', sans-serif",
                fontWeight: 300,
              }}
            >
              {blogData.title}
            </h2>
            {blogData.subtitle && (
              <p
                className="text-lg leading-relaxed mt-2"
                style={{
                  fontFamily:
                    "var(--font-twk-lausanne), ui-sans-serif, system-ui, -apple-system, blinkmacsystemfont, 'Segoe UI', 'Roboto', 'Helvetica Neue', arial, 'Noto Sans', sans-serif",
                  fontWeight: 300,
                }}
              >
                {blogData.subtitle}
              </p>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/resources/${blogData.slug}`}
      className="block border border-[#e7e7e9] group bg-white"
    >
      <div className="overflow-hidden">
        {fullImageSrc && (
          <div
            className={`relative overflow-hidden ${isCompact ? "h-48" : "h-64 lg:h-[271px]"}`}
          >
            <Image
              src={fullImageSrc}
              alt={blogData.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        )}
        <div
          className={`p-4 md:p-6 flex flex-col justify-between ${isCompact ? "h-48" : "h-80 md:h-[340px]"}`}
        >
          <div>
            <p
              className="uppercase mb-[1.125rem] transition-colors"
              style={{
                fontFamily:
                  "var(--font-twk-lausanne), ui-sans-serif, system-ui, -apple-system, blinkmacsystemfont, 'Segoe UI', 'Roboto', 'Helvetica Neue', arial, 'Noto Sans', sans-serif",
                fontWeight: 300,
                color: "#717384",
                fontSize: "1rem",
              }}
            >
              {section && blogData.displayDate
                ? new Date(blogData.displayDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : category?.name || category?.title}
            </p>
            <h3
              className="mb-2 leading-tight group-hover:text-[#009e82] transition-colors text-lg xl:text-[1.5rem]"
              style={{
                fontFamily:
                  "var(--font-twk-lausanne), ui-sans-serif, system-ui, -apple-system, blinkmacsystemfont, 'Segoe UI', 'Roboto', 'Helvetica Neue', arial, 'Noto Sans', sans-serif",
                fontWeight: 300,
                display: "-webkit-box",
                WebkitLineClamp: 4,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {blogData.title}
            </h3>
            {section ? (
              <p
                className="text-sm"
                style={{
                  fontFamily:
                    "var(--font-twk-lausanne), ui-sans-serif, system-ui, -apple-system, blinkmacsystemfont, 'Segoe UI', 'Roboto', 'Helvetica Neue', arial, 'Noto Sans', sans-serif",
                  color: "#0F172A",
                }}
              >
                {authors.length > 0 && authors[0].name}
              </p>
            ) : (
              blogData.subtitle && (
                <p
                  className="text-[1rem] text-black group-hover:text-[#009e82] mt-6"
                  style={{
                    fontFamily:
                      "var(--font-twk-lausanne), ui-sans-serif, system-ui, -apple-system, blinkmacsystemfont, 'Segoe UI', 'Roboto', 'Helvetica Neue', arial, 'Noto Sans', sans-serif",
                    fontWeight: 300,
                    lineHeight: 1.5,
                    transition: "all .5s cubic-bezier(.4,0,.2,1)",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {blogData.subtitle}
                </p>
              )
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
