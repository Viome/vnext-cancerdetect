"use client"

import React from "react"

interface GenericDropdownProps {
  id: string
  isExpanded: boolean
  onToggle: (id: string) => void
  headingComponent: React.ReactNode
  expandedComponent: React.ReactNode
  theme?: "white" | "dark"
  className?: string
}

const GenericDropdown: React.FC<GenericDropdownProps> = ({
  id,
  isExpanded,
  onToggle,
  headingComponent,
  expandedComponent,
  theme = "white",
  className = "",
}) => {
  const isDark = theme === "dark"

  const borderColor = isDark ? "border-black" : "border-white"
  const textColor = isDark ? "text-black" : "text-white"
  const hoverColor = isDark ? "hover:bg-black/5" : "hover:bg-white/5"

  return (
    <div className={`border-b ${borderColor} first:border-t ${className}`}>
      <button
        onClick={() => onToggle(id)}
        className={`cursor-pointer w-full py-6 text-left flex items-center justify-between ${hoverColor} transition-colors duration-200`}
      >
        <div className="flex items-center space-x-4">{headingComponent}</div>
        <svg
          className={`w-5 h-5 ${textColor} transition-transform duration-200 flex-shrink-0 ${
            isExpanded ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pb-6">{expandedComponent}</div>
      </div>
    </div>
  )
}

export default GenericDropdown

