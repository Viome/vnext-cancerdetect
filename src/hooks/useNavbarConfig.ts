"use client"

import { useEffect } from "react"
import { useNavbar } from "@/contexts/NavbarContext"

interface NavbarConfig {
  showNavbar: boolean
  isSticky?: boolean
}

export function useNavbarConfig(config: NavbarConfig) {
  const { setConfig } = useNavbar()

  useEffect(() => {
    setConfig(config)
    
    // Cleanup: reset to default when component unmounts
    return () => {
      setConfig({ showNavbar: true, isSticky: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.showNavbar, config.isSticky, setConfig])
}

// Helper function for pages that want to hide the navbar
export function useHideNavbar() {
  useNavbarConfig({ showNavbar: false })
}

// Helper function for pages that want to show non-sticky navbar
export function useNonStickyNavbar() {
  useNavbarConfig({ showNavbar: true, isSticky: false })
}
