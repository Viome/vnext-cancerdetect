import CDButton, { ButtonVariant, ButtonTheme } from '@/components/CDButton'

interface HeroProps {
  title: string | string[]
  subtitle?: string
  cta?: {
    text: string
    href: string
    variant?: ButtonVariant
    theme?: ButtonTheme
  }
  backgroundImage?: string
}

export default function Hero({ title, subtitle, cta, backgroundImage }: HeroProps) {
  return (
    <section className="hero-section bg-gradient-primary text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="hero-title text-4xl md:text-6xl font-tiempos-headline-light font-light mb-6">
          {Array.isArray(title) ? title.map((line, index) => (
            <span key={index} className="block">{line}</span>
          )) : title}
        </h1>
        {subtitle && <p className="hero-subtitle text-xl md:text-2xl font-twk-lausanne font-light mb-8 max-w-3xl mx-auto">{subtitle}</p>}
        {cta && (
          <CDButton
            href={cta.href}
            variant={cta.variant || 'Standard'}
            theme={cta.theme || 'Light'}
            width="auto"
          >
            {cta.text}
          </CDButton>
        )}
      </div>
    </section>
  )
}
