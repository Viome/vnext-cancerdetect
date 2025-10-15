"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import CDButton from "@/components/CDButton";
import { useCancerDetectProduct } from "@/lib/hooks/useCancerDetectProduct";

interface ChecklistItem {
  text: string;
}

interface HeroProductProps {
  tagline?: string;
  brand?: string;
  title: string;
  description: string;
  checklist?: ChecklistItem[];
  disclaimer?: string;
  disclaimerNote?: string;
  price?: string;
  priceLabel?: string;
  priceSublabel?: string;
  promoText?: string;
  ctaText: string;
  ctaHref: string;
  images: string[];
  thumbnails?: string[];
  shopPayText?: string;
  wrapperStyle?: {
    background?: string;
    padding?: string;
    useContainerWidth?: boolean;
    spacing?: string;
  };
}

export default function HeroProduct({
  tagline,
  brand,
  title,
  description,
  checklist = [],
  disclaimer,
  disclaimerNote,
  price,
  priceLabel = "USD",
  priceSublabel,
  promoText,
  ctaText,
  ctaHref,
  images,
  thumbnails,
  shopPayText,
  wrapperStyle,
}: HeroProductProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const touchEndY = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

  const { product, isLoading, error } = useCancerDetectProduct();

  // Use only Strapi images, do not fall back to prop images
  const displayImages = product?.productHeroImages?.map((img) => img.url) || [];
  const displayThumbnails = thumbnails || displayImages;

  const displayPrice = product?.currentPrice
    ? `$${parseFloat(product.currentPrice).toFixed(2)}`
    : price || "$0.00";

  // Detect screen size
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);

    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      if (isScrolling) return;

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        let newIndex;
        
        if (isDesktop) {
          const scrollPosition = carousel.scrollTop;
          const imageHeight = carousel.clientHeight;
          newIndex = Math.round(scrollPosition / imageHeight);
        } else {
          const scrollPosition = carousel.scrollLeft;
          const imageWidth = carousel.clientWidth;
          newIndex = Math.round(scrollPosition / imageWidth);
        }
        
        const clampedIndex = Math.max(
          0,
          Math.min(displayImages.length - 1, newIndex)
        );

        if (clampedIndex !== selectedImageIndex) {
          setSelectedImageIndex(clampedIndex);
        }
      }, 150);
    };

    carousel.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      carousel.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [displayImages.length, selectedImageIndex, isDesktop]);

  const scrollToImage = (index: number) => {
    setSelectedImageIndex(index);
    if (carouselRef.current) {
      if (isDesktop) {
        const imageHeight = carouselRef.current.clientHeight;
        carouselRef.current.scrollTo({
          top: imageHeight * index,
          behavior: "smooth",
        });
      } else {
        const imageWidth = carouselRef.current.clientWidth;
        carouselRef.current.scrollTo({
          left: imageWidth * index,
          behavior: "smooth",
        });
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const minSwipeDistance = 50;

    if (isDesktop) {
      const swipeDistance = touchStartY.current - touchEndY.current;
      if (Math.abs(swipeDistance) > minSwipeDistance) {
        if (swipeDistance > 0 && selectedImageIndex < displayImages.length - 1) {
          scrollToImage(selectedImageIndex + 1);
        } else if (swipeDistance < 0 && selectedImageIndex > 0) {
          scrollToImage(selectedImageIndex - 1);
        }
      }
    } else {
      const swipeDistance = touchStartX.current - touchEndX.current;
      if (Math.abs(swipeDistance) > minSwipeDistance) {
        if (swipeDistance > 0 && selectedImageIndex < displayImages.length - 1) {
          scrollToImage(selectedImageIndex + 1);
        } else if (swipeDistance < 0 && selectedImageIndex > 0) {
          scrollToImage(selectedImageIndex - 1);
        }
      }
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
    touchStartY.current = 0;
    touchEndY.current = 0;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    touchStartX.current = e.clientX;
    touchStartY.current = e.clientY;
    isDragging.current = true;
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    touchEndX.current = e.clientX;
    touchEndY.current = e.clientY;
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const minSwipeDistance = 50;

    if (isDesktop) {
      const swipeDistance = touchStartY.current - touchEndY.current;
      if (Math.abs(swipeDistance) > minSwipeDistance) {
        if (swipeDistance > 0 && selectedImageIndex < displayImages.length - 1) {
          scrollToImage(selectedImageIndex + 1);
        } else if (swipeDistance < 0 && selectedImageIndex > 0) {
          scrollToImage(selectedImageIndex - 1);
        }
      }
    } else {
      const swipeDistance = touchStartX.current - touchEndX.current;
      if (Math.abs(swipeDistance) > minSwipeDistance) {
        if (swipeDistance > 0 && selectedImageIndex < displayImages.length - 1) {
          scrollToImage(selectedImageIndex + 1);
        } else if (swipeDistance < 0 && selectedImageIndex > 0) {
          scrollToImage(selectedImageIndex - 1);
        }
      }
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
    touchStartY.current = 0;
    touchEndY.current = 0;
  };

  const handleMouseLeave = () => {
    if (isDragging.current) {
      handleMouseUp();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 xl:gap-16 items-start">
      {/* Left Side - Image Carousel */}
      <div className="flex flex-col-reverse sm:flex-row gap-4 lg:col-span-3">
        {/* Thumbnails */}
        <div className="flex sm:flex-col gap-2 sm:gap-3 overflow-x-auto sm:overflow-visible">
          {displayThumbnails.map((thumb, index) => (
            <button
              key={index}
              onClick={() => scrollToImage(index)}
              className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 overflow-hidden border-2 transition-all ${
                selectedImageIndex === index
                  ? "border-gray-900"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <Image
                src={thumb}
                alt={`Product view ${index + 1}`}
                fill
                className="object-cover"
              />
              {selectedImageIndex !== index && (
                <div className="absolute inset-0 bg-white opacity-50 transition-opacity hover:opacity-30" />
              )}
            </button>
          ))}
        </div>

        {/* Main Image Carousel */}
        <div
          ref={carouselRef}
          className="relative w-full aspect-square overflow-x-auto lg:overflow-x-hidden lg:overflow-y-auto snap-x lg:snap-y snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing touch-pan-x lg:touch-pan-y flex lg:flex-col flex-row lg:block"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {displayImages.map((image, index) => (
            <div
              key={index}
              className="relative w-full h-full flex-shrink-0 snap-start snap-always bg-gradient-to-br from-teal-700 to-teal-600"
            >
              <Image
                src={image}
                alt={`${title} - View ${index + 1}`}
                fill
                className="object-contain"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Product Information */}
      <div className="flex flex-col space-y-3 lg:col-span-2">
        {tagline && (
          <p className="text-sm border-b border-gray-200 pb-4">
            {tagline}
          </p>
        )}

        {brand && (
          <p className="text-base underline">
            {'Viome Discovery™'}
          </p>
        )}

        <div className="my-1 lg:my-3">
          <h1 className="typography-headline2 font-semibold">
            {'CancerDetect Test'}
          </h1>
          <p className="typography-headline2">
            {'for Oral & Throat Cancer'}
          </p>
        </div>

        <div
          className="text-base leading-relaxed"
          dangerouslySetInnerHTML={{ __html: description }}
        />

        {checklist && checklist.length > 0 && (
          <ul className="space-y-3">
            {checklist.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span
                  className=""
                  dangerouslySetInnerHTML={{ __html: item.text }}
                />
              </li>
            ))}
          </ul>
        )}

        {disclaimerNote && (
          <p className="text-sm italic">{disclaimerNote}</p>
        )}

        {disclaimer && (
          <p className="text-base font-semibold">{disclaimer}</p>
        )}

        {/* Price Section */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-baseline gap-2 mb-1">
            {isLoading ? (
              <span className="text-4xl font-bold">
                Loading...
              </span>
            ) : (
              <>
                <span className="text-4xl font-bold">
                  {displayPrice}
                </span>
                <span className="text-lg">{priceLabel}</span>
              </>
            )}
          </div>
          {priceSublabel && (
            <p className="text-sm">{priceSublabel}</p>
          )}
        </div>

        {/* Promo Code */}
        {promoText && (
          <div className="border-2 border-teal-600 rounded-lg p-4 bg-teal-50">
            <p
              className="text-sm text-teal-800 font-medium"
              dangerouslySetInnerHTML={{ __html: promoText }}
            />
          </div>
        )}

        {/* CTA Button */}
        <div className="pt-2">
          <CDButton
            href={ctaHref}
            variant="Standard"
            theme="Dark"
            className="w-full py-4 text-lg font-semibold"
          >
            {ctaText}
          </CDButton>
        </div>

        {/* Shop Pay */}
        {shopPayText && (
          <p
            className="text-sm text-gray-600 text-center"
            dangerouslySetInnerHTML={{ __html: shopPayText }}
          />
        )}
      </div>
    </div>
  );
}
