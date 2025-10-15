import React from "react";
import CDImage from "@/components/CDImage";
import SectionWrapper from "@/components/SectionWrapper";
import Heading from "@/components/Heading";

export interface InsideYourKitProps {
  sectionId?: string;
  title: string;
  subtitle?: string;
  desktopImage: string;
  mobileImage: string;
  wrapperStyle?: {
    background?: string;
    backgroundImage?: string;
    padding?: string;
    spacing?: string;
    useContainerWidth?: boolean;
  };
}

export default function InsideYourKit({
  sectionId = "inside-your-kit",
  title,
  subtitle,
  desktopImage,
  mobileImage,
  wrapperStyle = {},
}: InsideYourKitProps) {
  return (
    <div id={sectionId}>
      {/* Desktop and Tablet Layout - Image as background */}
      <div className="hidden md:block relative w-full min-h-[582px] md:min-h-[445px] lg:min-h-[834px] bg-[#5a5d6b] py-16 md:py-6 lg:py-[120px]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <CDImage
            src={desktopImage}
            alt={title}
            fill
            objectFit="cover"
            objectPosition="center"
            containerClassName="relative overflow-hidden w-full  md:min-h-[445px] lg:min-h-[834px]"
            priority
            sizes="(min-width: 768px) 100vw, 0vw"
          />
        </div>

        {/* Title Overlay */}
        <div className="relative z-10 pb-[1.875rem] border-b-[3px] border-white text-white w-container mx-auto ">
          <Heading level={3}>{title}</Heading>
          {subtitle && (
            <p className="mt-4 text-lg font-twk-lausanne text-gray-700">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Mobile Layout - Standard stacked layout */}
      <div className="block md:hidden space-y-8">
        <div className="pb-[1.875rem] border-b-[3px] border-[var(--black)] mx-4">
          <Heading level={2}>{title}</Heading>
          {subtitle && (
            <p className="mt-4 text-lg font-twk-lausanne text-gray-700">
              {subtitle}
            </p>
          )}
        </div>

        <div className="relative w-full min-h-[582px] ">
          <CDImage
            src={mobileImage}
            alt={title}
            fill
            objectFit="contain"
            objectPosition="center"
            containerClassName="relative overflow-hidden min-h-[582px] w-full"
            priority
            sizes="(max-width: 767px) 100vw, 0vw"
          />
        </div>
      </div>
    </div>
  );
}
