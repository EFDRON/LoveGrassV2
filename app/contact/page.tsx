import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Reservations",
  description:
    "Get in touch with Love Grass Dubai. Make a reservation, ask a question, or find us — we'd love to welcome you to our table.",
};

export default function ContactPage() {
  return (
    <section
      aria-label="Contact page"
      className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
    >
      {/* Section header */}
      <div className="text-center mb-16">
        <span className="inline-block mb-3 px-4 py-1 rounded-full bg-[#2B6027]/10 text-[#2B6027] text-xs font-semibold tracking-widest uppercase">
          Get in Touch
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#2B6027] leading-tight">
          Reserve Your Table
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-[#516A3E] text-lg">
          We can&apos;t wait to share our table with you. Reach out to make a
          reservation or ask us anything.
        </p>
      </div>

      {/* Placeholder contact form */}
      <div className="rounded-2xl border border-[#2B6027]/10 bg-white p-8 shadow-sm space-y-6">
        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-name"
            className="text-sm font-medium text-[#2B6027]"
          >
            Full Name
          </label>
          <input
            id="contact-name"
            type="text"
            placeholder="Your name"
            disabled
            className="rounded-full border border-[#2B6027]/20 px-5 py-3 text-sm text-[#516A3E] placeholder:text-[#516A3E]/40 bg-[#2B6027]/3 focus:outline-none cursor-not-allowed"
          />
        </div>
        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-email"
            className="text-sm font-medium text-[#2B6027]"
          >
            Email Address
          </label>
          <input
            id="contact-email"
            type="email"
            placeholder="you@example.com"
            disabled
            className="rounded-full border border-[#2B6027]/20 px-5 py-3 text-sm text-[#516A3E] placeholder:text-[#516A3E]/40 bg-[#2B6027]/3 focus:outline-none cursor-not-allowed"
          />
        </div>
        {/* Message */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-message"
            className="text-sm font-medium text-[#2B6027]"
          >
            Message / Special Requests
          </label>
          <textarea
            id="contact-message"
            rows={4}
            placeholder="Tell us about your visit..."
            disabled
            className="rounded-2xl border border-[#2B6027]/20 px-5 py-3 text-sm text-[#516A3E] placeholder:text-[#516A3E]/40 bg-[#2B6027]/3 focus:outline-none resize-none cursor-not-allowed"
          />
        </div>

        {/* CTA */}
        <button
          type="button"
          disabled
          className="btn-pill btn-primary w-full py-3 text-base opacity-60 cursor-not-allowed"
        >
          Send Message
        </button>

        <p className="text-center text-xs text-[#516A3E]/60">
          Form integration coming soon — call us directly in the meantime!
        </p>
      </div>
    </section>
  );
}
