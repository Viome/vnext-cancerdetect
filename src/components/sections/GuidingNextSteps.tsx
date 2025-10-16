import React from 'react'
import Heading from '@/components/Heading'

interface StepItem {
  title: string
  description: string
  icon: 'minus' | 'plus'
}

export interface GuidingNextStepsProps {
  sectionId?: string
  title?: string
  steps: StepItem[]
}

export default function GuidingNextSteps({
  sectionId = 'guiding-next-steps',
  title = 'Guiding you through next steps',
  steps,
}: GuidingNextStepsProps) {
  const renderIcon = (icon: 'minus' | 'plus') => {
    if (icon === 'minus') {
      return (
        <svg
          className="w-12 h-12 sm:w-16 sm:h-16"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="32" cy="32" r="30" />
          <line x1="16" y1="32" x2="48" y2="32" />
        </svg>
      )
    }
    return (
      <svg
        className="w-12 h-12 sm:w-16 sm:h-16"
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="32" cy="32" r="30" />
        <line x1="32" y1="16" x2="32" y2="48" />
        <line x1="16" y1="32" x2="48" y2="32" />
      </svg>
    )
  }

  return (
    <div id={sectionId} className="w-full">
      <div className="pb-6 border-b-[3px] border-black mb-8 sm:mb-12">
        <Heading level={2}>{title}</Heading>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <div className="flex-shrink-0">
              {renderIcon(step.icon)}
            </div>
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 font-twk-lausanne">
                {step.title}
              </h3>
              <p
                className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[24px] font-twk-lausanne text-gray-900"
                dangerouslySetInnerHTML={{ __html: step.description }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

