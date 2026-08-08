import type { Metadata } from "next";
import { TeffJourney } from "@/components/heritage/TeffJourney";
import { AboutUs } from "@/components/heritage/AboutUs";
import { RestaurantCaptures } from "@/components/heritage/RestaurantCaptures";
import { FAQAccordion } from "@/components/heritage/FAQAccordion";

/* ── SEO metadata ── */
export const metadata: Metadata = {
  title: "Our Heritage",
  description:
    "Discover the story of Love Grass — the ancient Ethiopian grain teff, the culture of injera, our brand story, and the culinary traditions that define our cuisine in Dubai.",
  openGraph: {
    title: "Our Heritage | Love Grass",
    description:
      "From Ethiopian highland fields to your table — the 3,000-year journey of teff and the story behind Love Grass Dubai.",
    images: [
      {
        url: "/hero-platter.webp",
        width: 1200,
        height: 900,
        alt: "Love Grass Ethiopian heritage",
      },
    ],
  },
};

export default function HeritagePage() {
  return (
    <>
      {/* ── Section 1: Teff Journey (animated zigzag timeline) ── */}
      <TeffJourney />

      {/* ── Section 2: About Us (brand story editorial) ── */}
      <AboutUs />

      {/* ── Section 3: Restaurant Captures (photo gallery) ── */}
      <RestaurantCaptures />

      {/* ── Section 4: FAQs (animated accordion) ── */}
      <FAQAccordion />
    </>
  );
}
