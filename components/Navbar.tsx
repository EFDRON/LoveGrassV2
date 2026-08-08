"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

/* -------------------------------------------------------
   Navigation links config
------------------------------------------------------- */
const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Heritage", href: "/heritage" },
  { label: "Contact", href: "/contact" },
] as const;

/* -------------------------------------------------------
   Logo mark — inline SVG (circular motif)
------------------------------------------------------- */
function LogoMark() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      aria-hidden="true"
      className="w-10 h-10 flex-shrink-0"
    >
      {/* Outer ring */}
      <circle cx="24" cy="24" r="22" fill="#2B6027" />
      {/* Inner ring accent */}
      <circle
        cx="24"
        cy="24"
        r="18"
        fill="none"
        stroke="#C7C466"
        strokeWidth="1.5"
      />
      {/* Stylised grass blade — left */}
      <path
        d="M18 32 Q15 22 20 14"
        stroke="#C7C466"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Centre blade */}
      <path
        d="M24 34 Q24 20 24 12"
        stroke="#FFFFFF"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Right blade */}
      <path
        d="M30 32 Q33 22 28 14"
        stroke="#C7C466"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Ground arc */}
      <path
        d="M16 33 Q24 37 32 33"
        stroke="#C7C466"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* -------------------------------------------------------
   Hamburger icon
------------------------------------------------------- */
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span
      className="relative flex flex-col justify-center items-center w-6 h-6"
      aria-hidden="true"
    >
      <span
        className={`absolute block h-0.5 w-6 bg-brand-white rounded-full transition-all duration-300 ease-in-out ${
          open ? "rotate-45 translate-y-0" : "-translate-y-2"
        }`}
      />
      <span
        className={`absolute block h-0.5 bg-brand-white rounded-full transition-all duration-300 ease-in-out ${
          open ? "w-0 opacity-0" : "w-6 opacity-100"
        }`}
      />
      <span
        className={`absolute block h-0.5 w-6 bg-brand-white rounded-full transition-all duration-300 ease-in-out ${
          open ? "-rotate-45 translate-y-0" : "translate-y-2"
        }`}
      />
    </span>
  );
}

