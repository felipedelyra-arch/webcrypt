'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import { Arrow, Brand } from './brand';

const links = [['Soluções', '/solucoes'], ['Sobre', '/sobre'], ['Projetos', '/projetos'], ['Segurança', '/seguranca'], ['Blog', '/blog']];

export function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const path = usePathname();
  return <header className="site-header">
    <div className="shell header-inner">
      <Link href="/" className="brand-link" aria-label="WebCrypt, início" onClick={() => setOpen(false)}><Brand /></Link>
      <button ref={toggle} type="button" className="menu-toggle" aria-expanded={open} aria-controls="navigation" onClick={() => setOpen(!open)}>
        {open ? 'Fechar' : 'Menu'}<span aria-hidden="true">{open ? '×' : '+'}</span>
      </button>
      <nav id="navigation" className={open ? 'nav open' : 'nav'} aria-label="Navegação principal" onKeyDown={event => {
        if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); }
      }}>
        {links.map(([label, href]) => <Link key={href} href={href} aria-current={path.startsWith(href) ? 'page' : undefined} onClick={() => setOpen(false)}>{label}</Link>)}
        <Link className="button button-small" href="/contato" onClick={() => setOpen(false)}>Vamos conversar <Arrow diagonal /></Link>
      </nav>
    </div>
  </header>;
}
