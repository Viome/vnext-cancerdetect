"use client";

import React, { useState } from "react";
import GenericDropdown from "@/components/GenericDropdown";
import CDImage from "../CDImage";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  faqs: FAQItem[];
  theme?: "white" | "dark";
  image?: string;
}

const FAQSection: React.FC<FAQSectionProps> = ({
  title,
  faqs,
  theme = "dark",
  image,
}) => {
  // Now supporting multiple simultaneously expanded dropdowns
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const handleToggle = (id: string) => {
    setExpandedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const isDark = theme === "dark";
  const textColor = isDark ? "text-black" : "text-white";

  return (
    <>
      {image && (
        <div className="pb-[2rem] md:pb-[2.5rem] lg:pb-[5rem]">
          <div className="relative w-full h-[81px] md:h-[140px] lg:h-[227px]">
            <CDImage
              src={image}
              alt="FAQ Section"
              fill
              objectFit="cover"
              objectPosition="center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      )}
      <div className="max-w-5xl mx-auto pt-[2rem] md:pt-[2.5rem] lg:pt-[5rem]">
        {title && (
          <h2 className={`typography-headline1 mb-8 ${textColor}`}>{title}</h2>
        )}
        <div>
          {faqs.map((faq) => (
            <GenericDropdown
              key={faq.id}
              id={faq.id}
              isExpanded={expandedIds.has(faq.id)}
              onToggle={handleToggle}
              theme={theme}
              headingComponent={
                <h3 className={`typography-headline3 ${textColor}`}>
                  {faq.question}
                </h3>
              }
              expandedComponent={
                <div
                  className={`typography-paragraph2 ${textColor} [&>p]:leading-relaxed [&>ul]:space-y-4 [&>ul>li]:leading-relaxed [&>ul_ul]:mt-2 [&>ul_ul]:ml-6 [&>ul_ul>li]:list-disc [&>ul_ul>li]:pl-2`}
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              }
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default FAQSection;
