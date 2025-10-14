"use client"

import React from "react"
import { BlocksRenderer } from "@strapi/blocks-react-renderer"
import type { BlocksContent } from "@strapi/blocks-react-renderer"

interface BodyBlocksProps {
  content: BlocksContent
}

function convertSuperscript(text: string): (string | React.ReactElement)[] {
  const regex = /\[([^\]]+)\]/g
  const parts: (string | React.ReactElement)[] = []
  let lastIndex = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    parts.push(
      <sup key={match.index} style={{ fontSize: "0.7em", verticalAlign: "super" }}>
        {match[1]}
      </sup>
    )
    lastIndex = regex.lastIndex
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts
}

export default function BodyBlocks({ content }: BodyBlocksProps) {
  if (!content) {
    return null
  }

  return (
    <BlocksRenderer
      content={content}
      blocks={{
        heading: ({ children, level }: any) => {
          const sizes: { [key: number]: string } = {
            1: "2.5rem",
            2: "2rem",
            3: "1.75rem",
            4: "1.5rem",
            5: "1.25rem",
          }

          const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

          return React.createElement(
            Tag,
            {
              style: {
                fontSize: sizes[level] || "1rem",
                fontWeight: "700",
                marginTop: level === 1 ? "2rem" : "1.5rem",
                marginBottom: "1rem",
                lineHeight: "1.2",
                color: "#1a1a1a",
                fontFamily: "var(--font-twk-lausanne)",
              },
            },
            children
          )
        },
        paragraph: ({ children }: any) => {
          return (
            <p
              style={{
                marginBottom: "1rem",
                lineHeight: "1.75",
                color: "#374151",
                fontSize: "1rem",
                fontFamily: "var(--font-twk-lausanne)",
              }}
            >
              {children}
            </p>
          )
        },
        list: ({ children, format }: any) => {
          const ListTag = format === "ordered" ? "ol" : "ul"
          return (
            <ListTag
              style={{
                marginBottom: "1rem",
                marginLeft: "1.5rem",
                lineHeight: "1.75",
                color: "#374151",
                fontSize: "1rem",
                fontFamily: "var(--font-twk-lausanne)",
                listStyleType: format === "ordered" ? "decimal" : "disc",
              }}
            >
              {children}
            </ListTag>
          )
        },
        "list-item": ({ children }: any) => {
          return (
            <li
              style={{
                marginBottom: "0.5rem",
                fontFamily: "var(--font-twk-lausanne)",
              }}
            >
              {children}
            </li>
          )
        },
        link: ({ children, url }: any) => {
          return (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-700 underline"
            >
              {children}
            </a>
          )
        },
        image: ({ image }: any) => {
          return (
            <img
              src={image.url}
              alt={image.alternativeText || ""}
              style={{
                maxWidth: "100%",
                height: "auto",
                marginBottom: "1rem",
              }}
            />
          )
        },
      }}
      modifiers={{
        bold: ({ children }: any) => <strong>{children}</strong>,
        italic: ({ children }: any) => <em>{children}</em>,
        underline: ({ children }: any) => <u>{children}</u>,
        strikethrough: ({ children }: any) => <s>{children}</s>,
        code: ({ children }: any) => (
          <code
            style={{
              backgroundColor: "#f3f4f6",
              padding: "0.125rem 0.25rem",
              borderRadius: "0.25rem",
              fontFamily: "monospace",
              fontSize: "0.875em",
            }}
          >
            {children}
          </code>
        ),
      }}
    />
  )
}

