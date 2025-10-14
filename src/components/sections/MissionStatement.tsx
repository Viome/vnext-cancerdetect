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
    <div id={sectionId} className="grid grid-cols-1 lg:grid-cols-2 gap-0">
      {/* Left Column - Text */}
      <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16 xl:p-24 order-2 lg:order-1">
        <p 
          className="typography-headline2"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>

      {/* Right Column - Image */}
      <div className="relative w-full aspect-[4/5] lg:aspect-auto lg:min-h-[600px] order-1 lg:order-2">
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

