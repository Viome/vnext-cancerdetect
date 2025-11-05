import React from "react";
import CDImage from "@/components/CDImage";
import Heading from "@/components/Heading";

export interface OurScienceProps {
  sectionId?: string;
  title: string;
  paragraphs: string[];
  linkText: string;
  linkHref: string;
  image: string;
  note: string[];
}

export default function OurScience({
  sectionId = "our-science",
  title,
  paragraphs,
  linkText,
  linkHref,
  image,
  note,
}: OurScienceProps) {
  return (
    <div id={sectionId} className="w-full">
      {/* Mobile & Tablet Layout - Stacked vertically */}
      <div className="block lg:hidden space-y-8 ">
        {/* Laboratory Image */}
        <div className="relative w-full h-[66px] md:h-[113px]  mb-12">
          <CDImage
            src={image}
            alt="Laboratory"
            fill
            objectFit="cover"
            objectPosition="center"
            priority
            sizes="(max-width: 1023px) 100vw, 0vw"
          />
        </div>

        {/* Title */}
        <p className="text-white typography-display2">{title}</p>

        {/* Paragraphs */}
        <div className="space-y-6 mt-[2.5rem] md:mt-[5rem]">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-[16px] leading-[24px] font-twk-lausanne text-white"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Link */}
        <a
          href={linkHref}
          className="inline-flex items-center gap-2 text-white font-twk-lausanne text-[16px] leading-[24px] hover:opacity-80 transition-opacity"
        >
          {linkText}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
          >
            <path
              d="M5 12H19M19 12L12 5M19 12L12 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>

      {/* Desktop Layout - Image on top, then 2-column grid */}
      <div className="hidden lg:block lg:space-y-18">
        {/* Laboratory Image - Full width */}
        <div className="relative w-full lg:h-[185px]">
          <CDImage
            src={image}
            alt="Laboratory"
            fill
            objectFit="cover"
            objectPosition="center"
            priority
            sizes="(min-width: 1024px) 100vw, 0vw"
          />
        </div>

        {/* 2-Column Grid - Title left, Content right */}
        <div className="grid grid-cols-2 gap-16 xl:gap-24">
          {/* Left Column - Title */}
          <div className="flex items-start">
            <p className="text-white typography-display2">{title}</p>
          </div>

          {/* Right Column - Paragraphs and Link */}
          <div className="space-y-8">
            {/* Text Content */}
            <div className="space-y-6">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-[16px] leading-[24px] font-twk-lausanne text-white"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Link */}
            <a
              href={linkHref}
              className="inline-flex items-center gap-2 text-white font-twk-lausanne text-[16px] leading-[24px] hover:opacity-80 transition-opacity"
            >
              {linkText}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
