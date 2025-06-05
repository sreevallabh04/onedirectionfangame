/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable strict mode in production
  reactStrictMode: true,
  
  // Optimize images
  images: {
    domains: [
      'i.scdn.co', // Spotify images
      'm.media-amazon.com', // Amazon Music images
      'images.unsplash.com', // Unsplash images
      'i.imgur.com', // Imgur images
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.scdn.co',
      },
    ],
  },

  // Production optimizations
  poweredByHeader: false,
  
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ],
      },
    ]
  },

  // Build optimizations
  eslint: {
    ignoreDuringBuilds: true, // Temporarily ignore ESLint during builds
  },
  typescript: {
    ignoreBuildErrors: true, // Temporarily ignore TypeScript errors during builds
  },

  // Output configuration
  output: 'standalone',
  
  // Experimental features
  experimental: {
    scrollRestoration: true,
  },
}

export default nextConfig
