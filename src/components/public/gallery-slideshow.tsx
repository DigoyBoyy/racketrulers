"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GallerySlideshowProps {
  images: {
    src: string;
    alt: string;
  }[];
  intervalMs?: number;
  fit?: "cover" | "contain";
  aspectClassName?: string;
  className?: string;
  frameBackgroundClassName?: string;
}

export function GallerySlideshow({
  images,
  intervalMs = 4500,
  fit = "cover",
  aspectClassName = "aspect-[16/9]",
  className,
  frameBackgroundClassName = "bg-card",
}: GallerySlideshowProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [images.length, intervalMs]);

  if (images.length === 0) return null;

  function goPrev() {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  }

  function goNext() {
    setActiveIndex((prev) => (prev + 1) % images.length);
  }

  const fitClass = fit === "contain" ? "object-contain" : "object-cover";

  return (
    <div className={`mx-auto mt-8 w-full max-w-4xl ${className ?? ""}`}>
      <div
        className={`relative overflow-hidden rounded-2xl border border-border/60 ${aspectClassName} ${frameBackgroundClassName}`}
      >
        {images.map((image, idx) => (
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 896px, 92vw"
            className={`${fitClass} transition-opacity duration-700 ${
              idx === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            priority={idx === 0}
          />
        ))}

        {images.length > 1 && (
          <>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="absolute left-3 top-1/2 h-9 w-9 -translate-y-1/2"
              onClick={goPrev}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="absolute right-3 top-1/2 h-9 w-9 -translate-y-1/2"
              onClick={goNext}
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {images.map((image, idx) => (
            <button
              key={`${image.src}-dot`}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`h-2.5 rounded-full transition-all ${
                idx === activeIndex ? "w-6 bg-primary" : "w-2.5 bg-muted-foreground/40"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}