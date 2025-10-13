import React from "react"
import Link from "next/link"
import navbarConfig from "@/data/navbar-config.json"

import { useMediaQuery } from "@/lib/hooks/useMediaQuery"

import NavDirectLinksText from "./NavComponents/NavDirectLinksText"
import NavDisplayLinks, {
  NavImageTitleLink,
} from "./NavComponents/NavDisplayLinks"
import NavSectionHeader from "./NavComponents/NavSectionHeader"

interface MobileShopDropdownProps {
  isOpen: boolean
}

const MobileShopDropdown = ({ isOpen }: MobileShopDropdownProps) => {
  // Get shop config from navbar config
  const shopConfig = navbarConfig.navigation.left.find(
    (item) => item.isShopDropdown
  )
  if (!shopConfig?.dropdown || !shopConfig.dropdown.sections) return null

  const firstSection = shopConfig.dropdown.sections[0]
  const products = firstSection?.items || []
  const actions = firstSection?.actions || []
  const sidebarSections = shopConfig.dropdown.sidebar || []

  // Mobile-specific image mapping (you may want to add these to your config)
  const mobileImageMap: { [key: string]: string } = {
    "Full Body Intelligence Test":
      "https://strapi.azure.viome.com/viome-strapi/uploads/01_1_e1eed330b7.png",
    "Gut Intelligence Test":
      "https://strapi.azure.viome.com/viome-strapi/uploads/02_d554924330.png",
    "Oral Health Intelligence Test":
      "https://strapi.azure.viome.com/viome-strapi/uploads/03_1_a63e89ac8d.png",
    Bundles:
      "https://strapi.azure.viome.com/viome-strapi/uploads/04_45a3ef5101.png",
  }
  return (
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? "max-h-full opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="p-4 pl-[0.5rem]">
        <div className="flex flex-row gap-4 max-[768px]:flex-col max-[768px]:gap-6">
          {/* Left Section - 70% */}
          <div className="flex-[0.7] max-[768px]:flex-[1] border-[#e5e7eb] border-r max-[768px]:border-r-0 max-[768px]:border-none max-[768px]:pb-4">
            <NavSectionHeader>
              <p className="typography-navSectionHeader">
                {firstSection?.title || "Tests"}
              </p>
            </NavSectionHeader>
            <NavImageTitleLink className="my-4">
              <span>{firstSection?.subtitle || "Need help choosing?"}</span>
            </NavImageTitleLink>
            <div className="min-[768px]:space-y-2">
              {products.map((product, idx) => (
                <NavDisplayLinks
                  key={product.title}
                  href={product.href}
                  imageSrc={mobileImageMap[product.title] || product.image}
                  title={product.title}
                  imageClassName="max-[768px]:object-contain h-[16vh] max-[768px]:!h-[14vh]"
                />
              ))}
            </div>
            <div className="w-[90%] mx-auto hidden min-[768px]:flex flex-col gap-4 mb-8 mt-[3rem]">
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

          {/* Right Section - 30% */}
          <div className="flex-[0.3] max-[768px]:flex-[1]">
            {sidebarSections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <NavSectionHeader>
                  <p className="typography-navSectionHeader">{section.title}</p>
                </NavSectionHeader>
                <ul className="flex flex-col justify-evenly items-start mt-[1.5rem] mb-4 gap-4">
                  {section.items.map((item, itemIndex) => (
                    <NavDirectLinksText
                      key={itemIndex}
                      href={item.href}
                      list
                      className="pb-4 pl-2 typography-navLinkText"
                    >
                      {item.label}
                    </NavDirectLinksText>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex min-[768px]:hidden flex-col gap-4">
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
    </div>
  )
}

export default MobileShopDropdown
