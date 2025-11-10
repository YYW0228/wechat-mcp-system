/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for Cloudflare Pages
  output: 'export',
  trailingSlash: true,
  distDir: 'out',

  experimental: {
    serverComponentsExternalPackages: ['@radix-ui/react-slot', '@radix-ui/react-tabs']
  },

  // Performance optimizations
  reactStrictMode: true,
  swcMinify: true,

  // Enable compression
  compress: true,

  // Security headers (disabled for static export)
  // async headers() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       headers: [
  //         {
  //           key: 'X-Content-Type-Options',
  //           value: 'nosniff',
  //         },
  //         {
  //           key: 'X-Frame-Options',
  //           value: 'DENY',
  //         },
  //         {
  //           key: 'X-XSS-Protection',
  //           value: '1; mode=block',
  //         },
  //       ],
  //     },
  //   ];
  // },

  // Bundle optimization
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },

  // Image optimization (for static export)
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;