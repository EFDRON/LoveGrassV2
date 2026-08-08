"use client";

import { useState } from "react";

export function ReviewForm() {
  const [status, setStatus] = useState<"idle" | "success">("idle");

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-brand-gold/30 bg-brand-gold/10 backdrop-blur-xl p-10 md:p-12 text-center shadow-2xl shadow-black/30">
        <div className="w-16 h-16 rounded-full bg-brand-gold/20 flex items-center justify-center mx-auto mb-6 text-brand-gold">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="font-display text-2xl font-bold text-brand-white mb-3">Review Sent Successfully!</h3>
        <p className="text-brand-white/70">
          Thank you for sharing your experience. We truly appreciate your feedback!
        </p>
      </div>
    );
  }

  return (
    <form
      className="rounded-3xl border border-brand-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-10 space-y-6 shadow-2xl shadow-black/30"
      onSubmit={(e) => {
        e.preventDefault();
        setStatus("success");
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="review-name" className="text-brand-white/70 text-sm font-medium">
            Full Name <span className="text-brand-gold">*</span>
          </label>
          <input
            id="review-name"
            name="name"
            type="text"
            required
            placeholder="Your full name"
            className="rounded-xl border border-brand-white/15 bg-white/5 px-4 py-3 text-sm text-brand-white placeholder:text-brand-white/30 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/30 transition-all duration-200"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="review-email" className="text-brand-white/70 text-sm font-medium">
            Email Address
          </label>
          <input
            id="review-email"
            name="email"
            type="email"
            placeholder="you@example.com (Optional)"
            className="rounded-xl border border-brand-white/15 bg-white/5 px-4 py-3 text-sm text-brand-white placeholder:text-brand-white/30 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/30 transition-all duration-200"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="review-rating" className="text-brand-white/70 text-sm font-medium">
          How would you rate your experience? <span className="text-brand-gold">*</span>
        </label>
        <select
          id="review-rating"
          name="rating"
          required
          className="rounded-xl border border-brand-white/15 bg-brand-deep-forest px-4 py-3 text-sm text-brand-white focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/30 transition-all duration-200"
        >
          <option value="">Select a rating</option>
          <option value="5">⭐⭐⭐⭐⭐ - Excellent, authentic taste!</option>
          <option value="4">⭐⭐⭐⭐ - Great experience</option>
          <option value="3">⭐⭐⭐ - Good, but room for improvement</option>
          <option value="2">⭐⭐ - Not quite what I expected</option>
          <option value="1">⭐ - Disappointing</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="review-message" className="text-brand-white/70 text-sm font-medium">
          Your Review <span className="text-brand-gold">*</span>
        </label>
        <textarea
          id="review-message"
          name="body"
          required
          rows={5}
          placeholder="Tell us about the food, the service, and the atmosphere..."
          className="rounded-xl border border-brand-white/15 bg-white/5 px-4 py-3 text-sm text-brand-white placeholder:text-brand-white/30 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/30 transition-all duration-200 resize-none"
        />
      </div>

      <button
        type="submit"
        className="btn-hero-solid w-full py-4 text-base font-bold relative overflow-hidden before:absolute before:inset-0 before:z-0 before:w-1/3 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:animate-shine"
      >
        <span className="relative z-10">Submit Review</span>
      </button>

      <p className="text-center text-xs text-brand-white/30 leading-relaxed">
        By submitting this review, you agree that we may feature your feedback on our website.
      </p>
    </form>
  );
}
