"use client";

/**
 * TeffJourney.tsx — Complete redesign v3
 *
 * Road path design (matches user's drawing):
 *
 *  ← enters LEFT off-screen
 *  ↓  passes through LEFT lane (tractor)   |  VIDEO on RIGHT  ← Stop 1
 *  ↓  U-turn off-screen RIGHT ──────────────────────────────→
 *  ↓  passes through RIGHT lane (tractor)  |  VIDEO on LEFT   ← Stop 2
 *  ↓  U-turn off-screen LEFT ←─────────────────────────────
 *  ↓  passes through LEFT lane (tractor)   |  VIDEO on RIGHT  ← Stop 3
 *  ↓  U-turn off-screen RIGHT ──────────────────────────────→
 *  ↓  passes through RIGHT lane (tractor)  |  VIDEO on LEFT   ← Stop 4
 *  ↓  U-turn off-screen LEFT ←─────────────────────────────
 *  ↓  passes through LEFT lane (tractor)   |  VIDEO on RIGHT  ← Stop 5
 *  → exits RIGHT off-screen
 *
 * The section has overflow:hidden — U-turns are naturally clipped.
 * The tractor uses CSS offset-path + offset-distance to follow the bezier road.
 * ResizeObserver recomputes all coordinates in real CSS pixels on every resize.
 */

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

/* ── Station data ──────────────────────────────────────── */
const STATIONS = [
  {
    id: 1,
    step: "01",
    side: "right" as const, // video RIGHT → tractor LEFT
    title: "From the Land",
    amharic: "ከምድር",
    description:
      "High in the Ethiopian highlands — at elevations of 1,800–2,200 metres — teff grass grows where few crops dare. The ancient grain has nourished these lands for over 3,000 years, its delicate stalks swaying in the highland breeze, roots gripping volcanic red soil.",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200",
    imageAlt:
      "Vast teff fields stretching across the Ethiopian highlands at sunset",
  },
  {
    id: 2,
    step: "02",
    side: "left" as const, // video LEFT → tractor RIGHT
    title: "Plowing the Land",
    amharic: "መሬት ማረስ",
    description:
      "Before the rains arrive, the farmer walks his fields with a traditional ard plough pulled by oxen — a practice unchanged for millennia. The earth is turned, aerated, and prepared to receive the finest grain. This ritual bond between farmer and soil is what makes teff truly sacred.",
    image:
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=1200",
    imageAlt:
      "Ethiopian farmer preparing the fields with traditional plowing methods",
  },
  {
    id: 3,
    step: "03",
    side: "right" as const,
    title: "Sowing in the Rains",
    amharic: "ዘር መዝራት",
    description:
      "When the kiremt rains sweep in each June, seeds are broadcast by hand across the fertile earth. Teff seeds are extraordinarily small — a thousand weigh less than a gram — yet from these tiny specks springs Ethiopia's most nourishing gift to the world.",
    image:
      "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80&w=1200",
    imageAlt: "Teff seeds being sown in rain-soaked Ethiopian farmland",
  },
  {
    id: 4,
    step: "04",
    side: "left" as const,
    title: "The Harvest",
    amharic: "መከር",
    description:
      "Three to four months after sowing, teff is harvested at dawn. Stalks are cut and threshed by hand, then winnowed in the highland breeze that separates precious grain from chaff. Each family treasures this moment — the culmination of an entire season's devotion.",
    image:
      "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=1200",
    imageAlt:
      "Teff grain being harvested and winnowed in the Ethiopian countryside",
  },
  {
    id: 5,
    step: "05",
    side: "right" as const,
    title: "Baking the Injera",
    amharic: "እንጀራ መጋገር",
    description:
      "The teff is stone-milled, mixed with water, and fermented for 48–72 hours — developing the complex, slightly sour character that defines injera. On a wide clay mitad griddle over open fire, the batter is poured in a spiral and baked into the world's most perfect communal bread.",
    image:
      "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&q=80&w=1200",
    imageAlt:
      "Injera being baked on a traditional Ethiopian clay mitad griddle",
  },
] as const;

