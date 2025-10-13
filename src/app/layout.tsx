import type { Viewport } from "next"
import "./globals.css"
import "../styles/fonts.css"
import { NavbarProvider } from "@/contexts/NavbarContext"
import NavbarWrapper from "@/components/Navbar/NavbarWrapper"
import { createMetadata } from "@/components/Metadata"
import MetadataHead from "@/components/Metadata"

export const metadata = createMetadata({
  title: "CancerDetect® Oral Cancer Test Kit & Throat Cancer Test at Home",
  description: "Viome's CancerDetect Oral & Throat is the first early detection throat and oral cancer test kit made accessible in the convenience of one's home.",
  themeMode: "light",
  siteUrl: "https://www.viome.com",
  sitemapUrl: "https://www.viome.com/sitemap.xml",
  manifestUrl: "/site.webmanifest",
  maskIconColor: "#6d4ab0"
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <MetadataHead themeMode="light" />
      </head>
      <body className="antialiased">
        <NavbarProvider>
          <NavbarWrapper />
          {children}
        </NavbarProvider>
      </body>
    </html>
  )
}