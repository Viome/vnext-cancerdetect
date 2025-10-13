import React from "react"

const NavSectionHeader = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <h2
      className={`font-twk-lausanne font-medium${className ? ` ${className}` : ""}`}
      style={{
        fontSize: "clamp(1rem, 1vw + 1rem, 1.5rem)",
        lineHeight: "1.2",
      }}
    >
      {children}
    </h2>
  )
}

export default NavSectionHeader
