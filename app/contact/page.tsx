import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact & Reservations",
  description:
    "Get in touch with Love Grass Dubai. Make a reservation, ask a question, or find us — we'd love to welcome you to our table.",
};

export default function ContactPage() {
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
            We'd love to hear from you
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-brand-white leading-tight mt-3">
            Reserve Your Table
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-brand-white/60 text-lg leading-relaxed">
            Join us for an unforgettable dining experience. Call, email, or fill in the form below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Left — Contact Info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Info cards */}
            {[
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                ),
                label: "Address",
                value: "Addis Ababa Street, Al Karama\nDubai, United Arab Emirates",
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 6v.75Z" />
                  </svg>
                ),
                label: "Phone",
                value: "+971 50 123 4567",
                href: "tel:+971501234567",
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                ),
                label: "Email",
                value: "hello@lovegrass.ae",
                href: "mailto:hello@lovegrass.ae",
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                ),
                label: "Opening Hours",
                value: "Daily: 12:00 PM – 11:30 PM",
              },
            ].map(({ icon, label, value, href }) => (
              <div
                key={label}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-brand-white/10 backdrop-blur-sm"
              >
                <div className="w-10 h-10 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold flex-shrink-0 mt-0.5">
                  {icon}
                </div>
                <div>
                  <p className="text-brand-white/50 text-xs uppercase tracking-widest font-semibold mb-1">{label}</p>
                  {href ? (
                    <a href={href} className="text-brand-white text-sm leading-relaxed hover:text-brand-gold transition-colors duration-200 whitespace-pre-line">
                      {value}
                    </a>
                  ) : (
                    <p className="text-brand-white text-sm leading-relaxed whitespace-pre-line">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right — Form */}
          <div className="lg:col-span-3">
            <form
              className="rounded-3xl border border-brand-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-10 space-y-6 shadow-2xl shadow-black/30"
              action="mailto:hello@lovegrass.ae"
              method="GET"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-name" className="text-brand-white/70 text-sm font-medium">
                    Full Name <span className="text-brand-gold">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your full name"
                    className="rounded-xl border border-brand-white/15 bg-white/5 px-4 py-3 text-sm text-brand-white placeholder:text-brand-white/30 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/30 transition-all duration-200"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-phone" className="text-brand-white/70 text-sm font-medium">
                    Phone Number
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    placeholder="+971 50 000 0000"
                    className="rounded-xl border border-brand-white/15 bg-white/5 px-4 py-3 text-sm text-brand-white placeholder:text-brand-white/30 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/30 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-email" className="text-brand-white/70 text-sm font-medium">
                  Email Address <span className="text-brand-gold">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="rounded-xl border border-brand-white/15 bg-white/5 px-4 py-3 text-sm text-brand-white placeholder:text-brand-white/30 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/30 transition-all duration-200"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-date" className="text-brand-white/70 text-sm font-medium">
                    Preferred Date
                  </label>
                  <input
                    id="contact-date"
                    name="date"
                    type="date"
                    className="rounded-xl border border-brand-white/15 bg-white/5 px-4 py-3 text-sm text-brand-white/70 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/30 transition-all duration-200 [color-scheme:dark]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-guests" className="text-brand-white/70 text-sm font-medium">
                    Number of Guests
                  </label>
                  <select
                    id="contact-guests"
                    name="guests"
                    className="rounded-xl border border-brand-white/15 bg-brand-deep-forest px-4 py-3 text-sm text-brand-white focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/30 transition-all duration-200"
                  >
                    {["1–2", "3–4", "5–6", "7–10", "10+"].map((g) => (
                      <option key={g} value={g}>{g} guests</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-message" className="text-brand-white/70 text-sm font-medium">
                  Special Requests / Message
                </label>
                <textarea
                  id="contact-message"
                  name="body"
                  rows={4}
                  placeholder="Dietary requirements, celebrations, preferred seating..."
                  className="rounded-xl border border-brand-white/15 bg-white/5 px-4 py-3 text-sm text-brand-white placeholder:text-brand-white/30 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/30 transition-all duration-200 resize-none"
                />
              </div>

              <button
                type="submit"
                className="btn-hero-solid w-full py-4 text-base font-bold relative overflow-hidden before:absolute before:inset-0 before:z-0 before:w-1/3 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:animate-shine"
              >
                <span className="relative z-10">Send Reservation Request</span>
              </button>

              <p className="text-center text-xs text-brand-white/30 leading-relaxed">
                We'll confirm your reservation within 24 hours. For urgent bookings, call us directly at{" "}
                <a href="tel:+971501234567" className="text-brand-gold hover:text-brand-white transition-colors">+971 50 123 4567</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
