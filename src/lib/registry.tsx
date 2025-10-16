import dynamic from "next/dynamic"
import { ComponentRegistry, PageSection } from "@/types/content"
import SectionWrapper from "@/components/SectionWrapper"
import React from "react"

// Import your components
const Hero = dynamic(() => import("@/components/sections/Hero"))
const Features = dynamic(() => import("@/components/sections/Features"))
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"))
const ProductGrid = dynamic(() => import("@/components/sections/ProductGrid"))
const AnnouncementBanner = dynamic(() => import("@/components/sections/AnnouncementBanner"))
const TestDetails = dynamic(() => import("@/components/sections/TestDetails"))
const StatisticsSection = dynamic(() => import("@/components/sections/StatisticsSection"))
const ReliableResults = dynamic(() => import("@/components/sections/ReliableResults"))
const RiskAndSolution = dynamic(() => import("@/components/sections/RiskAndSolution"))
const WhatsIncluded = dynamic(() => import("@/components/sections/WhatsIncluded"))
const NewsArticle = dynamic(() => import("@/components/sections/NewsArticle"))
const TestingProcess = dynamic(() => import("@/components/sections/TestingProcess"))
const ImageShowcase = dynamic(() => import("@/components/sections/ImageShowcase"))
const InsideYourKit = dynamic(() => import("@/components/sections/InsideYourKit"))
const InfoWithImage = dynamic(() => import("@/components/sections/InfoWithImage"))
const OurScience = dynamic(() => import("@/components/sections/OurScience"))
const References = dynamic(() => import("@/components/sections/References"))
const HeroProduct = dynamic(() => import("@/components/sections/HeroProduct"))
const MissionStatement = dynamic(() => import("@/components/sections/MissionStatement"))
const SignalInNoise = dynamic(() => import("@/components/sections/SignalInNoise"))
const InsightToIntervention = dynamic(() => import("@/components/sections/InsightToIntervention"))
const ProductShowcase = dynamic(() => import("@/components/sections/ProductShowcase"))
const QuoteSection = dynamic(() => import("@/components/sections/QuoteSection"))
const MissionWithImage = dynamic(() => import("@/components/sections/MissionWithImage"))
const FAQSection = dynamic(() => import("@/components/sections/FAQSection"))
const ApproachToDiagnostics = dynamic(() => import("@/components/sections/ApproachToDiagnostics"))
const WorkWithUs = dynamic(() => import("@/components/sections/WorkWithUs"))
const ScienceApproach = dynamic(() => import("@/components/sections/ScienceApproach"))
const PublicationsPartners = dynamic(() => import("@/components/sections/PublicationsPartners"))
const ContactSection = dynamic(() => import("@/components/sections/ContactSection"))
const TermsContent = dynamic(() => import("@/components/sections/TermsContent"))
const ImportantSafetyInformation = dynamic(() => import("@/components/sections/ImportantSafetyInformation"))
const GuidingNextSteps = dynamic(() => import("@/components/sections/GuidingNextSteps"))
const FeaturedPublications = dynamic(() => import("@/components/sections/FeaturedPublications"))


// Component registry mapping
export const registry: ComponentRegistry = {
  // Uppercase versions
  Hero: Hero,
  Features: Features,
  Testimonials: Testimonials,
  ProductGrid: ProductGrid,
  AnnouncementBanner: AnnouncementBanner,
  TestDetails: TestDetails,
  StatisticsSection: StatisticsSection,
  ReliableResults: ReliableResults,
  RiskAndSolution: RiskAndSolution,
  WhatsIncluded: WhatsIncluded,
  NewsArticle: NewsArticle,
  TestingProcess: TestingProcess,
  ImageShowcase: ImageShowcase,
  InsideYourKit: InsideYourKit,
  InfoWithImage: InfoWithImage,
  OurScience: OurScience,
  References: References,
  HeroProduct: HeroProduct,
  MissionStatement: MissionStatement,
  SignalInNoise: SignalInNoise,
  InsightToIntervention: InsightToIntervention,
  ProductShowcase: ProductShowcase,
  QuoteSection: QuoteSection,
  MissionWithImage: MissionWithImage,
  FAQSection: FAQSection,
  ApproachToDiagnostics: ApproachToDiagnostics,
  WorkWithUs: WorkWithUs,
  ScienceApproach: ScienceApproach,
  PublicationsPartners: PublicationsPartners,
  ContactSection: ContactSection,
  TermsContent: TermsContent,
  ImportantSafetyInformation: ImportantSafetyInformation,
  GuidingNextSteps: GuidingNextSteps,
  FeaturedPublications: FeaturedPublications,
  // Lowercase versions for backward compatibility
  hero: Hero,
  features: Features,
  testimonials: Testimonials,
  product_grid: ProductGrid,
  announcement_banner: AnnouncementBanner,
  test_details: TestDetails,
  statistics_section: StatisticsSection,
  reliable_results: ReliableResults,
  risk_and_solution: RiskAndSolution,
  whats_included: WhatsIncluded,
  news_article: NewsArticle,
  testing_process: TestingProcess,
  image_showcase: ImageShowcase,
  inside_your_kit: InsideYourKit,
  info_with_image: InfoWithImage,
  our_science: OurScience,
  references: References,
  hero_product: HeroProduct,
  mission_statement: MissionStatement,
  signal_in_noise: SignalInNoise,
  insight_to_intervention: InsightToIntervention,
  product_showcase: ProductShowcase,
  quote_section: QuoteSection,
  mission_with_image: MissionWithImage,
  faq_section: FAQSection,
  approach_to_diagnostics: ApproachToDiagnostics,
  work_with_us: WorkWithUs,
  science_approach: ScienceApproach,
  publications_partners: PublicationsPartners,
  contact_section: ContactSection,
  terms_content: TermsContent,
  important_safety_information: ImportantSafetyInformation,
  guiding_next_steps: GuidingNextSteps,
  featured_publications: FeaturedPublications,
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

// Helper function to render a section with wrapper
export function renderSection(section: PageSection, index: number) {
  const Component = getComponent(section.type)
  const { wrapperStyle, ...sectionProps } = section
  
  return (
    <SectionWrapper key={section.sectionId || index} wrapperStyle={wrapperStyle}>
      <Component {...sectionProps} />
    </SectionWrapper>
  )
}
