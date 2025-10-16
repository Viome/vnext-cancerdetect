import React from 'react'
import Heading from '@/components/Heading'
import Link from 'next/link'

export interface ImportantSafetyInformationProps {
  sectionId?: string
  title?: string
  content: string[]
  linkText?: string
  linkHref?: string
}

export default function ImportantSafetyInformation({
  sectionId = 'important-safety-information',
  title = 'Important Safety Information',
  content,
  linkText = 'our scientific information',
  linkHref = '/our-science',
}: ImportantSafetyInformationProps) {
  const renderContentWithLink = (text: string) => {
    if (!linkText || !linkHref) {
      return <span>{text}</span>
    }
    
    const parts = text.split(linkText)
    
    if (parts.length === 1) {
      return <span>{text}</span>
    }
    return (
      <>
        <span>{parts[0]}</span>
        <Link href={linkHref} className="underline hover:text-gray-700">
          {linkText}
        </Link>
        <span>{parts[1]}</span>
      </>
    )
  }

  return (
    <div id={sectionId} className="w-full">
      <div className="pb-6 border-b-[3px] border-black mb-8">
        <Heading level={2}>{title}</Heading>
      </div>

      <div className="space-y-4">
        {content.map((paragraph, index) => (
          <p
            key={index}
            className="text-[14px] leading-[22px] font-twk-lausanne text-gray-900"
          >
            {renderContentWithLink(paragraph)}
          </p>
        ))}
      </div>
    </div>
  )
}