const STATION_H = 680; // px — height per station row on desktop

/* ─────────────────────────────────────────────────────────
   Road path builder
   All coordinates are in real CSS pixels (no viewBox scaling).

   lx  = left lane x  (tractor channel when video is on right)
   rx  = right lane x (tractor channel when video is on left)
   oL  = off-screen left anchor  (U-turn destination)
   oR  = off-screen right anchor (U-turn destination)

   For each pair of consecutive stations, the transition is
   two cubic bezier segments via the off-screen anchor,
   creating the smooth U-turn that exits/re-enters at the
   screen edge.
───────────────────────────────────────────────────────── */
function buildRoadPath(w: number, h: number): string {
  if (w < 10 || h < 10) return "";

  const lx = w * 0.23; // left lane
  const rx = w * 0.77; // right lane

  // Y-centre of each station block
  const ys = STATIONS.map((_, i) => i * STATION_H + STATION_H / 2);

  const px = (i: number) => (STATIONS[i].side === "right" ? lx : rx);
  const f = (n: number) => n.toFixed(1);

  // ── ENTRY: from off-screen top-left ──
  // Smooth wave from the left edge down to the first station
  let d = `M ${f(-50)},${f(-100)}`;
  d += ` C ${f(px(0) * 0.2)},${f(-50)} ${f(px(0))},${f(ys[0] * 0.4)} ${f(px(0))},${f(ys[0])}`;

  // ── TRANSITIONS between stations ──
  // We use a single fluid continuous bezier curve between each station.
  // No straight lines means no sharp "kinks" in curvature.
  // A strong vertical control vector (0.42 * gap) ensures the road stays
  // in its lane past the video card before sweeping across the empty gap.
  for (let i = 0; i < STATIONS.length - 1; i++) {
    const x0 = px(i);
    const x1 = px(i + 1);
    const y0 = ys[i];
    const y1 = ys[i + 1];

    const gap = y1 - y0;
    const ctrlDist = gap * 0.42; // controls how long the road stays vertical

    const cp1Y = y0 + ctrlDist;
    const cp2Y = y1 - ctrlDist;

    d += ` C ${f(x0)},${f(cp1Y)} ${f(x1)},${f(cp2Y)} ${f(x1)},${f(y1)}`;
  }

  // ── EXIT: curve to off-screen right edge ──
  const lastX = px(STATIONS.length - 1);
  const lastY = ys[STATIONS.length - 1];

  d += ` C ${f(lastX)},${f(lastY + 300)} ${f(w + 100)},${f(lastY + 400)} ${f(w + 100)},${f(h + 200)}`;

  return d;
}

/* ─────────────────────────────────────────────────────────
   Top-view tractor SVG
   Front of tractor faces +X (right) so offset-rotate:auto
   correctly rotates it to face the direction of travel.
───────────────────────────────────────────────────────── */
// function TractorTopView() {
//   return (
//     <svg
//       viewBox="0 0 130 68"
//       width={130}
//       height={68}
//       xmlns="http://www.w3.org/2000/svg"
//       style={{
//         display: "block",
//         filter:
//           "drop-shadow(0 8px 20px rgba(0,0,0,0.80)) drop-shadow(0 2px 5px rgba(0,0,0,0.55))",
//       }}
//       aria-hidden="true"
//     >
//       {/* Ground shadow */}
//       <ellipse cx="65" cy="63" rx="44" ry="5.5" fill="rgba(0,0,0,0.40)" />

//       {/* ── REAR LEFT WHEEL (top-left in top-view) ── */}
//       <rect x="4" y="2" width="26" height="15" rx="3.5" fill="#0f0f0f" />
//       <rect
//         x="6"
//         y="3.5"
//         width="22"
//         height="12"
//         rx="2.5"
//         fill="#1e1e1e"
//         stroke="#C7C466"
//         strokeWidth="0.9"
//       />
//       <line
//         x1="8"
//         y1="9.5"
//         x2="26"
//         y2="9.5"
//         stroke="#C7C466"
//         strokeWidth="0.7"
//         strokeOpacity="0.5"
//       />
//       <rect x="4" y="51" width="26" height="15" rx="3.5" fill="#0f0f0f" />
//       <rect
//         x="6"
//         y="52.5"
//         width="22"
//         height="12"
//         rx="2.5"
//         fill="#1e1e1e"
//         stroke="#C7C466"
//         strokeWidth="0.9"
//       />
//       <line
//         x1="8"
//         y1="58.5"
//         x2="26"
//         y2="58.5"
//         stroke="#C7C466"
//         strokeWidth="0.7"
//         strokeOpacity="0.5"
//       />

