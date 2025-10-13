"use client"

import { useNavbar } from "@/contexts/NavbarContext"
import Navbar from "./Navbar"

export default function NavbarWrapper() {
  const { config } = useNavbar()

  if (!config.showNavbar) {
    return null
  }

  return <Navbar isSticky={config.isSticky} />
}
