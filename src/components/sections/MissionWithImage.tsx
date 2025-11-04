import React from 'react'
import CDImage from '@/components/CDImage'
import Link from 'next/link'

export interface MissionWithImageProps {
  sectionId?: string
  title: string
  description: string
  buttonText?: string
  buttonHref?: string
  image: string
  imageAlt?: string
}

export default function MissionWithImage({
  sectionId = 'mission-with-image',
  title,
  description,
  buttonText,
  buttonHref,
  image,
  imageAlt = 'Mission image'
}: MissionWithImageProps) {
  return (
    <div
      id={sectionId}
      className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-0 py-10 md:py-16 lg:py-32"
      style={{
        width: "calc(100% - 2.5rem)",
        margin: "auto",
        ...(typeof window !== "undefined" && window.innerWidth >= 768
          ? { width: "calc(100% - 5rem)" }
          : {}),
      }}
    >
      {/* Left Column - Content */}
      <div className="flex flex-col justify-center order-1 md:order-1 md:pr-[4rem]">
        <div className="max-w-xl">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl !font-tiempos font-medium italic leading-tight text-white mb-8 lg:mb-10">
            {title}
          </h2>

          <p className="text-base sm:text-lg font-twk-lausanne leading-relaxed text-white mb-8 lg:mb-10">
            {description}
          </p>

          {buttonText && buttonHref && (
            <Link
              href={buttonHref}
              className="inline-block border-2 border-white text-white px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-twk-lausanne hover:bg-white hover:text-black transition-colors duration-300 text-center"
            >
              {buttonText}
            </Link>
          )}
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

