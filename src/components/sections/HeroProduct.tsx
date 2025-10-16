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
    ? `$${product.currentPrice}`
    : price || "$ NA";

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
          <p className="text-sm">{disclaimerNote}</p>
        )}

        {disclaimer && (
          <p className="text-base font-semibold">{disclaimer}</p>
        )}

        {/* Price Section */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-baseline gap-2 mb-1">
            {isLoading ? (
              <>
                <span className="h-10 w-32 bg-gray-200 rounded animate-pulse block" />
                <span className="h-6 w-16 bg-gray-100 rounded animate-pulse block" />
              </>
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
          <div className="text-sm text-center flex items-center justify-center gap-1 flex-wrap">
            <span>Pay in 4 interest-free payments with</span>
            <svg width="51" height="12" viewBox="0 0 51 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block" style={{ color: "#5f1ef6" }}>
              <path d="M13.0656 3.7746C12.6566 2.9341 11.8811 2.39118 10.7126 2.39118C10.3539 2.3973 10.0015 2.48405 9.68243 2.64469C9.36342 2.80535 9.08631 3.03565 8.87254 3.3178L8.82989 3.3687V0.0745893C8.82989 0.0555517 8.82217 0.0372949 8.80842 0.0238335C8.79468 0.0103717 8.77603 0.00280762 8.75659 0.00280762H7.10442C7.08522 0.00314969 7.06693 0.0108627 7.05348 0.0242873C7.04001 0.0377121 7.03247 0.0557757 7.03247 0.0745893V9.52364C7.03247 9.54233 7.04007 9.56024 7.05356 9.57346C7.06705 9.58669 7.08534 9.59411 7.10442 9.59411H8.87386C8.89307 9.59411 8.91151 9.58674 8.92521 9.57354C8.93892 9.56036 8.94678 9.54245 8.94714 9.52364V5.49474C8.94714 4.71168 9.48009 4.15699 10.3328 4.15699C11.2655 4.15699 11.5014 4.90875 11.5014 5.67484V9.52364C11.5014 9.54233 11.5089 9.56024 11.5224 9.57346C11.5359 9.58669 11.5542 9.59411 11.5733 9.59411H13.3387C13.3579 9.59411 13.3764 9.58674 13.3901 9.57354C13.4038 9.56036 13.4117 9.54245 13.4121 9.52364V5.44515C13.4121 5.3055 13.4121 5.16845 13.3934 5.03534C13.363 4.59911 13.252 4.1719 13.0656 3.7746Z" fill="currentColor"/>
              <path d="M4.23042 5.17507C4.23042 5.17507 3.32972 4.96755 2.99795 4.88403C2.66618 4.8005 2.08658 4.623 2.08658 4.19361C2.08658 3.76423 2.55425 3.62718 3.0286 3.62718C3.50293 3.62718 4.03057 3.73943 4.07187 4.25496C4.07354 4.27354 4.08227 4.29081 4.09633 4.3034C4.1104 4.31596 4.12877 4.32288 4.14781 4.32283L5.89192 4.3163C5.90219 4.31632 5.91235 4.31427 5.92177 4.31028C5.93118 4.30629 5.93965 4.30043 5.94666 4.29307C5.95366 4.28574 5.95905 4.27705 5.96246 4.26757C5.96588 4.25808 5.96728 4.24801 5.96654 4.23798C5.85862 2.58832 4.38098 1.99841 3.01793 1.99841C1.40173 1.99841 0.219892 3.04251 0.219892 4.19361C0.219892 5.03411 0.462389 5.82241 2.36905 6.37056C2.70348 6.46583 3.15784 6.58981 3.5549 6.69814C4.03189 6.82866 4.28904 7.02573 4.28904 7.33634C4.28904 7.69655 3.75609 7.94713 3.23246 7.94713C2.47432 7.94713 1.93603 7.67175 1.89206 7.1771C1.88976 7.15901 1.88077 7.14235 1.86676 7.13032C1.85276 7.11828 1.83474 7.11171 1.81611 7.11185L0.0759926 7.11968C0.0657908 7.11968 0.0556938 7.12168 0.0463014 7.12559C0.0369091 7.12949 0.0284154 7.1352 0.021327 7.1424C0.0142388 7.14957 0.0087002 7.15809 0.0050441 7.16742C0.001388 7.17675 -0.000311176 7.18671 4.67818e-05 7.19669C0.0799908 8.7537 1.61492 9.59287 3.04593 9.59287C5.17777 9.59287 6.14109 8.41829 6.14109 7.31807C6.14376 6.80124 6.0225 5.62402 4.23042 5.17507Z" fill="currentColor"/>
              <path d="M26.668 2.38858C25.7821 2.38858 25.0398 2.86886 24.5615 3.44835V2.45645C24.5615 2.43798 24.5541 2.42024 24.5408 2.40707C24.5278 2.39389 24.5098 2.38631 24.4909 2.38599H22.8361C22.8171 2.38599 22.7987 2.39339 22.7852 2.40661C22.7717 2.41983 22.764 2.43777 22.764 2.45645V11.7228C22.7645 11.7412 22.7723 11.7589 22.7858 11.7717C22.7992 11.7847 22.8173 11.792 22.8361 11.792H24.6069C24.6255 11.792 24.6435 11.7847 24.6567 11.7717C24.67 11.7588 24.6774 11.7411 24.6774 11.7228V8.67664H24.7041C24.9851 9.09687 25.754 9.60066 26.7587 9.60066C28.6479 9.60066 30.2229 8.06584 30.2229 5.99202C30.2243 4.00172 28.6573 2.38858 26.668 2.38858ZM26.5042 7.83484C26.1313 7.84392 25.7638 7.74392 25.4492 7.54764C25.1346 7.35134 24.8866 7.06765 24.7372 6.73278C24.5878 6.39789 24.5437 6.027 24.6105 5.66744C24.6772 5.30788 24.8519 4.97596 25.112 4.71406C25.3723 4.45212 25.7063 4.27208 26.0714 4.19691C26.4365 4.12174 26.8162 4.15482 27.1619 4.29196C27.5079 4.42909 27.804 4.66405 28.013 4.96685C28.2219 5.26967 28.3339 5.62655 28.3349 5.99202C28.3387 6.23089 28.2943 6.46819 28.2044 6.69025C28.1145 6.91231 27.9805 7.11477 27.8104 7.286C27.6404 7.45723 27.4374 7.59386 27.2131 7.68804C26.989 7.78224 26.7481 7.83211 26.5042 7.83484Z" fill="currentColor"/>
              <path d="M17.5238 1.98145C15.873 1.98145 15.0495 2.5309 14.3886 2.97073L14.3686 2.98377C14.3346 3.00662 14.3106 3.04124 14.3014 3.08068C14.2923 3.12013 14.2987 3.16148 14.3193 3.19651L14.9722 4.29801C14.9844 4.31863 15.0012 4.33635 15.0212 4.34988C15.0413 4.36342 15.0641 4.37245 15.0882 4.37633C15.1117 4.38049 15.1358 4.37948 15.1588 4.37338C15.1819 4.36728 15.2032 4.35628 15.2214 4.34108L15.2733 4.29933C15.6131 4.02003 16.158 3.64676 17.4771 3.54496C18.2113 3.48756 18.8455 3.67548 19.3131 4.10356C19.8275 4.56819 20.1354 5.31863 20.1354 6.11083C20.1354 7.56866 19.2585 8.48483 17.8502 8.50312C16.6896 8.49659 15.9102 7.90406 15.9102 7.02833C15.9102 6.5637 16.1247 6.26092 16.5432 5.95813C16.575 5.93575 16.5976 5.90281 16.6067 5.86538C16.6158 5.82796 16.6107 5.78858 16.5924 5.75454L16.0061 4.66867C15.9953 4.64924 15.9807 4.63209 15.9631 4.61821C15.9455 4.60432 15.9253 4.59397 15.9036 4.58776C15.8813 4.58129 15.8581 4.57946 15.8352 4.58237C15.8121 4.58529 15.79 4.59291 15.7703 4.60474C15.1122 4.98713 14.3047 5.68667 14.3486 7.03095C14.4019 8.74195 15.8543 10.0484 17.7422 10.1019H17.8369H17.9661C20.2098 10.0301 21.83 8.3987 21.83 6.18654C21.83 4.15576 20.3191 1.98145 17.5238 1.98145Z" fill="currentColor"/>
              <path d="M37.2007 3.02551H36.076C36.0498 3.02585 36.0245 3.03627 36.0059 3.05455C35.9871 3.07283 35.9764 3.09754 35.9763 3.1234V5.43475C35.9764 5.46049 35.9872 5.48504 36.006 5.50311C36.0246 5.52119 36.0498 5.53134 36.076 5.53134H37.2007C37.8855 5.53134 38.3906 5.00276 38.3906 4.27842C38.3906 3.55408 37.8855 3.02551 37.2007 3.02551Z" fill="currentColor"/>
              <path d="M40.6556 7.11447C40.6556 7.44988 40.9447 7.63651 41.4483 7.63651C42.1332 7.63651 42.5382 7.27369 42.5382 6.63026V6.44495L41.5124 6.49715C40.9713 6.52324 40.6556 6.74382 40.6556 7.11447Z" fill="currentColor"/>
              <path d="M48.983 0.0236932H33.8736C33.6259 0.0236929 33.3803 0.071538 33.1514 0.164492C32.9224 0.257446 32.7143 0.39369 32.5392 0.565434C32.3639 0.73718 32.225 0.941062 32.1302 1.16543C32.0354 1.3898 31.9868 1.63025 31.9871 1.87305V9.9752C31.9871 10.4655 32.1858 10.9357 32.5396 11.2824C32.8934 11.6292 33.3733 11.8242 33.8736 11.8245H48.983C49.2313 11.8252 49.4772 11.778 49.7068 11.6856C49.9362 11.5931 50.1448 11.4572 50.3207 11.2857C50.4964 11.1141 50.6361 10.9104 50.7316 10.6859C50.8269 10.4615 50.8761 10.2209 50.8766 9.97782V1.87565C50.8769 1.63209 50.8284 1.39082 50.7334 1.16572C50.6384 0.940629 50.4989 0.736149 50.323 0.56404C50.1471 0.391933 49.9381 0.255594 49.7082 0.162862C49.4783 0.0701289 49.2318 0.0228325 48.983 0.0236932ZM37.2579 6.44096H36.0694C36.043 6.44096 36.0177 6.45126 35.9988 6.46962C35.9801 6.48798 35.9695 6.51288 35.9695 6.53885V8.19633C35.9695 8.22229 35.959 8.24719 35.9403 8.26554C35.9215 8.28391 35.8961 8.29422 35.8697 8.29422H35.0328C35.0065 8.29388 34.9811 8.28346 34.9625 8.26516C34.9438 8.2469 34.9334 8.22219 34.9329 8.19633V2.21759C34.9329 2.19165 34.9435 2.16674 34.9624 2.14838C34.981 2.13002 35.0063 2.11971 35.0328 2.11971H37.2579C38.5184 2.11971 39.4204 3.01894 39.4204 4.28099C39.4204 5.54304 38.525 6.44356 37.2647 6.44356L37.2579 6.44096ZM43.5202 8.19503C43.5205 8.208 43.5181 8.22085 43.513 8.23289C43.5081 8.24491 43.5007 8.25587 43.4915 8.26509C43.4821 8.27431 43.4711 8.28165 43.4588 8.28665C43.4468 8.29164 43.4335 8.29422 43.4203 8.29422H42.6302C42.617 8.29422 42.6038 8.29164 42.5917 8.28665C42.5794 8.28165 42.5683 8.27431 42.5591 8.26509C42.5499 8.25587 42.5424 8.24491 42.5376 8.23289C42.5326 8.22085 42.5301 8.208 42.5304 8.19503V8.01624C42.5316 8.00054 42.5278 7.98484 42.5191 7.97151C42.5108 7.95816 42.4981 7.94785 42.483 7.94212C42.4681 7.9364 42.4517 7.93558 42.4362 7.93977C42.4205 7.94394 42.4069 7.95291 42.3971 7.96533C42.1612 8.21722 41.7775 8.39993 41.1659 8.39993C40.2653 8.39993 39.6695 7.94054 39.6695 7.14702C39.6609 6.95354 39.7017 6.76099 39.7883 6.58685C39.8748 6.41274 40.0045 6.26254 40.1654 6.14992C40.4904 5.91108 40.994 5.7871 41.7414 5.75838L42.5341 5.73228V5.50517C42.5341 5.04708 42.2198 4.85262 41.7147 4.85262C41.2098 4.85262 40.8913 5.02751 40.8169 5.31333C40.8109 5.33352 40.7982 5.35117 40.7808 5.36348C40.7635 5.37579 40.7424 5.38201 40.7209 5.38119H39.9388C39.9244 5.38155 39.9101 5.3788 39.8968 5.37317C39.8838 5.36753 39.8719 5.35912 39.8623 5.34855C39.8529 5.33796 39.8458 5.3255 39.8418 5.31196C39.8377 5.29843 39.8366 5.28421 39.8388 5.27026C39.9561 4.5916 40.529 4.07607 41.7509 4.07607C43.0486 4.07607 43.5162 4.6673 43.5162 5.79622L43.5202 8.19503ZM48.4422 4.31621L46.6835 8.91154C46.2837 9.97911 45.5841 10.2532 44.818 10.2532C44.6737 10.2567 44.5296 10.2395 44.3903 10.2023C44.3686 10.1966 44.3496 10.184 44.3356 10.1666C44.322 10.1491 44.3146 10.1277 44.3144 10.1057V9.40748C44.3144 9.39287 44.3176 9.37843 44.3238 9.36519C44.3302 9.35195 44.3393 9.34023 44.3507 9.33089C44.3623 9.32153 44.3757 9.31479 44.3901 9.3111C44.4045 9.30743 44.4196 9.3069 44.4343 9.30959C44.5551 9.33204 44.6778 9.3434 44.8007 9.34354C45.0126 9.35394 45.2219 9.2944 45.3952 9.17442C45.5683 9.05444 45.6954 8.88098 45.756 8.68184L45.8081 8.5213C45.8161 8.49983 45.8161 8.47624 45.8081 8.45474L44.1637 4.31753C44.1588 4.30274 44.1574 4.28698 44.1597 4.27157C44.1622 4.25614 44.1682 4.24148 44.1772 4.22878C44.1865 4.21607 44.1987 4.20567 44.2128 4.1984C44.2268 4.19114 44.2425 4.18723 44.2584 4.18701H45.0579C45.0784 4.18721 45.0982 4.19339 45.1151 4.2048C45.132 4.21619 45.145 4.23227 45.1524 4.25097L46.2691 7.16921C46.2765 7.18827 46.2895 7.20469 46.3066 7.21628C46.3239 7.22788 46.3441 7.23407 46.365 7.23407C46.3857 7.23407 46.4062 7.22788 46.4232 7.21628C46.4404 7.20469 46.4536 7.18827 46.4608 7.16921L47.4297 4.2588C47.436 4.23896 47.4489 4.22167 47.4662 4.20946C47.4834 4.19724 47.5041 4.19075 47.5253 4.19094H48.345C48.3607 4.19087 48.3763 4.19448 48.3906 4.2014C48.4046 4.20834 48.417 4.21843 48.4265 4.23087C48.436 4.24331 48.4422 4.25774 48.4449 4.27303C48.4478 4.28829 48.4468 4.30398 48.4422 4.31883V4.31621Z" fill="currentColor"/>
            </svg>
            <span>. As low as $149.75.*</span>
          </div>
        )}
      </div>
    </div>
  );
}
