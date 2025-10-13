interface HeroProps {
  title: string | string[]
  subtitle?: string
  cta?: {
    text: string
    href: string
    variant?: string
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
          <a 
            href={cta.href} 
            className={`inline-block px-8 py-4 rounded-lg font-twk-lausanne font-medium text-lg transition-colors ${
              cta.variant === 'secondary' 
                ? 'bg-white text-brand-dark hover:bg-gray-100' 
                : 'bg-brand-green-1 text-white hover:bg-brand-green-2'
            }`}
          >
            {cta.text}
          </a>
        )}
      </div>
    </section>
  )
}
