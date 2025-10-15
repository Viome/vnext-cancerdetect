import Heading from "@/components/Heading";

interface MetricProps {
  title: string;
  description: string;
}

interface ReliableResultsProps {
  title: string;
  description: string;
  metrics: MetricProps[];
}

export default function ReliableResults({
  title,
  description,
  metrics,
}: ReliableResultsProps) {
  return (
    <div className="text-white">
      <div className="mb-12 lg:mb-[120px]">
        <Heading level={31} className="mb-4">
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
              <h3 className="typography-display2 font-medium">
                {metric.title}
              </h3>
            </div>

            <p className="typography-paragraph2 leading-relaxed mt-6">
              {metric.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
