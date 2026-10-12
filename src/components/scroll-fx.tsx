'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// One observer for the whole site. Markup opts in with attributes, styles live in effects.css:
//   data-reveal="up" | "clip" | "scale"   enters when it scrolls into view (children of
//   data-stagger get increasing delays), data-parallax="0.12" drifts against the scroll.
// Content is only hidden after `html.fx` is set here, so no-JS and reduced motion stay static.
export function ScrollFx() {
  const pathname = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { root.classList.remove('fx'); return; }
    root.classList.add('fx');
    document.querySelectorAll<HTMLElement>('[data-stagger]').forEach(group => {
      [...group.children].forEach((child, i) => (child as HTMLElement).style.setProperty('--i', String(i)));
    });
    const io = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add('is-in'); io.unobserve(entry.target); }
    }, { rootMargin: '0px 0px -12% 0px', threshold: .08 });
    document.querySelectorAll('[data-reveal]:not(.is-in)').forEach(el => io.observe(el));

    const layers = [...document.querySelectorAll<HTMLElement>('[data-parallax]')];
    let frame = 0;
    const paint = () => {
      frame = 0;
      for (const el of layers) {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) continue;
        const progress = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
        el.style.setProperty('--parallax', `${(-progress * Number(el.dataset.parallax || .1) * 100).toFixed(2)}px`);
      }
    };
    const onScroll = () => { if (!frame && root.dataset.motion !== 'paused') frame = requestAnimationFrame(paint); };
    if (layers.length) { paint(); addEventListener('scroll', onScroll, { passive: true }); }
    return () => { io.disconnect(); cancelAnimationFrame(frame); removeEventListener('scroll', onScroll); };
  }, [pathname]);
  return null;
}
