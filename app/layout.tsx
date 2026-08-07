import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

/* -------------------------------------------------------
   Typography — loaded via next/font (zero layout shift)
------------------------------------------------------- */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

/* -------------------------------------------------------
   Global SEO Metadata — Next.js Metadata API
------------------------------------------------------- */
export const metadata: Metadata = {
  title: {
    default: "Love Grass | Authentic Ethiopian Cuisine",
    template: "%s | Love Grass",
  },
  description:
    "Experience the authentic taste of Ethiopia at Love Grass Dubai. Savour 100% pure teff injera, hand-blended traditional spices, and rich heritage dishes crafted with love.",
  keywords: [
    "Ethiopian restaurant Dubai",
    "teff injera Dubai",
    "authentic Ethiopian food",
    "Love Grass restaurant",
    "Ethiopian cuisine",
  ],
  authors: [{ name: "Love Grass Restaurant" }],
  creator: "Love Grass",
  metadataBase: new URL("https://lovegrass.ae"),
  openGraph: {
    title: "Love Grass | Authentic Ethiopian Cuisine",
    description:
      "100% pure teff injera, traditional spices, and authentic Ethiopian dining in Dubai.",
    url: "https://lovegrass.ae",
    siteName: "Love Grass",
    locale: "en_AE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Love Grass | Authentic Ethiopian Cuisine",
    description:
      "100% pure teff injera, traditional spices, and authentic Ethiopian dining in Dubai.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/* -------------------------------------------------------
   Root Layout
------------------------------------------------------- */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-texture" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
