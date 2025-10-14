import Heading from '@/components/Heading'

interface MetricProps {
  title: string
  description: string
}

interface ReliableResultsProps {
  title: string
  description: string
  metrics: MetricProps[]
}

export default function ReliableResults({ 
  title, 
  description, 
  metrics 
}: ReliableResultsProps) {
  return (
    <div className="text-white">
      <div className="mb-12 lg:mb-16">
        <Heading level={31} className="mb-6">
          {title}
        </Heading>
        <p className="text-xl md:text-2xl lg:text-3xl font-twk-lausanne font-light max-w-4xl leading-relaxed">
          {description}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {metrics.map((metric, index) => (
          <div key={index} className="space-y-4">
            <div className="pb-4 border-b-[1px] border-white/30">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-twk-lausanne font-medium">
                {metric.title}
              </h3>
            </div>
            
            <p className="text-base md:text-lg font-twk-lausanne leading-relaxed">
              {metric.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

