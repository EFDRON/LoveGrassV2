"use client";

import React, { useState } from "react";
import { DishCard } from "./DishCard";
import type { MenuCategoryData } from "@/lib/menu-data";

export function MenuCategory({ category }: { category: MenuCategoryData }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const INITIAL_COUNT = 3;

  const visibleDishes = isExpanded 
    ? category.dishes 
    : category.dishes.slice(0, INITIAL_COUNT);
    
  const hasMore = category.dishes.length > INITIAL_COUNT;

  return (
    <div className="mb-20 last:mb-0 scroll-mt-24" id={category.id}>
      {/* Category Header */}
      <div className="mb-8">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-white">
          {category.name}
        </h2>
        <div className="flex items-center gap-4 mt-2">
          <p lang="am" className="text-brand-gold text-lg tracking-widest font-semibold">
            {category.amharic}
          </p>
          <div className="h-px bg-brand-gold/20 flex-1 max-w-[100px]" />
        </div>
        {category.description && (
          <p className="mt-4 text-brand-white/70 max-w-2xl text-base leading-relaxed">
            {category.description}
          </p>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {visibleDishes.map((dish, index) => (
          <div key={dish.id} className={!isExpanded && index >= INITIAL_COUNT ? "hidden" : "animate-in fade-in slide-in-from-bottom-4 duration-500"}>
            <DishCard dish={dish} index={index} />
          </div>
        ))}
      </div>

      {/* See More Toggle */}
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-brand-charcoal border border-brand-gold/30 text-brand-gold hover:bg-brand-gold/10 hover:border-brand-gold transition-all duration-300 rounded-full text-sm font-bold tracking-widest uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
          >
            {isExpanded ? "Show Less" : `See More ${category.name}`}
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
