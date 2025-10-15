import React from "react";
import CDImage from "@/components/CDImage";
import Link from "next/link";

interface InfoBlock {
  title: string;
  description: string;
  linkText?: string;
  linkHref?: string;
}

export interface InfoWithImageProps {
  sectionId?: string;
  infoBlocks: InfoBlock[];
  image: string;
  imageAlt?: string;
  wrapperStyle?: {
    background?: string;
    backgroundImage?: string;
    padding?: string;
    spacing?: string;
    useContainerWidth?: boolean;
  };
}

export default function InfoWithImage({
  sectionId = "info-with-image",
  infoBlocks,
  image,
  imageAlt = "Info section image",
  wrapperStyle = {},
}: InfoWithImageProps) {
  return (
    <div
      id={sectionId}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
    >
      {/* Left Column - Info Blocks */}
      <div className="space-y-12 lg:space-y-16">
        {infoBlocks.map((block, index) => (
          <div key={index} className="space-y-6">
            <div className="pb-6 border-b-[3px] border-[var(--black)]">
              <h2 className="typography-headline1">{block.title}</h2>
            </div>

            <p className="typography-paragraph2 text-black">
              {block.description}
            </p>

            {block.linkText && block.linkHref && (
              <Link
                href={block.linkHref}
                className="inline-flex items-center gap-2 typography-paragraph2  hover:text-[var(--brand-green-3)] transition-colors"
              >
                {block.linkText}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="transition-transform group-hover:translate-x-1"
                >
                  <path
                    d="M4.16669 10H15.8334M15.8334 10L10 4.16669M15.8334 10L10 15.8334"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Right Column - Image */}
      <div className="relative w-full aspect-[3/4] lg:aspect-[4/5] rounded-lg overflow-hidden">
        <CDImage
          src={image}
          alt={imageAlt}
          fill
          objectFit="cover"
          objectPosition="center"
          containerClassName="relative overflow-hidden w-full h-full"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
