import Link from "next/link";
import Image from "next/image";
import React from "react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Our Heritage", href: "/heritage" },
];

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069Zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073Z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06Z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/lovegrass.dubai", icon: <InstagramIcon /> },
  { label: "Facebook", href: "https://facebook.com/lovegrass.dubai", icon: <FacebookIcon /> },
  { label: "TikTok", href: "https://tiktok.com/@lovegrass.dubai", icon: <TikTokIcon /> },
];

export function Footer() {
  return (
    <footer className="relative bg-brand-charcoal border-t border-brand-gold/10 overflow-hidden">
      {/* Mesob pattern overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 opacity-5 bg-[url('/mesob-pattern.jpg')] bg-repeat bg-[length:340px_340px] pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-5 lg:col-span-1">
            <Link href="/" aria-label="Love Grass — go to homepage" className="flex items-center gap-3 group w-fit">
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                  src="/lovegrass-logo.png"
                  alt="Love Grass Logo"
                  fill
                  className="object-contain"
                  sizes="40px"
                />
              </div>
              <div>
                <span className="block text-brand-white font-display font-bold text-lg tracking-tight group-hover:text-brand-gold transition-colors duration-200">LoveGrass</span>
                <span className="block text-brand-white/40 text-[9px] font-medium tracking-widest uppercase">Restaurant · Dubai</span>
              </div>
            </Link>
            <p className="text-brand-white/55 text-sm leading-relaxed">
              Preserving the ancient culinary heritage of Ethiopia in the heart of Dubai. Authentic ingredients, traditional preparation, and 100% pure lovegrass teff.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3 mt-1">
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${label}`}
                  className="w-9 h-9 rounded-full border border-brand-white/15 flex items-center justify-center text-brand-white/50 hover:text-brand-gold hover:border-brand-gold/40 transition-all duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-brand-white uppercase tracking-wider text-xs mb-1">Explore</h3>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-brand-white/60 hover:text-brand-gold text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-brand-gold/30 group-hover:bg-brand-gold transition-colors duration-200 flex-shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Visit Us */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-brand-white uppercase tracking-wider text-xs mb-1">Visit Us</h3>
            <address className="not-italic text-brand-white/60 text-sm leading-relaxed flex flex-col gap-3">
              <p className="flex items-start gap-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-brand-gold/70 flex-shrink-0 mt-0.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                Addis Ababa Street, Al Karama<br />Dubai, UAE
              </p>
              <p className="flex items-center gap-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-brand-gold/70 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <span><span className="text-brand-white/80 font-medium">Daily</span> · 12:00 PM – 11:30 PM</span>
              </p>
              <a href="tel:+971501234567" className="flex items-center gap-2.5 text-brand-gold hover:text-brand-white transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 6v.75Z" />
                </svg>
                +971 50 123 4567
              </a>
            </address>
          </div>

          {/* Column 4: Newsletter */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-brand-white uppercase tracking-wider text-xs mb-1">Join the Family</h3>
            <p className="text-brand-white/55 text-sm leading-relaxed">
              Sign up for seasonal menus, private dining events, and exclusive offers.
            </p>
            <form className="flex flex-col gap-3" action="mailto:hello@lovegrass.ae" method="GET">
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  className="w-full bg-brand-deep-forest border border-brand-gold/20 rounded-xl py-3 px-4 text-sm text-brand-white placeholder:text-brand-white/35 focus:outline-none focus:border-brand-gold/60 focus:ring-1 focus:ring-brand-gold/40 transition-all duration-200"
                  aria-label="Email address for newsletter"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-sm font-semibold hover:bg-brand-gold hover:text-brand-charcoal transition-all duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-brand-white/10 to-transparent mb-8" aria-hidden="true" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-brand-white/35">
          <p>© {new Date().getFullYear()} Love Grass Restaurant LLC. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-brand-gold transition-colors duration-200">Privacy Policy</Link>
            <Link href="/" className="hover:text-brand-gold transition-colors duration-200">Terms of Service</Link>
            <span className="hidden sm:block">Made with ❤️ in Dubai</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
