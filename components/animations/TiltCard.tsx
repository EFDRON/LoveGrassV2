"use client";

import React, { useRef } from "react";
import gsap from "gsap";

interface TiltCardProps {
  children: React.ReactNode;
}

export function TiltCard({ children }: TiltCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Normalize from -1 to 1 based on center
    const normalizedX = (x - centerX) / centerX;
    const normalizedY = (y - centerY) / centerY;

    const maxRotateX = 15;
    const maxRotateY = 15;

    gsap.to(cardRef.current, {
      rotationX: -normalizedY * maxRotateX,
      rotationY: normalizedX * maxRotateY,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.5,
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    
    gsap.to(cardRef.current, {
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      ease: "elastic.out(1, 0.3)",
      duration: 1.5,
      overwrite: "auto",
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1000px" }}
      className="w-full h-full"
    >
      <div
        ref={cardRef}
        className="w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </div>
    </div>
  );
}
