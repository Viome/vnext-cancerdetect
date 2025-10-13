import { Metadata } from 'next'
import { RouteValidator, RouteValidatorConfig } from './route-validator'
import { getPageBySlug } from './content'

export function createRouteHandler(config: RouteValidatorConfig) {
  const validator = new RouteValidator(config)
  
  return {
    // Validation function for use in page components
    validateSlug: async (slug: string) => {
      if (!(await validator.validate(slug))) {
        validator.handleInvalid(slug)
      }
    },
    
    // Metadata generation function
    generateMetadata: async (slug: string): Promise<Metadata> => {
      const invalidMetadata = await validator.getMetadata(slug)
      if (invalidMetadata) {
        return invalidMetadata
      }
      
      // Continue with normal metadata generation
      const page = await getPageBySlug(slug)
      if (!page) {
        return {
          title: "Page Not Found",
          description: "The page you're looking for doesn't exist.",
        }
      }
      
      return {
        title: page.seo?.title || page.slug,
        description: page.seo?.description || "",
        openGraph: page.seo?.openGraph ? {
          title: page.seo.openGraph.title || page.seo?.title || page.slug,
          description: page.seo.openGraph.description || page.seo?.description || "",
          url: page.seo.openGraph.url || `/${config.section}/${slug}`,
        } : undefined,
      }
    },
    
    // Get valid slugs for static generation
    getValidSlugs: () => validator.getValidSlugs(),
    
    // Check if slug is valid
    isValidSlug: async (slug: string) => await validator.validate(slug)
  }
}
