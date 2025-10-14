import React from 'react'
import CDImage from '@/components/CDImage'
import Heading from '@/components/Heading'

export interface OurScienceProps {
  sectionId?: string
  title: string
  paragraphs: string[]
  linkText: string
  linkHref: string
  image: string
}

export default function OurScience({
  sectionId = 'our-science',
  title,
  paragraphs,
  linkText,
  linkHref,
  image
}: OurScienceProps) {
  return (
    <div id={sectionId} className="w-full">
      {/* Mobile & Tablet Layout */}
      <div className="block lg:hidden">
        {/* Laboratory Image */}
        <div className="relative w-full aspect-[16/9] mb-12">
          <CDImage
            src={image}
            alt="Laboratory"
            fill
            objectFit="cover"
            objectPosition="center"
            priority
            sizes="(max-width: 1023px) 100vw, 0vw"
          />
        </div>

        {/* Content */}
        <div className="space-y-8">
          <Heading level={1} className="text-white">
            {title}
          </Heading>

          <div className="space-y-6">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-[16px] leading-[24px] font-twk-lausanne text-white"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <a
            href={linkHref}
            className="inline-flex items-center gap-2 text-white font-twk-lausanne text-[16px] leading-[24px] hover:opacity-80 transition-opacity"
          >
            {linkText}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
            >
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-2 lg:gap-16 xl:gap-24">
        {/* Left Column - Title */}
        <div className="flex items-start">
          <Heading level={1} className="text-white">
            {title}
          </Heading>
        </div>

        {/* Right Column - Image and Content */}
        <div className="space-y-8">
          {/* Laboratory Image */}
          <div className="relative w-full aspect-[16/9]">
            <CDImage
              src={image}
              alt="Laboratory"
              fill
              objectFit="cover"
              objectPosition="center"
              priority
              sizes="(min-width: 1024px) 50vw, 0vw"
            />
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-[16px] leading-[24px] font-twk-lausanne text-white"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Link */}
          <a
            href={linkHref}
            className="inline-flex items-center gap-2 text-white font-twk-lausanne text-[16px] leading-[24px] hover:opacity-80 transition-opacity"
          >
            {linkText}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
            >
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

