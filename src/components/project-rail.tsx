'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

export function ProjectRail({ children }: { children: ReactNode }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [controls, setControls] = useState({ ready: false, previous: false, next: false });

  function updateControls() {
    const rail = railRef.current;
    if (!rail) return;
    setControls({
      ready: true,
      previous: rail.scrollLeft > 2,
      next: rail.scrollLeft < rail.scrollWidth - rail.clientWidth - 2
    });
  }

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const observer = new ResizeObserver(updateControls);
    observer.observe(rail);
    updateControls();
    return () => observer.disconnect();
  }, []);

  function move(direction: -1 | 1) {
    const rail = railRef.current;
    if (!rail) return;
    const panel = rail.querySelector<HTMLElement>('.project-showcase-panel');
    const gap = parseFloat(getComputedStyle(rail).columnGap) || 0;
    rail.scrollBy({ left: direction * ((panel?.offsetWidth || rail.clientWidth) + gap), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }

  function revealFocusedPanel(event: React.FocusEvent<HTMLDivElement>) {
    const rail = railRef.current;
    const panel = (event.target as HTMLElement).closest<HTMLElement>('.project-showcase-panel');
    if (!rail || !panel) return;
    const railBounds = rail.getBoundingClientRect();
    const panelBounds = panel.getBoundingClientRect();
    if (panelBounds.left < railBounds.left || panelBounds.right > railBounds.right) {
      rail.scrollTo({ left: panel.offsetLeft - rail.offsetLeft, behavior: 'auto' });
    }
  }

  return <div className="project-rail">
    <div className="project-rail-controls" hidden={!controls.ready}>
      <button type="button" aria-label="Mostrar projeto anterior" aria-controls="project-showcase-rail" disabled={!controls.previous} onClick={() => move(-1)}>←</button>
      <button type="button" aria-label="Mostrar próximo projeto" aria-controls="project-showcase-rail" disabled={!controls.next} onClick={() => move(1)}>→</button>
    </div>
    <div id="project-showcase-rail" className="project-showcase-list" role="region" aria-label="Projetos em destaque" tabIndex={0} ref={railRef} onScroll={updateControls} onFocusCapture={revealFocusedPanel} onKeyDown={event => {
      if (event.target !== event.currentTarget || (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')) return;
      event.preventDefault();
      move(event.key === 'ArrowLeft' ? -1 : 1);
    }}>
      {children}
    </div>
  </div>;
}
