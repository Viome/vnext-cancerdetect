import fs from "fs/promises"
import path from "path"
import availablePages from "@/data/pages.json"
import { Page } from "@/types/content"

export async function getPageBySlug(slug: string): Promise<Page | undefined> {
  // Check if slug exists in available pages
  const allPages = [...availablePages.availablePages, ...(availablePages.productPages || [])]
  if (!allPages.includes(slug)) {
    return undefined
  }

  try {
    // Try main pages directory first
    let filePath = path.join(process.cwd(), "src", "data", "pages", `${slug}.json`)

    // Check if file exists
    if (!(await fs.access(filePath).then(() => true).catch(() => false))) {
      // Try products subdirectory
      filePath = path.join(process.cwd(), "src", "data", "pages", "products", `${slug}.json`)
      
      if (!(await fs.access(filePath).then(() => true).catch(() => false))) {
        filePath = path.join(process.cwd(), "src", "data", "pages", "learn", `${slug}.json`)
        
        if (!(await fs.access(filePath).then(() => true).catch(() => false))) {
          if (slug.startsWith('eligibility/')) {
            const subSlug = slug.replace('eligibility/', '')
            filePath = path.join(process.cwd(), "src", "data", "pages", "eligibility", `${subSlug}.json`)
          } else {
            filePath = path.join(process.cwd(), "src", "data", "pages", "eligibility", `${slug}.json`)
          }
        }
      }
    }

    const fileContent = await fs.readFile(filePath, "utf-8")
    return JSON.parse(fileContent) as Page
  } catch (error) {
    console.error(`Error loading page ${slug}:`, error)
    return undefined
  }
}

export async function getAllPageSlugs(): Promise<string[]> {
  return [...availablePages.availablePages, ...(availablePages.productPages || [])]
}

export async function getAllEligibilitySlugs(): Promise<string[]> {
  return availablePages.eligibilityPages || []
}

export async function isProductSlug(slug: string): Promise<boolean> {
  const productPages = availablePages.productPages || []
  return productPages.includes(slug)
}
