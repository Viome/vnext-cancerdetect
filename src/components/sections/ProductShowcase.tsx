import React from 'react'
import CDImage from '@/components/CDImage'
import Link from 'next/link'

export interface ProductShowcaseProps {
  sectionId?: string
  topImage: string
  topImageAlt?: string
  title: string
  paragraphs: string[]
  linkText?: string
  linkHref?: string
}

export default function ProductShowcase({
  sectionId = 'product-showcase',
  topImage,
  topImageAlt = 'Product image',
  title,
  paragraphs,
  linkText,
  linkHref
}: ProductShowcaseProps) {
  return (
    <div id={sectionId} className="flex flex-col">
        {/* Top Image */}
        <div className="relative w-full mb-12 lg:mb-16">
          <div className="relative w-full aspect-[16/5] lg:aspect-[21/5]">
            <CDImage
              src={topImage}
              alt={topImageAlt}
              fill
              objectFit="cover"
              objectPosition="center"
              containerClassName="relative overflow-hidden w-full h-full rounded-lg"
              sizes="100vw"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left Column - Title */}
          <div>
            <h2 
              className="text-4xl sm:text-5xl lg:text-6xl font-twk-lausanne font-light leading-tight"
              dangerouslySetInnerHTML={{ __html: title }}
            />
          </div>

          {/* Right Column - Description */}
          <div className="space-y-6">
            {paragraphs.map((paragraph, index) => (
              <p 
                key={index} 
                className="text-base sm:text-lg font-twk-lausanne leading-relaxed"
              >
                {paragraph}
              </p>
            ))}

            {linkText && linkHref && (
              <div className="pt-4">
                <Link 
                  href={linkHref}
                  className="inline-flex items-center gap-2 text-base font-twk-lausanne font-medium hover:text-[var(--brand-green-3)] transition-colors group"
                >
                  {linkText}
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 20 20" 
                    fill="none" 
                    className="transition-transform group-hover:translate-x-1"
                  >
                    <path 
                      d="M4.16669 10H15.8334M15.8334 10L10 4.16669M15.8334 10L10 15.8334" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
  )
}

