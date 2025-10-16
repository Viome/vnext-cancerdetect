import React from 'react'

interface Publication {
  name: string
  logo: string
}

interface FeaturedPublicationsProps {
  sectionId?: string
  title?: string
  publications: Publication[]
}

export default function FeaturedPublications({
  sectionId = 'featured-publications',
  title = 'AS FEATURED IN',
  publications,
}: FeaturedPublicationsProps) {
  return (
    <div id={sectionId} className="w-full">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
        <h2 className="typography-caption1 text-gray-500 tracking-wide">
          {title}
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
          {publications.map((publication, index) => (
            <div
              key={index}
              className="flex items-center justify-center"
            >
              <img
                src={publication.logo}
                alt={publication.name}
                className="h-4 md:h-6 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

