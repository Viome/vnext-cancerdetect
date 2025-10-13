export interface Page {
  slug: string
  seo?: {
    title: string
    description: string
    openGraph?: {
      title: string
      description: string
      image?: string
      url?: string
    }
  }
  layout?: {
    className?: string
    backgroundColor?: string
    maxWidth?: string
    padding?: string
    navbar?: {
      sticky?: boolean
    }
  }
  sections: PageSection[]
}

export interface PageSection {
  id?: string
  type: string
  [key: string]: any
}

export interface ComponentRegistry {
  [key: string]: React.ComponentType<any>
}
