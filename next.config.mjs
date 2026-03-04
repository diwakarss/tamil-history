import createNextIntlPlugin from 'next-intl/plugin';

// Initialize next-intl plugin for internationalization support
const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for development checks
  reactStrictMode: true,

  // Static export for S3/CloudFront deployment
  output: 'export',

  // Optimize images (disabled for static export)
  images: {
    unoptimized: true,
  },

  // Enable compression
  compress: true,

  // Production source maps for debugging
  productionBrowserSourceMaps: false,

  // Experimental performance features
  experimental: {
    // Optimize package imports for smaller bundles
    optimizePackageImports: ['next-intl'],
  },
};

export default withNextIntl(nextConfig);
