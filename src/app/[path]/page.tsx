import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { getPageBySlug, getAllPageSlugs } from "@/lib/content"
import { renderSection } from "@/lib/registry"
import { DEFAULT_OG_IMAGE } from "@/lib/utils/constants"

interface PageProps {
  params: Promise<{ path: string }>
}

// Generate static paths for all pages
export async function generateStaticParams() {
  try {
    const slugs = await getAllPageSlugs()
    return slugs
      .filter((slug) => slug !== "home")
      .map((slug) => ({ path: slug }))
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}

// Generate metadata for dynamic pages
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { path } = await params
  
  // Redirect home requests to root
  if (path === "home") {
    redirect("/")
  }

  const page = await getPageBySlug(path)
  
  if (!page) {
    return {
      title: "Page Not Found",
      description: "The page you're looking for doesn't exist.",
    }
  }

  // Get OG image from page JSON, fallback to default if not present
  const ogImageUrl = page.seo?.openGraph?.image || DEFAULT_OG_IMAGE.url
  const ogImage = {
    url: ogImageUrl,
    width: 1200,
    height: 630,
    alt: page.seo?.title || DEFAULT_OG_IMAGE.alt,
  }

  return {
    title: page.seo?.title || page.slug,
    description: page.seo?.description || "",
    openGraph: page.seo?.openGraph ? {
      title: page.seo.openGraph.title || page.seo?.title || page.slug,
      description: page.seo.openGraph.description || page.seo?.description || "",
      url: page.seo.openGraph.url,
      images: [ogImage],
    } : {
      title: page.seo?.title || page.slug,
      description: page.seo?.description || "",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: page.seo?.title || page.slug,
      description: page.seo?.description || "",
      images: [ogImageUrl],
    },
  }
}

export default async function DynamicPage({ params }: PageProps) {
  try {
    const { path } = await params

    // Redirect home requests to root
    if (path === "home") {
      redirect("/")
    }

    // Try to find the page
    const page = await getPageBySlug(path)

    if (!page) {
      notFound()
    }

    const navbarConfig = page.layout?.navbar || {}
    const isNavbarSticky = navbarConfig.sticky !== false

    return (
      <>
        {/* Add your navbar component */}
        <main
          className={`min-h-screen ${page.layout?.className || ""}`}
          style={{
            backgroundColor: page.layout?.backgroundColor
          }}
        >
          {/* Render each section using the component registry */}
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
      </>
    )
  } catch (error) {
    console.error("Error rendering dynamic page:", error)
    return notFound()
  }
}
