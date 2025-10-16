"use client"

import { useState } from "react"

interface SiteBannerProps {
  text: string
  textColor?: string
  isSticky?: boolean
  show?: boolean
  isMobileMenuOpen?: boolean
}

export default function SiteBanner({
  text,
  textColor = "text-white",
  isSticky = true,
  show = true,
  isMobileMenuOpen = false,
}: SiteBannerProps) {
  const [isVisible, setIsVisible] = useState(show)

  if (!isVisible || isMobileMenuOpen) return null
  return (
    <div
      className={`${isSticky ? "sticky top-0" : "relative"} bg-gradient-to-r from-[rgb(20,100,100)] to-[rgb(0,202,159)] ${textColor} w-full transition-all duration-200 z-[100]`}
    >
      <div className="max-w-screen-2xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex-1 text-center">
          <p className="text-sm md:text-base font-medium">
            {text}
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="ml-4 hover:opacity-75 transition-opacity"
          aria-label="Close banner"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

