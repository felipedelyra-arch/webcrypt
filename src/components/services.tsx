'use client';
import { useState } from 'react';
import Link from 'next/link';
import { services } from '@/content/services';
import { Arrow, Symbol } from './brand';
export function Services() {
  const [selected,setSelected]=useState(0);const service=services[selected];
  return <div className="services-layout"><div className="services-options" aria-label="Escolha uma solução">{services.map((s,i)=><button key={s.id} aria-pressed={selected===i} aria-controls="service-detail" onClick={()=>setSelected(i)}><span className="mono">{s.number}</span><span>{s.title}</span><Arrow diagonal/></button>)}</div><div className="service-detail" data-spotlight id="service-detail" aria-live="polite" aria-atomic="true"><div className="service-detail-content" key={service.id}><div className={`service-illustration ${service.icon}`} aria-hidden="true">{service.icon==='security'?<Symbol/>:<><div className="mini-window"><i/><i/><i/><div className="mini-line"/><div className="mini-grid"><b/><b/><b/></div><div className="mini-line short"/></div><div className="mini-phone"><span/><div/><div/><div/></div><span className="connection-dot"/></>}</div><span className="eyebrow">{service.title}</span><h3>{service.short}</h3><p>{service.description}</p><ul className="inline-tags">{service.examples.map(e=><li key={e}>{e}</li>)}</ul><Link className="text-link" href={`/solucoes#${service.id}`}>Explorar solução <Arrow/></Link></div></div></div>;
}
