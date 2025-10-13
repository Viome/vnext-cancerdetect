import React from "react"
import Link from "next/link"

import { cn as classNames } from "@/lib/utils"

export const NavImageTitleLink = ({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={`text-[1rem] !font-medium text-black ${className}`}>
      {children}
    </div>
  )
}

interface NavDisplayLinksProps {
  href: string
  imageSrc?: string
  imageSrcMobile?: string
  title?: string
  altText?: string
  linkClassName?: string
  imageClassName?: string
}

const NavDisplayLinks = ({
  href,
  imageSrc,
  imageSrcMobile,
  title,
  altText,
  imageClassName,
  linkClassName,
}: NavDisplayLinksProps) => {
  return (
    <Link
      href={href}
      prefetch={true}
      className={classNames(
        // spacing, background, border, transition
        "p-2 hover:bg-gray-50 rounded transition-colors duration-200 group",
        // layout and alignment
        "flex flex-row items-center space-x-8",
        // responsive overrides
        imageSrc &&
          "max-[768px]:grid max-[768px]:grid-cols-2 max-[768px]:gap-3 max-[768px]:space-x-0 max-[768px]:items-start",
        linkClassName
      )}
    >
      {imageSrc && (
        <picture
          className={`w-1/2 h-full max-h-[20rem] max-[768px]:w-full max-[768px]:max-h-[200px] overflow-hidden`}
        >
          {imageSrcMobile && (
            <source media="(max-width: 768px)" srcSet={imageSrcMobile} />
          )}
          <img
            src={imageSrc}
            alt={altText || title || ""}
            className={`
                            w-full h-full object-cover rounded transition-transform duration-200 group-hover:scale-105
                            ${imageClassName}
                        `}
          />
        </picture>
      )}
      <NavImageTitleLink className="max-[768px]:self-center">
        <span>{title || "Full Body Intelligence"}</span>
      </NavImageTitleLink>
    </Link>
  )
}

export default NavDisplayLinks
