import Heading from "@/components/Heading";

interface TestDetailsProps {
  leftSection: {
    title: string;
    items: Array<{
      heading: string;
      content?: string;
      list?: string[];
      note?: string;
    }>;
  };
  rightSection: {
    title: string;
    description: string;
    eligibility: Array<{
      question: string;
      subItems?: Array<{
        text: string;
      }>;
      note?: string;
    }>;
  };
}

export default function TestDetails({
  leftSection,
  rightSection,
}: TestDetailsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Left Section */}
      <div className="space-y-8">
        <div className="pb-[1.875rem] mb-[1.875rem] border-b-[3px] border-[var(--black)]">
          <Heading level={3}>{leftSection.title}</Heading>
        </div>

        {leftSection.items.map((item, index) => (
          <div key={index} className="space-y-1">
            <h3 className="typography-headline4 font-semibold ">
              {item.heading}
            </h3>

            {item.content && (
              <p className="typography-paragraph2">{item.content}</p>
            )}
            <hr
              className={`border-gray-300 mt-7 ${index === leftSection.items.length - 1 ? "hidden" : ""}`}
            />

            {item.list && (
              <ul className="space-y-2 list-disc list-inside">
                {item.list.map((listItem, idx) => (
                  <li
                    key={idx}
                    className="text-base md:text-lg font-twk-lausanne"
                  >
                    {listItem}
                  </li>
                ))}
              </ul>
            )}

            {item.note && (
              <p className="text-sm md:text-base font-twk-lausanne mt-4">
                {item.note}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Right Section */}
      <div className="space-y-8">
        <div className="pb-[1.875rem] mb-[1.875rem] border-b-[3px] border-[var(--black)]">
          <Heading level={3}>{rightSection.title}</Heading>
        </div>

        <p className="typography-paragraph2">{rightSection.description}</p>

        <div className="space-y-4">
          {rightSection.eligibility.map((item, index) => (
            <div key={index} className="space-y-4">
              <div className="border border-gray-300 p-6 space-y-4">
                <h3 className="typography-headline3 font-semibold">
                  {item.question}
                </h3>

                {item.subItems && (
                  <ul className="flex flex-col gap-2 list-disc list-inside ml-4 mt-8">
                    {item.subItems.map((subItem, idx) => (
                      <li key={idx} className="typography-paragraph2 ">
                        <span className="mb-6">{subItem.text}</span>
                        {idx < item.subItems!.length - 1 && (
                          <p className="text-left  ml-4 my-8">or</p>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {item.note && (
                <p className="text-sm md:text-base font-twk-lausanne">
                  {item.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
