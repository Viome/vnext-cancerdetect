import React from 'react'

export interface QuoteSectionProps {
  sectionId?: string
  quote: string
  authorName: string
  authorTitle: string
  authorCompany: string
}

export default function QuoteSection({
  sectionId = 'quote-section',
  quote,
  authorName,
  authorTitle,
  authorCompany
}: QuoteSectionProps) {
  return (
    <div 
      id={sectionId} 
      className="flex flex-col items-center justify-center text-center px-6 sm:px-12 lg:px-24 py-20 sm:py-28 lg:py-36"
    >
        {/* Quote */}
        <blockquote className="mb-12 lg:mb-16 max-w-3xl">
          <p className="!font-tiempos typography-headline3 leading-relaxed text-white">
            "{quote}"
          </p>
        </blockquote>

        {/* Author Info */}
        <div className="flex flex-col items-center gap-2">
          <p className="typography-paragraph1 font-semibold text-white">
            {authorName}
          </p>
          <p className="typography-paragraph2 text-white">
            {authorTitle},
          </p>
          <p className="typography-paragraph2 text-white">
            {authorCompany}
          </p>
        </div>
      </div>
  )
}

