"use client"

import Image from "next/image"
import Link from "next/link"
import SectionWrapper from "@/components/SectionWrapper"

interface PublicationsPartnersProps {
  wrapperStyle?: {
    background?: string
    padding?: string
    useContainerWidth?: boolean
    spacing?: string
  }
}

export default function PublicationsPartners({ wrapperStyle }: PublicationsPartnersProps) {
  const partnerLogos = [
    {
      url: "https://strapi.azure.viome.com/viome-strapi/uploads/imgi_1_Black_f30d4e6298.webp",
      alt: "Queensland University of Technology"
    },
    {
      url: "https://strapi.azure.viome.com/viome-strapi/uploads/imgi_1_Black_637cede4ec.webp",
      alt: "Griffith University"
    },
    {
      url: "https://strapi.azure.viome.com/viome-strapi/uploads/imgi_1_Black_219a73467d.webp",
      alt: "New York Medical College"
    }
  ]

  return (
    <SectionWrapper wrapperStyle={wrapperStyle}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20">
        {/* Publications Section */}
        <div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
            Publications
          </h2>
          
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-normal text-gray-900 leading-relaxed">
              The salivary host/microbe metatranscriptomes as an accurate diagnostic indicator of oral cancer
            </h3>
            
            <p className="text-base sm:text-lg text-gray-700">
              NRJ Genomic Medicine
            </p>
            
            <Link
              href="https://www.nature.com/articles/s41525-021-00257-y"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-base sm:text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors group"
            >
              <span>Read more</span>
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
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
          </div>
        </div>

        {/* Partners Section */}
        <div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
            Partners
          </h2>
          
          <p className="text-xl sm:text-2xl font-normal text-gray-900 leading-relaxed mb-12">
            Our collective makes us stronger. We couldn't do what we do without great partners. Together, we're making a difference – join our mission.
          </p>
          
          {/* Partner Logos */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center">
            {partnerLogos.map((logo, index) => (
              <div 
                key={index}
                className="relative h-24 flex items-center justify-center"
              >
                <Image
                  src={logo.url}
                  alt={logo.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

