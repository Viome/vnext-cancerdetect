import React from "react"
import Link from "next/link"

interface NavDirectLinksTextProps {
  href: string
  children: React.ReactNode
  className?: string
  list?: boolean
}

const NavDirectLinksText = ({
  href,
  children,
  className = "",
  list,
}: NavDirectLinksTextProps) => {
  const Comp = list ? "li" : "div"

  return (
    <Comp>
      <Link href={href} prefetch={true} className={`block text-[1.125rem] ${className}`}>
        <span>{children}</span>
      </Link>
    </Comp>
  )
}

export default NavDirectLinksText
