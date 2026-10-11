'use client';
import { useEffect } from 'react';

export function PointerGlow() {
  useEffect(() => {
    let frame = 0;
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch' || frame || !(event.target instanceof Element)) return;
      const el = event.target.closest<HTMLElement>('[data-spotlight]');
      if (!el) return;
      const { clientX, clientY } = event;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${clientX - rect.left}px`);
        el.style.setProperty('--my', `${clientY - rect.top}px`);
      });
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    return () => { document.removeEventListener('pointermove', onMove); cancelAnimationFrame(frame); };
  }, []);
  return null;
}