//       {/* Rear axle bar */}
//       <rect x="4" y="16" width="26" height="36" rx="1.5" fill="#181818" />

//       {/* ── MAIN BODY ── */}
//       <rect x="24" y="13" width="62" height="42" rx="5" fill="#2B6027" />

//       {/* ── CAB / CANOPY ── */}
//       <rect x="26" y="15" width="44" height="38" rx="4" fill="#459934" />
//       {/* Cabin roof ridge */}
//       <rect
//         x="30"
//         y="17"
//         width="36"
//         height="34"
//         rx="3"
//         fill="#3DA328"
//         fillOpacity="0.5"
//       />
//       {/* Window glass (from above) */}
//       <rect
//         x="44"
//         y="20"
//         width="20"
//         height="28"
//         rx="2"
//         fill="#7AB87A"
//         fillOpacity="0.45"
//       />
//       <line
//         x1="54"
//         y1="20"
//         x2="54"
//         y2="48"
//         stroke="#2B6027"
//         strokeWidth="1"
//         strokeOpacity="0.6"
//       />
//       <line
//         x1="44"
//         y1="34"
//         x2="64"
//         y2="34"
//         stroke="#2B6027"
//         strokeWidth="0.8"
//         strokeOpacity="0.4"
//       />

//       {/* ── ENGINE HOOD (front, narrower) ── */}
//       <rect x="68" y="19" width="40" height="30" rx="4" fill="#3DA328" />
//       {/* Hood vents */}
//       <line
//         x1="75"
//         y1="25"
//         x2="75"
//         y2="43"
//         stroke="#1e4d1a"
//         strokeWidth="1.4"
//         strokeOpacity="0.6"
//       />
//       <line
//         x1="82"
//         y1="25"
//         x2="82"
//         y2="43"
//         stroke="#1e4d1a"
//         strokeWidth="1.4"
//         strokeOpacity="0.6"
//       />
//       <line
//         x1="89"
//         y1="25"
//         x2="89"
//         y2="43"
//         stroke="#1e4d1a"
//         strokeWidth="1.4"
//         strokeOpacity="0.6"
//       />
//       <line
//         x1="96"
//         y1="25"
//         x2="96"
//         y2="43"
//         stroke="#1e4d1a"
//         strokeWidth="1.4"
//         strokeOpacity="0.6"
//       />

//       {/* ── EXHAUST PIPE ── */}
//       <circle cx="48" cy="15" r="4.5" fill="#C7C466" />
//       <circle cx="48" cy="15" r="2.8" fill="#a8a44a" />
//       <circle cx="48" cy="15" r="1.3" fill="#2B6027" />

//       {/* ── GOLD ACCENT STRIPE ── */}
//       <rect
//         x="24"
//         y="32"
//         width="62"
//         height="3.5"
//         rx="1.5"
//         fill="#C7C466"
//         fillOpacity="0.35"
//       />

//       {/* ── FRONT LEFT WHEEL (top-right in top-view) ── */}
//       <rect x="102" y="5" width="20" height="12" rx="3" fill="#0f0f0f" />
//       <rect
//         x="103.5"
//         y="6"
//         width="17"
//         height="10"
//         rx="2"
//         fill="#1e1e1e"
//         stroke="#C7C466"
//         strokeWidth="0.8"
//       />
//       <rect x="102" y="51" width="20" height="12" rx="3" fill="#0f0f0f" />
//       <rect
//         x="103.5"
//         y="52"
//         width="17"
//         height="10"
//         rx="2"
//         fill="#1e1e1e"
//         stroke="#C7C466"
//         strokeWidth="0.8"
//       />

