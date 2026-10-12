'use client';

import { useEffect, useRef } from 'react';

// The intro has no artwork of its own: while `html.intro-playing` is set, the hero's CipherField
// gathers its particles into the official symbol at the centre, then bursts into the home sphere.
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
    const glyphs = '01<>/{}[]#%&*+=';
    let returnFocus: HTMLElement | null = null, usedKeyboard = false;
    const root = document.documentElement;
    const finish = () => {
      if (finished) return;
      finished = true;
      const hadFocus = el.contains(document.activeElement);
      el.hidden = true;
      root.classList.remove('intro-playing');
      window.dispatchEvent(new Event('webcrypt:intro-end'));
      clearInterval(interval);
      clearTimeout(timer);
      if (hadFocus) {
        const target = returnFocus?.isConnected ? returnFocus : document.querySelector<HTMLElement>('#hero-title');
        // Screen readers land on the title; the ring only shows if the visitor used the keyboard.
        if (!usedKeyboard) target?.classList.add('no-ring');
        target?.addEventListener('blur', () => target.classList.remove('no-ring'), { once: true });
        target?.focus({ preventScroll: true });
      }
    };
    close.current = finish;
    const play = (replay = false) => {
      if (media.matches || (!replay && location.hash)) return;
      if (!replay) {
        try {
          if (!startedHere.current && sessionStorage.getItem('webcrypt-intro')) return;
          sessionStorage.setItem('webcrypt-intro', '1');
          startedHere.current = true;
        } catch { root.classList.remove('intro-playing'); window.dispatchEvent(new Event('webcrypt:intro-end')); return; }
      }
      finish();
      if (replay) scrollTo({ top: 0, behavior: 'instant' });
      returnFocus = replay && document.activeElement instanceof HTMLElement ? document.activeElement : null;
      finished = false;
      usedKeyboard = false;
      const started = performance.now();
      label.textContent = '{0/1<>}';
      el.hidden = false;
      // Re-adding the class restarts the CSS fog fallback from the moment the intro really starts.
      root.classList.remove('intro-playing'); void root.offsetWidth; root.classList.add('intro-playing');
      window.dispatchEvent(new Event('webcrypt:intro-start'));
      el.querySelector<HTMLButtonElement>('.intro-skip')?.focus({ preventScroll: true });
      // 0–0.7s glyphs organise into the name, hold while the symbol lights up, 1.9s back to glyphs.
      interval = setInterval(() => {
        const elapsed = performance.now() - started;
        const revealed = elapsed < 300 ? 0 : elapsed < 1000 ? Math.floor((elapsed - 300) / 85) : elapsed < 1900 ? 8 : Math.max(0, 8 - Math.floor((elapsed - 1900) / 45));
        label.textContent = [...word].map((char, i) => i < revealed ? char : glyphs[(Math.floor(elapsed / 70) + i * 3) % glyphs.length]).join('');
      }, 50);
      timer = setTimeout(finish, 2600);
    };
    const replay = () => play(true);

    const changed = () => { if (media.matches) finish(); };
    // Real layout changes end the intro; scrollbar toggles (Lenis stop) and mobile URL bars do not.
    let size = [innerWidth, innerHeight];
    const resized = () => { if (Math.abs(innerWidth - size[0]) > 40 || Math.abs(innerHeight - size[1]) > 160) finish(); size = [innerWidth, innerHeight]; };
    const key = (event: KeyboardEvent) => { usedKeyboard = true; if (event.key === 'Escape') finish(); };
    const focused = (event: FocusEvent) => { if (!el.contains(event.target as Node)) finish(); };
    media.addEventListener('change', changed);
    document.addEventListener('keydown', key);
    document.addEventListener('focusin', focused);
    window.addEventListener('pagehide', finish);
    window.addEventListener('resize', resized);
    window.addEventListener('webcrypt:replay-intro', replay);
    play();
    return () => {
      finish();
      close.current = () => {};
      media.removeEventListener('change', changed);
      document.removeEventListener('keydown', key);
      document.removeEventListener('focusin', focused);
      window.removeEventListener('pagehide', finish);
      window.removeEventListener('resize', resized);
      window.removeEventListener('webcrypt:replay-intro', replay);
    };
  }, []);

  return <div ref={ref} className="intro" id="webcrypt-intro" hidden>
    <button className="intro-skip" type="button" onClick={() => close.current()}>Pular abertura</button>
    <span className="sr-only">WebCrypt, Soluções Tecnológicas</span>
    <div className="intro-word-block" aria-hidden="true">
      <span ref={text} className="intro-word">{'{0/1<>}'}</span>
      <span className="intro-caption">Soluções Tecnológicas</span>
      <i className="intro-progress" />
    </div>
  </div>;
}
