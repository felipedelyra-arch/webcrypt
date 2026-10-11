import Link from 'next/link';
import { Arrow } from '@/components/brand';
import { projects } from '@/content/projects';
import { showDrafts } from '@/lib/site';
import { ProjectRail } from '@/components/project-rail';
import Image from 'next/image';
import type { Project } from '@/content/projects';
import './project-showcase.css';

const appShots = ['home', 'cardapio', 'premios'];

function ProjectCover({ project }: { project: Project }) {
  const sizes = '(max-width: 850px) 90vw, 55vw';
  if (project.status === 'draft') return <div className="project-showcase-cover" aria-hidden="true"><span className="project-showcase-cover-name">{project.name}</span></div>;
  const desktop = project.screenshots.find(shot => shot.device === 'desktop');
  if (desktop) return <div className="project-showcase-cover"><Image src={desktop.src} alt={desktop.alt} fill sizes={sizes} className="project-showcase-img" /></div>;
  const shots = appShots.map(name => project.screenshots.find(shot => shot.src.endsWith(`/${name}.webp`))).filter(shot => !!shot);
  return <div className="project-showcase-cover project-showcase-cover-app">
    {shots.map((shot, index) => <div className="project-showcase-phone" key={shot.src}><Image src={shot.src} alt={index === 1 ? project.name : ''} fill sizes="(max-width: 850px) 30vw, 16vw" className="project-showcase-img" /></div>)}
  </div>;
}

export function ProjectShowcase() {
  const visible = projects.filter(project => project.status === 'published' || showDrafts);

  return <section className="project-showcase section shell" aria-labelledby="project-showcase-title">
    <div className="project-showcase-heading">
      <div><span className="eyebrow">Projetos</span><h2 id="project-showcase-title">Cada projeto,<br />uma história própria.</h2></div>
      <p>Sites e aplicativos que já estão no ar, com telas reais de cada entrega.</p>
    </div>
    {visible.length ? <ProjectRail>
      {visible.map(project => <article className="project-showcase-panel" data-spotlight key={project.slug}>
        <ProjectCover project={project} />
        <div className="project-showcase-copy">
          <span className="project-showcase-status">{project.status === 'draft' ? 'Rascunho local. Não publicado.' : project.kind}</span>
          <h3>{project.name}</h3>
          <p>{project.summary}</p>
          {project.status === 'draft' && project.completion === 'confirmed' && <p className="project-showcase-confirmation">Conclusão confirmada</p>}
          <Link href={`/projetos/${project.slug}`} className="project-showcase-link">Abrir estudo de caso <Arrow diagonal /></Link>
          {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-showcase-live">Ver site ao vivo<span className="sr-only"> de {project.name} (abre em nova aba)</span></a>}
        </div>
      </article>)}
    </ProjectRail> : <div className="project-showcase-empty">
      <h3>Estudos de caso em preparação.</h3>
      <p>As apresentações serão publicadas após a revisão das informações e dos materiais visuais.</p>
    </div>}
  </section>;
}
