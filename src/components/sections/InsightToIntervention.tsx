import React from 'react'

interface CheckItem {
  text: string
}

interface Column {
  title: string
  description: string
  additionalParagraphs?: string[]
  checkItems?: CheckItem[]
  note?: string
}

export interface InsightToInterventionProps {
  sectionId?: string
  mainTitle: string
  subtitle: string
  columns: Column[]
}

export default function InsightToIntervention({
  sectionId = 'insight-to-intervention',
  mainTitle,
  subtitle,
  columns
}: InsightToInterventionProps) {
  return (
    <div id={sectionId} className="flex flex-col">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-12 lg:mb-16">
          <div>
            <h2 className="typography-display2 font-light leading-tight">
              {mainTitle}
            </h2>
          </div>
          
          <div className="flex items-center">
            <p className="text-base sm:text-lg font-twk-lausanne leading-relaxed">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Three Column Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {columns.map((column, index) => (
            <div key={index} className="flex flex-col">
              <div className="mb-6">
                <h3 className="text-sm sm:text-base font-twk-lausanne font-light tracking-wider mb-4">
                  {column.title}
                </h3>
                <div className="w-full h-[3px] bg-[#00a86b]" />
              </div>

              <div className="space-y-6 flex-grow">
                <p className="text-sm sm:text-base font-twk-lausanne leading-relaxed">
                  {column.description}
                </p>

                {column.additionalParagraphs && column.additionalParagraphs.map((para, pIndex) => (
                  <p key={pIndex} className="text-sm sm:text-base font-twk-lausanne leading-relaxed">
                    {para}
                  </p>
                ))}

                {column.checkItems && column.checkItems.length > 0 && (
                  <div className="space-y-4 mt-6">
                    {column.checkItems.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex gap-3">
                        <div className="flex-shrink-0 mt-1">
                          <svg 
                            width="20" 
                            height="20" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            className="text-gray-800"
                          >
                            <path 
                              d="M20 6L9 17L4 12" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <p className="text-sm sm:text-base font-twk-lausanne leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {column.note && (
                  <p className="text-xs sm:text-sm font-twk-lausanne leading-relaxed text-gray-600 mt-4">
                    {column.note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
  )
}

