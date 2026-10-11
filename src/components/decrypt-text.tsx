'use client';

import { useEffect, useRef } from 'react';

const GLYPHS = '01<>/{}[]#%&*+=?$ABCDEF';

// Server HTML keeps the real text; the cipher pass starts once the intro overlay is gone.
export function DecryptText({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0, start = 0;
    const tick = (now: number) => {
      const intro = document.getElementById('webcrypt-intro');
      if (intro && !intro.hidden) { start = 0; frame = requestAnimationFrame(tick); return; }
      start ||= now + delay;
      const t = now - start;
      if (t < 0) { el.textContent = scramble(text, 0, now); frame = requestAnimationFrame(tick); return; }
      const revealed = Math.floor(t / 34);
      el.textContent = revealed >= text.length ? text : scramble(text, revealed, now);
      if (revealed < text.length) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); el.textContent = text; };
  }, [text, delay]);
  return <span ref={ref} aria-hidden="true">{text}</span>;
}

function scramble(text: string, revealed: number, now: number) {
  return [...text].map((c, i) => i < revealed || c === ' ' ? c : GLYPHS[(Math.floor(now / 50) + i * 7) % GLYPHS.length]).join('');
}
