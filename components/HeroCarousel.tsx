"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { TiltContainer } from "./animations/TiltContainer";

export interface HeroSlide {
  id: number;
  imageSrc: string;
  kickerAmharic: string;
  kickerEnglish: string;
  headlinePart1: string;
  headlinePart2: string;
  headlinePart3: string;
  subtext: string;
  tags: { icon: string; label: string }[];
  imageAlt: string;
  imageBadge: string;
}

interface HeroCarouselProps {
  slides: HeroSlide[];
}

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // SVG Divider Component (Reused from page.tsx)
  const GoldDivider = () => (
    <div className="flex items-center justify-center lg:justify-start gap-4 mb-8" aria-hidden="true">
      <div className="h-px w-12 bg-gradient-to-r from-transparent to-brand-gold/50" />
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5L7 0Z" fill="#C7C466" />
      </svg>
      <div className="h-px w-12 bg-gradient-to-l from-transparent to-brand-gold/50" />
    </div>
  );

  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* We set a min-height to ensure the container holds its height during absolute positioning */}
        <div className="relative w-full min-h-[700px] lg:min-h-[600px]">
          {slides.map((slide, index) => {
            const isActive = index === currentIndex;
            
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center transition-opacity duration-1000 ease-in-out ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
                aria-hidden={!isActive}
              >
                {/* ═══════════════════════════════════════════════
                    LEFT COLUMN — Narrative / Text
                ═══════════════════════════════════════════════ */}
                <div className="flex flex-col justify-center lg:pr-8 text-center lg:text-left h-full">
                  {/* Amharic / brand identity badge */}
                  <div className="flex justify-center lg:justify-start mb-5">
                    <div className="hero-badge" aria-label={`${slide.kickerEnglish} in Amharic — ${slide.kickerAmharic}`}>
                      <span className="hero-badge-dot" aria-hidden="true" />
                      <span lang="am" className="font-display tracking-normal normal-case text-base leading-none">
                        {slide.kickerAmharic}
                      </span>
                      <span className="hero-badge-dot" aria-hidden="true" />
                      <span>{slide.kickerEnglish}</span>
                    </div>
                  </div>

                  {/* Decorative rule */}
                  <GoldDivider />

                  {/* Primary H1 */}
                  <h1 className="font-display font-bold text-brand-white leading-[1.08] tracking-tight mb-6">
                    <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
                      {slide.headlinePart1}
                    </span>
                    <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] italic text-brand-gold">
                      {slide.headlinePart2}
                    </span>
                    <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mt-1">
                      {slide.headlinePart3}
                    </span>
                  </h1>

                  {/* Sub-description */}
                  <p className="text-brand-gold/90 text-base sm:text-lg leading-relaxed max-w-md mx-auto lg:mx-0 mb-10 font-medium">
                    {slide.subtext}
                  </p>

                  {/* CTA buttons */}
                  <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4">
                    <Link href="/menu" className="btn-hero-solid w-full sm:w-auto" tabIndex={isActive ? 0 : -1}>
                      View Our Menu
                    </Link>
                    <Link href="/contact" className="btn-hero-ghost w-full sm:w-auto" tabIndex={isActive ? 0 : -1}>
                      Reserve a Table
                    </Link>
                  </div>

                  {/* Trust badges / Tags */}
                  <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6">
                    {slide.tags.map(({ icon, label }) => (
                      <div key={label} className="flex items-center gap-1.5 text-white/60 text-xs font-medium">
                        <span aria-hidden="true">{icon}</span>
                        <span>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ═══════════════════════════════════════════════
                    RIGHT COLUMN — Hero Image Visual
                ═══════════════════════════════════════════════ */}
                <div className="relative flex items-center justify-center lg:justify-end h-full">
                  {/* Decorative glow ring behind the image */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 rounded-[2rem] pointer-events-none"
                    style={{
                      background: "radial-gradient(ellipse 85% 85% at 50% 50%, rgba(199,196,102,0.18) 0%, transparent 70%)",
                    }}
                  />

                  {/* Image container wrapper to set bounds for TiltContainer */}
                  <div className="w-full max-w-lg lg:max-w-none aspect-[4/3] lg:aspect-[3/4] xl:aspect-square relative">
                    <TiltContainer>
                      {/* Inner image container */}
                      <div className="hero-image-glow overflow-hidden w-full h-full relative">
                        <Image
                          src={slide.imageSrc}
                          alt={slide.imageAlt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
                          quality={90}
                          priority={index === 0} // Only prioritize LCP for the first image
                          className="object-cover object-center"
                        />

                        {/* Gradient overlay */}
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 rounded-[2rem] pointer-events-none"
                          style={{
                            background: "linear-gradient(to top, rgba(43,96,39,0.45) 0%, transparent 50%)",
                          }}
                        />

                        {/* Floating dish-name badge */}
                        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between" aria-hidden="true">
                          <div className="hero-badge text-[10px] tracking-widest bg-brand-forest/80 backdrop-blur-sm">
                            <span className="hero-badge-dot" />
                            {slide.imageBadge}
                          </div>
                        </div>
                      </div>
                    </TiltContainer>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-0 lg:bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full ${
              idx === currentIndex ? "w-6 h-1.5 bg-brand-gold" : "w-1.5 h-1.5 bg-brand-white/30 hover:bg-brand-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
