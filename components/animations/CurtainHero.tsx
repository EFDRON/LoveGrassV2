"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CurtainHeroProps {
  children: React.ReactNode;
}

export function CurtainHero({ children }: CurtainHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Parallax fade and scale out as user scrolls down the first viewport height
      gsap.to(containerRef.current, {
        scrollTrigger: {
          start: 0,
          end: () => window.innerHeight,
          scrub: true,
        },
        scale: 0.95,
        opacity: 0.4,
        y: 40,
        ease: "none",
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center pb-20 md:pb-24 relative"
    >
      {children}
    </div>
  );
}
