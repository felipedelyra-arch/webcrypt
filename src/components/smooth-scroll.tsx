'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

// Inertial wheel scrolling; touch keeps native momentum. Off with reduced motion, held during the intro.
export function SmoothScroll() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ autoRaf: true, anchors: true, allowNestedScroll: true, lerp: .1 });
    const stop = () => lenis.stop(), start = () => lenis.start();
    if (document.documentElement.classList.contains('intro-playing')) stop();
    addEventListener('webcrypt:intro-start', stop);
    addEventListener('webcrypt:intro-end', start);
    return () => {
      removeEventListener('webcrypt:intro-start', stop);
      removeEventListener('webcrypt:intro-end', start);
      lenis.destroy();
    };
  }, []);
  return null;
}
