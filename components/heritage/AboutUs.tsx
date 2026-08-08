/**
 * AboutUs.tsx — Server Component
 *
 * Editorial brand story section for the Heritage page.
 * Dark forest background, Playfair Display headlines, pull quote.
 */
import Image from "next/image";

export function AboutUs() {
  return (
    <section
      id="about-us"
      aria-labelledby="about-us-heading"
      className="relative overflow-hidden bg-brand-charcoal py-24 md:py-36"
    >
      {/* ── Mesob pattern overlay ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 opacity-[0.04] bg-[url('/mesob-pattern.jpg')] bg-repeat bg-[length:340px_340px] pointer-events-none"
      />

      {/* ── Ambient glow ── */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-96 h-96 rounded-full bg-brand-green-dark/10 blur-[120px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-brand-gold/5 blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section kicker ── */}
        <div className="flex items-center gap-4 mb-6">
          <span className="h-px w-10 bg-brand-gold/40" />
          <p className="text-brand-gold text-xs font-bold tracking-[0.25em] uppercase">
            Our Story
          </p>
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* ── Left: Text content ── */}
          <div>
            <h2
              id="about-us-heading"
              className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-brand-white leading-[1.1] tracking-tight mb-8"
            >
              Born From a{" "}
              <span className="italic text-brand-gold">Grandmother&apos;s</span>{" "}
              Kitchen
            </h2>

            <div className="space-y-5 text-brand-white/65 text-base leading-relaxed">
              <p>
                Love Grass was born from a simple but profound belief: that
                Ethiopian food, at its finest, is one of the world&apos;s great
                culinary traditions — and it deserves to be celebrated, not
                merely served.
              </p>
              <p>
                Our founder carried the memory of his grandmother&apos;s injera
                across 4,000 kilometres — the way it steamed off the clay mitad
                in the early morning, the way the berbere-spiced stews pooled in
                its craters, the way the family gathered around the mesob. In
                Dubai, he recreated that ritual, one carefully sourced
                ingredient at a time.
              </p>
              <p>
                Every injera at Love Grass is made from 100% pure lovegrass teff
                — sourced directly from Ethiopian highland farms standing at
                1,800 metres. No wheat. No barley. Just teff, water, time, and
                the ancient knowledge of fermentation that Ethiopian mothers
                have passed down for centuries.
              </p>
            </div>

            {/* ── Pull quote ── */}
            <blockquote className="mt-10 pl-6 border-l-2 border-brand-gold">
              <p className="font-display italic text-xl text-brand-gold/90 leading-relaxed">
                &ldquo;Food is how a culture remembers itself. Every bite of
                injera is a page from Ethiopia&apos;s story.&rdquo;
              </p>
              <cite className="mt-3 block text-brand-white/40 text-sm font-semibold tracking-wider not-italic">
                — Love Grass Founder
              </cite>
            </blockquote>

            {/* ── Brand pillars ── */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              {[
                { value: "3,000+", label: "Years of Teff Heritage" },
                { value: "100%", label: "Pure Lovegrass Teff" },
                { value: "Dubai", label: "Est. in the UAE" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="font-display font-bold text-3xl text-brand-gold">
                    {value}
                  </p>
                  <p className="mt-1 text-brand-white/45 text-xs leading-snug">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Image collage ── */}
          <div className="relative h-[520px] lg:h-[620px]">
            {/* Main image */}
            <div className="absolute top-0 right-0 w-[75%] h-[75%] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-brand-gold/10">
              <Image
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800"
                alt="Love Grass restaurant interior — warm lighting and authentic Ethiopian décor"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                quality={90}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/40 to-transparent" />
            </div>

            {/* Secondary image */}
            <div className="absolute bottom-0 left-0 w-[58%] h-[55%] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-brand-gold/10">
              <Image
                src="https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&q=80&w=600"
                alt="Freshly baked teff injera on a traditional clay mitad"
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                quality={75}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-charcoal/50 to-transparent" />
            </div>

            {/* Floating badge */}
            <div className="absolute top-[72%] right-[2%] z-10 flex items-center gap-2.5 bg-brand-gold px-4 py-2.5 rounded-2xl shadow-xl">
              <span className="text-brand-charcoal text-xs font-bold tracking-wide leading-tight">
                🌿 Sourced from
                <br />
                Ethiopian Highlands
              </span>
            </div>

            {/* Gold ring accent */}
            <div
              aria-hidden="true"
              className="absolute -top-6 -right-6 w-24 h-24 rounded-full border border-brand-gold/20"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
