// Central SEO helpers so every page builds Open Graph/Twitter metadata and
// canonical URLs the same way, from the same site URL.
//
// SITE_URL is the same env var next.config.ts already uses to scope CORS —
// set it in production (e.g. https://www.della.com.br) and every canonical
// link, sitemap entry, robots.txt reference and Open Graph URL below
// resolves to the real domain. Locally it falls back to localhost so
// nothing crashes in dev.
const FALLBACK_SITE_URL = "http://localhost:3000";

export const siteUrl = (process.env.SITE_URL || FALLBACK_SITE_URL).replace(/\/+$/, "");

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export interface OpenGraphInput {
  title: string;
  description: string;
  path: string;
  image?: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  };
  type?: "website" | "article";
}

export function buildOpenGraph({ title, description, path, image, type = "website" }: OpenGraphInput) {
  return {
    title,
    description,
    url: absoluteUrl(path),
    siteName: "Della Distribuidora de Produtos",
    locale: "pt_BR",
    type,
    ...(image && {
      images: [
        {
          url: image.url.startsWith("http") ? image.url : absoluteUrl(image.url),
          width: image.width ?? 1200,
          height: image.height ?? 1200,
          alt: image.alt ?? title,
        },
      ],
    }),
  };
}

export function buildTwitter({ title, description, image }: Omit<OpenGraphInput, "path">) {
  return {
    card: image ? ("summary_large_image" as const) : ("summary" as const),
    title,
    description,
    ...(image && {
      images: [image.url.startsWith("http") ? image.url : absoluteUrl(image.url)],
    }),
  };
}
