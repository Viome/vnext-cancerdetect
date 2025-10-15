import Link from "next/link";

interface BlogHeaderProps {
  blog: any;
  categoryTitle?: string;
  categorySlug?: string;
  authors: any[];
}

// Helper function to render rich text content
function renderRichTextContent(content: any[]): (React.ReactElement | null)[] {
  if (!Array.isArray(content)) return [];

  return content.map((block, index) => {
    switch (block.type) {
      case "heading":
        const level = block.level || 4;
        const headingProps = {
          key: index,
          className: "font-semibold mb-2",
          children: block.children?.map((child: any, childIndex: number) => (
            <span
              key={childIndex}
              style={{ fontStyle: child.italic ? "italic" : "normal" }}
            >
              {child.text}
            </span>
          )),
        };

        switch (level) {
          case 1:
            return <h1 {...headingProps} />;
          case 2:
            return <h2 {...headingProps} />;
          case 3:
            return <h3 {...headingProps} />;
          case 4:
            return <h4 {...headingProps} />;
          case 5:
            return <h5 {...headingProps} />;
          case 6:
            return <h6 {...headingProps} />;
          default:
            return <h4 {...headingProps} />;
        }

      case "paragraph":
        return (
          <p key={index} className="mb-2">
            {block.children?.map((child: any, childIndex: number) => (
              <span
                key={childIndex}
                style={{
                  fontStyle: child.italic ? "italic" : "normal",
                  fontWeight: child.bold ? "bold" : "normal",
                }}
              >
                {child.text}
              </span>
            ))}
          </p>
        );

      default:
        return null;
    }
  });
}

export default function BlogHeader({
  blog,
  categoryTitle,
  categorySlug,
  authors,
}: BlogHeaderProps) {
  return (
    <div
      className="pt-0"
      style={{
        fontFamily:
          "var(--font-twk-lausanne), ui-sans-serif, system-ui, -apple-system, blinkmacsystemfont, 'Segoe UI', 'Roboto', 'Helvetica Neue', arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
      }}
    >
      {blog.notice && (
        <div className="mb-5">
          <div
            style={{
              fontSize: "1.125rem",
              fontFamily:
                "var(--font-twk-lausanne), ui-sans-serif, system-ui, -apple-system, blinkmacsystemfont, 'Segoe UI', 'Roboto', 'Helvetica Neue', arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
            }}
          >
            {renderRichTextContent(blog.notice)}
          </div>
        </div>
      )}
      <div style={{ marginTop: "0.75rem" }}>
        {categoryTitle && (
          <Link
            href={`/blog/category/${categorySlug}`}
            className="block"
            style={{
              fontWeight: 300,
              textDecoration: "none",
              color: "#717384",
              fontSize: "1rem",
              fontFamily:
                "var(--font-twk-lausanne), ui-sans-serif, system-ui, -apple-system, blinkmacsystemfont, 'Segoe UI', 'Roboto', 'Helvetica Neue', arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
              marginBottom: "0.75rem",
            }}
          >
            {categoryTitle.toWellFormed()}
          </Link>
        )}
      </div>

      <div style={{ marginTop: "0.75rem" }}>
        <h1
          className="text-2xl xl:text-[3rem]"
          style={{
            fontWeight: 600,
            lineHeight: 1.3,
            fontFamily:
              "var(--font-twk-lausanne), ui-sans-serif, system-ui, -apple-system, blinkmacsystemfont, 'Segoe UI', 'Roboto', 'Helvetica Neue', arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
            marginBottom: "0.75rem",
          }}
        >
          {blog.title}
        </h1>
      </div>

      <div style={{ marginTop: "0.75rem" }}>
        <span
          style={{
            fontFamily:
              "var(--font-twk-lausanne), ui-sans-serif, system-ui, -apple-system, blinkmacsystemfont, 'Segoe UI', 'Roboto', 'Helvetica Neue', arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
            fontSize: "1rem",
            fontWeight: 300,
            lineHeight: 1.5,
          }}
        >
          {authors.length > 0 && (
            <>
              By{" "}
              {authors.map((author: any, i: number) => (
                <span key={i}>
                  {author.name || author.attributes?.name}
                  {i < authors.length - 1 && ", "}
                </span>
              ))}
            </>
          )}
          {blog.duration && authors.length > 0 && (
            <span style={{ color: "#717384" }}>
              {" "}
              • {blog.duration} min read
            </span>
          )}
          {blog.duration && authors.length === 0 && (
            <span style={{ color: "#717384" }}>{blog.duration} min read</span>
          )}
        </span>
      </div>
    </div>
  );
}
