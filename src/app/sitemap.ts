import type { MetadataRoute } from 'next';
import { siteUrl, isPublished } from '@/lib/site';
import { articles } from '@/content/articles';
import { projects } from '@/content/projects';
export default function sitemap():MetadataRoute.Sitemap{if(!isPublished)return [];return ['','/solucoes','/sobre','/projetos','/seguranca','/blog','/contato','/privacidade',...articles.filter(a=>a.status==='published').map(a=>`/blog/${a.slug}`),...projects.filter(p=>p.status==='published').map(p=>`/projetos/${p.slug}`)].map(path=>({url:siteUrl+path}));}
