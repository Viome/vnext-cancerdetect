import React from "react";

export interface ViomeStudyInitiativesProps {
  sectionId?: string;
  heading: string;
  title: string;
  description: string;
}

export default function ViomeStudyInitiatives({
  sectionId = "viome-study-initiatives",
  heading,
  title,
  description,
}: ViomeStudyInitiativesProps) {
  return (
    <div id={sectionId} className="w-full">
      {/* Mobile Layout */}
      <div className="block lg:hidden space-y-6">
        {/* Heading */}
        <p className="text-[14px] leading-[20px] font-twk-lausanne font-semibold uppercase text-[#00A651] tracking-wide">
          {heading}
        </p>
        
        {/* Title */}
        <h2 className="text-[32px] leading-[40px] font-twk-lausanne font-bold text-black">
          {title}
        </h2>

        {/* Description */}
        <p className="text-[16px] leading-[24px] font-twk-lausanne text-black">
          {description}
        </p>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-2 lg:gap-16 xl:gap-24">
        {/* Left Column - Heading and Title */}
        <div className="space-y-4">
          <p className="text-[14px] leading-[20px] font-twk-lausanne font-semibold uppercase text-[#00A651] tracking-wide">
            {heading}
          </p>
          
          <h2 className="text-[48px] leading-[56px] font-twk-lausanne font-bold text-black">
            {title}
          </h2>
        </div>

        {/* Right Column - Description */}
        <div className="flex items-start">
          <p className="text-[16px] leading-[24px] font-twk-lausanne text-black">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}



