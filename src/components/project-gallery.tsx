'use client';
import Image from 'next/image';
import { useState, type KeyboardEvent } from 'react';
import type { Project } from '@/content/projects';
import './project-gallery.css';

export function ProjectGallery({ screenshots, url }: { screenshots: Project['screenshots']; url?: string }) {
  const hasDesktop = screenshots.some(s => s.device === 'desktop');
  const hasMobile = screenshots.some(s => s.device === 'mobile');
  const [device, setDevice] = useState<'desktop' | 'mobile'>(hasDesktop ? 'desktop' : 'mobile');
  const [index, setIndex] = useState(0);
  if (!screenshots.length) return <div className="empty-state"><h3>Novas imagens em preparação.</h3><p>As capturas atualizadas serão adicionadas após revisão.</p></div>;
  const images = screenshots.filter(s => s.device === device);
  const current = images[index] ?? images[0];
  const appOnly = !hasDesktop;
  const host = url ? new URL(url).host : '';

  function pick(next: number) { setIndex((next + images.length) % images.length); }
  function onKeys(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const next = index + (event.key === 'ArrowRight' ? 1 : -1);
    pick(next);
    const group = event.currentTarget; // React clears currentTarget after the handler returns
    requestAnimationFrame(() => group.querySelectorAll<HTMLElement>('button')[(next + images.length) % images.length]?.focus());
  }
  const phone = (s: Project['screenshots'][number], priority: boolean) => <div className="pg-phone"><Image src={s.src} alt={s.alt} width={s.width} height={s.height} sizes="(max-width: 700px) 80vw, 360px" priority={priority} /></div>;

  return <div className="pg" data-reveal="clip">
    {hasDesktop && hasMobile && <div className="device-switch" role="group" aria-label="Formato das telas">{(['desktop', 'mobile'] as const).map(d => <button key={d} type="button" aria-pressed={device === d} onClick={() => { setDevice(d); setIndex(0); }}>{d === 'desktop' ? 'Computador' : 'Celular'}</button>)}</div>}
    {appOnly ? <div className="pg-strip" tabIndex={0} role="region" aria-label="Telas do aplicativo">
      {images.map((s, i) => <figure key={s.src}>{phone(s, i === 0)}<figcaption aria-hidden="true">{s.alt}</figcaption></figure>)}
    </div> : <figure className="pg-stage">
      <div key={current.src} className="pg-fade">
        {device === 'desktop'
          ? <div className="pg-browser"><div className="pg-bar"><i /><i /><i /><span>{host}</span></div><Image src={current.src} alt={current.alt} width={current.width} height={current.height} sizes="(max-width: 1320px) 100vw, 1208px" priority={index === 0} /></div>
          : phone(current, index === 0)}
      </div>
      <figcaption aria-hidden="true">{current.alt}</figcaption>
    </figure>}
    {!appOnly && images.length > 1 && <div className="pg-thumbs" role="group" aria-label="Miniaturas" onKeyDown={onKeys}>
      {images.map((s, i) => <button key={s.src} type="button" aria-label={`Ver: ${s.alt}`} aria-current={i === index ? 'true' : undefined} onClick={() => setIndex(i)}><Image src={s.src} alt="" width={160} height={s.device === 'desktop' ? 100 : 346} sizes="160px" loading="lazy" /></button>)}
    </div>}
  </div>;
}
