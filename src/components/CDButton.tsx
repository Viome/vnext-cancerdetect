import React from 'react'
import Link from 'next/link'
import { ForwardArrowIcon } from './SVGComponents'

export type ButtonVariant = 
  | 'Standard' 
  | 'Secondary' 
  | 'Transparent' 
  | 'ForwardArrow'
  | 'ForwardArrow-Standard'
  | 'ForwardArrow-Secondary'
  | 'ForwardArrow-Transparent'
  | 'Plus'
  | 'Inactive'

export type ButtonTheme = 'Light' | 'Dark'

export type ButtonWidth = 'auto' | 'full' | 'wide'

export type ButtonAlignment = 'left' | 'right' | 'centered'

interface CDButtonProps {
  variant?: ButtonVariant
  theme?: ButtonTheme
  width?: ButtonWidth
  alignment?: ButtonAlignment
  href?: string
  onClick?: () => void
  disabled?: boolean
  className?: string
  children: React.ReactNode
  hoverOverride?: boolean
  inside?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" className="ml-2">
    <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" />
  </svg>
)

export default function CDButton({
  variant = 'Standard',
  theme = 'Light',
  width = 'auto',
  alignment,
  href,
  onClick,
  disabled = false,
  className = '',
  children,
  hoverOverride = false,
  inside = false,
  type = 'button'
}: CDButtonProps) {
  
  const getBaseClasses = () => {
    return 'inline-flex items-center justify-center min-h-[42px] font-medium leading-6 text-center no-underline transition-all duration-200'
  }
  
  const getPaddingClasses = () => {
    if (variant === 'ForwardArrow' || variant === 'Plus' || variant === 'ForwardArrow-Transparent') {
      return 'p-0'
    }
    return 'px-6 py-2'
  }

  const getWidthClasses = () => {
    if (width === 'full') return 'w-full max-w-[375px]'
    if (width === 'wide') return 'w-full'
    return 'w-auto'
  }

  const getVariantClasses = () => {
    if (variant === 'Inactive') {
      if (theme === 'Light') {
        return 'bg-[var(--gray-3)] text-white hover:bg-[var(--gray-3)] hover:text-white focus:border-2 focus:border-[var(--brand-green-2)]'
      }
      return 'bg-[var(--gray-6)] text-[var(--gray-5)] hover:bg-[var(--gray-6)] hover:text-[var(--gray-5)] focus:border-2 focus:border-[var(--brand-green-2)]'
    }

    if (variant === 'Standard' || variant === 'ForwardArrow-Standard') {
      if (theme === 'Dark') {
        return 'bg-[var(--black)] text-[var(--white)] hover:bg-[var(--brand-green-3)] hover:text-[var(--white)] focus:border-2 focus:border-[var(--brand-green-3)]'
      }
      return 'border border-[var(--black)] bg-[var(--white)] text-[var(--black)] hover:border-[var(--brand-green-3)] hover:text-[var(--brand-green-3)] focus:border-2 focus:border-[var(--brand-green-2)]'
    }

    if (variant === 'Secondary' || variant === 'ForwardArrow-Secondary') {
      if (theme === 'Light') {
        return 'bg-[var(--white)] text-[var(--black)] hover:bg-[var(--brand-green-3)] hover:text-[var(--white)] focus:border-2 focus:border-[var(--brand-green-2)] focus:bg-[var(--white)] focus:text-[var(--black)]'
      }
      return 'border border-[var(--white)] bg-[var(--black)] text-[var(--white)] hover:border-[var(--brand-green-3)] focus:border-2 focus:border-[var(--brand-green-2)] focus:bg-[var(--black)] focus:text-[var(--white)]'
    }

    if (variant === 'Transparent' || variant === 'ForwardArrow-Transparent') {
      if (theme === 'Light') {
        return 'border border-[var(--black)] bg-transparent text-[var(--black)] hover:border-[var(--brand-green-3)] hover:text-[var(--brand-green-3)] focus:border-2 focus:border-[var(--brand-green-2)]'
      }
      return 'border border-[var(--white)] bg-transparent text-[var(--white)] hover:border-[var(--brand-green-3)] hover:text-[var(--brand-green-3)] focus:border-2 focus:border-[var(--brand-green-2)]'
    }

    if (variant === 'ForwardArrow' || variant === 'Plus') {
      const baseClasses = 'justify-evenly'
      if (theme === 'Light') {
        return `${baseClasses} text-[var(--black)] hover:text-[var(--brand-green-3)] focus:text-[var(--brand-green-2)]`
      }
      return `${baseClasses} text-[var(--white)] hover:text-[var(--gray-4)] focus:text-[var(--brand-green-2)]`
    }

    return ''
  }

  const getSpecialClasses = () => {
    const classes = []
    
    if (hoverOverride) {
      classes.push('hover:text-[var(--gray-2)]')
    }
    
    if (alignment === 'centered') {
      classes.push('justify-center')
    }
    
    return classes.join(' ')
  }

  const renderContent = () => {
    const showArrow = variant.includes('ForwardArrow') || variant === 'ForwardArrow'
    const showPlus = variant === 'Plus'
    
    if (inside) {
      return (
        <span className="inline-flex items-center whitespace-nowrap w-auto">
          <span className="flex items-center">
            <span className="block w-[72px] h-[1px] bg-[var(--white)] mx-6" />
          </span>
          {children}
        </span>
      )
    }
    
    if (showArrow || showPlus) {
      return (
        <span className="flex items-center text-base whitespace-nowrap">
          {children}
          {showArrow && <ForwardArrowIcon />}
          {showPlus && <PlusIcon />}
        </span>
      )
    }
    
    return children
  }

  const combinedClasses = [
    getBaseClasses(),
    getPaddingClasses(),
    getWidthClasses(),
    getVariantClasses(),
    getSpecialClasses(),
    className
  ].filter(Boolean).join(' ')

  const buttonProps = {
    className: combinedClasses,
    onClick: !disabled ? onClick : undefined,
    disabled,
    type: href ? undefined : type
  }

  if (href && !disabled) {
    return (
      <Link href={href} className={combinedClasses}>
        {renderContent()}
      </Link>
    )
  }

  return (
    <button {...buttonProps}>
      {renderContent()}
    </button>
  )
}

