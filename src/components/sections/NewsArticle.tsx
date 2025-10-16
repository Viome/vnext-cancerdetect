import React from 'react'
import CDImage from '@/components/CDImage'
import CDButton from '@/components/CDButton'

interface NewsArticleProps {
  label?: string
  title: string
  buttonText: string
  buttonHref: string
  image: string
}

export default function NewsArticle({ 
  label, 
  title, 
  buttonText, 
  buttonHref, 
  image 
}: NewsArticleProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      {/* Left Column - Text Content */}
      <div className="space-y-8">
        {label && (
          <p className="text-sm md:text-base font-twk-lausanne font-medium tracking-wider uppercase text-white/80">
            {label}
          </p>
        )}
        
        <h2 className="typography-display2 font-light text-white">
          {title}
        </h2>
        
        <div>
          <CDButton 
            variant="Transparent" 
            theme="Dark"
            width="auto"
            href={buttonHref}
          >
            {buttonText}
          </CDButton>
        </div>
      </div>

      {/* Right Column - Image */}
      <div className="relative w-full aspect-[16/9] lg:aspect-[4/3] overflow-hidden">
        <CDImage
          src={image}
          alt={title}
          fill
          objectFit="cover"
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    </div>
  )
}

