import { notFound } from 'next/navigation';
import { projects } from '@/content/projects';
import { pageMeta, showDrafts } from '@/lib/site';
import { PageHero } from '@/components/page-hero';
import { ProjectGallery } from '@/components/project-gallery';
type Props={params:Promise<{slug:string}>};
function find(slug:string){return projects.find(p=>p.slug===slug&&(p.status==='published'||showDrafts));}
export async function generateMetadata({params}:Props){const p=find((await params).slug);return p?{...pageMeta(p.name,p.summary,`/projetos/${p.slug}`),...(p.status==='draft'?{robots:{index:false,follow:false}}:{})}:{};}
export default async function ProjectPage({params}:Props){const p=find((await params).slug);if(!p)notFound();return <main id="conteudo"><PageHero eyebrow="Estudo de caso" title={p.name} description={p.summary}/><section className="section shell">{p.status==='draft'&&<p className="notice" style={{marginBottom:35}}>Rascunho local. Conteúdo e imagens aguardam revisão antes da publicação.</p>}<ProjectGallery screenshots={p.screenshots}/><div className="prose">{p.sections.length?p.sections.map(s=><section key={s.heading}><h2>{s.heading}</h2><p>{s.body}</p></section>):<><h2>O que este estudo vai apresentar</h2><p>Contexto, problema, solução, funcionalidades, decisões de design, tecnologias confirmadas, cuidados de segurança e resultados comprovados.</p><p>Essas informações ainda precisam ser fornecidas e revisadas.</p></>}</div></section></main>}
