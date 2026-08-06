import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Whitelist quality values used in <Image quality={...}> props
    qualities: [75, 90],

    // Enable modern AVIF + WebP formats for automatic next-gen conversion
    formats: ["image/avif", "image/webp"],

    // Device breakpoints for responsive srcSet generation
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],

    // Image sizes for layout="responsive" / fill scenarios
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Serve locally-hosted images with maximum cache TTL (1 year)
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
