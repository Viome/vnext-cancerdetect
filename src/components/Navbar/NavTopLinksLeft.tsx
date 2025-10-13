import React, { useEffect, useState } from "react"
import Link from "next/link"
import navbarConfig from "@/data/navbar-config.json"

import NavDirectLinksText from "./NavComponents/NavDirectLinksText"
import { NavImageTitleLink } from "./NavComponents/NavDisplayLinks"
import NavSectionHeader from "./NavComponents/NavSectionHeader"

interface NavTopLinksLeftProps {
  onDropdownEnter: (dropdownKey: string) => void
  onDropdownLeave: () => void
  activeDropdown: string | null
  onContentReady: (content: { [key: string]: React.ReactNode }) => void
}

const NavTopLinksLeft = ({
  onDropdownEnter,
  onDropdownLeave,
  activeDropdown,
  onContentReady,
}: NavTopLinksLeftProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const generateDropdownKey = (label: string) => {
    return label
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
  }

  const navigationConfig = navbarConfig.navigation.left

  const renderShopDropdown = () => {
    const shopConfig = navbarConfig.navigation.left.find(
      (item) => item.isShopDropdown
    )
    if (!shopConfig?.dropdown || !shopConfig.dropdown.sections) return null

    const firstSection = shopConfig.dropdown.sections[0]
    const products = firstSection?.items || []
    const actions = firstSection?.actions || []
    const sidebarSections = shopConfig.dropdown.sidebar || []

    return (
      <div className="flex gap-8">
        {/* Left Section - 70% */}
        <div className="flex-[0.7] pr-8 border-r border-gray-200">
          <div className="mb-6">
            <NavSectionHeader>
              <p className="typography-navSectionHeader">
                {firstSection?.title || "Tests"}
              </p>
            </NavSectionHeader>
            <NavImageTitleLink className="my-4">
              <span>{firstSection?.subtitle || "Need help choosing?"}</span>
            </NavImageTitleLink>

            {/* Product Grid - Single Row */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {products.map((product, index) => (
                <Link
                  key={index}
                  href={product.href}
                  className="block group transition-all duration-200"
                >
                  <div className="space-y-3 overflow-hidden">
                    <div className="w-full h-[200px] overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105 mb-[0.75rem]"
                      />
                    </div>
                    <NavImageTitleLink>
                      <span>{product.title}</span>
                    </NavImageTitleLink>
                  </div>
                </Link>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="w-[30%] flex flex-col gap-4 mb-8 mt-[3rem]">
              {actions.map((action, index) => (
                <Link
                  key={index}
                  href={action.href}
                  className={`w-full py-3 px-4 rounded flex items-center justify-center gap-2 font-medium ${
                    action.type === "primary"
                      ? "bg-black text-white"
                      : "border border-gray-300 text-black bg-white"
                  }`}
                >
                  {action.label}
                  <span>→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section - 30% */}
        <div className="flex-[0.3]">
          {sidebarSections.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className={sectionIndex === 0 ? "mb-8 mt-4" : "mt-4"}
            >
              <NavSectionHeader>
                <p className="typography-navSectionHeader">{section.title}</p>
              </NavSectionHeader>
              <ul className="space-y-3 mt-[1.5rem]">
                {section.items.map((item, itemIndex) => (
                  <NavDirectLinksText
                    key={itemIndex}
                    href={item.href}
                    list
                    className="typography-navLinkText pb-2"
                  >
                    {item.label}
                  </NavDirectLinksText>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderDropdownContent = (item: any) => {
    const dropdownKey = generateDropdownKey(item.label)

    if (!item.showArrow) return null

    if (item.isShopDropdown) {
      return renderShopDropdown()
    }

    if (!item.dropdown?.items || item.dropdown.items.length === 0) return null

    return (
      <>
        <NavSectionHeader className="pt-[0.5rem]">
          <span className="typography-navSectionHeader">
            {item.dropdown.title || item.label}
          </span>
        </NavSectionHeader>
        <div className="grid grid-cols-5 mt-8 gap-[20px] mb-4">
          {item.dropdown.items.map((subItem: any, subIndex: number) => (
            <div
              key={subIndex}
              className="flex flex-col items-center text-left w-full"
            >
              <Link
                href={subItem.href}
                className="block group transition-all duration-200 w-full"
              >
                {subItem.image && (
                  <div className="h-[200px] w-full overflow-hidden mb-4">
                    <img
                      src={subItem.image}
                      alt={subItem.label}
                      className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                  </div>
                )}
                <NavImageTitleLink>
                  <span>{subItem.label}</span>
                </NavImageTitleLink>
              </Link>
            </div>
          ))}
        </div>
      </>
    )
  }

  useEffect(() => {
    const dropdownContent: { [key: string]: React.ReactNode } = {}

    navigationConfig.forEach((item) => {
      if (
        item.showArrow &&
        ((item.dropdown?.items && item.dropdown.items.length > 0) ||
          item.isShopDropdown)
      ) {
        const dropdownKey = generateDropdownKey(item.label)
        dropdownContent[dropdownKey] = renderDropdownContent(item)
      }
    })

    onContentReady(dropdownContent)
  }, []) // Only run on mount

  const renderNavItem = (item: any, index: number) => {
    const dropdownKey = generateDropdownKey(item.label)

    const handleMouseEnter = () => {
      setHoveredItem(dropdownKey)
      if (
        item.showArrow &&
        ((item.dropdown?.items && item.dropdown.items.length > 0) ||
          item.isShopDropdown)
      ) {
        onDropdownEnter(dropdownKey)
      }
    }

    const handleMouseLeave = () => {
      setHoveredItem(null)
      if (item.showArrow) {
        onDropdownLeave()
      }
    }

    // Handle regular links (non-dropdown items)
    if (item.type === "link" && !item.showArrow) {
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
      <li key={index} className="relative h-full">
        <div
          className="flex items-center justify-start p-0 pr-[1.5625rem] cursor-pointer h-full"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <p className="typography-dropdownText">{item.label}</p>
          {item.showArrow && (
            <img
              src={navbarConfig.assets.arrowIcon}
              alt="Arrow"
              className={`ml-2 w-3 h-3 transition-transform duration-200`}
              style={{
                transform:
                  activeDropdown === dropdownKey
                    ? "rotate(90deg)"
                    : "rotate(-90deg)",
              }}
            />
          )}
        </div>
      </li>
    )
  }

  return (
    <div className="flex items-center h-full">
      <ul className="flex flex-row ml-[3.125rem] items-center m-0 p-4 list-none">
        {navigationConfig.map((item, index) => renderNavItem(item, index))}
      </ul>
    </div>
  )
}

export default NavTopLinksLeft
