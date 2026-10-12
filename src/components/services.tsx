'use client';
import { useState } from 'react';
import Link from 'next/link';
import { services, type Visual } from '@/content/services';
import Image from 'next/image';
function ServiceShot({visual:v}:{visual:Visual}){
  const sizes='(max-width: 850px) 90vw, 40vw';
  return <figure className={`service-shot shot-${v.type}`}>{v.type==='phones'
    ?<div className="shot-phones">{v.shots.map(s=><div className="shot-phone" key={s.src}><Image src={s.src} alt={s.alt} width={1170} height={2532} sizes="(max-width: 850px) 40vw, 14vw"/></div>)}</div>
    :<div className={v.type==='browser'?'shot-browser':'shot-plain'}>{v.type==='browser'&&<div className="shot-bar" aria-hidden="true"><i/><i/><i/></div>}<Image src={v.src} alt={v.alt} width={2400} height={1500} sizes={sizes}/></div>}
    <figcaption>{v.caption}</figcaption></figure>;
}
export function Services() {
  const [selected,setSelected]=useState(0);const service=services[selected];
  return <div className="services-layout"><div className="services-options" aria-label="Escolha uma solução">{services.map((s,i)=><button key={s.id} aria-pressed={selected===i} aria-controls="service-detail" onClick={()=>setSelected(i)}><span className="mono">{s.number}</span><span>{s.title}</span></button>)}</div><div className="service-detail" data-spotlight id="service-detail" aria-live="polite" aria-atomic="true"><div className="service-detail-content" key={service.id}><ServiceShot visual={service.visual}/><span className="eyebrow">{service.title}</span><h3>{service.short}</h3><p>{service.description}</p><ul className="inline-tags">{service.examples.map(e=><li key={e}>{e}</li>)}</ul><Link className="text-link" href={`/solucoes#${service.id}`}>Explorar solução</Link></div></div></div>;
}
