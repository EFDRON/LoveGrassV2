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
        className={`absolute block h-0.5 w-6 bg-[#2B6027] rounded-full transition-all duration-300 ease-in-out ${
          open ? "rotate-45 translate-y-0" : "-translate-y-2"
        }`}
      />
      <span
        className={`absolute block h-0.5 bg-[#2B6027] rounded-full transition-all duration-300 ease-in-out ${
          open ? "w-0 opacity-0" : "w-6 opacity-100"
        }`}
      />
      <span
        className={`absolute block h-0.5 w-6 bg-[#2B6027] rounded-full transition-all duration-300 ease-in-out ${
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
          transition-all duration-300 ease-in-out
          ${
            scrolled
              ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#2B6027]/10"
              : "bg-white/80 backdrop-blur-sm"
          }
        `}
      >
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
              <div className="relative w-12 h-12 flex-shrink-0">
                {/* <LogoMark /> */}
                <Image
                  src="/lovegrass-logo.png"
                  alt="Love Grass Logo"
                  fill
                  className="object-contain"
                  sizes="60px"
                  priority
                />
              </div>

              <span className="hidden sm:block leading-tight">
                <span className="block text-[#2B6027] font-display font-bold text-xl tracking-tight group-hover:text-[#459934] transition-colors duration-200">
                  LoveGrass
                </span>
                <span className="block text-[#516A3E] text-[10px] font-medium tracking-widest uppercase">
                  Restaurant
                </span>
              </span>
            </Link>

            {/* Desktop navigation */}
            <ul role="list" className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    id={`nav-${label.toLowerCase()}`}
                    aria-current={isActive(href) ? "page" : undefined}
                    className={`
                      relative px-4 py-2 rounded-full text-sm font-medium tracking-wide
                      transition-colors duration-200 focus-visible:outline-none
                      focus-visible:ring-2 focus-visible:ring-[#C7C466]
                      ${
                        isActive(href)
                          ? "text-[#2B6027] bg-[#2B6027]/8 font-semibold"
                          : "text-[#2B6027] hover:text-[#C7C466] hover:bg-[#2B6027]/5"
                      }
                    `}
                  >
                    {label}
                    {isActive(href) && (
                      <span
                        aria-hidden="true"
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#C7C466]"
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
                  className="btn-pill btn-primary text-sm"
                >
                  Reserve a Table
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
              className="md:hidden p-2.5 rounded-full hover:bg-[#2B6027]/8 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7C466]"
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
          bg-white/98 backdrop-blur-xl border-b border-[#2B6027]/10
          shadow-xl shadow-black/5
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
                        ? "bg-[#2B6027] text-white shadow-md shadow-[#2B6027]/20 font-semibold"
                        : "text-[#2B6027] hover:bg-[#2B6027]/8 hover:text-[#C7C466]"
                    }
                  `}
                >
                  {/* Active indicator dot */}
                  <span
                    aria-hidden="true"
                    className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-200 ${
                      isActive(href) ? "bg-[#C7C466]" : "bg-[#2B6027]/20"
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
              className="btn-pill btn-primary w-full text-center text-base"
              onClick={() => setMobileOpen(false)}
            >
              Reserve a Table
            </Link>
          </div>
        </nav>
      </div>

      {/* Spacer so page content clears the fixed nav */}
      <div className="h-16 md:h-20" aria-hidden="true" />
    </>
  );
}
