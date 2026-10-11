'use client';

import { useEffect, useRef, useState } from 'react';
export function Circuit() {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    let frame = 0;
    const canAnimate = () => visible && !document.hidden && !media.matches && !paused;
    const reset = () => {
      cancelAnimationFrame(frame);
      el.style.setProperty('--pointer-x', '0px');
      el.style.setProperty('--pointer-y', '0px');
      el.style.setProperty('--tilt-x', '0deg');
      el.style.setProperty('--tilt-y', '0deg');
    };
    const sync = () => {
      el.classList.toggle('is-moving', canAnimate());
      if (!canAnimate()) reset();
    };
    const move = (event: PointerEvent) => {
      if (!canAnimate() || event.pointerType === 'touch') return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = Math.max(-.5, Math.min(.5, (event.clientX - rect.left) / rect.width - .5));
        const y = Math.max(-.5, Math.min(.5, (event.clientY - rect.top) / rect.height - .5));
        el.style.setProperty('--pointer-x', `${x * 24}px`);
        el.style.setProperty('--pointer-y', `${y * 24}px`);
        el.style.setProperty('--tilt-x', `${-y * 12}deg`);
        el.style.setProperty('--tilt-y', `${x * 12}deg`);
      });
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(el);
    media.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', reset);
    return () => {
      reset();
      el.classList.remove('is-moving');
      observer.disconnect();
      media.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', reset);
    };
  }, [paused]);

  return <div className={`circuit-art${paused ? ' is-paused' : ''}`} ref={ref}>
    <div className="architecture-halo" aria-hidden="true" />
    <div className="circuit-structure" aria-hidden="true">
      <svg viewBox="0 0 600 600" fill="none" className="architecture-scene">
        <defs>
          <linearGradient id="plane-fill" x1="70" y1="50" x2="510" y2="380" gradientUnits="userSpaceOnUse"><stop stopColor="#263a28" /><stop offset="1" stopColor="#0b110d" /></linearGradient>
          <linearGradient id="plane-edge" x1="70" y1="200" x2="530" y2="200" gradientUnits="userSpaceOnUse"><stop stopColor="#b5f52b" stopOpacity=".15" /><stop offset=".5" stopColor="#d7ff89" /><stop offset="1" stopColor="#b5f52b" stopOpacity=".25" /></linearGradient>
          <pattern id="plane-grid" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="matrix(1 .57 -1 .57 300 0)"><path d="M40 0H0V40" stroke="#8ea783" strokeOpacity=".12" /></pattern>
        </defs>
        <path d="M20 430L300 270L580 430L300 590Z" fill="url(#plane-grid)" />
        <path d="M20 430L300 590L580 430M300 590V540" stroke="#304030" strokeWidth=".8" />
        <g className="assembly-plane assembly-data"><g className="architecture-layer layer-data">
          <path d="M70 388L300 256L530 388V405L300 537L70 405Z" fill="#101811" stroke="#41513b" />
          <path d="M70 388L300 520L530 388L300 256Z" fill="url(#plane-fill)" stroke="#60754b" />
          <path d="M125 388L300 287L475 388L300 489Z" fill="url(#plane-grid)" stroke="#566647" strokeOpacity=".5" />
          <path d="M175 388L300 316L425 388L300 460Z" stroke="#769555" />
          <path d="M235 388L300 351L365 388L300 425Z" fill="#284226" stroke="#b5f52b" />
          <path d="M70 405L300 537L530 405" stroke="url(#plane-edge)" strokeWidth="2" />
        </g></g>
        <path className="architecture-connectors" d="M165 255V444M435 255V444M300 332V520" stroke="#8ab35c" strokeDasharray="3 7" />
        <g className="assembly-plane assembly-system"><g className="architecture-layer layer-system">
          <path d="M70 294L300 162L530 294V311L300 443L70 311Z" fill="#0e180f" stroke="#4d6540" />
          <path d="M70 294L300 426L530 294L300 162Z" fill="url(#plane-fill)" stroke="#769654" />
          <path d="M150 294L230 248L300 288L380 242L450 282M230 248V210M300 288V344L370 384M300 344L230 384" stroke="#92b477" strokeWidth="2" />
          <path d="M264 294L300 273L336 294L300 315Z" fill="#b5f52b" />
          <path d="M150 294L186 315L150 336L114 315Z M380 221L416 242L380 263L344 242Z M370 363L406 384L370 405L334 384Z" fill="#30432c" stroke="#a4c884" />
          <path d="M70 311L300 443L530 311" stroke="url(#plane-edge)" strokeWidth="2" />
        </g></g>
        <g className="assembly-plane assembly-interface"><g className="architecture-layer layer-interface">
          <path d="M70 200L300 68L530 200V217L300 349L70 217Z" fill="#152016" stroke="#769654" />
          <path d="M70 200L300 332L530 200L300 68Z" fill="url(#plane-fill)" stroke="url(#plane-edge)" strokeWidth="1.5" />
          <path d="M112 200L300 92L488 200L300 308Z" fill="#0a120c" stroke="#42573b" />
          <path d="M112 200L300 92L488 200L454 220L266 112Z" fill="#1d2c1c" stroke="#42573b" />
          <path d="M285 104L300 95L316 104L300 113Z" fill="#b5f52b" />
          <path d="M150 202L243 148L336 202L243 256Z" fill="#182b1a" stroke="#537943" />
          <path d="M171 202L243 161L315 202L243 243Z" stroke="#b5f52b" strokeOpacity=".6" />
          <path d="M243 181L278 202L243 222L208 202Z" fill="#b5f52b" fillOpacity=".8" />
          <path d="M320 171L375 203M301 182L394 236M282 193L375 247" stroke="#6e8e60" strokeWidth="5" />
          <path d="M318 241L354 262L320 282L284 261Z" fill="#b5f52b" />
          <path className="architecture-signal" d="M70 217L300 349L530 217L300 85Z" stroke="#d7ff89" strokeWidth="2" pathLength="100" />
        </g></g>
        <g className="assembly-boundary">
          <path d="M46 265L300 119L554 265V363L300 509L46 363Z" stroke="#b5f52b" strokeOpacity=".55" />
          <path d="M46 265L300 411L554 265M300 411V509" stroke="#b5f52b" strokeOpacity=".3" />
          <path d="M46 265V363M554 265V363" stroke="#d7ff89" strokeWidth="2" />
        </g>
      </svg>
    </div>
    <div className="assembly-note" aria-hidden="true"><span>Camadas que se conectam.</span><span>Uma solução, do início ao fim.</span></div>
    <div className="architecture-caption"><span>Experiência</span><span>Sistemas</span><span>Dados</span></div>
    <div className="art-footer">
      <button type="button" className="intro-replay" aria-controls="webcrypt-intro" onClick={() => window.dispatchEvent(new Event('webcrypt:replay-intro'))}>Ver abertura</button>
      <button type="button" className="motion-toggle" onClick={() => setPaused(value => !value)} aria-pressed={paused}>
        <span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span> {paused ? 'Retomar' : 'Pausar'} efeitos
      </button>
    </div>
  </div>;
}