//       {/* Front axle bar */}
//       <rect x="104" y="16" width="14" height="36" rx="1.5" fill="#181818" />

//       {/* ── GRILL ── */}
//       <rect x="108" y="22" width="10" height="24" rx="2" fill="#111" />
//       <line
//         x1="110"
//         y1="26"
//         x2="110"
//         y2="42"
//         stroke="#C7C466"
//         strokeWidth="0.8"
//         strokeOpacity="0.5"
//       />
//       <line
//         x1="114"
//         y1="26"
//         x2="114"
//         y2="42"
//         stroke="#C7C466"
//         strokeWidth="0.8"
//         strokeOpacity="0.5"
//       />

//       {/* ── HEADLIGHTS ── */}
//       <circle cx="117" cy="25" r="3" fill="#FFF9C4" fillOpacity="0.95" />
//       <circle cx="117" cy="43" r="3" fill="#FFF9C4" fillOpacity="0.95" />

//       {/* Front bumper detail */}
//       <rect x="118" y="21" width="5" height="26" rx="1.5" fill="#1a3d1a" />
//     </svg>
//   );
// }
/* ─────────────────────────────────────────────────────────
   Premium Top-view tractor SVG (Drop-in Replacement)
   Maintains 130x68 bounds and +X facing direction.
───────────────────────────────────────────────────────── */
function TractorTopView() {
  return (
    <svg
      viewBox="0 0 130 68"
      width={130}
      height={68}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        display: "block",
        filter:
          "drop-shadow(0 12px 24px rgba(0,0,0,0.85)) drop-shadow(0 4px 8px rgba(0,0,0,0.6))",
      }}
      aria-hidden="true"
    >
      <defs>
        {/* Rich Body Gradient */}
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#459934" />
          <stop offset="30%" stopColor="#2B6027" />
          <stop offset="70%" stopColor="#2B6027" />
          <stop offset="100%" stopColor="#1a3d1a" />
        </linearGradient>

        {/* Engine Hood Gradient (lighter for depth) */}
        <linearGradient id="hoodGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#55b342" />
          <stop offset="50%" stopColor="#3DA328" />
          <stop offset="100%" stopColor="#245420" />
        </linearGradient>

        {/* Gold Metallic Accent */}
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFF9C4" />
          <stop offset="50%" stopColor="#C7C466" />
          <stop offset="100%" stopColor="#8a8738" />
        </linearGradient>

        {/* Tire Base Gradient */}
        <linearGradient id="tireGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#222" />
          <stop offset="50%" stopColor="#0f0f0f" />
          <stop offset="100%" stopColor="#050505" />
        </linearGradient>

        {/* Glass Reflection Gradient */}
        <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
          <stop offset="30%" stopColor="rgba(122,184,122,0.1)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.5)" />
        </linearGradient>

        {/* Tire Tread Pattern */}
        <pattern id="tread" width="6" height="15" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="3" height="15" fill="#000" opacity="0.6" />
        </pattern>
      </defs>

      {/* ── GROUND SHADOW ── */}
      <ellipse cx="65" cy="34" rx="55" ry="28" fill="rgba(0,0,0,0.45)" />

      {/* ── REAR AXLE ── */}
      <rect x="18" y="12" width="16" height="44" rx="2" fill="#111" />

      {/* ── FRONT AXLE ── */}
      <rect x="100" y="16" width="10" height="36" rx="2" fill="#111" />

      {/* ── TIRES ── */}
      {/* Rear Left */}
      <rect x="4" y="2" width="32" height="16" rx="4" fill="url(#tireGrad)" />
      <rect x="4" y="2" width="32" height="16" rx="4" fill="url(#tread)" />
      <rect
        x="8"
        y="4"
        width="24"
        height="12"
        rx="2"
        fill="none"
        stroke="url(#goldGrad)"
        strokeWidth="1"
        opacity="0.8"
      />

      {/* Rear Right */}
      <rect x="4" y="50" width="32" height="16" rx="4" fill="url(#tireGrad)" />
      <rect x="4" y="50" width="32" height="16" rx="4" fill="url(#tread)" />
      <rect
        x="8"
        y="52"
        width="24"
        height="12"
        rx="2"
        fill="none"
        stroke="url(#goldGrad)"
        strokeWidth="1"
        opacity="0.8"
      />

      {/* Front Left */}
      <rect x="96" y="5" width="24" height="12" rx="3" fill="url(#tireGrad)" />
      <rect x="96" y="5" width="24" height="12" rx="3" fill="url(#tread)" />
      <rect
        x="98"
        y="6.5"
        width="20"
        height="9"
        rx="1.5"
        fill="none"
        stroke="url(#goldGrad)"
        strokeWidth="0.8"
        opacity="0.8"
      />

      {/* Front Right */}
      <rect x="96" y="51" width="24" height="12" rx="3" fill="url(#tireGrad)" />
      <rect x="96" y="51" width="24" height="12" rx="3" fill="url(#tread)" />
      <rect
        x="98"
        y="52.5"
        width="20"
        height="9"
        rx="1.5"
        fill="none"
        stroke="url(#goldGrad)"
        strokeWidth="0.8"
        opacity="0.8"
      />

      {/* ── MAIN CHASSIS ── */}
      <rect x="22" y="15" width="68" height="38" rx="6" fill="url(#bodyGrad)" />

      {/* Engine Block / Lower mechanics */}
      <rect x="74" y="18" width="26" height="32" rx="3" fill="#181818" />

      {/* ── ENGINE HOOD ── */}
      <rect x="65" y="17" width="46" height="34" rx="4" fill="url(#hoodGrad)" />

      {/* Hood Vents (Detailed) */}
      <path
        d="M 72 20 L 72 48 M 77 20 L 77 48 M 82 20 L 82 48 M 87 20 L 87 48 M 92 20 L 92 48"
        stroke="#112b10"
        strokeWidth="1.5"
        opacity="0.7"
        strokeLinecap="round"
      />
      <path
        d="M 72 20 L 72 48 M 77 20 L 77 48 M 82 20 L 82 48 M 87 20 L 87 48 M 92 20 L 92 48"
        stroke="#000"
        strokeWidth="0.5"
        opacity="0.5"
        strokeLinecap="round"
      />

      {/* ── REAR HITCH / PTO ── */}
      <rect x="14" y="30" width="10" height="8" rx="1" fill="#181818" />
      <circle cx="16" cy="34" r="2" fill="url(#goldGrad)" />

      {/* ── CABIN INTERIOR (Under glass) ── */}
      {/* Seat */}
      <rect x="30" y="28" width="10" height="12" rx="2" fill="#111" />
      <rect x="32" y="29" width="6" height="10" rx="1" fill="#2a2826" />
      {/* Steering Wheel */}
      <rect x="44" y="32" width="4" height="4" rx="1" fill="#111" />
      <line
        x1="46"
        y1="28"
        x2="46"
        y2="40"
        stroke="#111"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="46" cy="34" r="1.5" fill="url(#goldGrad)" />

      {/* ── CABIN EXTERIOR & GLASS ── */}
      <rect x="24" y="15" width="38" height="38" rx="6" fill="#1a3d1a" />
      {/* Roof */}
      <rect x="26" y="17" width="34" height="34" rx="4" fill="url(#bodyGrad)" />
      <rect x="30" y="21" width="26" height="26" rx="2" fill="url(#hoodGrad)" />

      {/* Wrap-around Windows */}
      {/* Front Window */}
      <rect
        x="48"
        y="19"
        width="8"
        height="30"
        rx="1"
        fill="url(#glassGrad)"
        stroke="#1a3d1a"
        strokeWidth="1"
      />
      {/* Rear Window */}
      <rect
        x="28"
        y="19"
        width="4"
        height="30"
        rx="1"
        fill="url(#glassGrad)"
        stroke="#1a3d1a"
        strokeWidth="1"
      />
      {/* Left/Right Windows */}
      <rect x="33" y="19" width="14" height="4" rx="1" fill="url(#glassGrad)" />
      <rect x="33" y="45" width="14" height="4" rx="1" fill="url(#glassGrad)" />

      {/* ── EXHAUST STACK ── */}
      <circle cx="58" cy="14" r="5" fill="#111" />
      <circle cx="58" cy="14" r="4" fill="url(#goldGrad)" />
      <circle cx="58" cy="14" r="2.5" fill="#000" />
      {/* Smoke particle effect (subtle) */}
      <circle cx="58" cy="8" r="3" fill="#fff" opacity="0.15" />
      <circle cx="55" cy="4" r="4" fill="#fff" opacity="0.1" />

      {/* ── GOLD ACCENT STRIPES ── */}
      <rect
        x="66"
        y="32"
        width="44"
        height="4"
        fill="url(#goldGrad)"
        opacity="0.85"
      />

      {/* ── FRONT GRILL & BUMPER ── */}
      {/* Heavy Bumper */}
      <rect x="110" y="20" width="8" height="28" rx="2" fill="#181818" />
      <rect x="116" y="22" width="4" height="24" rx="1" fill="#111" />

      {/* Grill texture */}
      <path
        d="M 112 24 L 112 44 M 114 24 L 114 44"
        stroke="url(#goldGrad)"
        strokeWidth="1"
        opacity="0.6"
      />

      {/* ── HEADLIGHTS ── */}
      {/* Left Light */}
      <ellipse cx="117" cy="24" rx="3.5" ry="4.5" fill="#FFF9C4" />
      <ellipse cx="117" cy="24" rx="2" ry="3" fill="#fff" />
      {/* Right Light */}
      <ellipse cx="117" cy="44" rx="3.5" ry="4.5" fill="#FFF9C4" />
      <ellipse cx="117" cy="44" rx="2" ry="3" fill="#fff" />

      {/* Glowing Light Beams (Points Forward +X) */}
      <path d="M 118 24 L 130 14 L 130 34 Z" fill="#FFF9C4" opacity="0.15" />
      <path d="M 118 44 L 130 34 L 130 54 Z" fill="#FFF9C4" opacity="0.15" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────
   Asphalt road SVG
