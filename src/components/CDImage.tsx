'use client'

import React, { useState } from 'react'
import Image from 'next/image'

export type CDImageFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'

export type CDImagePosition = 
  | 'center'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'

interface CDImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  containerClassName?: string
  priority?: boolean
  quality?: number
  sizes?: string
  objectFit?: CDImageFit
  objectPosition?: CDImagePosition
  blurDataURL?: string
  unoptimized?: boolean
  onLoad?: () => void
  onError?: () => void
}

export default function CDImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = '',
  containerClassName,
  priority = false,
  quality = 75,
  sizes,
  objectFit = 'cover',
  objectPosition = 'center',
  blurDataURL,
  unoptimized = false,
  onLoad,
  onError
}: CDImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
    onError?.()
  }

  const getObjectFitClass = () => {
    const fitMap: Record<CDImageFit, string> = {
      contain: 'object-contain',
      cover: 'object-cover',
      fill: 'object-fill',
      none: 'object-none',
      'scale-down': 'object-scale-down'
    }
    return fitMap[objectFit]
  }

  const getObjectPositionClass = () => {
    const positionMap: Record<CDImagePosition, string> = {
      center: 'object-center',
      top: 'object-top',
      bottom: 'object-bottom',
      left: 'object-left',
      right: 'object-right',
      'top-left': 'object-left-top',
      'top-right': 'object-right-top',
      'bottom-left': 'object-left-bottom',
      'bottom-right': 'object-right-bottom'
    }
    return positionMap[objectPosition]
  }

  const imageClasses = [
    getObjectFitClass(),
    getObjectPositionClass(),
    'transition-opacity duration-500',
    isLoading ? 'opacity-0' : 'opacity-100',
    className
  ].filter(Boolean).join(' ')

  const containerClasses = containerClassName || [
    'relative overflow-hidden bg-gray-100',
    fill ? 'w-full h-full' : ''
  ].filter(Boolean).join(' ')

  const imageProps = {
    src,
    alt,
    quality,
    priority,
    sizes,
    unoptimized,
    onLoad: handleLoad,
    onError: handleError,
    className: imageClasses,
    placeholder: blurDataURL ? ('blur' as const) : ('empty' as const),
    ...(blurDataURL && { blurDataURL })
  }

  if (fill) {
    return (
      <div className={containerClasses}>
        {isLoading && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse backdrop-blur-3xl">
            <div className="w-full h-full bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200" />
          </div>
        )}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
            <span>Failed to load image</span>
          </div>
        )}
        <Image
          {...imageProps}
          fill
        />
      </div>
    )
  }

  if (!width || !height) {
    return null
  }

  return (
    <div className={containerClasses} style={{ width, height }}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse backdrop-blur-3xl">
          <div className="w-full h-full bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200" />
        </div>
      )}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
          <span>Failed to load image</span>
        </div>
      )}
      <Image
        {...imageProps}
        width={width}
        height={height}
      />
    </div>
  )
}
