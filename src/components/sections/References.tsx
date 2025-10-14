import React from 'react'
import Heading from '@/components/Heading'

export interface Reference {
  id: number
  text: string
  link?: string
}

export interface ReferencesProps {
  sectionId?: string
  title?: string
  references: Reference[]
}

export default function References({
  sectionId = 'references',
  title = 'References',
  references
}: ReferencesProps) {
  const renderReferenceText = (reference: Reference) => {
    if (!reference.link) {
      return <span dangerouslySetInnerHTML={{ __html: reference.text }} />
    }

    return (
      <>
        <span dangerouslySetInnerHTML={{ __html: reference.text }} />
        <a
          href={reference.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline break-all"
        >
          {reference.link}
        </a>
      </>
    )
  }

  return (
    <div id={sectionId} className="w-full">
      <div className="pb-6 border-b-[3px] border-black mb-8">
        <Heading level={2}>{title}</Heading>
      </div>

      <div className="space-y-4">
        {references.map((reference) => (
          <div
            key={reference.id}
            className="text-[14px] leading-[22px] font-twk-lausanne text-gray-900"
          >
            <span className="font-medium">{reference.id}. </span>
            {renderReferenceText(reference)}
          </div>
        ))}
      </div>
    </div>
  )
}

