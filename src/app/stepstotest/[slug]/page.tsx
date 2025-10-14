import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getPageBySlug } from "@/lib/content"
import { renderSection } from "@/lib/registry"
import { createRouteHandler } from "@/lib/route-handler-factory"

interface PageProps {
  params: Promise<{ slug: string }>
}

// Create route handler for stepstotest section
const routeHandler = createRouteHandler({
  section: 'stepstotest',
  validSlugs: ['how-to-test', 'testing-process'], // Add your valid slugs
  fallbackBehavior: '404',
  metadata: {
    title: 'Steps to Test | Cancer Detection App',
    description: 'Learn how to test for cancer detection'
  }
})

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  return await routeHandler.generateMetadata(slug)
}

export default async function StepsToTestPage({ params }: PageProps) {
  try {
    const { slug } = await params

    await routeHandler.validateSlug(slug)

    const page = await getPageBySlug(slug)

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
            backgroundColor: page.layout?.backgroundColor,
            maxWidth: page.layout?.maxWidth,
            padding: page.layout?.padding,
          }}
        >
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
    console.error("Error rendering stepstotest page:", error)
    return notFound()
  }
}
