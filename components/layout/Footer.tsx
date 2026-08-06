import Link from "next/link";
import React from "react";

export function Footer() {
  return (
    <footer className="relative bg-brand-charcoal border-t border-brand-gold/10 overflow-hidden">
      {/* ── Mesob pattern overlay ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 opacity-5 bg-[url('/mesob-pattern.png')] bg-repeat bg-[length:340px_340px] pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-4">
            <h2 className="font-display text-2xl text-brand-white font-bold">
              Love Grass
            </h2>
            <p className="text-brand-white/70 text-sm leading-relaxed max-w-xs">
              Preserving the ancient culinary heritage of Ethiopia in the heart of Dubai. 
              Authentic ingredients, traditional preparation, and 100% pure lovegrass teff.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-brand-white uppercase tracking-wider text-sm mb-2">
              Explore
            </h3>
            <ul className="flex flex-col gap-3">
              {["Menu", "Our Heritage", "Reservations", "Contact"].map((link) => (
                <li key={link}>
                  <Link
                    href={`/${link.toLowerCase().replace(" ", "-")}`}
                    className="text-brand-white/70 hover:text-brand-gold text-sm transition-colors duration-200"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Visit Us */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-brand-white uppercase tracking-wider text-sm mb-2">
              Visit Us
            </h3>
            <address className="not-italic text-brand-white/70 text-sm leading-relaxed flex flex-col gap-3">
              <p>
                Addis Ababa Street, <br />
                Dubai, UAE
              </p>
              <p>
                <span className="text-brand-white/90 font-medium">Daily:</span> 12:00 PM - 11:30 PM
              </p>
              <p className="text-brand-gold hover:text-brand-white transition-colors duration-200">
                <a href="tel:+971501234567">+971 50 123 4567</a>
              </p>
            </address>
          </div>

          {/* Column 4: Newsletter */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-brand-white uppercase tracking-wider text-sm mb-2">
              Join the Family
            </h3>
            <p className="text-brand-white/70 text-sm leading-relaxed mb-1">
              Sign up for seasonal menus and private dining events.
            </p>
            <form className="relative flex items-center">
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-brand-deep-forest border border-brand-gold/20 rounded-lg py-3 px-4 text-sm text-brand-white placeholder:text-brand-white/40 focus:outline-none focus:border-brand-gold/60 focus:ring-1 focus:ring-brand-gold/60 transition-all duration-200"
                aria-label="Email address for newsletter"
              />
              <button
                type="submit"
                className="absolute right-2 p-2 group hover:bg-brand-charcoal rounded-md transition-colors duration-200"
                aria-label="Submit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4 text-brand-gold group-hover:text-brand-white transition-colors duration-200"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-brand-white/50 text-xs">
            © 2026 Love Grass. All rights reserved.
          </p>
          
          {/* Social Icons Placeholder */}
          <div className="flex items-center gap-4">
            {['Instagram', 'Facebook', 'Twitter'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-brand-white/40 hover:text-brand-gold transition-colors duration-200"
                aria-label={`Follow us on ${social}`}
              >
                <div className="w-5 h-5 bg-current rounded-sm opacity-80 mask-icon" />
                {/* Fallback circle if mask-icon isn't implemented */}
                <span className="sr-only">{social}</span>
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
