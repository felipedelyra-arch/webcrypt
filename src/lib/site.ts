import type { Metadata } from 'next';
export const siteUrl = process.env.SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
export const isPublished = process.env.SITE_PUBLISHED === 'true' && siteUrl.startsWith('https://');
export const showDrafts = process.env.NODE_ENV !== 'production';
export function pageMeta(title: string, description: string, path: string): Metadata {
  return { title, description, alternates: { canonical: path }, openGraph: { title: `${title} | WebCrypt`, description, url: path, locale: 'pt_BR', type: 'website', images: ['/opengraph-image'] } };
}
