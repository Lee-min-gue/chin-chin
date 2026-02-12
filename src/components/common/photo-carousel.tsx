"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProfilePhoto } from "@/types/database";

interface PhotoCarouselProps {
  photos: ProfilePhoto[];
  revealed?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  children?: React.ReactNode;
}

export function PhotoCarousel({
  photos,
  revealed = false,
  className,
  sizes = "(max-width: 512px) 100vw, 512px",
  priority = false,
  children,
}: PhotoCarouselProps) {
  const [current, setCurrent] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  if (photos.length === 0) return null;

  const getPhotoSrc = (photo: ProfilePhoto) => {
    if (revealed) return photo.originalUrl;
    if (!photo.blurEnabled) return photo.originalUrl;
    return photo.url;
  };

  const shouldBlur = (photo: ProfilePhoto) => {
    if (revealed) return false;
    return photo.blurEnabled;
  };

  const scrollTo = (index: number) => {
    if (!scrollRef.current) return;
    const clamped = Math.max(0, Math.min(index, photos.length - 1));
    scrollRef.current.scrollTo({
      left: clamped * scrollRef.current.clientWidth,
      behavior: "smooth",
    });
    setCurrent(clamped);
  };

  return (
    <div className={cn("group relative overflow-hidden", className)}>
      {/* Scroll-snap container */}
      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory overflow-x-auto scrollbar-hide"
        onScroll={(e) => {
          const target = e.currentTarget;
          const idx = Math.round(target.scrollLeft / target.clientWidth);
          setCurrent(idx);
        }}
      >
        {photos.map((photo, index) => (
          <div
            key={index}
            className="relative aspect-square w-full shrink-0 snap-center"
          >
            <Image
              src={getPhotoSrc(photo)}
              alt={`사진 ${index + 1}`}
              fill
              sizes={sizes}
              className={cn(
                "object-cover",
                shouldBlur(photo) && "blur-xl scale-110"
              )}
              priority={priority && index === 0}
            />
          </div>
        ))}
      </div>

      {/* PC arrow buttons (hidden on mobile, shown on hover) */}
      {photos.length > 1 && (
        <>
          {current > 0 && (
            <button
              type="button"
              onClick={() => scrollTo(current - 1)}
              className="absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-black/40 p-1.5 text-white backdrop-blur-sm transition-opacity hover:bg-black/60 md:flex"
              aria-label="이전 사진"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          {current < photos.length - 1 && (
            <button
              type="button"
              onClick={() => scrollTo(current + 1)}
              className="absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-black/40 p-1.5 text-white backdrop-blur-sm transition-opacity hover:bg-black/60 md:flex"
              aria-label="다음 사진"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </>
      )}

      {/* Dots indicator */}
      {photos.length > 1 && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {photos.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollTo(index)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                index === current
                  ? "w-4 bg-white"
                  : "w-1.5 bg-white/50"
              )}
              aria-label={`사진 ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Overlay children (stats, gradient, etc.) */}
      {children}
    </div>
  );
}
