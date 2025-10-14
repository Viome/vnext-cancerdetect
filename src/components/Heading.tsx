import React from 'react'

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6 | 31
  children: React.ReactNode
  className?: string
}

export default function Heading({ level = 2, children, className = '' }: HeadingProps) {
  // Extract first digit for HTML tag (e.g., 31 -> 3, 22 -> 2)
  const tagLevel = Math.floor(level / 10) || level
  const Tag = `h${tagLevel}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  
  const defaultClasses: Record<number, string> = {
    1: 'text-4xl md:text-5xl lg:text-6xl font-light',
    2: 'text-3xl md:text-4xl lg:text-5xl font-light',
    3: 'text-2xl md:text-3xl lg:text-4xl font-light',
    4: 'text-xl md:text-2xl lg:text-3xl font-light',
    5: 'text-lg md:text-xl lg:text-2xl font-light',
    6: 'text-base md:text-lg lg:text-xl font-light',
    31: 'text-2xl md:text-3xl lg:text-4xl font-semibold',
  }
  
  const combinedClasses = `${defaultClasses[level] || defaultClasses[tagLevel]} ${className}`.trim()
  
  return React.createElement(Tag, { className: combinedClasses }, children)
}

