"use client"

import { useState } from "react"
import SectionWrapper from "@/components/SectionWrapper"
import Link from "next/link"

interface WorkWithUsProps {
  wrapperStyle?: {
    background?: string
    padding?: string
    useContainerWidth?: boolean
    spacing?: string
  }
}

export default function WorkWithUs({ wrapperStyle }: WorkWithUsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const sections = [
    {
      title: "Our Grants Program",
      content: "The mission of the VLS Grants Program is to enable clinicians and scientists worldwide to translate research into commercial products with clinical utility: devising new therapies and developing more accurate diagnostics and companion diagnostics.",
      ctaText: "Learn more",
      ctaHref: "https://www.viomelifesciences.com/grants",
    },
    {
      title: "Viome Publication Dataset Access Program",
      content: "Viome is committed to supporting scientific research by enabling access to data we have included in our publications. We provide access to full summary statistics through a Data Transfer Agreement that protects the privacy of our participant's data.",
      ctaText: "Request Access",
      ctaHref: "https://www.viomelifesciences.com/dataset-access",
    },
    {
      title: "Join Our Team",
      content: "Our team is dedicated to making the advancements in science, technology, and medicine accessible and more readily available to consumers, helping to create a disease free world where people can take control of their own health from the comfort of their own home.",
      ctaText: null,
      ctaHref: null,
    },
  ]

  const toggleSection = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <SectionWrapper wrapperStyle={wrapperStyle}>
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h2 className="typography-headline1 mb-8 sm:mb-12">
          Work With Us
        </h2>

        {/* Accordion Items */}
        <div className="space-y-0">
          {sections.map((section, index) => (
            <div
              key={index}
              className="border-t border-gray-300 last:border-b"
            >
              {/* Header Button */}
              <button
                onClick={() => toggleSection(index)}
                className="w-full flex items-center justify-between py-6 text-left group"
                aria-expanded={openIndex === index}
              >
                <h3 className="typography-headline3 font-semibold pr-4">
                  {section.title}
                </h3>
                <svg
                  className={`w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0 text-gray-900 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-96 opacity-100 pb-8"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="space-y-6">
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    {section.content}
                  </p>

                  {/* CTA Link */}
                  {section.ctaText && section.ctaHref && (
                    <Link
                      href={section.ctaHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-base sm:text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors group/link"
                    >
                      <span>{section.ctaText}</span>
                      <svg
                        className="w-5 h-5 transition-transform group-hover/link:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

