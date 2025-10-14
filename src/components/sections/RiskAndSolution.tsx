import Heading from '@/components/Heading'

interface ColumnContent {
  title: string
  description: string
  bulletPoints: string[]
}

interface RiskAndSolutionProps {
  leftColumn: ColumnContent
  rightColumn: ColumnContent
}

export default function RiskAndSolution({ 
  leftColumn, 
  rightColumn 
}: RiskAndSolutionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Left Column */}
      <div className="space-y-6">
        <div className="pb-4 border-b-[3px] border-black">
          <Heading level={3}>{leftColumn.title}</Heading>
        </div>
        
        <p className="text-base md:text-lg font-twk-lausanne leading-relaxed">
          {leftColumn.description}
        </p>
        
        <ul className="space-y-3">
          {leftColumn.bulletPoints.map((point, index) => (
            <li 
              key={index} 
              className="flex items-start gap-3 text-base md:text-lg font-twk-lausanne leading-relaxed"
            >
              <span className="flex-shrink-0 w-1.5 h-1.5 bg-black rounded-full mt-2.5"></span>
              <span dangerouslySetInnerHTML={{ __html: point }} />
            </li>
          ))}
        </ul>
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        <div className="pb-4 border-b-[3px] border-black">
          <Heading level={3}>{rightColumn.title}</Heading>
        </div>
        
        <p className="text-base md:text-lg font-twk-lausanne leading-relaxed">
          {rightColumn.description}
        </p>
        
        <ul className="space-y-3">
          {rightColumn.bulletPoints.map((point, index) => (
            <li 
              key={index} 
              className="flex items-start gap-3 text-base md:text-lg font-twk-lausanne leading-relaxed"
            >
              <span className="flex-shrink-0 w-1.5 h-1.5 bg-black rounded-full mt-2.5"></span>
              <span dangerouslySetInnerHTML={{ __html: point }} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

