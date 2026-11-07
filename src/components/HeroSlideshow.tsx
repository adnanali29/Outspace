"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { heroImages, heroSlideSeconds } from "@/content";

// Real class photos filling the hero, behind a cream layer set in Landing.tsx.
// Crossfades slowly, and not at all for reduced-motion visitors.
export function HeroSlideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(
      () => setCurrent((index) => (index + 1) % heroImages.length),
      heroSlideSeconds * 1000,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 bg-mist">
      {heroImages.map((image, i) => (
        <Image
          key={image.src}
          src={image.src}
          alt={i === current ? image.alt : ""}
          fill
          sizes="100vw"
          priority={i === 0}
          loading={i === 0 ? undefined : "eager"}
          className={`object-cover object-[center_40%] transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
