import { PageHero } from '@/components/page-hero';
import { ProjectShowcase } from '@/components/project-showcase';
import { ContactCTA } from '@/components/footer';
import { pageMeta } from '@/lib/site';
export const metadata=pageMeta('Projetos','Contexto, decisões e soluções em nossos estudos de caso.','/projetos');
export default function Projects(){return <main id="conteudo"><PageHero shape={1} eyebrow="Projetos" title="Por trás de cada solução," accent="um desafio real." description="Um espaço para mostrar o contexto, as decisões e o desenvolvimento de cada projeto, com materiais atualizados e informações verificadas."/><ProjectShowcase/><ContactCTA/></main>}
