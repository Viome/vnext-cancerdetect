import Link from "next/link";

// import { KLAVIYO } from "@/lib/constants/klaviyo";
// import EmbedSignUpForm from "@/components/forms/EmbedSignUp";

import BlogArticles from "./BlogArticles";
import Share from "./Share";

interface BlogBottomProps {
  blog: any;
  cms: string;
}

export default function BlogBottom({ blog, cms }: BlogBottomProps) {
  const canonicalUrl =
    blog.canonicalUrl ||
    `${typeof window !== "undefined" ? window.location.origin : ""}${typeof window !== "undefined" ? window.location.pathname : ""}`;

  return (
    <div className="mb-20 mt-8">
      {/* Share Component */}
      <div className="mb-8">
        <Share canonical={canonicalUrl} title={blog.title} />
      </div>

      {/* Keywords/Categories */}
      {(blog.primaryCategory || blog.secondaryCategories?.length) && (
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
          {blog.primaryCategory && (
            <Link
              href={`/blog?category=${blog.primaryCategory.slug}`}
              className="mt-2 rounded-full px-[14px] py-[1px] text-sm border border-gray-300 text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors"
            >
              {blog.primaryCategory.name}
            </Link>
          )}
          {blog.secondaryCategories?.map((category: any, index: number) => (
            <Link
              key={index}
              href={`/blog?category=${category.slug}`}
              className="mt-2 rounded-full px-[14px] py-[1px] text-sm border border-gray-300 text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </div>
      )}

      {/* Newsletter Signup */}
      {/* <div className="my-20 lg:my-40 bg-black newsletter-signup">
        <EmbedSignUpForm formId={KLAVIYO.EMBED_BLOG_SIGNUP_FORM_ID} />
      </div> */}

      {/* Related Articles */}
      {(blog.relatedArticles?.length > 0 ||
        blog.relatedByArticles?.length > 0) && (
        <BlogArticles
          articles={
            blog.relatedByArticles?.length > 0
              ? blog.relatedByArticles
              : blog.relatedArticles || []
          }
          title="Related Articles"
          limit={3}
          cms={cms}
        />
      )}
    </div>
  );
}
