import Link from 'next/link';
import type { Metadata } from 'next';
import { CipherField } from '@/components/cipher-field';
import { DecryptText } from '@/components/decrypt-text';
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
      <section className="hero" aria-labelledby="hero-title">
        <CipherField />
        <div className="hero-inner shell">
          <div className="hero-copy">
            <span className="hero-kicker"><span className="green-dot" />Software sob medida e cibersegurança</span>
            <h1 id="hero-title" tabIndex={-1}><span className="sr-only">Software que faz seu negócio avançar.</span><span className="hero-line"><DecryptText text="Software que faz " /></span><span className="hero-line"><DecryptText text="seu negócio " delay={180} /></span><span className="hero-line"><DecryptText text="avançar." delay={360} /></span></h1>
            <p className="hero-promise">Segurança desde a arquitetura.</p>
            <p className="hero-description">Aplicativos, plataformas e sistemas que conectam a sua operação, as pessoas e a próxima ideia.</p>
            <div className="hero-actions">
              <Link href="/contato" className="button">Conversar sobre meu projeto</Link>
              <a href="#solucoes" className="text-link">Conhecer nossas soluções</a>
            </div>
          </div>
          <div className="story-captions" aria-hidden="true">
            <p className="story-caption story-layers"><span>Camadas que se conectam.</span> Experiência, sistemas e dados desenhados juntos.</p>
            <p className="story-caption story-symbol"><span>Proteção desde o primeiro traço.</span> Segurança faz parte da arquitetura, não do acabamento.</p>
          </div>
          <div className="story-progress" aria-hidden="true"><i /><span>Dados</span><span>Camadas</span><span>Proteção</span></div>
        </div>
        <div className="hero-bottom shell">
          <span>Aplicativos, plataformas e integrações.</span>
          <Link href="/seguranca">Como protegemos sua aplicação</Link>
          <a href="#solucoes" aria-label="Ir para soluções">Soluções</a>
        </div>
      </section>
      </div>

      <div className="capabilities">
        <div className="cap-marquee">
          <div className="cap-track">
            <ul className="cap-group" aria-label="Capacidades"><li>Aplicativos &amp; PWAs</li><li>Sistemas sob medida</li><li>Integrações</li><li>Cibersegurança</li><li>Plataformas web</li><li>Arquitetura segura</li></ul>
            <ul className="cap-group" aria-hidden="true"><li>Aplicativos &amp; PWAs</li><li>Sistemas sob medida</li><li>Integrações</li><li>Cibersegurança</li><li>Plataformas web</li><li>Arquitetura segura</li></ul>
          </div>
        </div>
      </div>

      <section id="solucoes" className="section shell" aria-labelledby="solutions-title">
        <div className="section-heading" data-reveal="up">
          <div><span className="eyebrow">O que construímos</span><h2 id="solutions-title">Cada negócio pede<br />um jeito de construir.</h2></div>
          <p>Escolha um ponto de partida. A solução nasce do que a sua operação precisa.</p>
        </div>
        <div data-reveal="up"><Services /></div>
      </section>

      <section className="security-section" aria-labelledby="security-title">
        <div className="shell security-grid" data-stagger>
          <div data-reveal="up">
            <span className="eyebrow">Desenvolvimento e segurança</span>
            <h2 id="security-title">Construir bem.<br />Proteger desde o início.</h2>
            <p>Uma interface simples pode esconder um sistema complexo. Experiência, arquitetura e proteção de dados precisam caminhar juntas.</p>
            <Link href="/seguranca" className="text-link">Entenda nossa abordagem</Link>
          </div>
          <div data-reveal="up"><SecurityFlow /></div>
        </div>

      </section>

      <section className="section shell" aria-labelledby="process-title">
        <div className="section-heading" data-reveal="up">
          <div><span className="eyebrow">Como trabalhamos</span><h2 id="process-title">Um caminho claro<br />entre a ideia e a entrega.</h2></div>
          <p>Decisões compartilhadas, etapas compreensíveis e espaço para evoluir.</p>
        </div>
        <div data-reveal="up"><Process /></div>
      </section>

      <ProjectShowcase />

      <section className="section shell" aria-labelledby="articles-title">
        <div className="section-heading" data-reveal="up">
          <div><span className="eyebrow">Ideias em circulação</span><h2 id="articles-title">Tecnologia explicada.<br />Decisões mais claras.</h2></div>
          <Link href="/blog" className="text-link">Explorar o blog</Link>
        </div>
        <ArticleList items={articles.filter(article => article.status === 'published' || showDrafts).slice(0, 3)} />
      </section>
      <ContactCTA />
    </main>
  </>;
}
