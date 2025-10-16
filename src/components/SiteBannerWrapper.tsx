"use client"

import { useNavbar } from "@/contexts/NavbarContext"
import SiteBanner from "./SiteBanner"

export default function SiteBannerWrapper() {
  const { bannerConfig, isMobileMenuOpen } = useNavbar()
  console.log('isMobileMenuOpen', isMobileMenuOpen)
  if (!bannerConfig.show || !bannerConfig.text) {
    return null
  }

  return (
    <SiteBanner
      text={bannerConfig.text}
      textColor={bannerConfig.textColor}
      isSticky={bannerConfig.isSticky}
      show={bannerConfig.show}
      isMobileMenuOpen={isMobileMenuOpen}
    />
  )
}

