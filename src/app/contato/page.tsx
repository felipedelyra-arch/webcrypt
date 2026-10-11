import { PageHero } from '@/components/page-hero';
import { ContactForm } from '@/components/contact-form';
import { contactAvailable } from '@/lib/contact-config';
import { pageMeta } from '@/lib/site';

export const metadata = pageMeta('Contato', 'Conte seu desafio à WebCrypt e converse sobre aplicativos, plataformas, integrações e segurança.', '/contato');

const services = ['apps', 'plataformas', 'integracoes', 'seguranca', 'a-definir'] as const;

export default async function Contact({ searchParams }: { searchParams: Promise<{ servico?: string }> }) {
  const requested = (await searchParams).servico;
  const initialService = services.find(service => service === requested) ?? 'a-definir';
  return <main id="conteudo">
    <PageHero eyebrow="Contato" title="Seu próximo projeto" accent="começa com uma conversa." description="Conte o que você precisa construir, melhorar ou conectar. Vamos entender o contexto antes de propor um caminho."/>
    <section className="contact-layout shell" aria-label="Enviar uma solicitação">
      <div className="contact-copy">
        <h2>Fale sobre o desafio.<br/><span>Nós ouvimos primeiro.</span></h2>
        <p>Descreva o objetivo, o público e o momento do projeto. Não precisa ter uma solução pronta para começar.</p>
        <ul className="contact-notes"><li><span aria-hidden="true">01</span>Aplicativos, PWAs e sistemas sob medida</li><li><span aria-hidden="true">02</span>Integrações e processos digitais</li><li><span aria-hidden="true">03</span>Segurança desde a arquitetura</li></ul>
      </div>
      <ContactForm available={contactAvailable()} initialService={initialService}/>
    </section>
  </main>;
}
