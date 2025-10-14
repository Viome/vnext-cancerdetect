"use client";

import Link from "next/link";

interface BlogBreadcrumbProps {
  categoryTitle?: string;
  categorySlug?: string;
}

export default function BlogBreadcrumb({
  categoryTitle,
  categorySlug,
}: BlogBreadcrumbProps) {
  return (
    <section
      className="my-12 md:mb-10 lg:mt-8 hidden md:block px-0 lg:px-26"
      style={{
        color: "#42434d",
        fontFamily:
          "var(--font-twk-lausanne), ui-sans-serif, system-ui, -apple-system, blinkmacsystemfont, 'Segoe UI', 'Roboto', 'Helvetica Neue', arial, 'Noto Sans', sans-serif",
      }}
      aria-label="breadcrumbs"
    >
      <div
        style={{
          width: "calc(100% - 30px)",
          maxWidth: "1280px",
          borderBottom: "1px solid #e7e7e9",
          paddingBottom: "1rem",
        }}
      >
        <ol
          className="flex gap-x-4"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          <li
            className="flex items-center gap-x-4"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <p itemProp="name">
              <Link
                href="/resources"
                itemScope
                itemType="https://schema.org/WebPage"
                itemProp="item"
                itemID="/blog"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#009e82")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}
              >
                Resources
              </Link>
              <meta itemProp="position" content="1" />
            </p>
            {categoryTitle && (
              <svg
                width="15"
                height="8"
                viewBox="0 0 15 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
                role="presentation"
                style={{ transform: "rotate(-90deg)" }}
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.07127 7.77832L14.1423 0.707253L13.4352 0.000146277L7.07127 6.36411L0.707133 -2.6931e-05L2.60892e-05 0.70708L6.36416 7.07121L7.07109 7.77815L7.07127 7.77832Z"
                />
              </svg>
            )}
          </li>
          {categoryTitle && (
            <li
              className="flex items-center gap-x-4"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <p itemProp="name">
                <Link
                  href={`/blog/category/${categorySlug}`}
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                  itemID={`/blog/category/${categorySlug}`}
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#009e82")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "inherit")
                  }
                >
                  {categoryTitle}
                </Link>
                <meta itemProp="position" content="2" />
              </p>
            </li>
          )}
        </ol>
      </div>
    </section>
  );
}
