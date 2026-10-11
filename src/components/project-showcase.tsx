import Link from 'next/link';
import { Arrow } from '@/components/brand';
import { projects } from '@/content/projects';
import { showDrafts } from '@/lib/site';
import { ProjectRail } from '@/components/project-rail';
import './project-showcase.css';

export function ProjectShowcase() {
  const visible = projects.filter(project => project.status === 'published' || showDrafts);

  return <section className="project-showcase section shell" aria-labelledby="project-showcase-title">
    <div className="project-showcase-heading">
      <div><span className="eyebrow">Projetos</span><h2 id="project-showcase-title">Cada projeto,<br />uma história própria.</h2></div>
      <p>Conheça o contexto de cada trabalho conforme seus materiais forem revisados para apresentação.</p>
    </div>
    {visible.length ? <ProjectRail>
      {visible.map(project => <article className="project-showcase-panel" data-spotlight key={project.slug}>
        <div className="project-showcase-cover" aria-hidden="true">
          <span className="project-showcase-cover-name">{project.name}</span>
          <span className="project-showcase-cover-note">{project.status === 'draft' ? 'Apresentação em preparação' : 'Estudo de caso'}</span>
        </div>
        <div className="project-showcase-copy">
          <span className="project-showcase-status">{project.status === 'draft' ? 'Rascunho local. Não publicado.' : 'Estudo de caso'}</span>
          <h3>{project.name}</h3>
          <p>{project.summary}</p>
          {project.completion === 'confirmed' && <p className="project-showcase-confirmation">Conclusão confirmada</p>}
          <Link href={`/projetos/${project.slug}`} className="project-showcase-link">Abrir estudo de caso <Arrow diagonal /></Link>
        </div>
      </article>)}
    </ProjectRail> : <div className="project-showcase-empty">
      <h3>Estudos de caso em preparação.</h3>
      <p>As apresentações serão publicadas após a revisão das informações e dos materiais visuais.</p>
    </div>}
  </section>;
}
