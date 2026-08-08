import type { Metadata } from "next";

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
          <form
            className="rounded-3xl border border-brand-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-10 space-y-6 shadow-2xl shadow-black/30"
            action="mailto:hello@lovegrass.ae"
            method="GET"
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
        </div>
      </div>
    </div>
  );
}