/* -------------------------------------------------------
   Main Navbar component
------------------------------------------------------- */
export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);

  /* Elevate navbar on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close mobile drawer on route change */
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  /* Trap focus inside drawer when open (a11y) */
  useEffect(() => {
    if (!mobileOpen) return;
    const el = drawerRef.current;
    if (!el) return;
    const focusable = el.querySelectorAll<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])',
    );
    focusable[0]?.focus();
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    el.addEventListener("keydown", trap);
    return () => el.removeEventListener("keydown", trap);
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* -------- Nav bar -------- */}
      <header
        role="banner"
        className={`
          fixed top-0 inset-x-0 z-50
          transition-[padding] duration-500 ease-out
          ${scrolled ? "py-0" : "py-2 md:py-4"}
        `}
      >
        {/* Layer 1: Safe zone gradient for text legibility (Only needed on Home page over the image) */}
        {pathname === "/" && (
          <div
            className="absolute inset-0 z-[-2] pointer-events-none bg-gradient-to-b from-black/60 via-black/20 to-transparent"
            aria-hidden="true"
          />
        )}

        {/* Layer 2: Solid frosted glass background (Fades in on scroll — 100% GPU accelerated) */}
        <div
          className={`
            absolute inset-0 z-[-1] pointer-events-none
            bg-brand-deep-forest/95 backdrop-blur-md shadow-lg border-b border-brand-white/10
            transition-opacity duration-500 ease-out
            ${scrolled ? "opacity-100" : "opacity-0"}
          `}
          aria-hidden="true"
        />
        <nav
          aria-label="Main navigation"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              aria-label="Love Grass — go to homepage"
              className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7C466] rounded-full"
            >
              <div className="relative w-14 h-14 md:w-16 md:h-16 flex-shrink-0">
                <Image
                  src="/lovegrass-logo.png"
                  alt="Love Grass Logo"
                  fill
                  className="object-contain scale-110" // scale-110 counteracts built-in transparent padding in the image file
                  sizes="80px"
                  priority
                />
              </div>

              <span className="hidden sm:block leading-tight">
                <span className="block text-brand-white font-display font-bold text-xl tracking-tight group-hover:text-brand-gold transition-colors duration-200">
                  LoveGrass
                </span>
                <span className="block text-brand-white/60 text-[10px] font-medium tracking-widest uppercase">
                  Restaurant
                </span>
              </span>
            </Link>

            {/* Desktop navigation */}
            <ul
              role="list"
              className="hidden md:flex items-center gap-1 drop-shadow-md"
            >
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    id={`nav-${label.toLowerCase()}`}
                    aria-current={isActive(href) ? "page" : undefined}
                    className={`
                      relative px-4 py-2 rounded-full text-sm font-medium tracking-wide
                      transition-colors duration-200 focus-visible:outline-none
                      focus-visible:ring-2 focus-visible:ring-brand-gold
                      ${
                        isActive(href)
                          ? "text-brand-gold font-semibold"
                          : "text-brand-white/80 hover:text-brand-gold hover:bg-white/5"
                      }
                    `}
                  >
                    {label}
                    {isActive(href) && (
                      <span
                        aria-hidden="true"
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-gold"
                      />
                    )}
                  </Link>
                </li>
              ))}

              {/* Desktop CTA */}
              <li className="ml-4">
                <Link
                  href="/contact"
                  id="nav-reserve-cta"
                  className="btn-hero-ghost text-sm px-6 py-2.5 relative overflow-hidden before:absolute before:inset-0 before:z-0 before:w-1/3 before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:animate-shine"
                >
                  <span className="relative z-10">Reserve a Table</span>
                </Link>
              </li>
            </ul>

            {/* Mobile hamburger */}
            <button
              id="mobile-menu-toggle"
              type="button"
              aria-controls="mobile-drawer"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2.5 rounded-full hover:bg-white/10 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
            >
              <HamburgerIcon open={mobileOpen} />
            </button>
          </div>
        </nav>
      </header>

      {/* -------- Mobile overlay -------- */}
      <div
        aria-hidden={!mobileOpen}
        onClick={() => setMobileOpen(false)}
        className={`
          fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] md:hidden
          transition-opacity duration-300
          ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* -------- Mobile drawer -------- */}
      <div
        ref={drawerRef}
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        className={`
          fixed top-16 inset-x-0 z-40 md:hidden
          bg-brand-deep-forest border-b border-brand-white/10
          shadow-xl shadow-black/20
          transform transition-all duration-300 ease-in-out
          ${
            mobileOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0 pointer-events-none"
          }
        `}
      >
        <nav aria-label="Mobile navigation" className="px-4 py-6">
          <ul role="list" className="flex flex-col gap-1">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive(href) ? "page" : undefined}
                  className={`
                    flex items-center gap-3 px-5 py-3.5 rounded-full text-base font-medium
                    transition-all duration-200
                    ${
                      isActive(href)
                        ? "bg-brand-gold/10 text-brand-gold shadow-md font-semibold"
                        : "text-brand-white/80 hover:bg-brand-white/5 hover:text-brand-gold"
                    }
                  `}
                >
                  {/* Active indicator dot */}
                  <span
                    aria-hidden="true"
                    className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-200 ${
                      isActive(href) ? "bg-brand-gold" : "bg-brand-white/20"
                    }`}
                  />
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile CTA */}
          <div className="mt-6 px-1">
            <Link
              href="/contact"
              id="mobile-reserve-cta"
              className="btn-hero-solid w-full text-center text-base py-3 relative overflow-hidden before:absolute before:inset-0 before:z-0 before:w-1/3 before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:animate-shine"
              onClick={() => setMobileOpen(false)}
            >
              <span className="relative z-10">Reserve a Table</span>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
