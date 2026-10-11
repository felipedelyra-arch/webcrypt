'use client';

import { useEffect, useRef } from 'react';
import { Symbol } from './brand';

export function Intro() {
  const ref = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLSpanElement>(null);
  const close = useRef<() => void>(() => {});
  const startedHere = useRef(false);

  useEffect(() => {
    const el = ref.current;
    const label = text.current;
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    if (!el || !label) return;
    let interval: ReturnType<typeof setInterval> | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let finished = true;
    const word = 'webcrypt';
    const glyphs = '01<>/{}[]';
    let returnFocus: HTMLElement | null = null;
    const finish = () => {
      if (finished) return;
      finished = true;
      const hadFocus = el.contains(document.activeElement);
      el.hidden = true;
      clearInterval(interval);
      clearTimeout(timer);
      if (hadFocus) (returnFocus?.isConnected ? returnFocus : document.querySelector<HTMLElement>('#hero-title'))?.focus({ preventScroll: true });
    };
    close.current = finish;
    const play = (replay = false) => {
      if (media.matches || (!replay && location.hash)) return;
      if (!replay) {
        try {
          if (!startedHere.current && sessionStorage.getItem('webcrypt-intro')) return;
          sessionStorage.setItem('webcrypt-intro', '1');
          startedHere.current = true;
        } catch { return; }
      }
      finish();
      returnFocus = replay && document.activeElement instanceof HTMLElement ? document.activeElement : null;
      finished = false;
      const started = performance.now();
      label.textContent = '{0/1<>}';
      el.hidden = false;
      el.querySelector<HTMLButtonElement>('.intro-skip')?.focus({ preventScroll: true });
      interval = setInterval(() => {
        const elapsed = performance.now() - started;
        const revealed = elapsed < 650 ? Math.floor(elapsed / 80) : elapsed < 1750 ? 8 : Math.max(0, 8 - Math.floor((elapsed - 1750) / 45));
        label.textContent = [...word].map((char, i) => i < revealed ? char : glyphs[(Math.floor(elapsed / 80) + i * 3) % glyphs.length]).join('');
      }, 80);
      timer = setTimeout(finish, 2600);
      el.style.removeProperty('--intro-x');
      el.style.removeProperty('--intro-y');
      el.style.removeProperty('--intro-scale');
      const symbol = el.querySelector('.intro-symbol')?.getBoundingClientRect();
      const target = document.querySelector('.site-header .brand')?.getBoundingClientRect();
      if (symbol && target && target.bottom <= innerHeight && target.top >= 0) {
        el.style.setProperty('--intro-x', `${target.x + target.height / 2 - symbol.x - symbol.width / 2}px`);
        el.style.setProperty('--intro-y', `${target.y + target.height / 2 - symbol.y - symbol.height / 2}px`);
        el.style.setProperty('--intro-scale', `${target.height / symbol.width}`);
      }
    };
    const replay = () => play(true);

    const changed = () => { if (media.matches) finish(); };
    const key = (event: KeyboardEvent) => { if (event.key === 'Escape') finish(); };
    const focused = (event: FocusEvent) => { if (!el.contains(event.target as Node)) finish(); };
    media.addEventListener('change', changed);
    document.addEventListener('keydown', key);
    document.addEventListener('focusin', focused);
    window.addEventListener('pagehide', finish);
    window.addEventListener('resize', finish);
    window.addEventListener('webcrypt:replay-intro', replay);
    play();
    return () => {
      finish();
      close.current = () => {};
      media.removeEventListener('change', changed);
      document.removeEventListener('keydown', key);
      document.removeEventListener('focusin', focused);
      window.removeEventListener('pagehide', finish);
      window.removeEventListener('resize', finish);
      window.removeEventListener('webcrypt:replay-intro', replay);
    };
  }, []);

  return <div ref={ref} className="intro" id="webcrypt-intro" hidden>
    <button className="intro-skip" type="button" onClick={() => close.current()}>Pular abertura <span aria-hidden="true">↗</span></button>
    <span className="sr-only">WebCrypt, Soluções Tecnológicas</span>
    <div className="intro-grid" aria-hidden="true" />
    <svg className="intro-orbit" viewBox="0 0 600 600" fill="none" aria-hidden="true">
      <circle cx="300" cy="300" r="250" pathLength="100" />
      <ellipse cx="300" cy="300" rx="280" ry="130" transform="rotate(-32 300 300)" pathLength="100" />
      <ellipse cx="300" cy="300" rx="280" ry="130" transform="rotate(32 300 300)" pathLength="100" />
    </svg>
    <div className="intro-symbol" aria-hidden="true"><Symbol priority /></div>
    <span ref={text} className="intro-word" aria-hidden="true">{'{0/1<>}'}</span>
    <span className="intro-caption" aria-hidden="true">Soluções Tecnológicas</span>
  </div>;
}
