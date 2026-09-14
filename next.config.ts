import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Tailored to what this app actually loads: itself (Tailwind/Framer Motion
// inline styles, self-hosted Satoshi font, local images), plus the Google
// Maps embed on the location section. No analytics/ads/third-party scripts
// exist anywhere in the codebase, so nothing else needs an allowance.
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""};
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob:;
  font-src 'self' data:;
  connect-src 'self';
  frame-src https://www.google.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'self';
  upgrade-insecure-requests;
`
  .replace(/\s{2,}/g, " ")
  .trim();

// Restricts cross-origin access to the API routes. Same-origin requests
// (the site's own frontend) never send or need this header at all — it
// only affects browsers making cross-site calls, which is the abuse case
// (another website's JS hammering the AI chat or scraping store data).
// Leave SITE_URL unset locally; without it the header is simply omitted,
// which keeps cross-origin calls blocked by default (no explicit allow).
const allowedOrigin = process.env.SITE_URL;

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: cspHeader },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
          },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
          ...(isDev
            ? []
            : [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }]),
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Methods", value: "GET, POST, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, x-health-secret" },
          ...(allowedOrigin ? [{ key: "Access-Control-Allow-Origin", value: allowedOrigin }] : []),
        ],
      },
    ];
  },
};

export default nextConfig;
