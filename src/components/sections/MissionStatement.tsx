'use client'

import React from 'react'
import CDImage from '@/components/CDImage'

export interface MissionStatementProps {
  sectionId?: string
  text: string
  image: string
  imageAlt?: string
}

export default function MissionStatement({
  sectionId = 'mission-statement',
  text,
  image,
  imageAlt = 'Mission statement image'
}: MissionStatementProps) {
  return (
    <div
      id={sectionId}
      className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-0"
      style={{
        width:
          typeof window !== "undefined"
            ? window.innerWidth < 768
              ? "calc(100% - 0rem)"
              : window.innerWidth < 1024
              ? "calc(100% - 2.5rem)"
              : "calc(100% - 5rem)"
            : "100%",
        ...(typeof window !== "undefined" && window.innerWidth >= 768
          ? { marginLeft: "auto" }
          : {}),
      }}
    >
      {/* Left Column - Content */}
      <div className="flex flex-col justify-center order-1 md:order-1 md:pr-[4rem] max-sm:pt-10 max-sm:px-4">
        <div className="max-w-xl">
          <p
            className="typography-headline2"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        </div>
      </div>

      {/* Right Column - Image */}
      <div className="relative w-full aspect-[4/5] md:aspect-auto md:min-h-[600px] order-2 md:order-2">
        <CDImage
          src={image}
          alt={imageAlt}
          fill
          objectFit="cover"
          objectPosition="center"
          containerClassName="relative overflow-hidden w-full h-full"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    </div>
  )
}
