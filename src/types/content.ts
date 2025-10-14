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
      show?: boolean
      sticky?: boolean
    }
  }
  sections: PageSection[]
}

export interface PageSection {
  sectionId: string
  type: string
  wrapperStyle?: {
    container?: string
    padding?: string
    background?: string
    spacing?: string
    backgroundImage?: string | {
      mobile?: string
      tablet?: string
      desktop: string
    }
    useContainerWidth?: boolean
  }
  [key: string]: any
}

export interface ComponentRegistry {
  [key: string]: React.ComponentType<any>
}
