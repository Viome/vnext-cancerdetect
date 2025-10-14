import React, { useState } from "react"
import Link from "next/link"
import navbarConfig from "@/data/navbar-config.json"

import { useMediaQuery } from "@/lib/hooks/useMediaQuery"

import MobileShopDropdown from "./MobileShopDropdown"
import NavDisplayLinks from "./NavComponents/NavDisplayLinks"

const NavTopLinksMobile = () => {
  const [openItems, setOpenItems] = useState<number[]>([])
  const [isShopOpen, setIsShopOpen] = useState(true)
  const isSmallScreen = useMediaQuery("(max-width: 768px)")

  const mobileNavigationConfig =
    navbarConfig.navigation.mobile.navigation.filter(
      (item) => !item.isShopDropdown
    )

  const toggleItem = (index: number) => {
    if (openItems.includes(index)) {
      setOpenItems(openItems.filter((i) => i !== index))
    } else {
      setOpenItems([...openItems, index])
    }
  }

  const toggleShop = () => {
    setIsShopOpen(!isShopOpen)
  }

  const renderShopItem = () => {
    return (
      <li className="mb-[1.25rem] border-y border-[#a0a1ad] py-4">
        <MobileShopDropdown isOpen={isShopOpen} />
      </li>
    )
  }

  const renderMobileNavItem = (item: any, index: number) => {
    const isOpen = openItems.includes(index)

    // Handle regular links (non-dropdown items)
    if (item.type === "link" && !item.showArrow) {
      return (
        <li key={index} className="mb-[1.25rem] border-b border-[#a0a1ad] pb-4">
          <Link
            href={item.href}
            className="flex items-center justify-between pl-[0.5rem] cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span className="text-2xl font-normal">{item.label}</span>
          </Link>
        </li>
      )
    }

    // Handle dropdown items
    return (
      <li key={index} className="mb-[1.25rem] border-b border-[#a0a1ad] pb-4">
        <div
          className="flex items-center justify-between pl-[0.5rem] cursor-pointer"
          onClick={() => item.showArrow && toggleItem(index)}
        >
          <span className="text-2xl font-normal">{item.label}</span>
          {item.showArrow && (
            <img
              src={navbarConfig.assets.arrowIcon}
              alt="Arrow"
              className={`w-3 h-3 transition-transform duration-300 ease-in-out ${
                isOpen ? "rotate-90" : "rotate-[-90deg]"
              }`}
            />
          )}
        </div>

        {item.showArrow && (
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isOpen ? "opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="p-4 pl-[0.5rem]">
              <ul className="space-y-3">
                {item.items?.map((subItem: any, subIndex: number) => (
                  <li key={subIndex}>
                    <NavDisplayLinks
                      href={subItem.href}
                      imageSrc={isSmallScreen ? undefined : subItem.image}
                      title={subItem.label}
                      imageClassName="!h-[200px]"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </li>
    )
  }

  return (
    <div className="flex flex-col flex-grow">
      <ul className="flex flex-col p-4 list-none">
        {mobileNavigationConfig.map((item, index) =>
          renderMobileNavItem(item, index)
        )}
      </ul>
    </div>
  )
}

export default NavTopLinksMobile
