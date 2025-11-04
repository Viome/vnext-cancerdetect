"use client"

import Image from "next/image"
import SectionWrapper from "@/components/SectionWrapper"

interface Step {
  stepNumber: number
  content: string
  image: string
  imageAlt: string
}

interface ApproachToDiagnosticsProps {
  title: string
  description: string
  steps: Step[]
  wrapperStyle?: {
    background?: string
    padding?: string
    useContainerWidth?: boolean
    spacing?: string
  }
}

export default function ApproachToDiagnostics({
  title,
  description,
  steps,
  wrapperStyle,
}: ApproachToDiagnosticsProps) {
  return (
    <SectionWrapper wrapperStyle={wrapperStyle}>
      {/* Header Section */}
      <div className="max-w-4xl mb-16 sm:mb-20 lg:mb-24">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 mb-6">
          {title}
        </h2>
        <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Steps Section */}
      <div className="space-y-16 sm:space-y-20 lg:space-y-24">
        {steps.map((step, index) => (
          <div
            key={step.stepNumber}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center"
          >
            {/* Content */}
            <div className="order-2 lg:order-1">
              <div className="mb-6">
                <span className="text-lg font-semibold text-teal-600 uppercase tracking-wider">
                  STEP {step.stepNumber}
                </span>
                <div className="w-full max-w-xl h-px bg-gray-300 mt-6" />
              </div>
              <p className="typography-headline2 font-light text-gray-900 leading-none">
                {step.content}
              </p>
            </div>

            {/* Image */}
            <div className="order-1 lg:order-2">
              <Image
                src={step.image}
                alt={step.imageAlt}
                width={600}
                height={600}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}

