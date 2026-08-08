"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";


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
    <div className="relative z-10 w-full h-full overflow-hidden flex flex-col justify-center min-h-[700px] lg:min-h-[600px]">
        <div className="absolute inset-0 w-full h-full">
          {slides.map((slide, index) => {
            const isActive = index === currentIndex;
            
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
                aria-hidden={!isActive}
              >
                {/* ═══════════════════════════════════════════════
                    RIGHT BACKGROUND — Hero Image Visual
                ═══════════════════════════════════════════════ */}
                <div 
                  className="absolute top-0 right-0 h-full w-full lg:w-[68%]"
                  style={{
                    WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 25%)",
                    maskImage: "linear-gradient(to right, transparent 0%, black 25%)"
                  }}
                >
                  <Image
                    src={slide.imageSrc}
                    alt={slide.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 70vw"
                    quality={90}
                    priority={index === 0}
                    className="object-cover object-center"
                  />
                  {/* Strong dark overlay on mobile for readability, subtle blend on desktop */}
                  <div className="absolute inset-0 bg-black/60 mix-blend-normal lg:bg-brand-forest/20 lg:mix-blend-overlay" />
                  
                  {/* Floating dish-name badge */}
                  <div className="absolute bottom-16 lg:bottom-12 right-6 lg:right-12 flex items-end justify-between z-10" aria-hidden="true">
                    <div className="hero-badge text-xs md:text-sm tracking-widest bg-brand-forest/80 backdrop-blur-sm py-2 px-4 shadow-xl">
                      <span className="hero-badge-dot" />
                      {slide.imageBadge}
                    </div>
                  </div>
                </div>

                {/* ═══════════════════════════════════════════════
                    LEFT COLUMN — Narrative / Text
                ═══════════════════════════════════════════════ */}
                <div className="relative z-10 w-full h-full lg:w-[50%] xl:w-[40%] flex items-center px-4 sm:px-8 lg:pl-12 xl:pl-[8%] pt-12 lg:pt-28">
                  <div className="flex flex-col justify-center lg:pr-8 text-center lg:text-left h-full max-w-2xl pt-12 pb-32 md:py-24 lg:mt-0">
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
                  <p className="text-brand-gold/90 text-base sm:text-lg leading-relaxed max-w-md mx-auto lg:mx-0 mb-10 font-medium drop-shadow-md">
                    {slide.subtext}
                  </p>

                  {/* CTA buttons */}
                  <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4">
                    <Link href="/menu" className="btn-hero-solid w-full sm:w-auto" tabIndex={isActive ? 0 : -1}>
                      View Our Menu
                    </Link>
                    <Link 
                      href="/contact" 
                      className="btn-hero-ghost w-full sm:w-auto relative overflow-hidden before:absolute before:inset-0 before:z-0 before:w-1/3 before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:animate-shine" 
                      tabIndex={isActive ? 0 : -1}
                    >
                      <span className="relative z-10">Reserve a Table</span>
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
