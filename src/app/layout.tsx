import type { Metadata } from 'next';
import localFont from 'next/font/local';
const sora = localFont({ src: [{ path: '../../public/fonts/sora-regular.ttf', weight: '400' }, { path: '../../public/fonts/sora-medium.ttf', weight: '500' }], display: 'swap', variable: '--font-sora' });
import { headers } from 'next/headers';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { isPublished, siteUrl } from '@/lib/site';
import './globals.css';
import './home.css';
import '../components/interaction.css';
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'WebCrypt: Software e segurança desde a arquitetura', template: '%s | WebCrypt' },
  description: 'Aplicativos, PWAs, plataformas e sistemas web sob medida. Desenvolvimento, experiência e proteção de dados conectados ao seu negócio.',
  robots: { index: isPublished, follow: isPublished },
  openGraph: { siteName:'WebCrypt', locale:'pt_BR', type:'website', images:['/opengraph-image'] },
  twitter: { card:'summary_large_image' },
};
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const nonce = (await headers()).get('x-nonce') || undefined;
  return <html lang="pt-BR"><body className={sora.variable}><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><Header/>{children}<Footer/><script nonce={nonce} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'Organization',name:'WebCrypt',description:'Desenvolvimento de software sob medida e cibersegurança.',...(isPublished?{url:siteUrl}:{})}).replace(/</g,'\\u003c')}}/></body></html>;
}
