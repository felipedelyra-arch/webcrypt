export type Project = {
  slug: string;
  name: string;
  status: 'draft' | 'published';
  summary: string;
  completion: 'confirmed' | 'unconfirmed';
  screenshots: { src: string; alt: string; device: 'desktop' | 'mobile' }[];
  sections: { heading: string; body: string }[];
};

export const projects: Project[] = [
  {
    slug: 'mercadog',
    name: 'Mercadog',
    status: 'draft',
    summary: 'Projeto em preparação para apresentação. Escopo, entrega e materiais visuais ainda precisam ser confirmados.',
    completion: 'unconfirmed',
    screenshots: [],
    sections: []
  },
  {
    slug: 'tio-panda',
    name: 'Tio Panda',
    status: 'draft',
    summary: 'Projeto concluído, conforme confirmação recebida. A descrição do trabalho e os materiais visuais aguardam revisão.',
    completion: 'confirmed',
    screenshots: [],
    sections: []
  }
];
