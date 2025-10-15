import React from "react";
import Image from "next/image";

interface BackgroundImages {
  mobile?: string;
  tablet?: string;
  desktop: string;
}

interface SectionWrapperProps {
  children: React.ReactNode;
  wrapperStyle?: {
    container?: string;
    padding?: string;
    background?: string;
    spacing?: string;
    backgroundImage?: string | BackgroundImages;
    useContainerWidth?: boolean;
  };
  className?: string;
}

export default function SectionWrapper({
  children,
  wrapperStyle,
  className = "",
}: SectionWrapperProps) {
  const useContainerWidth = wrapperStyle?.useContainerWidth || false;
  const containerClass = useContainerWidth
    ? "w-container mx-auto"
    : wrapperStyle?.container || "max-w-7xl mx-auto ";
  const paddingClass = wrapperStyle?.padding || "";
  const backgroundClass = wrapperStyle?.background || "";
  const spacingClass = wrapperStyle?.spacing || "";
  const backgroundImage = wrapperStyle?.backgroundImage;

  const combinedClasses = [backgroundClass, spacingClass, className]
    .filter(Boolean)
    .join(" ");

  const getBackgroundImages = (): BackgroundImages | null => {
    if (!backgroundImage) return null;

    if (typeof backgroundImage === "string") {
      return {
        desktop: backgroundImage,
        tablet: backgroundImage,
        mobile: backgroundImage,
      };
    }

    return {
      mobile: backgroundImage.mobile || backgroundImage.desktop,
      tablet: backgroundImage.tablet || backgroundImage.desktop,
      desktop: backgroundImage.desktop,
    };
  };

  const bgImages = getBackgroundImages();

  return (
    <section className={`relative ${combinedClasses}`}>
      {bgImages && (
        <>
          {bgImages.mobile && (
            <div className="absolute inset-0 z-0 block md:hidden">
              <Image
                src={bgImages.mobile}
                alt=""
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
            </div>
          )}
          {bgImages.tablet && (
            <div className="absolute inset-0 z-0 hidden md:block lg:hidden">
              <Image
                src={bgImages.tablet}
                alt=""
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
            </div>
          )}
          {bgImages.desktop && (
            <div className="absolute inset-0 z-0 hidden lg:block">
              <Image
                src={bgImages.desktop}
                alt=""
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
            </div>
          )}
        </>
      )}
      <div className={`relative z-10 ${containerClass} ${paddingClass}`}>
        {children}
      </div>
    </section>
  );
}
