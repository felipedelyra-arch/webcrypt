'use client';

import { useEffect, useRef, useState } from 'react';

// Scroll-driven particle chapter: scattered bits assemble into a data sphere,
// split into three architecture layers, then resolve into the official symbol.
const VERT = `#version 300 es
in vec3 aSphere; in vec3 aLayers; in vec3 aSymbol; in vec3 aRandom; in vec2 aMeta;
uniform float uTime, uMorph, uAssemble, uAspect, uPixel, uScale, uPress;
uniform vec2 uTilt, uMouse, uOffset;
out vec3 vColor; out float vAlpha;
mat3 rotX(float a){float c=cos(a),s=sin(a);return mat3(1,0,0,0,c,s,0,-s,c);}
mat3 rotY(float a){float c=cos(a),s=sin(a);return mat3(c,0,-s,0,1,0,s,0,c);}
void main(){
  float seed=aMeta.x;
  float m1=smoothstep(0.,1.,clamp(uMorph*1.15-seed*.15,0.,1.));
  float m2=smoothstep(0.,1.,clamp((uMorph-1.)*1.15-seed*.15,0.,1.));
  vec3 p=mix(mix(aSphere,aLayers,m1),aSymbol,m2);
  p+=.018*(1.-m2*.7)*vec3(sin(uTime*1.3+seed*40.),cos(uTime*1.1+seed*33.),sin(uTime*.9+seed*21.));
  float a=clamp(uAssemble*1.5-seed*.5,0.,1.);a=1.-pow(1.-a,4.);
  p=mix(aRandom,p,a);
  float scanY=sin(uTime*.45)*1.15;
  float scan=exp(-pow((p.y-scanY)*9.,2.))*(1.-m2);
  float ry=mix(sin(uTime*.16)*.85+uTime*.05,0.,m2)+uTilt.x*.35;
  float rx=mix(mix(.22,.6,m1),0.,m2)-uTilt.y*.22;
  p=rotX(rx)*rotY(ry)*p;
  float z=max(p.z+3.4,1.2);
  vec2 ndc=p.xy*uScale*3.4/z;ndc.x/=uAspect;ndc+=uOffset;
  vec2 d=ndc-uMouse;d.x*=uAspect;
  float f=smoothstep(.28,0.,length(d))*uPress;
  ndc+=normalize(d+1e-5)*f*vec2(.07/uAspect,.07);
  gl_Position=vec4(ndc,0.,1.);
  float spark=step(.93,fract(seed*91.7+floor(uTime*1.2+seed*13.)*.37));
  gl_PointSize=uPixel*(1.3+seed*1.9+spark*1.2+scan*1.6)*3.4/z;
  float tone=mix(step(.72,fract(seed*7.31)),aMeta.y,m2);
  vec3 lime=vec3(.71,.96,.17),white=vec3(.93,.96,.9),dim=vec3(.42,.58,.36);
  vColor=mix(mix(dim,white,.35+.65*m2),lime,clamp(tone+spark*.8+scan,0.,1.));
  vAlpha=clamp((.62-p.z*.55)*(.7+spark*.9+scan*1.1),.04,1.2)*(.35+.65*a);
}`;
const FRAG = `#version 300 es
precision mediump float;
in vec3 vColor; in float vAlpha; out vec4 o;
void main(){float d=length(gl_PointCoord-.5);float s=smoothstep(.5,.0,d);o=vec4(vColor*vAlpha*s*s,1.);}`;

function shapes(n: number) {
  const sphere = new Float32Array(n * 3), layers = new Float32Array(n * 3), random = new Float32Array(n * 3), meta = new Float32Array(n * 2);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2, r = Math.sqrt(1 - y * y), t = golden * i, shell = Math.random() < .82 ? 1 : .55 + Math.random() * .4;
    sphere.set([Math.cos(t) * r * shell, y * shell, Math.sin(t) * r * shell], i * 3);
    // Three layers: points concentrate on edges and a circuit grid, like the earlier isometric plates.
    const layer = i % 3, k = Math.random();
    let x = Math.random() * 2 - 1, z = Math.random() * 2 - 1;
    if (k < .35) { if (Math.random() < .5) x = Math.sign(x); else z = Math.sign(z); }
    else if (k < .8) { if (Math.random() < .5) x = Math.round(x * 4) / 4; else z = Math.round(z * 4) / 4; }
    const inset = 1 - layer * .12;
    layers.set([x * .85 * inset, .56 - layer * .56 + (Math.random() - .5) * .02, z * .85 * inset], i * 3);
    const u = Math.random() * Math.PI * 2, v = Math.acos(Math.random() * 2 - 1), rr = 1.8 + Math.random() * 1.6;
    random.set([Math.sin(v) * Math.cos(u) * rr * 1.6, Math.sin(v) * Math.sin(u) * rr, Math.cos(v) * rr * .5], i * 3);
    meta.set([Math.random(), 0], i * 2);
  }
  return { sphere, layers, random, meta };
}

