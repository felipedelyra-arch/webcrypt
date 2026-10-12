import Link from 'next/link';
import { Brand } from './brand';

export function ContactCTA() {
  return <section className="contact-cta shell" data-reveal="scale" data-spotlight aria-labelledby="contact-title"><span className="cta-beam" aria-hidden="true" />
    <div>
      <span className="eyebrow">O próximo passo</span>
      <h2 id="contact-title">Vamos dar forma<br />ao seu próximo projeto.</h2>
      <p>Conte o desafio. Vamos pensar na solução juntos.</p>
    </div>
    <Link href="/contato" className="button">Conversar sobre meu projeto</Link>
  </section>;
}

export function Footer() {
  return <footer className="site-footer">
    <div className="shell footer-top">
      <Link href="/" className="brand-link" aria-label="WebCrypt, início"><Brand /></Link>
      <p>Tecnologia para avançar.<br />Segurança para construir.</p>
      <nav aria-label="Links do rodapé">
        <Link href="/solucoes">Soluções</Link><Link href="/sobre">Sobre a WebCrypt</Link>
        <Link href="/projetos">Projetos</Link><Link href="/seguranca">Segurança</Link>
        <Link href="/blog">Blog</Link><Link href="/contato">Contato</Link>
      </nav>
    </div>
    <div className="shell footer-bottom">
      <span>© {new Date().getFullYear()} WebCrypt. Soluções Tecnológicas.</span>
      <Link href="/privacidade">Privacidade</Link>
      <a href="#conteudo">Voltar ao conteúdo</a>
    </div>
  </footer>;
}
