'use client'

import { useEffect, useRef } from 'react'
import { processReferenceLinksSimple } from '@/lib/utils/referenceLinker'

interface ReferenceLinkedHTMLProps {
  html: string
  targetId?: string
  className?: string
  tag?: keyof JSX.IntrinsicElements
}

/**
 * Component that renders HTML content with clickable reference numbers
 * Reference numbers (like ¹, ², [1], [9]) become clickable links that scroll to the References section
 */
export default function ReferenceLinkedHTML({
  html,
  targetId = 'home-references',
  className,
  tag: Tag = 'span',
}: ReferenceLinkedHTMLProps) {
  const containerRef = useRef<HTMLElement>(null)
  
  // Process the HTML to make references clickable
  const processedHtml = html ? processReferenceLinksSimple(html, targetId) : ''
  
  // Set up click handlers for reference links after render
  useEffect(() => {
    if (!containerRef.current) return
    
    const links = containerRef.current.querySelectorAll('.reference-link')
    const cleanupFunctions: Array<() => void> = []
    
    links.forEach(link => {
      const handleClick = (e: Event) => {
        e.preventDefault()
        const target = document.getElementById(targetId)
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
      link.addEventListener('click', handleClick)
      cleanupFunctions.push(() => {
        link.removeEventListener('click', handleClick)
      })
    })
    
    return () => {
      cleanupFunctions.forEach(cleanup => cleanup())
    }
  }, [html, targetId])
  
  if (!html) return null
  
  return (
    <Tag
      ref={containerRef as any}
      className={className}
      dangerouslySetInnerHTML={{ __html: processedHtml }}
    />
  )
}