// Samples the bright strokes of the supplied JPEG, so the final form keeps the real symbol geometry.
async function sampleSymbol(n: number, meta: Float32Array) {
  const img = new Image();
  img.src = '/brand/webcrypt-symbol-original.jpg';
  await img.decode();
  const size = 220, c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('2d');
  ctx.drawImage(img, 0, 0, size, size);
  const data = ctx.getImageData(0, 0, size, size).data, hits: number[] = [];
  for (let i = 0; i < size * size; i++) if (Math.max(data[i * 4], data[i * 4 + 1], data[i * 4 + 2]) > 105) hits.push(i);
  if (!hits.length) throw new Error('empty');
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const px = hits[(Math.random() * hits.length) | 0], x = px % size, y = (px / size) | 0, o = px * 4;
    out.set([(x / size - .5) * 2.9 + (Math.random() - .5) * .01, -(y / size - .5) * 2.9 + (Math.random() - .5) * .01, (Math.random() - .5) * .08], i * 3);
    meta[i * 2 + 1] = data[o + 1] - data[o + 2] > 60 ? 1 : 0;
  }
  return out;
}

export function CipherField() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState(false);
  const pausedRef = useRef(false);

  useEffect(() => {
    pausedRef.current = paused;
    document.documentElement.dataset.motion = paused ? 'paused' : 'running';
    window.dispatchEvent(new Event('webcrypt:motion'));
  }, [paused]);
  useEffect(() => () => { delete document.documentElement.dataset.motion; }, []);

  useEffect(() => {
    const el = canvas.current;
    const story = el?.closest<HTMLElement>('.hero-story');
    const gl = el?.getContext('webgl2', { antialias: false, alpha: true, premultipliedAlpha: true, powerPreference: 'high-performance' });
    if (!el || !story || !gl) { setFailed(true); return; }
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const compile = (type: number, src: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const prog = gl.createProgram()!;
    const shaders = [compile(gl.VERTEX_SHADER, VERT), compile(gl.FRAGMENT_SHADER, FRAG)];
    shaders.forEach(sh => gl.attachShader(prog, sh));
    gl.linkProgram(prog);
    shaders.forEach(sh => gl.deleteShader(sh));
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { gl.deleteProgram(prog); setFailed(true); return; }
    gl.useProgram(prog);

    const n = innerWidth < 700 || (navigator.hardwareConcurrency || 8) <= 4 ? 7000 : 16000;
    const s = shapes(n);
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const buffers: WebGLBuffer[] = [];
    const attr = (name: string, data: Float32Array, size: number) => {
      const b = gl.createBuffer()!; buffers.push(b);
      gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(prog, name); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
      return b;
    };
    attr('aSphere', s.sphere, 3); attr('aLayers', s.layers, 3); attr('aRandom', s.random, 3);
    const symbolBuffer = attr('aSymbol', s.layers, 3), metaBuffer = attr('aMeta', s.meta, 2);
    const u = Object.fromEntries(['uTime', 'uMorph', 'uAssemble', 'uAspect', 'uPixel', 'uScale', 'uPress', 'uTilt', 'uMouse', 'uOffset'].map(k => [k, gl.getUniformLocation(prog, k)]));
    gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE);

    let alive = true;
    sampleSymbol(n, s.meta).then(symbol => {
      if (!alive) return;
      gl.bindBuffer(gl.ARRAY_BUFFER, symbolBuffer); gl.bufferData(gl.ARRAY_BUFFER, symbol, gl.STATIC_DRAW);
      gl.bindBuffer(gl.ARRAY_BUFFER, metaBuffer); gl.bufferData(gl.ARRAY_BUFFER, s.meta, gl.STATIC_DRAW);
      draw();
    }).catch(() => {});

    let frame = 0, last = 0, time = 0, assemble = reduced.matches ? 1 : 0, visible = true, morph = 0, morphTarget = 0;
    const tilt = [0, 0], tiltTarget = [0, 0], mouse = [9, 9];
    let press = 0, pressTarget = 0, dpr = 1;
    const introOpen = () => !document.getElementById('webcrypt-intro')?.hidden;

    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      const w = el.clientWidth, h = el.clientHeight;
      el.width = Math.round(w * dpr); el.height = Math.round(h * dpr);
      gl.viewport(0, 0, el.width, el.height);
      const aspect = w / h, wide = aspect > 1.05;
      gl.uniform1f(u.uAspect, aspect);
      gl.uniform1f(u.uPixel, (wide ? 1.7 : 1.5) * dpr);
      gl.uniform1f(u.uScale, wide ? .5 : Math.min(.42, aspect * .62));
      gl.uniform2f(u.uOffset, wide ? .42 : 0, wide ? -.02 : .4);
      draw();
    };
    const readScroll = () => {
      const r = story.getBoundingClientRect(), span = r.height - innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
      story.style.setProperty('--story', p.toFixed(4));
      story.classList.toggle('is-story', p > .2);
      morphTarget = p * 2.15;
    };
    function draw() {
      gl!.clearColor(0, 0, 0, 0); gl!.clear(gl!.COLOR_BUFFER_BIT);
      gl!.uniform1f(u.uTime, time); gl!.uniform1f(u.uMorph, Math.min(2, morph)); gl!.uniform1f(u.uAssemble, assemble);
      gl!.uniform2f(u.uTilt, tilt[0], tilt[1]); gl!.uniform2f(u.uMouse, mouse[0], mouse[1]); gl!.uniform1f(u.uPress, press);
      gl!.drawArrays(gl!.POINTS, 0, n);
    }
    const running = () => alive && visible && !document.hidden && !pausedRef.current && !reduced.matches;
    const tick = (now: number) => {
      frame = 0;
      const dt = Math.min(.05, (now - (last || now)) / 1000); last = now;
      if (!introOpen()) { time += dt; assemble = Math.min(1, assemble + dt / 2.2); }
      const k = 1 - Math.exp(-dt * 6);
      morph += (morphTarget - morph) * k;
      tilt[0] += (tiltTarget[0] - tilt[0]) * k; tilt[1] += (tiltTarget[1] - tilt[1]) * k;
      press += (pressTarget - press) * k;
      draw();
      if (running()) frame = requestAnimationFrame(tick);
    };
    const start = () => { if (!frame && running()) { last = 0; frame = requestAnimationFrame(tick); } };
    const sync = () => { if (running()) { cancelAnimationFrame(frame); frame = 0; start(); } else { cancelAnimationFrame(frame); frame = 0; morph = morphTarget; if (reduced.matches) assemble = 1; draw(); } };
    const onScroll = () => {
      if (!visible) return;
      readScroll();
      if (running()) start();
      else if (!frame) frame = requestAnimationFrame(() => { frame = 0; morph = morphTarget; draw(); });
    };
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width * 2 - 1, y = 1 - (e.clientY - r.top) / r.height * 2;
      tiltTarget[0] = x; tiltTarget[1] = y; mouse[0] = x; mouse[1] = y; pressTarget = 1;
      start();
    };
    const onLeave = () => { tiltTarget[0] = tiltTarget[1] = 0; pressTarget = 0; };
    const lost = (e: Event) => { e.preventDefault(); alive = false; cancelAnimationFrame(frame); setFailed(true); };

    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) readScroll(); sync(); });
    io.observe(story);
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize(); readScroll(); morph = morphTarget;
    addEventListener('scroll', onScroll, { passive: true });
    story.addEventListener('pointermove', onPointer);
    story.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', sync);
    reduced.addEventListener('change', sync);
    addEventListener('webcrypt:motion', sync);
    el.addEventListener('webglcontextlost', lost);
    sync();
    return () => {
      alive = false; cancelAnimationFrame(frame); io.disconnect(); ro.disconnect();
      removeEventListener('scroll', onScroll);
      story.removeEventListener('pointermove', onPointer);
      story.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', sync);
      reduced.removeEventListener('change', sync);
      removeEventListener('webcrypt:motion', sync);
      el.removeEventListener('webglcontextlost', lost);
      buffers.forEach(b => gl.deleteBuffer(b)); gl.deleteVertexArray(vao); gl.deleteProgram(prog);
    };
  }, []);

  return <>
    <div className={`cipher-field${failed ? ' is-fallback' : ''}`} aria-hidden="true">
      <div className="cipher-glow" />
      <canvas ref={canvas} />
    </div>
    <div className="art-footer">
      <button type="button" className="intro-replay" aria-controls="webcrypt-intro" onClick={() => window.dispatchEvent(new Event('webcrypt:replay-intro'))}>Ver abertura</button>
      <button type="button" className="motion-toggle" onClick={() => setPaused(value => !value)} aria-pressed={paused}>
        <span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span> {paused ? 'Retomar' : 'Pausar'} efeitos
      </button>
    </div>
  </>;
}
