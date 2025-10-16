"use client"

import { useEffect } from "react"
import { useNavbar } from "@/contexts/NavbarContext"

interface BannerConfig {
  show: boolean
  text?: string
  backgroundColor?: string
  textColor?: string
  isSticky?: boolean
}

export function useBannerConfig(config: BannerConfig) {
  const { setBannerConfig } = useNavbar()

  useEffect(() => {
    setBannerConfig(config)
    
    return () => {
      setBannerConfig({ show: false })
    }
  }, [config.show, config.text, config.backgroundColor, config.textColor, config.isSticky, setBannerConfig])
}

