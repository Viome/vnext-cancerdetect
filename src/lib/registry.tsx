import dynamic from "next/dynamic"
import { ComponentRegistry } from "@/types/content"

// Import your components
const Hero = dynamic(() => import("@/components/sections/Hero"))
const Features = dynamic(() => import("@/components/sections/Features"))
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"))
const ProductGrid = dynamic(() => import("@/components/sections/ProductGrid"))


// Component registry mapping
export const registry: ComponentRegistry = {
  // Uppercase versions
  Hero: Hero,
  Features: Features,
  Testimonials: Testimonials,
  ProductGrid: ProductGrid,
  // Lowercase versions for backward compatibility
  hero: Hero,
  features: Features,
  testimonials: Testimonials,
  product_grid: ProductGrid,
  // Add more components as needed
}

// Helper function to get component by type
export function getComponent(type: string) {
  const Component = registry[type]
  if (!Component) {
    throw new Error(`Component type "${type}" not found in registry`)
  }
  return Component
}
