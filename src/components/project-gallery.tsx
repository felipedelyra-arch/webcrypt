'use client';
import Image from 'next/image';
import { useState } from 'react';
import type { Project } from '@/content/projects';
export function ProjectGallery({screenshots}:{screenshots:Project['screenshots']}){const [device,setDevice]=useState<'desktop'|'mobile'>('desktop');const images=screenshots.filter(s=>s.device===device);if(!screenshots.length)return <div className="empty-state"><h3>Novas imagens em preparação.</h3><p>As capturas atualizadas serão adicionadas após revisão.</p></div>;return <><div className="device-switch" aria-label="Formato das telas">{(['desktop','mobile'] as const).map(d=><button key={d} aria-pressed={device===d} onClick={()=>setDevice(d)}>{d==='desktop'?'Computador':'Celular'}</button>)}</div>{images.length?images.map(s=><Image key={s.src} src={s.src} alt={s.alt} width={device==='desktop'?1600:720} height={device==='desktop'?1000:1440} className="project-shot"/>):<p>Não há capturas deste formato disponíveis.</p>}</>}
