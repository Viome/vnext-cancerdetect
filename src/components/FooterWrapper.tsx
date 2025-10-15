"use client"

import Footer from "@/components/Footer"
import footerData from "@/data/footer.json"

export default function FooterWrapper() {
  return <Footer data={footerData as any} />
}

