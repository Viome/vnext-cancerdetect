"use client"

import { useBannerConfig } from "@/hooks/useBannerConfig"

interface SiteBannerConfigClientProps {
  show: boolean
  text?: string
  backgroundColor?: string
  textColor?: string
  isSticky?: boolean
}

export default function SiteBannerConfigClient({
  show,
  text,
  backgroundColor,
  textColor,
  isSticky
}: SiteBannerConfigClientProps) {
  useBannerConfig({ show, text, backgroundColor, textColor, isSticky })
  return null
}

