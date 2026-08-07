"use client";

import React, { useEffect, useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { DishCard } from "./DishCard";
import type { Dish } from "@/lib/menu-data";

export function MobileDishCarousel({ dishes }: { dishes: Dish[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", skipSnaps: false },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  );

  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const startAutoplay = useCallback(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    // Clear any existing timeout
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Set a 10s timeout to resume autoplay
    timeoutRef.current = setTimeout(() => {
      autoplay.play();
    }, 6000);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    // When the user interacts (drags/swipes), start the 10s resume timer
    emblaApi.on("pointerDown", startAutoplay);
    
    return () => {
      emblaApi.off("pointerDown", startAutoplay);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [emblaApi, startAutoplay]);

  return (
    <div className="md:hidden w-full overflow-hidden pb-8" ref={emblaRef}>
      <div className="flex touch-pan-y -ml-4">
        {dishes.map((dish, index) => (
          <div
            key={dish.id}
            className="flex-[0_0_80%] max-w-[320px] min-w-0 pl-4"
          >
            <div className="h-full">
              <DishCard dish={dish} index={index} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
