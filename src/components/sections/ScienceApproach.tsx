"use client"

import { useState } from "react"
import SectionWrapper from "@/components/SectionWrapper"
import Modal from "@/components/Modal"

interface ScienceApproachProps {
  wrapperStyle?: {
    background?: string
    padding?: string
    useContainerWidth?: boolean
    spacing?: string
  }
}

export default function ScienceApproach({ wrapperStyle }: ScienceApproachProps) {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    {
      title: "RNA Analysis",
      content: {
        mainTitle: "RNA Analysis",
        leftDescription: "Microbial and human gene expression are redefining how biological activities are viewed in relation to human health.",
        rightDescription: "RNA plays a fundamental role in human biology referring the instructions stored in DNA to make the proteins required in every living cell. Our approach is to use RNA medicines to instruct a patient's own cells to produce proteins that could prevent, treat, or cure disease.",
        comparisonTitle: "DNA vs RNA",
        comparisonItems: [
          {
            label: "DNA",
            items: ["Rarely changes", "Similar sequence in every organ & cell"]
          },
          {
            label: "RNA",
            items: ["Dynamic, constantly changing", "Vastly different expression in the body"]
          }
        ]
      }
    },
    {
      title: "System Biology",
      content: {
        mainTitle: "Tapping into Holistic Systems Biology",
        leftDescription: "Our technology is being used to digitize the human body through the collection of a variety available specimen types",
        rightDescription: "Viome utilizes the current meta-dataset of sequenced samples as a starting point for the investigation into various disease therapeutics.",
        comparisonTitle: "Viome sample analysis today",
        comparisonItems: [
          {
            label: "Viome sample analysis today",
            items: [
              "Stool metatracscriptomics (CLIA, Production)",
              "Whole blood metatracscriptomics (CLIA, Production)",
              "Saliva metatracscriptomics"
            ]
          },
          {
            label: "Example Scores",
            items: [
              "Throat metatracscriptomics",
              "Vaginal metatracscriptomics",
              "Cerebrospinal fluid metatracscriptomics & metagenomics",
              "Nasopharyngeal metatracscriptomics",
              "Synovial fluid metatracscriptomics & metagenomics",
              "Urine metatracscriptomics",
              "Plasma metatracscriptomics & metagenomics (normal collection & differential centrifugation)"
            ]
          }
        ]
      }
    },
    {
      title: "Our AI Platform",
      content: {
        mainTitle: "Our AI Platform",
        leftDescription: "",
        rightDescription: "Increasing every day, Viome boasts access to an RNA platform of over half a million samples to generate and test hypotheses related to many chronic diseases and cancers. At our core, Viome focuses on establishing biological data trends that identify the patterns for optimal health. Our initiative integrates a robust dataset with innovative and proprietary AI technology to determine causal relationships that evaluate and improve the current understanding of chronic diseases as we know them.",
        comparisonTitle: "",
        comparisonItems: []
      }
    },
    {
      title: "Metatranscriptomic technology",
      content: {
        mainTitle: "Metatranscriptomic technology",
        leftDescription: "",
        rightDescription: "Viome metatranscriptomic technology is the only clinically validated metatranscriptomic technology in the world",
        comparisonTitle: "",
        comparisonItems: []
      }
    }
  ]


  return (
    <SectionWrapper wrapperStyle={wrapperStyle}>
      {/* Header */}
      <div className="mb-12 sm:mb-16">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
          Our Science & Unique Approach to Human Health
        </h2>
        <p className="text-lg sm:text-xl text-gray-700 max-w-4xl">
          Evidence-based precision nutrition improves clinical outcomes by analyzing human and microbial molecular data with artificial intelligence.
        </p>
      </div>

      {/* Desktop View - Tabs */}
      <div className="hidden md:block">
        {/* Tab Headers */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`p-6 text-left transition-all duration-300 relative group ${
                activeTab === index
                  ? "bg-gradient-to-br from-teal-800 to-teal-700 text-white"
                  : "bg-gray-200 text-gray-900 hover:bg-gray-300"
              }`}
            >
              <h3 className="text-xl font-medium mb-12">{tab.title}</h3>
              <svg
                className={`w-6 h-6 absolute bottom-6 left-6 transition-opacity ${
                  activeTab === index ? "opacity-100" : "opacity-0"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-gradient-to-br from-teal-800 to-teal-700 text-white p-12 lg:p-16">
          <div className="space-y-12">
            {/* Top Content */}
            {tabs[activeTab].content.leftDescription || tabs[activeTab].content.rightDescription ? (
              <div className={`grid grid-cols-1 ${tabs[activeTab].content.leftDescription ? 'lg:grid-cols-2' : 'lg:grid-cols-1'} gap-12`}>
                {tabs[activeTab].content.leftDescription && (
                  <div>
                    <h3 className="text-4xl font-bold mb-6">
                      {tabs[activeTab].content.mainTitle}
                    </h3>
                    <p className="text-lg leading-relaxed">
                      {tabs[activeTab].content.leftDescription}
                    </p>
                  </div>
                )}
                {tabs[activeTab].content.rightDescription && (
                  <div>
                    {!tabs[activeTab].content.leftDescription && (
                      <h3 className="text-4xl font-bold mb-6">
                        {tabs[activeTab].content.mainTitle}
                      </h3>
                    )}
                    <p className="text-lg leading-relaxed">
                      {tabs[activeTab].content.rightDescription}
                    </p>
                  </div>
                )}
              </div>
            ) : null}

            {/* Comparison Section */}
            {tabs[activeTab].content.comparisonItems.length > 0 && (
              <div className="pt-8 border-t border-teal-600">
                {tabs[activeTab].content.comparisonTitle && (
                  <h4 className="text-2xl font-semibold mb-8">
                    {tabs[activeTab].content.comparisonTitle}
                  </h4>
                )}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {tabs[activeTab].content.comparisonItems.map((item, idx) => (
                    <div key={idx}>
                      <h5 className={`text-xl font-semibold mb-4 pb-3 border-b ${
                        idx === 1 ? "border-teal-400 text-teal-300" : "border-white"
                      }`}>
                        {item.label}
                      </h5>
                      <ul className="space-y-3">
                        {item.items.map((text, i) => (
                          <li key={i} className="flex items-start gap-3">
                            {idx === 1 && (
                              <svg
                                className="w-6 h-6 flex-shrink-0 text-teal-300 mt-0.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                            <span className="text-base">{text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile View - Stacked Buttons with Modals */}
      <div className="md:hidden space-y-4">
        {tabs.map((tab, index) => (
          <Modal
            key={index}
            clickText={
              <div className="w-full bg-gray-900 text-white p-6 text-left flex items-center justify-between group hover:bg-gray-800 transition-colors">
                <h3 className="text-xl font-medium">{tab.title}</h3>
                <svg
                  className="w-6 h-6 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
            }
            modalContent={
              <div className="space-y-8 text-white">
                <div>
                  <h3 className="text-3xl font-bold mb-4">
                    {tab.content.mainTitle}
                  </h3>
                  <p className="text-base leading-relaxed mb-6">
                    {tab.content.leftDescription}
                  </p>
                  <p className="text-base leading-relaxed">
                    {tab.content.rightDescription}
                  </p>
                </div>

                {/* Comparison Section */}
                <div className="pt-6 border-t border-teal-600">
                  <h4 className="text-xl font-semibold mb-6">
                    {tab.content.comparisonTitle}
                  </h4>
                  <div className="space-y-6">
                    {tab.content.comparisonItems.map((item, idx) => (
                      <div key={idx}>
                        <h5 className={`text-lg font-semibold mb-3 pb-2 border-b ${
                          idx === 1 ? "border-teal-400 text-teal-300" : "border-white"
                        }`}>
                          {item.label}
                        </h5>
                        <ul className="space-y-2">
                          {item.items.map((text, i) => (
                            <li key={i} className="flex items-start gap-2">
                              {idx === 1 && (
                                <svg
                                  className="w-5 h-5 flex-shrink-0 text-teal-300 mt-0.5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                              <span className="text-sm">{text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            }
            size="full"
            variant="centered"
            theme="dark"
            showHeader={false}
            showFooter={false}
            zIndex={9999}
            contentClassName="bg-gradient-to-br from-teal-800 to-teal-700 text-white"
          />
        ))}
      </div>
    </SectionWrapper>
  )
}

