"use client"

import Link from "next/link"
import SectionWrapper from "@/components/SectionWrapper"

interface ContactSectionProps {
  wrapperStyle?: {
    background?: string
    padding?: string
    useContainerWidth?: boolean
    spacing?: string
  }
}

export default function ContactSection({ wrapperStyle }: ContactSectionProps) {
  const contactItems = [
    {
      label: "For partnering opportunities reach out to:",
      email: "bd@viome.com"
    },
    {
      label: "For press related inquiries:",
      email: "press@viome.com"
    },
    {
      label: "For partnering inquiries regarding Viome consumer tests:",
      email: "businesspartners@viome.com"
    },
    {
      label: "For events and speaking inquiries:",
      email: "events@viome.com"
    }
  ]

  return (
    <SectionWrapper wrapperStyle={wrapperStyle}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-light text-gray-900 mb-16 sm:mb-20 lg:mb-24">
          Contact
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 lg:gap-y-16">
          {contactItems.map((item, index) => (
            <div key={index} className="space-y-4">
              <p className="text-xl sm:text-2xl font-normal text-gray-900 leading-relaxed">
                {item.label}
              </p>
              <Link
                href={`mailto:${item.email}`}
                className="text-xl sm:text-2xl font-normal text-gray-900 underline hover:text-gray-600 transition-colors block"
              >
                {item.email}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

