import type { Metadata } from "next";
import { ReviewForm } from "@/components/ReviewForm";

export const metadata: Metadata = {
  title: "Leave a Review",
  description:
    "Share your experience at Love Grass Dubai. Your feedback helps us preserve and perfect the authentic taste of Ethiopia.",
};

export default function ReviewPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-brand-green-dark to-brand-deep-forest overflow-hidden pt-24 pb-24">
      {/* Mesob pattern overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 opacity-5 bg-[url('/mesob-pattern.jpg')] bg-repeat bg-[length:340px_340px] pointer-events-none"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="text-center mb-16">
          <span className="inline-block mb-4 px-4 py-1 rounded-full border border-brand-gold/30 text-brand-gold text-xs font-semibold tracking-widest uppercase backdrop-blur-sm bg-white/5">
            Your Voice Matters
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-brand-white leading-tight mt-3">
            Leave a Review
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-brand-white/60 text-lg leading-relaxed">
            Thank you for dining with us. We would love to hear about your experience at Love Grass.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <ReviewForm />
        </div>
      </div>
    </div>
  );
}