───────────────────────────────────────────────────────── */
function AsphaltRoad({ pathD, w, h }: { pathD: string; w: number; h: number }) {
  return (
    <svg
      aria-hidden="true"
      className="absolute top-0 left-0 pointer-events-none"
      style={{ width: w, height: h, zIndex: 3, overflow: "visible" }}
    >
      {/* Road border / kerb */}
      <path
        d={pathD}
        stroke="#080808"
        strokeWidth={48}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Asphalt base */}
      <path
        d={pathD}
        stroke="#181818"
        strokeWidth={43}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Road surface */}
      <path
        d={pathD}
        stroke="#2a2826"
        strokeWidth={38}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Worn asphalt detail */}
      <path
        d={pathD}
        stroke="#323030"
        strokeWidth={30}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Edge lines (white markings) */}
      <path
        d={pathD}
        stroke="rgba(255,255,255,0.22)"
        strokeWidth={38}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={pathD}
        stroke="#2e2c2a"
        strokeWidth={36}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Center dashed line */}
      <path
        d={pathD}
        stroke="rgba(240,230,160,0.78)"
        strokeWidth={2.5}
        fill="none"
        strokeDasharray="24 18"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────
   Story frame (video placeholder)
───────────────────────────────────────────────────────── */
function StoryFrame({
  image,
  alt,
  step,
  isActive,
}: {
  image: string;
  alt: string;
  step: string;
  isActive: boolean;
}) {
  return (
    <div className="relative aspect-video rounded-2xl overflow-hidden shadow-[0_12px_48px_rgba(0,0,0,0.65)] ring-1 ring-brand-gold/20 group">
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 95vw, 52vw"
        quality={75}
        loading="lazy"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {isActive && (
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-brand-gold/20 animate-ping"
            />
          )}
          <div className="relative w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/30">
            <svg
              className="w-6 h-6 text-white ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
      {/* Step badge */}
      <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/55 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-white/10">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-gold flex-shrink-0" />
        <span className="text-white text-xs font-bold tracking-[0.2em] uppercase">
          Step {step}
        </span>
      </div>
      <div className="absolute bottom-4 right-4 bg-brand-gold/90 text-brand-charcoal text-[11px] font-bold tracking-wider px-3 py-1.5 rounded-full">
        Video Coming Soon
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Station card (video + text)
───────────────────────────────────────────────────────── */
function StationCard({
  station,
  isActive,
  align,
}: {
  station: (typeof STATIONS)[number];
  isActive: boolean;
  align: "left" | "right";
}) {
  return (
    <div
      className={`w-full transition-all duration-700 ease-out ${
        isActive ? "opacity-100 translate-y-0" : "opacity-25 translate-y-6"
      }`}
    >
      <StoryFrame
        image={station.image}
        alt={station.imageAlt}
        step={station.step}
        isActive={isActive}
      />
      <div className={`mt-6 ${align === "right" ? "text-right" : "text-left"}`}>
        <h3 className="font-display font-bold text-2xl lg:text-3xl text-brand-white leading-tight">
          {station.title}
        </h3>
        <p
          lang="am"
          className="mt-1.5 text-brand-gold/55 text-sm tracking-wide"
        >
          {station.amharic}
        </p>
        <p className="mt-4 text-brand-white/60 text-sm leading-relaxed max-w-md">
          {station.description}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Main TeffJourney section
───────────────────────────────────────────────────────── */
export function TeffJourney() {
  const sectionRef = useRef<HTMLDivElement>(null); // scroll tracking
  const timelineRef = useRef<HTMLDivElement>(null); // size measurement

  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [pathD, setPathD] = useState("");
  const [tractorPct, setTractorPct] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);

  /* ── Measure timeline container, rebuild path ── */
  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;
    const update = () => {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      if (w > 10 && h > 10) {
        setDims({ w, h });
        setPathD(buildRoadPath(w, h));
      }
    };
    const ro = new ResizeObserver(update);
    ro.observe(el);
    setTimeout(update, 60);
    return () => ro.disconnect();
  }, []);

  /* ── Scroll → tractor offset-distance ── */
  const onScroll = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const total = el.offsetHeight - window.innerHeight;
    if (total <= 0) return;
    const progress = Math.max(0, Math.min(1, -rect.top / total));

    // Non-linear mapping so tractor is at each station when that station is in view
    // Stations appear at roughly equal intervals of scroll progress
    setActiveIdx(
      Math.min(STATIONS.length - 1, Math.floor(progress * STATIONS.length)),
    );

    // Map 0-1 progress to 5-92% of the path (path starts/ends off-screen)
    setTractorPct(5 + progress * 87);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    const t = setTimeout(onScroll, 120);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(t);
    };
  }, [onScroll]);

  return (
    <section
      ref={sectionRef}
      id="teff-journey"
      aria-labelledby="teff-journey-heading"
      className="relative overflow-hidden py-24 md:py-28 bg-gradient-to-b from-brand-green-dark to-brand-deep-forest"
    >
      {/* ── Mesob overlay ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 opacity-10 bg-[url('/mesob-pattern.png')] bg-repeat bg-[length:340px_340px] pointer-events-none"
      />

      {/* ── Section header ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-14">
        <p
          lang="am"
          aria-label="The story of teff in Amharic"
          className="mb-3 text-brand-gold text-xs font-bold tracking-[0.25em] uppercase"
        >
          የጤፍ ጉዞ
        </p>
        <h2
          id="teff-journey-heading"
          className="font-display font-bold text-4xl sm:text-5xl md:text-[3.5rem] text-brand-white leading-[1.1] tracking-tight"
        >
          The Journey of <span className="italic text-brand-gold">Teff</span>
        </h2>
        <p className="mt-5 max-w-xl mx-auto text-brand-white/50 text-base leading-relaxed">
          From highland soil to your table — five chapters of an ancient story
          that began 3,000 years ago in Ethiopia.
        </p>
        <div
          aria-hidden="true"
          className="mt-8 flex items-center justify-center gap-3"
        >
          <span className="h-px w-12 bg-brand-gold/30" />
          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/50" />
          <span className="h-px w-12 bg-brand-gold/30" />
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          DESKTOP TIMELINE  (lg+)
          overflow:hidden on parent section clips U-turns.
          Station rows define the height. SVG + tractor are absolute.
      ══════════════════════════════════════════════ */}
      <div
        ref={timelineRef}
        className="hidden lg:block relative"
        style={{ minHeight: STATIONS.length * STATION_H }}
      >
        {/* Asphalt road SVG */}
        {pathD && dims.w > 0 && (
          <AsphaltRoad pathD={pathD} w={dims.w} h={dims.h} />
        )}

        {/* Station rows — content on left or right, tractor on the OTHER side */}
        {STATIONS.map((station, i) => {
          const videoOnRight = station.side === "right";
          return (
            <div
              key={station.id}
              className="relative z-10 flex items-center"
              style={{ minHeight: STATION_H }}
            >
              {videoOnRight ? (
                /* Video RIGHT, tractor (road) on LEFT */
                <>
                  <div className="flex-1 min-w-0" />
                  <div className="w-[52%] px-8 pr-14">
                    <StationCard
                      station={station}
                      isActive={activeIdx === i}
                      align="left"
                    />
                  </div>
                </>
              ) : (
                /* Video LEFT, tractor (road) on RIGHT */
                <>
                  <div className="w-[52%] px-8 pl-14">
                    <StationCard
                      station={station}
                      isActive={activeIdx === i}
                      align="right"
                    />
                  </div>
                  <div className="flex-1 min-w-0" />
                </>
              )}
            </div>
          );
        })}

        {/* Tractor — follows the road via CSS offset-path */}
        {pathD && dims.w > 0 && (
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 z-20 pointer-events-none"
            style={
              {
                offsetPath: `path("${pathD}")`,
                offsetDistance: `${tractorPct}%`,
                offsetRotate: "auto",
                transition: "offset-distance 0.9s cubic-bezier(0.4, 0, 0.2, 1)",
              } as React.CSSProperties
            }
          >
            {/* Offset-anchor defaults to transform-origin: 50% 50% — centres tractor on path */}
            <div style={{ transform: "translate(-50%, -50%)" }}>
              <TractorTopView />
            </div>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════
          MOBILE TIMELINE  (< lg)
      ══════════════════════════════════════════════ */}
      <div className="lg:hidden relative pl-14 pr-4 sm:px-8">
        {/* The dashed track line */}
        <div
          aria-hidden="true"
          className="absolute left-6 sm:left-7 top-0 bottom-0 w-0.5"
          style={{
            background:
              "repeating-linear-gradient(to bottom, rgba(199,196,102,0.4) 0px, rgba(199,196,102,0.4) 7px, transparent 7px, transparent 16px)",
          }}
        />

        {/* Mobile tractor on the left track */}
        <div
          aria-hidden="true"
          className="absolute left-6 sm:left-7 z-20 pointer-events-none"
          style={{
            top: `${tractorPct}%`,
            transform: "translate(-50%, -50%) rotate(90deg) scale(0.45)",
            transition: "top 0.9s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <TractorTopView />
        </div>

        {STATIONS.map((station, i) => (
          <div key={station.id} className="relative mb-14 last:mb-0">
            <div
              aria-hidden="true"
              className="absolute -left-8 sm:-left-9 top-6 flex flex-col items-center gap-1"
            >
              <span className="text-brand-gold/50 text-[9px] font-bold tracking-[0.2em]">
                {station.step}
              </span>
              <div className="w-3 h-3 rounded-full border-2 border-brand-gold/50 bg-brand-deep-forest" />
            </div>
            <StoryFrame
              image={station.image}
              alt={station.imageAlt}
              step={station.step}
              isActive
            />
            <div className="mt-4">
              <h3 className="font-display font-bold text-xl text-brand-white">
                {station.title}
              </h3>
              <p lang="am" className="mt-1 text-brand-gold/55 text-xs">
                {station.amharic}
              </p>
              <p className="mt-3 text-brand-white/60 text-sm leading-relaxed">
                {station.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
