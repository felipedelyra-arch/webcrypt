import Link from 'next/link';
import type { Metadata } from 'next';
import { Arrow } from '@/components/brand';
import { Circuit } from '@/components/circuit';
import { Intro } from '@/components/intro';
import { Services } from '@/components/services';
import { Process } from '@/components/process';
import { ProjectShowcase } from '@/components/project-showcase';
import { SecurityFlow } from '@/components/security-flow';
import { ArticleList } from '@/components/article-list';
import { ContactCTA } from '@/components/footer';
import { articles } from '@/content/articles';
import { showDrafts } from '@/lib/site';

export const metadata: Metadata = { alternates: { canonical: '/' } };

export default function Home() {
  return <>
    <Intro />
    <main id="conteudo" className="home">
      <div className="hero-story">
      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <span className="hero-kicker">Software sob medida e cibersegurança</span>
          <h1 id="hero-title" tabIndex={-1}><span className="hero-line"><span>Software que faz </span></span><span className="hero-line"><span>seu negócio </span></span><span className="hero-line"><span>avançar.</span></span></h1>
          <p className="hero-promise">Segurança desde a arquitetura.</p>
          <p className="hero-description">Aplicativos, plataformas e sistemas que conectam a sua operação, as pessoas e a próxima ideia.</p>
          <div className="hero-actions">
            <Link href="/contato" className="button">Conversar sobre meu projeto <Arrow diagonal /></Link>
            <a href="#solucoes" className="text-link">Conhecer nossas soluções <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <Circuit />
        <div className="hero-bottom">
          <span>Aplicativos, plataformas e integrações.</span>
          <Link href="/seguranca">Como protegemos sua aplicação</Link>
          <a href="#solucoes" aria-label="Ir para soluções">↓</a>
        </div>
      </section>

      </div>

      <div className="capabilities">
        <div className="shell">
          <span>Aplicativos & PWAs</span><span aria-hidden="true">+</span>
          <span>Sistemas sob medida</span><span aria-hidden="true">+</span>
          <span>Integrações</span><span aria-hidden="true">+</span>
          <span>Cibersegurança</span>
        </div>
      </div>

      <section id="solucoes" className="section shell" aria-labelledby="solutions-title">
        <div className="section-heading">
          <div><span className="eyebrow">O que construímos</span><h2 id="solutions-title">Cada negócio pede<br />um jeito de construir.</h2></div>
          <p>Escolha um ponto de partida. A solução nasce do que a sua operação precisa.</p>
        </div>
        <Services />
      </section>

      <section className="security-section" aria-labelledby="security-title">
        <div className="shell security-grid">
          <div>
            <span className="eyebrow">Desenvolvimento e segurança</span>
            <h2 id="security-title">Construir bem.<br />Proteger desde o início.</h2>
            <p>Uma interface simples pode esconder um sistema complexo. Experiência, arquitetura e proteção de dados precisam caminhar juntas.</p>
            <Link href="/seguranca" className="text-link">Entenda nossa abordagem <Arrow diagonal /></Link>
          </div>
          <SecurityFlow />
        </div>

      </section>

      <section className="section shell" aria-labelledby="process-title">
        <div className="section-heading">
          <div><span className="eyebrow">Como trabalhamos</span><h2 id="process-title">Um caminho claro<br />entre a ideia e a entrega.</h2></div>
          <p>Decisões compartilhadas, etapas compreensíveis e espaço para evoluir.</p>
        </div>
        <Process />
      </section>

      <ProjectShowcase />

      <section className="section shell" aria-labelledby="articles-title">
        <div className="section-heading">
          <div><span className="eyebrow">Ideias em circulação</span><h2 id="articles-title">Tecnologia explicada.<br />Decisões mais claras.</h2></div>
          <Link href="/blog" className="text-link">Explorar o blog <Arrow diagonal /></Link>
        </div>
        <ArticleList items={articles.filter(article => article.status === 'published' || showDrafts).slice(0, 3)} />
      </section>
      <ContactCTA />
    </main>
  </>;
}
