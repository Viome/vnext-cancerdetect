import Heading from "@/components/Heading";
import ReferenceLinkedHTML from "@/components/ReferenceLinkedHTML";

interface ColumnContent {
  title: string;
  description: string;
  bulletPoints: string[];
  content: string[];
}

interface RiskAndSolutionProps {
  leftColumn: ColumnContent;
  rightColumn: ColumnContent;
}

export default function RiskAndSolution({
  leftColumn,
  rightColumn,
}: RiskAndSolutionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Left Column */}
      <div className="space-y-6">
        <div className="pb-4 border-b-[3px] border-black">
          <Heading level={3}>{leftColumn.title}</Heading>
        </div>

        <p className="typography-paragraph2">{leftColumn.description}</p>

        <ul className="space-y-3">
          {leftColumn.bulletPoints.map((point, index) => (
            <li
              key={index}
              className="flex items-start gap-3 typography-paragraph2"
            >
              <span className="flex-shrink-0 w-1.5 h-1.5 bg-black rounded-full mt-2.5"></span>
              <ReferenceLinkedHTML html={point} />
            </li>
          ))}
        </ul>
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        <div className="pb-4 border-b-[3px] border-black">
          <Heading level={3}>{rightColumn.title}</Heading>
        </div>

        <p className="typography-paragraph2">{rightColumn.description}</p>

        <ul className="space-y-3">
          {rightColumn.bulletPoints.map((point, index) => (
            <li
              key={index}
              className="flex items-start gap-3 typography-paragraph2"
            >
              <span className="flex-shrink-0 w-1.5 h-1.5 bg-black rounded-full mt-2.5"></span>
              <ReferenceLinkedHTML html={point} />
            </li>
          ))}
        </ul>

        <div className="space-y-3">
          {rightColumn.content.map((point, index) => (
            <p
              key={index}
              className="flex items-start gap-3 typography-paragraph2"
            >
              {point}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
