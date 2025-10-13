"use client"

import { useNavbarConfig } from "@/hooks/useNavbarConfig"

interface NavbarConfigClientProps {
  showNavbar: boolean
  isSticky?: boolean
}

export default function NavbarConfigClient({ 
  showNavbar, 
  isSticky = true 
}: NavbarConfigClientProps) {
  useNavbarConfig({ showNavbar, isSticky })
  return null
}
