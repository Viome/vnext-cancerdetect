"use client"

import React, { createContext, useContext, ReactNode, useCallback, useMemo } from "react"

interface NavbarConfig {
  showNavbar: boolean
  isSticky?: boolean
}

interface BannerConfig {
  show: boolean
  text?: string
  backgroundColor?: string
  textColor?: string
  isSticky?: boolean
}

interface NavbarContextType {
  config: NavbarConfig
  setConfig: (config: NavbarConfig) => void
  bannerConfig: BannerConfig
  setBannerConfig: (config: BannerConfig) => void
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (isOpen: boolean) => void
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined)

interface NavbarProviderProps {
  children: ReactNode
  initialConfig?: NavbarConfig
  initialBannerConfig?: BannerConfig
}

export function NavbarProvider({ 
  children, 
  initialConfig = { showNavbar: true, isSticky: true },
  initialBannerConfig = { show: false }
}: NavbarProviderProps) {
  const [config, setConfig] = React.useState<NavbarConfig>(initialConfig)
  const [bannerConfig, setBannerConfig] = React.useState<BannerConfig>(initialBannerConfig)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  const stableSetConfig = useCallback((newConfig: NavbarConfig) => {
    setConfig(newConfig)
  }, [])

  const stableSetBannerConfig = useCallback((newConfig: BannerConfig) => {
    setBannerConfig(newConfig)
  }, [])

  const stableSetIsMobileMenuOpen = useCallback((isOpen: boolean) => {
    console.log('isOpen', isOpen)
    setIsMobileMenuOpen(isOpen)
  }, [])

  const value = useMemo(() => ({
    config,
    setConfig: stableSetConfig,
    bannerConfig,
    setBannerConfig: stableSetBannerConfig,
    isMobileMenuOpen,
    setIsMobileMenuOpen: stableSetIsMobileMenuOpen
  }), [config, stableSetConfig, bannerConfig, stableSetBannerConfig, isMobileMenuOpen, stableSetIsMobileMenuOpen])

  return (
    <NavbarContext.Provider value={value}>
      {children}
    </NavbarContext.Provider>
  )
}

export function useNavbar() {
  const context = useContext(NavbarContext)
  if (context === undefined) {
    throw new Error("useNavbar must be used within a NavbarProvider")
  }
  return context
}
