'use client'

import React, { useRef, useEffect } from 'react'
import Heading from '@/components/Heading'

interface TestingProcessStep {
  stepNumber: string
  description: string
}

interface TestingProcessProps {
  mainTitle: string
  steps: TestingProcessStep[]
}

export default function TestingProcess({ mainTitle, steps }: TestingProcessProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    let isScrolling = false
    let startX = 0

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX
      isScrolling = false
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isScrolling) {
        const currentX = e.touches[0].clientX
        const diffX = Math.abs(currentX - startX)
        
        if (diffX > 5) {
          isScrolling = true
        }
      }
      
      if (isScrolling) {
        e.preventDefault()
      }
    }

    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchmove', handleTouchMove, { passive: false })

    return () => {
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  return (
    <div className="space-y-8 md:space-y-12">
      <div className="pb-[1.875rem] border-b-[3px] border-[var(--black)]">
        <Heading level={2}>{mainTitle}</Heading>
      </div>
      
      {/* Below 1440px: Horizontal Scroll Carousel */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 overscroll-x-contain max-[1439px]:flex min-[1440px]:hidden"
        style={{
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-x'
        }}
      >
        {steps.map((step, index) => (
          <div 
            key={index}
            className="flex-shrink-0 w-[230px] snap-start"
          >
            <div className="flex flex-col h-full min-h-[200px]">
              <div className="space-y-4">
                <div className="pb-4 border-b border-[var(--black)]">
                  <h3 className="text-5xl md:text-6xl font-twk-lausanne font-light">
                    {step.stepNumber}
                  </h3>
                </div>
                
                <div 
                  className="text-base md:text-lg font-twk-lausanne leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: step.description }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 1440px and above: Grid Layout with all items visible */}
      <div className="hidden min-[1440px]:grid grid-cols-5 gap-6">
        {steps.map((step, index) => (
          <div key={index}>
            <div className="flex flex-col h-full min-h-[200px]">
              <div className="space-y-4">
                <div className="pb-4 border-b border-gray-300">
                  <h3 className="text-5xl md:text-6xl font-twk-lausanne font-light">
                    {step.stepNumber}
                  </h3>
                </div>
                
                <div 
                  className="text-base font-twk-lausanne leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: step.description }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

