"use client";

import React from "react";
import Image from "next/image";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export default function BodyBlocks({ content }: { content: any }) {
  if (!Array.isArray(content) || content.length === 0) return null;

  return (
    <div
      style={{
        fontFamily:
          "var(--font-twk-lausanne), ui-sans-serif, system-ui, -apple-system, blinkmacsystemfont, 'Segoe UI', 'Roboto', 'Helvetica Neue', arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
        fontSize: "1rem",
        fontWeight: 300,
        lineHeight: 1.5,
      }}
    >
      <BlocksRenderer
        content={content as any}
        blocks={{
          heading: ({ children, level }: any) => {
            const tag = `h${level}` as keyof React.JSX.IntrinsicElements;
            let fontSize = "1rem";
            if (level === 1) fontSize = "2.625rem";
            else if (level === 2) fontSize = "2.25rem";
            else if (level === 3) fontSize = "1.875rem";
            else if (level === 4) fontSize = "1.5rem";
            else if (level === 5) fontSize = "1.25rem";

            const style = {
              fontSize,
              marginTop: "1rem",
              marginBottom: "1rem",
            };
            return React.createElement(tag, { style }, children);
          },
          paragraph: ({ children }: any) => {
            // Check if children contains embedded images
            const hasEmbeddedImage = children?.some(
              (child: any) =>
                child?.props?.node?.__embeddedImage || child?.__embeddedImage
            );

            if (hasEmbeddedImage) {
              const imageChild = children.find(
                (child: any) =>
                  child?.props?.node?.__embeddedImage || child?.__embeddedImage
              );
              const imageData =
                imageChild?.props?.node?.__embeddedImage ||
                imageChild?.__embeddedImage;

              if (imageData) {
                const cms =
                  process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:1337";
                const fullUrl = imageData.url?.startsWith("http")
                  ? imageData.url
                  : `https:${imageData.url}`;

                return (
                  <figure style={{ margin: "2rem 0" }}>
                    <Image
                      src={fullUrl}
                      alt={imageData.alt || ""}
                      width={800}
                      height={500}
                      className="w-full h-auto rounded"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                    {imageData.caption && (
                      <figcaption
                        style={{
                          fontSize: "0.875rem",
                          color: "#6b7280",
                          marginTop: "0.5rem",
                          textAlign: "center",
                        }}
                      >
                        {imageData.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              }
            }

            return <p style={{ marginTop: "1rem" }}>{children}</p>;
          },
          list: ({ children, format }: any) => {
            return format === "ordered" ? (
              <ol
                style={{
                  marginTop: "0.75rem",
                  marginBottom: "0.75rem",
                  paddingLeft: "1.5rem",
                  fontFamily:
                    "var(--font-twk-lausanne), ui-sans-serif, system-ui, -apple-system, blinkmacsystemfont, 'Segoe UI', 'Roboto', 'Helvetica Neue', arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
                  fontSize: "1rem",
                  fontWeight: 300,
                  lineHeight: 1.5,
                }}
              >
                {children}
              </ol>
            ) : (
              <ul
                style={{
                  marginTop: "0.75rem",
                  marginBottom: "0.75rem",
                  paddingLeft: "1.5rem",
                  listStyleType: "disc",
                  fontFamily:
                    "var(--font-twk-lausanne), ui-sans-serif, system-ui, -apple-system, blinkmacsystemfont, 'Segoe UI', 'Roboto', 'Helvetica Neue', arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
                  fontSize: "1rem",
                  fontWeight: 300,
                  lineHeight: 1.5,
                }}
              >
                {children}
              </ul>
            );
          },
          "list-item": ({ children }: any) => {
            return (
              <li
                style={{
                  fontFamily:
                    "var(--font-twk-lausanne), ui-sans-serif, system-ui, -apple-system, blinkmacsystemfont, 'Segoe UI', 'Roboto', 'Helvetica Neue', arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
                  fontSize: "1rem",
                  fontWeight: 300,
                  lineHeight: 1.5,
                }}
              >
                {children}
              </li>
            );
          },
          // Add more block types that might be causing the issue
          text: ({ children }: any) => {
            return <span>{children}</span>;
          },
          link: ({ children, url }: any) => {
            return (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700"
              >
                {children}
              </a>
            );
          },
          bold: ({ children }: any) => {
            return <strong>{children}</strong>;
          },
          italic: ({ children }: any) => {
            return <em>{children}</em>;
          },
          code: ({ children }: any) => {
            return (
              <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">
                {children}
              </code>
            );
          },
        }}
      />
    </div>
  );
}
