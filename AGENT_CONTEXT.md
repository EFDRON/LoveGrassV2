# AGENT_CONTEXT.md — Love Grass Project Memory

> **READ THIS ENTIRE FILE BEFORE WRITING A SINGLE LINE OF CODE.**
> This is the authoritative source of truth for the Love Grass project.
> Every decision documented here was deliberately made. Do not deviate without a clear reason.

---

## 1. THE PROJECT

**Name:** Love Grass (ፍቅር ሳር in Amharic)
**Type:** Premium restaurant website
**Client:** Love Grass — an authentic Ethiopian restaurant in Dubai, UAE
**Domain:** `https://lovegrass.ae`

**Brand purpose:** Position Love Grass as the premier destination for authentic Ethiopian cuisine in Dubai. The site must communicate:
- Artisanal craft: 100% pure lovegrass teff injera, hand-blended spices
- Deep heritage: Ethiopian culinary traditions, Ge'ez script (Amharic), the cultural significance of the Mesob (woven dining table)
- Modern premium: The restaurant is not rustic — it is elevated, sophisticated, and design-forward while being rooted in heritage

**Current build status:** Foundation + Hero section complete. All 4 routes live. No outstanding bugs or warnings.

---

## 2. THE TECH STACK (EXACT VERSIONS — DO NOT ASSUME)

| Layer | Technology | Version |
|---|---|---|
| Framework | **Next.js** (App Router) | `16.3.0` |
| UI Library | **React** | `19.2.8` |
| Styling | **Tailwind CSS** | `^4` (v4 — CSS-first, NO `tailwind.config.ts`) |
| Animation | **Framer Motion** | `^13.0.0` (installed, not yet used in components) |
| Language | **TypeScript** | `^5` |
| Runtime | Node.js | Windows (PowerShell environment) |

> ⚠️ **CRITICAL: This is Next.js 16, NOT Next.js 15.** The scaffold installed 16.3.0. Before writing any Next.js-specific code, read the docs at `node_modules/next/dist/docs/`.

> ⚠️ **CRITICAL: This is Tailwind CSS v4, NOT v3.** There is NO `tailwind.config.ts` file. All theme configuration (colors, fonts, spacing) is done via the `@theme` directive inside `app/globals.css`. Do not attempt to create `tailwind.config.ts` — it will be ignored and will confuse future agents.

**Dev server:** `npm run dev` → runs on `http://localhost:3001` (port 3000 was occupied).

---

## 3. BRAND & DESIGN SYSTEM

### 3a. Color Tokens

All tokens are defined in `app/globals.css` under `@theme inline`. Use these **CSS custom properties** and their corresponding **Tailwind utility class names** interchangeably.

| Token name | Tailwind class (bg/text/border) | Hex value | Usage |
|---|---|---|---|
| `--color-brand-green-light` | `bg-brand-green-light` | `#3DA328` | Hero gradient top-right; accent highlights |
| `--color-brand-green-dark` | `bg-brand-green-dark` | `#459934` | Hero gradient base; button hover states |
| `--color-brand-forest` | `bg-brand-forest` | `#2B6027` | Primary text on light backgrounds; Navbar; logo; dark UI elements |
| `--color-brand-olive` | `bg-brand-olive` | `#516A3E` | Secondary text; muted labels; sub-headings on white |
| `--color-brand-gold` | `bg-brand-gold` | `#C7C466` | Accent color; decorative elements; italic headline; star ratings; badges; focus rings |
| `--color-brand-white` | `bg-brand-white` | `#FFFFFF` | Primary background; text on dark sections |

**Additional semantic tokens (also in `@theme inline`):**
- `--color-background`: `#FFFFFF` (maps to `bg-background`)
- `--color-foreground`: `#1a1a1a` (maps to `text-foreground`)
- `--color-muted`: `#6b7280` (maps to `text-muted`)

> ⚠️ There is no `brand-charcoal` token. Do not add one without explicit instruction. Any reference to "charcoal" in previous discussions was aspirational, not implemented.

### 3b. Typography

Fonts are loaded via `next/font/google` in `app/layout.tsx` with zero layout-shift (`display: swap`).

| Role | Font family | CSS Variable | Tailwind utility |
|---|---|---|---|
| **Body / UI text** | Inter | `--font-inter` → `--font-sans` | `font-sans` (default on `body`) |
| **Display / headings** | Playfair Display | `--font-playfair` → `--font-display` | `font-display` (custom class in globals.css) |

