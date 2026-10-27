import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    agentFeedback: true,
    inlineCss: true,
    useOffline: true,
  },
  async headers() {
    return [
      {
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
        source: '/covers/:path*',
      },
      {
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
        source: '/(.*)',
      },
    ];
  },
  partialPrefetching: true,
  reactCompiler: true,
  turbopack: {
    rules: {
      '*.wgsl': {
        as: '*.js',
        loaders: ['@vgpu/wgsl/loader-webpack'],
      },
    },
  },
  typedRoutes: true,
};

export default nextConfig;
