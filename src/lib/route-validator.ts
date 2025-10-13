import { notFound, redirect } from 'next/navigation'
import { isProductSlug } from './content'

export type FallbackBehavior = '404' | 'redirect' | 'custom'
export type SlugSource = 'static' | 'productPages' | 'dynamic'

export interface RouteValidatorConfig {
  section: string
  validSlugs: string[] | 'productPages'
  fallbackBehavior: FallbackBehavior
  redirectPath?: string
  customHandler?: (slug: string) => void
  metadata?: {
    title: string
    description: string
  }
}

export class RouteValidator {
  private config: RouteValidatorConfig
  
  constructor(config: RouteValidatorConfig) {
    this.config = config
  }
  
  async validate(slug: string): Promise<boolean> {
    if (this.config.validSlugs === 'productPages') {
      return await isProductSlug(slug)
    }
    return this.config.validSlugs.includes(slug)
  }
  
  handleInvalid(slug: string): never {
    switch (this.config.fallbackBehavior) {
      case '404':
        notFound()
      case 'redirect':
        if (this.config.redirectPath) {
          redirect(this.config.redirectPath)
        }
        notFound()
      case 'custom':
        if (this.config.customHandler) {
          this.config.customHandler(slug)
        }
        notFound()
      default:
        notFound()
    }
  }
  
  async getMetadata(slug: string) {
    if (!(await this.validate(slug))) {
      return {
        title: this.config.metadata?.title || "Page Not Found",
        description: this.config.metadata?.description || "The page you're looking for doesn't exist.",
      }
    }
    return null
  }
  
  getValidSlugs(): string[] {
    if (this.config.validSlugs === 'productPages') {
      return []
    }
    return this.config.validSlugs
  }
}
