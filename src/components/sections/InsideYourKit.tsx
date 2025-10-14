import React from 'react'
import CDImage from '@/components/CDImage'
import SectionWrapper from '@/components/SectionWrapper'
import Heading from '@/components/Heading'

export interface InsideYourKitProps {
  sectionId?: string
  title: string
  subtitle?: string
  desktopImage: string
  mobileImage: string
  wrapperStyle?: {
    background?: string
    backgroundImage?: string
    padding?: string
    spacing?: string
    useContainerWidth?: boolean
  }
}

export default function InsideYourKit({
  sectionId = 'inside-your-kit',
  title,
  subtitle,
  desktopImage,
  mobileImage,
  wrapperStyle = {}
}: InsideYourKitProps) {
  return (
    <SectionWrapper wrapperStyle={wrapperStyle}>
      <div id={sectionId}>
        {/* Desktop and Tablet Layout - Image as background */}
        <div className="hidden md:block relative w-full min-h-[600px] lg:min-h-[700px] bg-[#5a5d6b]">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <CDImage
              src={desktopImage}
              alt={title}
              fill
              objectFit="cover"
              objectPosition="center"
              containerClassName="relative overflow-hidden w-full h-full"
              priority
              sizes="(min-width: 768px) 100vw, 0vw"
            />
          </div>
          
          {/* Title Overlay */}
          <div className="relative z-10 pb-[1.875rem] border-b-[3px] border-[var(--black)] max-w-7xl mx-auto px-4">
            <Heading level={2}>{title}</Heading>
            {subtitle && (
              <p className="mt-4 text-lg font-twk-lausanne text-gray-700">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Mobile Layout - Standard stacked layout */}
        <div className="block md:hidden space-y-8">
          <div className="pb-[1.875rem] border-b-[3px] border-[var(--black)]">
            <Heading level={2}>{title}</Heading>
            {subtitle && (
              <p className="mt-4 text-lg font-twk-lausanne text-gray-700">
                {subtitle}
              </p>
            )}
          </div>
          
          <div className="relative w-full aspect-[9/16]">
            <CDImage
              src={mobileImage}
              alt={title}
              fill
              objectFit="contain"
              objectPosition="center"
              containerClassName="relative overflow-hidden w-full h-full"
              priority
              sizes="(max-width: 767px) 100vw, 0vw"
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

