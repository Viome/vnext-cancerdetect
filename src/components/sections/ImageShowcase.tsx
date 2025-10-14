import React from "react";
import CDImage from "@/components/CDImage";

export interface ImageShowcaseProps {
  sectionId?: string;
  title?: string;
  description?: string;
  images?: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
  wrapperStyle?: {
    background?: string;
    backgroundImage?: string;
    padding?: string;
    spacing?: string;
    useContainerWidth?: boolean;
  };
}

export default function ImageShowcase({
  sectionId = "image-showcase",
  title = "Image Showcase",
  description,
  images = [],
  wrapperStyle = {},
}: ImageShowcaseProps) {
  return (
    <div id={sectionId} className="max-w-7xl mx-auto">
      {title && (
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4">
          {title}
        </h2>
      )}
      {description && (
        <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          {description}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {images.map((image, index) => (
          <div key={index} className="flex flex-col">
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
              <CDImage
                src={image.src}
                alt={image.alt}
                fill
                objectFit="cover"
                objectPosition="center"
                className="rounded-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            {image.caption && (
              <p className="mt-4 text-center text-gray-700 font-medium">
                {image.caption}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
