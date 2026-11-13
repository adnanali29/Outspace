"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useContent } from "./ContentProvider";

// Photos filling the hero, behind a cream layer set in Landing.tsx.
// Crossfades every few seconds, and not at all for reduced-motion visitors.
export function HeroSlideshow() {
  const { heroImages, heroSlideSeconds } = useContent();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (heroImages.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(
      () => setCurrent((index) => (index + 1) % heroImages.length),
      Math.max(1, heroSlideSeconds) * 1000,
    );
    return () => clearInterval(timer);
  }, [heroImages.length, heroSlideSeconds]);

  return (
    <div className="absolute inset-0 bg-mist">
      {heroImages.map((image, i) => (
        <Image
          key={`${i}-${image.src}`}
          src={image.src}
          alt={i === current ? image.alt : ""}
          fill
          sizes="100vw"
          priority={i === 0}
          loading={i === 0 ? undefined : "eager"}
          className={`object-cover object-[center_40%] transition-opacity duration-700 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
