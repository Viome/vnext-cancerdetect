"use client"

import { useEffect, useState } from "react"
import { fetchPolicyPageBySlug, type StrapiPolicyPage } from "@/lib/strapi/services/policy"
import BodyBlocks from "@/components/blog/BodyBlocks"
import type { BlocksContent } from "@strapi/blocks-react-renderer"

interface TermsContentProps {
  slug?: string
}

export default function TermsContent({ slug = "terms" }: TermsContentProps) {
  const [policy, setPolicy] = useState<StrapiPolicyPage | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const loadPolicy = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchPolicyPageBySlug(slug)
        
        if (!data) {
          setError("Policy not found")
        } else {
          setPolicy(data)
        }
      } catch (err) {
        console.error("Error loading policy:", err)
        setError("Failed to load policy content")
      } finally {
        setLoading(false)
      }
    }

    loadPolicy()
  }, [slug])

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-10 w-3/4 rounded bg-gray-200"></div>
          <div className="h-4 w-1/4 rounded bg-gray-200"></div>
          <div className="space-y-2 pt-8">
            <div className="h-4 rounded bg-gray-200"></div>
            <div className="h-4 rounded bg-gray-200"></div>
            <div className="h-4 w-5/6 rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !policy) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="rounded-lg border border-red-200 bg-red-50 p-6">
          <h2 className="mb-2 text-xl font-semibold text-red-900">
            {error || "Policy not found"}
          </h2>
          <p className="text-red-700">
            {error === "Policy not found"
              ? `The policy page "${slug}" could not be found.`
              : "Please try again later or contact support."}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <article className="prose prose-gray max-w-none">
        {typeof policy.content === "string" ? (
          <div
            dangerouslySetInnerHTML={{ __html: policy.content }}
            style={{ fontFamily: "var(--font-twk-lausanne)" }}
          />
        ) : (
          <BodyBlocks content={policy.content as BlocksContent} />
        )}
      </article>
    </div>
  )
}

