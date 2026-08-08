/**
 * ReviewsMarquee — Server Component
 *
 * Renders the "Voices of Our Guests" section with a pure-CSS
 * infinite horizontal scrolling marquee. Zero JavaScript, zero
 * carousel libraries. Animation defined in globals.css.
 *
 * Technique:
 *   - Two identical sets of review cards are placed side-by-side
 *     inside .marquee-track
 *   - CSS animates translateX(0) → translateX(-50%)
 *   - When -50% is reached (one full set scrolled away), the animation
 *     resets to 0 — the second identical set has filled the gap,
 *     creating a seamless infinite loop
 *   - Hover pauses via animation-play-state (handled in globals.css)
 */
import Image from "next/image";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

/* -------------------------------------------------------
   Review data — 5 real-feeling reviews
------------------------------------------------------- */
const REVIEWS = [
  {
    id: 1,
    quote:
      "The Doro Wat transported me straight to Addis Ababa. The injera was the most authentic I've had outside Ethiopia — pillowy, tangy, and absolutely perfect.",
    name: "Sarah Al-Rashidi",
    subtitle: "Food Blogger · Dubai",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "Every single element of our meal was extraordinary. The berbere spice blend in the Misir Wat was nothing short of revelatory. Love Grass is a hidden gem.",
    name: "James Okonkwo",
    subtitle: "Local Guide · Google",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "The communal platter experience brought our whole family together. Eating from the same injera — that shared, tactile joy — is something I haven't found anywhere else in Dubai.",
    name: "Amina Hassan",
    subtitle: "Travel Writer",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100",
    rating: 5,
  },
  {
    id: 4,
    quote:
      "I've visited Ethiopia three times and this is the first restaurant outside of the country that genuinely moved me. The teff injera is the real thing — 100% pure.",
    name: "Marcus Lindqvist",
    subtitle: "Culinary Explorer",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100",
    rating: 5,
  },
  {
    id: 5,
    quote:
      "Ye'Bere Tibs was the most aromatic beef dish I've ever encountered. The service matched the quality of the food — warm, attentive, and genuinely proud of their heritage.",
    name: "Lena Petrov",
    subtitle: "Restaurant Critic",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
    rating: 5,
  },
] as const;

/* -------------------------------------------------------
   StarRating — 5 gold SVG stars
------------------------------------------------------- */
function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div
      role="img"
      aria-label={`${count} out of 5 stars`}
      className="flex items-center gap-0.5"
    >
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="w-4 h-4 fill-brand-gold flex-shrink-0"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/* -------------------------------------------------------
   ReviewCard — a single testimonial card
------------------------------------------------------- */
function ReviewCard({ review }: { review: (typeof REVIEWS)[number] }) {
  return (
    <article
      aria-label={`Review by ${review.name}`}
      /*
       * Fixed width so every card occupies exactly the same space
       * in the flex marquee — critical for correct -50% calculation.
       * w-80 = 320px on all screens.
       */
      className="w-80 flex-shrink-0 flex flex-col gap-5 rounded-2xl border border-brand-green-main/25 bg-brand-charcoal p-6 shadow-lg shadow-black/30"
    >
      {/* Stars */}
      <StarRating count={review.rating} />

      {/* Quote */}
      <blockquote className="flex-1">
        <p className="font-display italic text-brand-white/85 text-sm leading-relaxed">
          &ldquo;{review.quote}&rdquo;
        </p>
      </blockquote>

      {/* Thin gold separator */}
      <div aria-hidden="true" className="h-px bg-brand-gold/10" />

      {/* Author */}
      <div className="flex items-center gap-3">
        {/* Circular avatar */}
        <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-brand-gold/20">
          <Image
            src={review.avatar}
            alt={`Portrait of ${review.name}`}
            fill
            sizes="40px"
            quality={75}
            className="object-cover"
          />
        </div>

        {/* Name + subtitle */}
        <div>
          <p className="text-brand-white text-sm font-bold leading-tight">
            {review.name}
          </p>
          <p className="text-brand-gold/65 text-xs font-medium mt-0.5">
            {review.subtitle}
          </p>
        </div>
      </div>
    </article>
  );
}

/* -------------------------------------------------------
   ReviewsMarquee — exported section
------------------------------------------------------- */
export function ReviewsMarquee() {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        /*
         * Gradient: brand-charcoal → brand-deep-forest
         */
        background: "linear-gradient(to bottom, #0f2416 0%, #141414 100%)",
      }}
    >
      {/* ── Mesob pattern overlay ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "url('/mesob-pattern.jpg')",
          backgroundRepeat: "repeat",
          backgroundSize: "340px 340px",
          opacity: 0.1,
          mixBlendMode: "overlay",
        }}
      />

      {/* ── Noise grain ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
          opacity: 0.035,
        }}
      />

      {/* ── Content (above overlays) ── */}
      <div className="relative z-10">
        {/* Section header */}
        <div className="text-center mb-14 px-4 sm:px-6 lg:px-8">
          {/* Kicker */}
          <p className="mb-3 text-brand-gold text-sm font-semibold tracking-[0.2em] uppercase">
            Guest Testimonials
          </p>

          {/* Main heading */}
          <ScrollReveal>
            <h2
              id="reviews-heading"
              className="font-display font-bold text-brand-white text-4xl sm:text-5xl leading-[1.1] tracking-tight"
            >
              Voices of Our Guests
            </h2>
          </ScrollReveal>

          {/* Aggregate rating badge */}
          <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-brand-gold/20 bg-brand-deep-forest/60 px-5 py-2.5 backdrop-blur-sm">
            <StarRating count={5} />
            <span className="text-brand-white text-sm font-bold">4.9</span>
            <span aria-hidden="true" className="h-4 w-px bg-brand-white/20" />
            <span className="text-brand-white/60 text-sm">200+ reviews</span>
          </div>
        </div>

        {/*
          ── CSS-Only Marquee ─────────────────────────────────
          .marquee-outer  → clips overflow + applies edge vignette masks
          .marquee-track  → the animated flex container

          Two identical copies of REVIEWS are rendered as children.
          When the animation moves the track -50%, it has scrolled
          exactly one copy off the left edge, while the second copy
          occupies the same position the first started at. The
          animation then loops seamlessly back to 0.
        */}
        <div
          className="marquee-outer"
          role="region"
          aria-label="Scrolling guest reviews — hover to pause"
        >
          <div className="marquee-track" aria-live="off">
            {/* First copy */}
            {REVIEWS.map((review) => (
              <ReviewCard key={`a-${review.id}`} review={review} />
            ))}
            {/* Second copy — required for seamless loop */}
            {REVIEWS.map((review) => (
              <ReviewCard
                key={`b-${review.id}`}
                review={review}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center px-4">
          <a
            href="https://g.page/r/lovegrass-dubai"
            target="_blank"
            rel="noopener noreferrer"
            id="reviews-leave-review-cta"
            className="btn-outline-gold-dark inline-flex items-center gap-2 text-sm"
          >
            Leave a Review
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
