"use client"

import React, { createContext, useContext, ReactNode, useCallback, useMemo } from "react"

interface NavbarConfig {
  showNavbar: boolean
  isSticky?: boolean
}

interface NavbarContextType {
  config: NavbarConfig
  setConfig: (config: NavbarConfig) => void
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined)

interface NavbarProviderProps {
  children: ReactNode
  initialConfig?: NavbarConfig
}

export function NavbarProvider({ 
  children, 
  initialConfig = { showNavbar: true, isSticky: true } 
}: NavbarProviderProps) {
  const [config, setConfig] = React.useState<NavbarConfig>(initialConfig)

  const stableSetConfig = useCallback((newConfig: NavbarConfig) => {
    setConfig(newConfig)
  }, [])

  const value = useMemo(() => ({
    config,
    setConfig: stableSetConfig
  }), [config, stableSetConfig])

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
