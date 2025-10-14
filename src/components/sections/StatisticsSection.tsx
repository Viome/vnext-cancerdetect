import Heading from '@/components/Heading'

interface StatisticProps {
  percentage: string
  label: string
  sublabel: string
  description: string
}

interface StatisticsSectionProps {
  title: string
  description: string
  statistics: StatisticProps[]
}

export default function StatisticsSection({ 
  title, 
  description, 
  statistics 
}: StatisticsSectionProps) {
  return (
    <div className="text-white">
      <div className="mb-12 lg:mb-16">
        <Heading level={31} className="mb-6 !font-semibold">
          {title}
        </Heading>
        <p className="text-xl md:text-2xl lg:text-3xl font-twk-lausanne font-light max-w-4xl">
          {description}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {statistics.map((stat, index) => (
          <div key={index} className="space-y-4">
            <div className="flex items-start gap-4">
              <span className="typography-display2 font-light flex-shrink-0">
                {stat.percentage}
              </span>
              <div className="flex flex-col justify-center space-y-1">
                <p className="text-base md:text-lg font-twk-lausanne leading-tight">
                  {stat.label}
                </p>
                <p className="text-base md:text-lg font-twk-lausanne leading-tight">
                  {stat.sublabel}
                </p>
              </div>
            </div>
            
            <div className="border-b-[1px] border-white/30"></div>
            
            <p className="text-base md:text-lg font-twk-lausanne leading-relaxed">
              {stat.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

