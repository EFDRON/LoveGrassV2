"use client";

/**
 * FAQAccordion.tsx — Client Component
 *
 * Animated expand/collapse FAQ section for the Heritage page.
 * Uses CSS height transitions for smooth open/close.
 */
import { useState, useRef } from "react";

const FAQS = [
  {
    id: "faq-teff",
    question: "What makes Love Grass injera different from other injera?",
    answer:
      "Our injera is made exclusively from 100% pure lovegrass teff — the ancient Ethiopian grain from which the restaurant takes its name. Most injera is blended with wheat or barley for economic reasons. We use only teff, stone-milled and naturally fermented for 48–72 hours, creating the authentic, complex, slightly sour flavour profile that defines true Ethiopian injera.",
  },
  {
    id: "faq-vegan",
    question: "Is your menu suitable for vegans and vegetarians?",
    answer:
      "Absolutely. Ethiopian cuisine has a centuries-old tradition of wholly plant-based cooking, rooted in Orthodox Christian fasting practices. Over half of our menu — including our Misir Wat (red lentils), Gomen (collard greens), Yekik Alicha (split peas), and the full fasting platter — is completely vegan. All dishes are clearly labelled on our menu.",
  },
  {
    id: "faq-reservations",
    question: "Do I need a reservation?",
    answer:
      "Walk-ins are warmly welcomed, but reservations are strongly recommended — particularly for Friday and Saturday evenings, and for groups of four or more. You can reserve a table through our Contact page, by phone, or via our Instagram. We hold reservations for 15 minutes past the booking time.",
  },
  {
    id: "faq-location",
    question: "Where are you located in Dubai?",
    answer:
      "Love Grass is located in the heart of Dubai. Our full address, an embedded map, and directions from key landmarks are available on our Contact page. We are easily accessible by the Dubai Metro and have dedicated parking on-site.",
  },
  {
    id: "faq-mesob",
    question: "What is a Mesob, and why is it significant?",
    answer:
      "The Mesob is a traditional Ethiopian woven basket-table, handcrafted from colourful straw and grasses. In Ethiopian tradition, meals are served on the mesob and shared communally — there are no individual plates. Everyone eats from the same injera, using their right hand, which reflects the Ethiopian value of togetherness (ምሕረት, pronounced mihret). Our logo is inspired by the circular form of the Mesob.",
  },
  {
    id: "faq-events",
    question: "Can Love Grass cater for large groups or private events?",
    answer:
      "Yes — we have a semi-private dining area that accommodates groups of up to 30 guests, and we offer bespoke catering packages for corporate events, weddings, and cultural celebrations. Please reach out via our Contact page or email events@lovegrass.ae and our team will get back to you within 24 hours.",
  },
  {
    id: "faq-halal",
    question: "Is Love Grass Halal-certified?",
    answer:
      "Yes. All meat and poultry served at Love Grass is sourced from certified Halal suppliers. Our Doro Wat chicken, Ye'Bere Tibs beef, and all meat dishes comply fully with Halal standards. Our Halal certification is displayed at the restaurant.",
  },
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`w-5 h-5 flex-shrink-0 text-brand-gold transition-transform duration-400 ease-in-out ${open ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function FAQItem({ faq }: { faq: typeof FAQS[0] }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={`border-b border-brand-white/10 last:border-b-0 transition-colors duration-300 ${open ? "border-brand-gold/20" : ""}`}
    >
      <button
        id={`${faq.id}-btn`}
        aria-expanded={open}
        aria-controls={`${faq.id}-body`}
        onClick={() => setOpen((v) => !v)}
        className="group flex items-center justify-between w-full py-6 text-left gap-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm"
      >
        <span
          className={`font-display font-semibold text-lg leading-snug transition-colors duration-300 ${
            open ? "text-brand-gold" : "text-brand-white group-hover:text-brand-gold/80"
          }`}
        >
          {faq.question}
        </span>
        <ChevronIcon open={open} />
      </button>

      {/* Accordion body — height animation via CSS grid trick */}
      <div
        id={`${faq.id}-body`}
        role="region"
        aria-labelledby={`${faq.id}-btn`}
        ref={bodyRef}
        className="grid transition-all duration-400 ease-in-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="pb-6 text-brand-white/60 text-base leading-relaxed max-w-3xl">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FAQAccordion() {
  return (
    <section
      id="faqs"
      aria-labelledby="faqs-heading"
      className="relative overflow-hidden py-24 md:py-32 bg-gradient-to-b from-brand-deep-forest to-brand-charcoal"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-forest/15 blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <div className="text-center mb-16">
          <p
            lang="am"
            aria-label="Questions in Amharic"
            className="mb-3 text-brand-gold text-xs font-bold tracking-[0.25em] uppercase"
          >
            ጥያቄዎች
          </p>
          <h2
            id="faqs-heading"
            className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-brand-white leading-tight"
          >
            Frequently Asked
          </h2>
          <div aria-hidden="true" className="mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-brand-gold/30" />
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/50" />
            <span className="h-px w-12 bg-brand-gold/30" />
          </div>
        </div>

        {/* ── FAQ items ── */}
        <div
          role="list"
          aria-label="Frequently asked questions"
          className="divide-y divide-brand-white/10"
        >
          {FAQS.map((faq) => (
            <div key={faq.id} role="listitem">
              <FAQItem faq={faq} />
            </div>
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="mt-16 text-center">
          <p className="text-brand-white/40 text-sm mb-4">
            Still have questions? We&apos;re happy to help.
          </p>
          <a
            href="/contact"
            className="btn-outline-gold-dark inline-flex items-center gap-2"
          >
            Get in Touch
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
