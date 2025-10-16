import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getPageBySlug } from "@/lib/content"
import { renderSection } from "@/lib/registry"
import NavbarConfigClient from "@/components/Navbar/NavbarConfigClient"
import SiteBannerConfigClient from "@/components/SiteBannerConfigClient"

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("home")
  
  if (!page) {
    return {
      title: "Home | Cancer Detection App",
      description: "Advanced cancer detection application",
    }
  }

  return {
    title: page.seo?.title || "Home | Cancer Detection App",
    description: page.seo?.description || "Advanced cancer detection application",
    openGraph: page.seo?.openGraph ? {
      title: page.seo.openGraph.title || page.seo?.title || "Home | Cancer Detection App",
      description: page.seo.openGraph.description || page.seo?.description || "Advanced cancer detection application",
      url: page.seo.openGraph.url,
    } : undefined,
  }
}

export default async function Home() {
  try {
    const page = await getPageBySlug("home")

    if (!page) {
      notFound()
    }

    const navbarConfig = page.layout?.navbar || {}
    const isNavbarSticky = navbarConfig.sticky !== false
    const bannerConfig = page.layout?.banner

    return (
      <div className={page.layout?.className || "min-h-screen"}>
        {bannerConfig && (
          <SiteBannerConfigClient
            show={bannerConfig.show ?? false}
            text={bannerConfig.text}
            backgroundColor={bannerConfig.backgroundColor}
            textColor={bannerConfig.textColor}
            isSticky={bannerConfig.isSticky}
          />
        )}
        <NavbarConfigClient 
          showNavbar={navbarConfig.show !== false} 
          isSticky={isNavbarSticky} 
        />
        <main className="flex flex-col">
          {page.sections.map((section, index) => {
            try {
              return renderSection(section, index)
            } catch (error) {
              console.error(`Error rendering section ${index} (${section.type}):`, error)
              return (
                <div key={section.sectionId || index} className="p-4 bg-red-100 text-red-800">
                  Error rendering {section.type} section
                </div>
              )
            }
          })}
        </main>
        {/* Add your footer component */}
      </div>
    )
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Page
          </h1>
          <p className="text-gray-600">
            There was an error loading the home page content.
          </p>
        </div>
      </div>
    )
  }
}