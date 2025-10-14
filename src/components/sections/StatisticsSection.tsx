import Heading from "@/components/Heading";

interface StatisticProps {
  percentage: string;
  label: string;
  sublabel: string;
  description: string;
}

interface StatisticsSectionProps {
  title: string;
  description: string;
  statistics: StatisticProps[];
}

export default function StatisticsSection({
  title,
  description,
  statistics,
}: StatisticsSectionProps) {
  return (
    <div className="text-white">
      <div className="mb-12 lg:mb-[120px]">
        <Heading level={31} className="mb-5 !font-semibold">
          {title}
        </Heading>
        <p className="typography-headline1 font-light max-w-4xl">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {statistics.map((stat, index) => (
          <div key={index} className="space-y-4">
            <div className="flex items-end gap-4">
              <span className="typography-display2 font-light">
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

            <div className="border-b-[1px] border-white/30 "></div>

            <p className="text-base md:text-lg font-twk-lausanne leading-relaxed mt-6">
              {stat.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
