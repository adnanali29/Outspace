"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { heroImages, heroSlideSeconds } from "@/content";

// Full-bleed photos behind the hero, darkened so the text stays readable.
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
    <div className="absolute inset-0">
      {heroImages.map((image, i) => (
        <Image
          key={image.src}
          src={image.src}
          alt={i === current ? image.alt : ""}
          fill
          sizes="100vw"
          priority={i === 0}
          loading={i === 0 ? undefined : "eager"}
          className={`object-cover transition-opacity duration-700 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      {/* An even dark wash, a vignette closing in from every side, and extra
          weight behind the text column. */}
      <div aria-hidden className="absolute inset-0 bg-black/65 lg:bg-black/35" />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgb(0_0_0/0.8)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 hidden bg-gradient-to-r from-black/80 via-black/45 to-transparent lg:block"
      />
    </div>
  );
}
