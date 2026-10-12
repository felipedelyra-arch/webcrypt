import Link from 'next/link';
import { PageHero } from '@/components/page-hero';
import { pageMeta } from '@/lib/site';

export const metadata = pageMeta('Privacidade', 'Minuta de privacidade da WebCrypt para o site em preparação.', '/privacidade');

export default function Privacy() {
  return <main id="conteudo">
    <PageHero eyebrow="Privacidade" title="Seus dados pedem" accent="clareza e cuidado." description="Esta minuta descreve o fluxo de dados planejado para o site WebCrypt. Os detalhes operacionais serão validados antes da publicação."/>
    <article className="prose shell">
      <p className="notice"><strong>Minuta em validação.</strong> O site ainda não está publicado. Empresa controladora, canal para solicitações de titulares, hospedagem e prazo de retenção dependem de confirmação. Este texto não declara conformidade legal concluída.</p>
      <section data-reveal="up">
      <h2>Quem responde pelos dados</h2>
      <p>A identificação jurídica da empresa controladora e um canal específico para pedidos sobre dados pessoais serão informados antes de ativar o recebimento público. Até lá, o formulário permanece indisponível quando o destino seguro não estiver configurado.</p>
      </section>
      <section data-reveal="up">
      <h2>O que o formulário coleta</h2>
      <p>Quando ativado, o formulário solicitará nome, e-mail ou telefone, empresa opcional, solução de interesse e descrição do projeto. Use apenas as informações necessárias para iniciar a conversa. Não envie senhas, credenciais ou dados confidenciais desnecessários.</p>
      </section>
      <section data-reveal="up">
      <h2>Como a solicitação será tratada</h2>
      <p>O navegador enviará a solicitação à aplicação no servidor. O fluxo local preparado armazena os dados em SQLite privado com criptografia AES-GCM e chaves mantidas no servidor. A notificação contém apenas um identificador, sem o conteúdo da mensagem. O acesso ao conteúdo cabe ao operador autorizado do ambiente de hospedagem. O servidor pode ler os dados para processar a solicitação; não se trata de criptografia de ponta a ponta.</p>
      <p>O destino de hospedagem e a operação ainda não foram confirmados. Esta descrição se refere à implementação local preparada e não assegura que um ambiente publicado já receba mensagens.</p>
      </section>
      <section data-reveal="up">
      <h2>Prazo e exclusão</h2>
      <p>A proposta é reter as solicitações por até 90 dias após o recebimento, com exclusão ao fim do prazo. O prazo, a rotina de exclusão e o atendimento a pedidos de titulares serão validados antes da publicação.</p>
      </section>
      <section data-reveal="up">
      <h2>Armazenamento no navegador</h2>
      <p>O site não usa analytics nem cookies de marketing. A abertura visual da página inicial usa <code>sessionStorage</code> para aparecer no máximo uma vez por sessão do navegador. Esse registro fica no dispositivo durante a sessão e não contém a mensagem do formulário.</p>
      <p>Quer discutir um projeto? <Link href="/contato">Acesse a página de contato</Link> e consulte a disponibilidade do formulário.</p>
      </section>
    </article>
  </main>;
}
