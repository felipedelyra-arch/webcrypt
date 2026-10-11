import type { NextConfig } from 'next';
const config: NextConfig = {
  poweredByHeader: false,
  outputFileTracingIncludes: { '/*': ['public/brand/*.jpg', 'public/fonts/sora-regular.ttf'] },
  experimental: { cpus: 2, useTypeScriptCli: false },
  async headers() {
    return [{ source: '/:path*', headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      ...(process.env.SITE_PUBLISHED !== 'true' ? [{key:'X-Robots-Tag',value:'noindex, nofollow'}] : []),
      ...(process.env.SITE_URL?.startsWith('https://') ? [{key:'Strict-Transport-Security',value:'max-age=31536000'}] : []),
    ] }, { source: '/api/:path*', headers: [
      { key: 'Content-Security-Policy', value: "default-src 'none'; base-uri 'none'; frame-ancestors 'none'; object-src 'none'" },
    ] }];
  },
};
export default config;
