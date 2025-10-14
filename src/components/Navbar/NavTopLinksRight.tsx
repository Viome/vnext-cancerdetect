import React, { useState, useRef, useEffect, useCallback, memo } from "react"
import Link from "next/link"
import navbarConfig from "@/data/navbar-config.json"

// Memoized dropdown item component
const DropdownItem = memo(({ item, onMouseEnter, onMouseLeave }: {
  item: any
  onMouseEnter: () => void
  onMouseLeave: () => void
}) => (
  <div 
    className="absolute top-full left-0 mt-1 bg-white border border-gray-200 shadow-lg z-50 min-w-[120px]"
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    {item.dropdown?.items?.map((dropdownItem: any, dropdownIndex: number) => (
      <Link
        key={dropdownIndex}
        href={dropdownItem.href}
        className="block px-4 py-3 text-sm text-gray-800 hover:bg-gray-50 transition-colors duration-150 first:pt-3 last:pb-3"
      >
        {dropdownItem.label}
      </Link>
    ))}
  </div>
))

DropdownItem.displayName = 'DropdownItem'

const NavTopLinksRight = memo(() => {
  const navigationConfig = navbarConfig.navigation.right
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleDropdownOpen = useCallback((itemId: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setActiveDropdown(itemId)
  }, [])

  const handleDropdownClose = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150) // Small delay to allow moving to dropdown
  }, [])

  const handleDropdownMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const renderNavItem = useCallback((item: any, index: number) => {
    const isDropdownOpen = activeDropdown === item.id

    const handleItemMouseEnter = useCallback(() => {
      if (item.type === 'dropdown') {
        handleDropdownOpen(item.id)
      }
    }, [item.type, item.id, handleDropdownOpen])

    const handleItemMouseLeave = useCallback(() => {
      if (item.type === 'dropdown') {
        handleDropdownClose()
      }
    }, [item.type, handleDropdownClose])

    // Handle button items
    if (item.type === 'button') {
      return (
        <li key={index} className="relative h-full">
          <Link
            href={item.href}
            className="flex items-center justify-center px-6 py-2 bg-black text-white cursor-pointer hover:bg-gray-800 transition-colors rounded-sm font-medium text-sm"
          >
            {item.label}
          </Link>
        </li>
      )
    }

    // Handle regular links (non-dropdown items)
    if (item.type === 'link' && !item.showArrow) {
      return (
        <li key={index} className="relative h-full">
          <Link
            href={item.href}
            className="flex items-center justify-start p-0 pr-[1.5625rem] cursor-pointer h-full hover:opacity-80 transition-opacity"
          >
            <p className="typography-dropdownText">{item.label}</p>
          </Link>
        </li>
      )
    }

    // Handle dropdown items
    return (
      <li key={index} className="relative h-full group">
        <div 
          className="flex items-center justify-start p-0 pr-[1.5625rem] cursor-pointer h-full"
          onMouseEnter={handleItemMouseEnter}
          onMouseLeave={handleItemMouseLeave}
        >
          <p className="typography-dropdownText">{item.label}</p>
          {item.showArrow && (
            <img
              src={navbarConfig.assets.arrowIcon}
              alt="Arrow"
              className={`ml-2 w-3 h-3 transition-transform duration-200 ${
                isDropdownOpen ? 'rotate-90' : 'rotate-[-90deg]'
              }`}
            />
          )}
        </div>
        
        {/* Dropdown Content */}
        {item.type === 'dropdown' && isDropdownOpen && (
          <DropdownItem
            item={item}
            onMouseEnter={handleDropdownMouseEnter}
            onMouseLeave={handleDropdownClose}
          />
        )}
      </li>
    )
  }, [activeDropdown, handleDropdownOpen, handleDropdownClose, handleDropdownMouseEnter])

  return (
    <div className="flex items-center h-full">
      <ul className="flex flex-row items-center list-none">
        {navigationConfig.map((item, index) => renderNavItem(item, index))}
      </ul>
    </div>
  )
})

NavTopLinksRight.displayName = 'NavTopLinksRight'

export default NavTopLinksRight
