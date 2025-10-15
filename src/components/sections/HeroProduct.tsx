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
  const carouselRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      if (isScrolling) return;

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollPosition = carousel.scrollTop;
        const imageHeight = carousel.clientHeight;
        const newIndex = Math.round(scrollPosition / imageHeight);
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
  }, [displayImages.length, selectedImageIndex]);

  const scrollToImage = (index: number) => {
    setSelectedImageIndex(index);
    if (carouselRef.current) {
      const imageHeight = carouselRef.current.clientHeight;
      carouselRef.current.scrollTo({
        top: imageHeight * index,
        behavior: "smooth",
      });
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const swipeDistance = touchStartY.current - touchEndY.current;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0 && selectedImageIndex < displayImages.length - 1) {
        scrollToImage(selectedImageIndex + 1);
      } else if (swipeDistance < 0 && selectedImageIndex > 0) {
        scrollToImage(selectedImageIndex - 1);
      }
    }

    touchStartY.current = 0;
    touchEndY.current = 0;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    touchStartY.current = e.clientY;
    isDragging.current = true;
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    touchEndY.current = e.clientY;
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const swipeDistance = touchStartY.current - touchEndY.current;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0 && selectedImageIndex < displayImages.length - 1) {
        scrollToImage(selectedImageIndex + 1);
      } else if (swipeDistance < 0 && selectedImageIndex > 0) {
        scrollToImage(selectedImageIndex - 1);
      }
    }

    touchStartY.current = 0;
    touchEndY.current = 0;
  };

  const handleMouseLeave = () => {
    if (isDragging.current) {
      handleMouseUp();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">
      {/* Left Side - Image Carousel */}
      <div className="flex flex-col-reverse sm:flex-row gap-4">
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
          className="relative w-full aspect-square overflow-y-auto overflow-x-hidden snap-y snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing touch-pan-y"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            touchAction: "pan-y",
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
      <div className="flex flex-col space-y-6">
        {tagline && (
          <p className="text-sm text-gray-600 border-b border-gray-200 pb-4">
            {tagline}
          </p>
        )}

        {brand && (
          <p className="text-base text-gray-700">
            {brand}
            <sup className="text-xs">™</sup>
          </p>
        )}

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
          {title}
        </h1>

        <div
          className="text-base text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: description }}
        />

        {checklist && checklist.length > 0 && (
          <ul className="space-y-3">
            {checklist.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-gray-900 flex-shrink-0 mt-0.5"
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
                  className="text-gray-700"
                  dangerouslySetInnerHTML={{ __html: item.text }}
                />
              </li>
            ))}
          </ul>
        )}

        {disclaimerNote && (
          <p className="text-sm text-gray-600 italic">{disclaimerNote}</p>
        )}

        {disclaimer && (
          <p className="text-base font-semibold text-gray-900">{disclaimer}</p>
        )}

        {/* Price Section */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-baseline gap-2 mb-1">
            {isLoading ? (
              <span className="text-4xl font-bold text-gray-400">
                Loading...
              </span>
            ) : (
              <>
                <span className="text-4xl font-bold text-gray-900">
                  {displayPrice}
                </span>
                <span className="text-lg text-gray-600">{priceLabel}</span>
              </>
            )}
          </div>
          {priceSublabel && (
            <p className="text-sm text-gray-600">{priceSublabel}</p>
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
