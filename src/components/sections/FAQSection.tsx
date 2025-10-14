"use client"

import React, { useState } from "react"
import GenericDropdown from "@/components/GenericDropdown"

interface FAQItem {
  id: string
  question: string
  answer: string
}

interface FAQSectionProps {
  title?: string
  faqs: FAQItem[]
  theme?: "white" | "dark"
}

const FAQSection: React.FC<FAQSectionProps> = ({
  title,
  faqs,
  theme = "dark"
}) => {
  // Now supporting multiple simultaneously expanded dropdowns
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())

  const handleToggle = (id: string) => {
    setExpandedIds((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const isDark = theme === "dark"
  const textColor = isDark ? "text-black" : "text-white"

  return (
    <div className="max-w-4xl mx-auto">
      {title && (
        <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 ${textColor}`}>
          {title}
        </h2>
      )}
      <div>
        {faqs.map((faq) => (
          <GenericDropdown
            key={faq.id}
            id={faq.id}
            isExpanded={expandedIds.has(faq.id)}
            onToggle={handleToggle}
            theme={theme}
            headingComponent={
              <h3 className={`text-xl sm:text-2xl font-semibold ${textColor}`}>
                {faq.question}
              </h3>
            }
            expandedComponent={
              <div
                className={`text-base sm:text-lg ${textColor} prose prose-lg max-w-none [&>p]:leading-relaxed [&>ul]:space-y-4 [&>ul>li]:leading-relaxed [&>ul_ul]:mt-2 [&>ul_ul]:ml-6 [&>ul_ul>li]:list-disc [&>ul_ul>li]:pl-2`}
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              />
            }
          />
        ))}
      </div>
    </div>
  )
}

export default FAQSection