Inter weights loaded: `300, 400, 500, 600, 700`
Playfair Display weights loaded: `400, 500, 600, 700, 800` — both `normal` and `italic` styles

**Usage pattern:**
```tsx
// Headlines — use font-display class
<h1 className="font-display font-bold ...">Artisanal Injera.</h1>

// Italic emphasis — Playfair italic is pre-loaded
<span className="font-display italic">Ancient Heritage.</span>
```

### 3c. Design Aesthetic

**Vibe:** Modern, minimal, and deeply rooted in Ethiopian heritage. NOT rustic. NOT dark/moody.

**Current aesthetic:** **Light and warm.** The body background is white (`#FFFFFF`) with a very subtle earthy texture (`.bg-texture` class). The hero section is the only dark element — a rich brand-green gradient.

> ⚠️ The user's request mentioned a "Dark, moody" aesthetic in the context document brief. **This does not reflect the actual built UI.** The current codebase is light-background/green-accent. Do not switch to a dark theme without explicit re-approval.

**Key visual motifs:**
- **Circular forms:** Logo is circular; buttons are fully pill-shaped (`border-radius: 9999px`); floating cards use `rounded-2xl`
- **The Mesob:** The traditional Ethiopian woven basket-table (`mesob-pattern.png`) is used as a subtle repeating texture overlay on the hero
- **Amharic script:** `ፍቅር ሳር` (Love Grass) appears in the hero badge with `lang="am"` attribute. Rendered in Playfair Display
- **Gold accents:** `brand-gold` (#C7C466) is used sparingly for decorative emphasis — not as a primary color

---

## 4. ARCHITECTURE RULES (NON-NEGOTIABLE)

### 4a. Server vs Client Components

```
app/
├── layout.tsx         → Server Component (MUST STAY SERVER)
├── page.tsx           → Server Component (MUST STAY SERVER)
├── menu/page.tsx      → Server Component (MUST STAY SERVER)
├── heritage/page.tsx  → Server Component (MUST STAY SERVER)
└── contact/page.tsx   → Server Component (MUST STAY SERVER)

components/
├── Navbar.tsx         → "use client" ✓ (uses useState, useEffect, usePathname)
└── [future]           → Animated components MUST live here with "use client"
```

**The golden rule:** `app/page.tsx` and all route `page.tsx` files **must never gain a `"use client"` directive.** They are Server Components for a reason: they stream HTML, they are indexable, and they have zero client JS overhead. If you need interactivity or animation on a page, extract it into a component in `components/` and import it.

### 4b. Framer Motion — Component Isolation Strategy

Framer Motion (`framer-motion@^13`) is installed but **not yet used in any component.** When you add it:

1. **Never import from `framer-motion` directly in a page file.** Always in a `components/` file.
2. **Always use `LazyMotion` with dynamic feature loading** to keep the bundle small:

```tsx
// components/HeroAnimations.tsx  ← CORRECT pattern
"use client";
import { LazyMotion, domAnimation, m } from "framer-motion";

export function HeroAnimations({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {/* use <m.div> not <motion.div> when inside LazyMotion */}
      <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {children}
      </m.div>
    </LazyMotion>
  );
}
```

3. **Use `domAnimation`** (not `domMax`) unless you specifically need drag, layout animations, or advanced gesture support. `domAnimation` is ~16 KB vs `domMax` at ~34 KB.
4. **Use `<m.div>` not `<motion.div>`** inside `LazyMotion` — the `m` namespace is the tree-shaken version.

### 4c. CSS Architecture

**Tailwind v4 CSS-first. All design tokens live in `app/globals.css`.** Do not:
- Create `tailwind.config.ts`
- Use `@apply` for complex component styles (define semantic CSS classes instead)
- Hardcode hex values in JSX when a token exists — use `text-brand-forest`, `bg-brand-gold`, etc.
- Use inline `style={{}}` for anything that can be expressed as a CSS class

**Named CSS classes defined in `globals.css`** (do not redefine these anywhere else):
| Class | Purpose |
|---|---|
| `.bg-texture` | Global earthy noise grain on white backgrounds (`::before` + `::after` pseudo-elements) |
| `.font-display` | Applies Playfair Display |
| `.btn-pill` | Base pill button (all buttons inherit this) |
| `.btn-primary` | Forest green filled CTA button |
| `.btn-outline-gold` | Gold outlined button (on white backgrounds) |
| `.btn-hero-solid` | White filled CTA (for use on dark/green hero backgrounds) |
| `.btn-hero-ghost` | White ghost/outline CTA (for use on dark/green hero backgrounds) |
| `.hero-section` | Brand-green radial gradient background |
| `.hero-mesob-overlay` | Mesob pattern PNG + noise grain via `::before`/`::after` |
| `.hero-image-glow` | White outer glow + depth shadow for image containers |
| `.hero-badge` | Glassmorphism pill badge (gold border, frosted bg) |
| `.hero-badge-dot` | 5px gold dot used inside `.hero-badge` |
| `.hero-scroll-indicator` | CSS `animation: hero-bounce` for the scroll chevron |

### 4d. Image Configuration (`next.config.ts`)

```ts
images: {
  qualities: [75, 90],                              // only these quality values allowed
  formats: ["image/avif", "image/webp"],            // serve AVIF first, WebP fallback
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 31536000,                        // 1-year cache on optimised images
}
```

**Always use `quality={90}` for hero/featured images and `quality={75}` for thumbnails/cards.**

### 4e. SEO Conventions

- Every `page.tsx` exports its own `metadata` object (overrides the layout template)
- Title template: `"%s | Love Grass"` (defined in `app/layout.tsx`)
- `metadataBase` is set to `https://lovegrass.ae`
- The `<h1>` must appear once per page and use `font-display`
- The hero `<Image>` must always have `priority` and `fetchPriority="high"` — it is the LCP element
- `sizes` prop must be set on all `fill` images to generate correct `srcSet`

### 4f. Accessibility Standards

- All interactive elements must have `aria-label` or visible text
- Focus states use `focus-visible:ring-2 focus-visible:ring-[#C7C466]` (gold ring)
- Mobile drawer implements focus trap via `useEffect` in `Navbar.tsx`
- All decorative elements use `aria-hidden="true"`
- Language attributes: Amharic text must use `lang="am"`
- Active nav links use `aria-current="page"`

---

## 5. WHAT WAS BUILT (CURRENT STATE)

### 5a. Completed files

```
c:\Users\efake\Desktop\LoveGrassV2\
├── app/
│   ├── globals.css          ✅ Complete design system
│   ├── layout.tsx           ✅ Root layout, fonts, global SEO, Navbar
│   ├── page.tsx             ✅ Home page — full Hero section
│   ├── menu/page.tsx        ⏳ Skeleton only (placeholder cards)
│   ├── heritage/page.tsx    ⏳ Skeleton only (placeholder blocks)
│   └── contact/page.tsx     ⏳ Skeleton only (disabled form)
├── components/
│   └── Navbar.tsx           ✅ Full responsive navbar
├── public/
│   ├── hero-platter.webp    ✅ LCP image (609 KB — acceptable)
│   └── mesob-pattern.png    ⚠️ 11.3 MB — NEEDS OPTIMISATION
│                               Recommended: re-export at 680×680px, target <150KB
├── next.config.ts           ✅ Image optimisation configured
├── package.json             ✅ All deps installed
└── AGENTS.md                ✅ Auto-generated by Next.js (do not delete)
```

### 5b. Hero section architecture detail (`app/page.tsx`)

The hero is a full-viewport-height `<section>` with a **3-layer stacked background system:**

```
z-index: 10  → All page content (text, image, CTAs)
z-index:  1  → .hero-mesob-overlay::after  (SVG noise grain at 4% opacity)
z-index:  0  → .hero-mesob-overlay::before (mesob-pattern.png tiled 340px, 7% opacity, mix-blend-mode: overlay)
z-index: bg  → .hero-section (brand-green radial gradient — the actual background color)
```

**Left column (desktop):**
- Amharic badge: `ፍቅር ሳར · Love Grass` with glassmorphism styling
- Gold decorative divider (SVG line + circle)
- `<h1>` in Playfair Display: "Artisanal / *Injera.* / Ancient Heritage." (staggered sizes)
- Sub-paragraph in `brand-gold/90`
- Social proof row: 5 stars, 4.9 · 200+ reviews · Dubai
- Two pill CTAs: `btn-hero-solid` ("View Our Menu" → `/menu`) and `btn-hero-ghost` ("Reserve a Table" → `/contact`)
- Trust badges: 🌿 100% Teff Injera · 🍽️ Heritage Recipes · 📍 Dubai, UAE

**Right column (desktop):**
- `<Image src="/hero-platter.webp" priority fetchPriority="high" fill quality={90}>`
- `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"`
- Container class: `hero-image-glow overflow-hidden` (white outer glow, 4-layer box-shadow)
- Aspect ratios: `aspect-[4/3]` mobile → `aspect-[3/4]` lg → `aspect-square` xl
- Floating stat cards (desktop only): "100% Pure Teff Injera" (top-right) + "Authentic Taste" gold badge (bottom-right)
- Gradient scrim overlay (bottom of image fades to green)

**Navbar (`components/Navbar.tsx`):**
- `"use client"` directive — uses `useState`, `useEffect`, `useRef`, `usePathname`
- Fixed position (`fixed top-0 inset-x-0 z-50`)
- Scroll-aware: elevates with `backdrop-blur-md` + shadow after 12px scroll
- Desktop: Logo (inline SVG circular motif) + wordmark + inline pill nav links + "Reserve a Table" CTA
- Mobile: Hamburger (animated 3-line → X morph) → slide-down drawer with backdrop overlay + focus trap
- Active route: gold dot indicator (`aria-current="page"`)
- Nav routes: Home `/` · Menu `/menu` · Heritage `/heritage` · Contact `/contact`
- Element IDs: `#nav-home`, `#nav-menu`, `#nav-heritage`, `#nav-contact`, `#nav-reserve-cta`, `#mobile-menu-toggle`, `#mobile-reserve-cta`, `#mobile-drawer`

---

## 6. NEXT STEPS

The following sections need to be built, **in this recommended order:**

### Priority 1 — Optimise `mesob-pattern.png`
The pattern file is 11.3 MB. Before building more pages, this should be replaced with:
- A re-exported version at **680×680px** (2× Retina, seamlessly tileable)
- Target file size: **under 150 KB** (run through `pngquant` or Squoosh)
- Alternatively, convert to **SVG** if the pattern is geometric

### Priority 2 — Home Page: Section 2 — "Our Story" / About section
Below the hero, build a full-width editorial section:
- Left: short brand story paragraph, a small cultural callout about injera/teff
- Right: a secondary image or decorative element
- Background: white with `.bg-texture`

### Priority 3 — Home Page: Section 3 — Featured Dishes
A horizontal scroll or grid of 3–4 signature dish cards:
- Image, dish name, short description, dietary tag (Vegan / Vegetarian / Meat)
- CTA to full menu

### Priority 4 — `/menu` page
Full menu grid with:
- Category tabs (Meat, Vegetarian, Drinks, etc.)
- Card components: `<DishCard />` in `components/DishCard.tsx`
- This is where Framer Motion should first be introduced for card entrance animations

### Priority 5 — `/heritage` page
Long-form editorial about Ethiopian food culture:
- Timeline or section-based layout
- Large typography moments (Playfair Display)
- Photography-driven sections

### Priority 6 — `/contact` page
- Replace the disabled form skeleton with a working form
- Use React Server Actions or a third-party form service (e.g., Resend, Formspree)
- Include: hours, address (Dubai), phone, embedded map

### Priority 7 — Framer Motion Animations (add after page content exists)
When adding animations, create `components/animations/` folder and follow the `LazyMotion` pattern documented in Section 4b above. Suggested animations:
- Hero text stagger entrance (fade up, 50ms delay between lines)
- Dish card scroll-triggered fade-in (`whileInView`)
- Page transition wrapper (fade between routes)

---

## 7. KNOWN ISSUES & DECISIONS

| Issue | Status | Decision |
|---|---|---|
| `mesob-pattern.png` is 11.3 MB | ⚠️ Open | Needs re-export/optimisation before launch |
| Framer Motion installed but unused | ℹ️ Intentional | Reserved for Phase 2 — content sections first |
| Amharic in hero badge is placeholder | ℹ️ Open | `ፍቅር ሳር` is correct Amharic for "Love Grass" — verify with client |
| "Est. 2015" in image badge | ℹ️ Open | Confirm founding year with client |
| Social proof "200+ reviews, 4.9 stars" | ℹ️ Placeholder | Replace with real data from Google/Zomato |
| `scroll-behavior: smooth` on `<html>` | ✅ Fixed | Added `data-scroll-behavior="smooth"` to `<html>` in `layout.tsx` |
| Image `quality={90}` warning | ✅ Fixed | Added `qualities: [75, 90]` to `next.config.ts` |

---

## 8. COMMANDS

```bash
# Start development server
npm run dev
# → Available at http://localhost:3001 (3000 may be in use)

# Type-check without building
npx tsc --noEmit

# Lint
npm run lint

# Production build (only when needed)
npm run build
```

---

*This document was generated by the founding agent on 2026-08-06 and reflects the exact codebase state at that time. Update this file at the end of every significant work session.*
