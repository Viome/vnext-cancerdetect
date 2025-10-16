"use client"

import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import navbarConfig from "@/data/navbar-config.json"

import { cn as classNames } from "@/lib/utils"
import { useNavbar } from "@/contexts/NavbarContext"

import NavTopLinksLeft from "./NavTopLinksLeft"
import NavTopLinksMobile from "./NavTopLinksMobile"
import NavTopLinksRight from "./NavTopLinksRight"

interface NavbarProps {
  isSticky?: boolean
}

const Navbar = ({ isSticky = true }: NavbarProps) => {
  const { setIsMobileMenuOpen } = useNavbar()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const [dropdownContent, setDropdownContent] = useState<{
    [key: string]: React.ReactNode
  }>({})
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    setIsMobileMenuOpen(isMenuOpen)
  }, [isMenuOpen, setIsMobileMenuOpen])
  const handleDropdownEnter = (dropdownKey: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    setActiveDropdown(dropdownKey)
  }

  const handleDropdownLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 200)
  }

  const handleDropdownContentEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
  }

  const handleContentReady = (content: { [key: string]: React.ReactNode }) => {
    setDropdownContent(content)
  }

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("mobile-menu-open")
    } else {
      document.body.classList.remove("mobile-menu-open")
    }

    return () => {
      document.body.classList.remove("mobile-menu-open")
    }
  }, [isMenuOpen])

  return (
    <header
      className={classNames(
        "bg-white border-b px-[1rem] md:px-[2.5rem] h-[80px] z-50 border-[#f4f4f5]",
        isSticky ? "sticky" : "relative"
      )}
      style={{
        overscrollBehavior: "none",
        top: isSticky ? "var(--site-banner-height, 0px)" : undefined,
      }}
    >
      <nav className="flex items-center h-full w-full max-w-[1440px] m-auto">
        {/* Mobile hamburger - left side */}
        <div className="flex min-[1200px]:hidden mr-4">
          <button
            onClick={toggleMenu}
            className="flex flex-col justify-center items-center w-8 h-8 cursor-pointer"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-black transition-all duration-300 ease-in-out ${
                isMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-black mt-1 transition-all duration-300 ease-in-out ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-black mt-1 transition-all duration-300 ease-in-out ${
                isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>

        {/* Logo */}
        <Link href={navbarConfig.branding.logo.href}>
        <Image
          width={160}
          height={22}
          src={navbarConfig.branding.logo.url}
          alt="Viome logo"
          className="cursor-pointer"
         
          priority={true}
          quality={85}
          sizes="160px"
        />
        </Link>

        {/* Desktop navigation */}
        <div
          className={classNames(
            "hidden min-[1200px]:flex",
            "flex-grow flex-shrink-0 basis-auto items-center justify-between h-full"
          )}
        >
          <NavTopLinksLeft
            onDropdownEnter={handleDropdownEnter}
            onDropdownLeave={handleDropdownLeave}
            activeDropdown={activeDropdown}
            onContentReady={handleContentReady}
          />
          <NavTopLinksRight />
        </div>

        {/* Mobile right links */}
        <div className="flex min-[1200px]:hidden ml-auto items-center gap-4">
          <Link href="https://buy.viome.com/cart" className="text-sm font-medium">
            Cart
          </Link>
          <Link href="/eligibility/register" className="text-sm font-medium">
            Order Now
          </Link>
        </div>

        <div
          className={classNames(
            "fixed z-[19] bg-white overflow-y-hidden transition-all duration-500 ease-in-out",
            "inset-0 block min-[1200px]:hidden mobile-menu-scroll-container",
            isMenuOpen ? "max-h-screen overflow-y-scroll" : "max-h-0"
          )}
          style={{
            top: `calc(70px + var(--site-banner-height, 0px))`,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          onTouchMove={(e) => {
            e.stopPropagation()
          }}
        >
          <div className="relative flex flex-col h-full justify-between">
            <NavTopLinksMobile />

            <div className="sticky bottom-0 flex gap-4 p-4 bg-gray-100">
              {navbarConfig.navigation.mobile.primaryActions.map(
                (action, index) => (
                  <Link
                    key={index}
                    href={action.href}
                    className={`flex-1 py-4 px-6 flex items-center justify-center gap-2 font-medium max-h-[42px] ${
                      action.type === "primary"
                        ? "bg-black text-white"
                        : "bg-white text-black border border-black"
                    }`}
                  >
                    {action.label}
                    <span className="text-xl">→</span>
                  </Link>
                )
              )}
            </div>
          </div>
        </div>

        <div
          className={classNames(
            "absolute left-0 right-0 w-full bg-white shadow-lg hidden min-[1200px]:block",
            "transition-all duration-300 ease-in-out origin-top",
            activeDropdown
              ? "opacity-100 scale-y-100"
              : "opacity-0 pointer-events-none scale-y-0"
          )}
          style={{ top: "80px" }}
          onMouseEnter={handleDropdownContentEnter}
          onMouseLeave={handleDropdownLeave}
        >
          <div className="max-w-[1440px] mx-auto pt-4 pr-20 pb-4 pl-20">
            {Object.keys(dropdownContent).map((key) => (
              <div
                key={key}
                className={activeDropdown === key ? "block" : "hidden"}
              >
                {dropdownContent[key]}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
