'use client';

import { useEffect, useRef } from 'react';

const GLYPHS = '01<>/{}[]#%&*+=?$ABCDEF';

// Runs when the intro is skipped (repeat visits, replay off). The real text node never changes (it stays the LCP candidate); glyphs are painted by a ::after overlay.
export function DecryptText({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // The intro already decrypts the brand; repeating it would also delay the headline's LCP.
    if (document.getElementById('webcrypt-intro')?.hidden === false) return;
    let frame = 0, start = 0;
    const set = (cipher: string | null) => {
      if (cipher === null) { el.classList.remove('is-ciphering'); delete el.dataset.cipher; return; }
      el.dataset.cipher = cipher; el.classList.add('is-ciphering');
    };
    const tick = (now: number) => {
      start ||= now + delay;
      const revealed = Math.max(0, Math.floor((now - start) / 34));
      if (revealed >= text.length) { set(null); return; }
      set(scramble(text, revealed, now));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); set(null); };
  }, [text, delay]);
  return <span ref={ref} className="decrypt" aria-hidden="true">{text}</span>;
}

function scramble(text: string, revealed: number, now: number) {
  return [...text].map((c, i) => i < revealed || c === ' ' ? c : GLYPHS[(Math.floor(now / 50) + i * 7) % GLYPHS.length]).join('');
}
