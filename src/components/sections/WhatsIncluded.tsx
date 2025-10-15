"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Heading from "@/components/Heading";
import CDButton from "@/components/CDButton";

interface WhatsIncludedItem {
  title: string;
  description: string;
  image: string;
  downloadLink?: string;
}

interface WhatsIncludedProps {
  mainTitle: string;
  items: WhatsIncludedItem[];
}

export default function WhatsIncluded({
  mainTitle,
  items,
}: WhatsIncludedProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let isScrolling = false;
    let startX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      isScrolling = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isScrolling) {
        const currentX = e.touches[0].clientX;
        const diffX = Math.abs(currentX - startX);

        // If horizontal movement is detected, prevent default browser behavior
        if (diffX > 5) {
          isScrolling = true;
        }
      }

      if (isScrolling) {
        e.preventDefault();
      }
    };

    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    container.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <div className="space-y-8 md:space-y-12">
      <div className="pb-[1.875rem] border-b-[3px] border-[var(--black)]">
        <p className="typography-headline1">{mainTitle}</p>
      </div>

      {/* Below 1440px: Horizontal Scroll Carousel */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 overscroll-x-contain max-[1439px]:flex min-[1440px]:hidden"
        style={{
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-x",
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[280px] md:w-[320px] snap-start"
          >
            <div className="flex flex-col h-full justify-between">
              <div className="mb-6  flex-shrink-0">
                <h3 className="typography-paragraph1">{item.title}</h3>
                {item.description &&
                  (item.description.toLowerCase().includes("download") ? (
                    <CDButton
                      variant="ForwardArrow"
                      theme="Light"
                      width="auto"
                      href={item.downloadLink || "#"}
                    >
                      {item.description}
                    </CDButton>
                  ) : (
                    <p className="text-sm md:text-base font-twk-lausanne text-gray-700">
                      {item.description}
                    </p>
                  ))}
              </div>

              <div className="relative w-full h-[320px] bg-gray-100 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="240px"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 1440px and above: Grid Layout with all items visible */}
      <div className="hidden min-[1440px]:grid grid-cols-5 gap-6">
        {items.map((item, index) => (
          <div key={index}>
            <div className="flex flex-col h-full justify-between">
              <div className="mb-6 flex-shrink-0">
                <h3 className="typography-paragraph1">{item.title}</h3>
                {item.description &&
                  (item.description.toLowerCase().includes("download") ? (
                    <CDButton
                      variant="ForwardArrow"
                      theme="Light"
                      width="auto"
                      href={item.downloadLink || "#"}
                    >
                      {item.description}
                    </CDButton>
                  ) : (
                    <p className="text-sm font-twk-lausanne text-gray-700">
                      {item.description}
                    </p>
                  ))}
              </div>

              <div className="relative w-full h-[222px] bg-gray-100 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="240px"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
