"use client";

import { useState } from "react";
import Image from "next/image";
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

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Scroll-snap container */}
      <div
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

      {/* Dots indicator */}
      {photos.length > 1 && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {photos.map((_, index) => (
            <div
              key={index}
              className={cn(
                "h-1.5 rounded-full transition-all",
                index === current
                  ? "w-4 bg-white"
                  : "w-1.5 bg-white/50"
              )}
            />
          ))}
        </div>
      )}

      {/* Overlay children (stats, gradient, etc.) */}
      {children}
    </div>
  );
}
