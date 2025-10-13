"use client"

import React, { createContext, useContext, ReactNode } from "react"

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

  return (
    <NavbarContext.Provider value={{ config, setConfig }}>
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
