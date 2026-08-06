"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
}

export function ScrollReveal({ children, delay = 0 }: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      
      // Set initial state
      gsap.set(containerRef.current, { opacity: 0, y: 50 });

      // Create scroll-triggered animation
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%", // Trigger when top of element hits 85% down viewport
          end: "bottom 15%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay,
      });
    },
    { scope: containerRef }
  );

  return <div ref={containerRef}>{children}</div>;
}
