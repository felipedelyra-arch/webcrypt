import { PageHero } from '@/components/page-hero';
import { ArticleList } from '@/components/article-list';
import { articles } from '@/content/articles';
import { pageMeta, showDrafts } from '@/lib/site';
export const metadata=pageMeta('Blog','Artigos sobre desenvolvimento, decisões de produto e segurança de aplicações.','/blog');
export default function Blog(){return <main id="conteudo"><PageHero eyebrow="Blog" title="Entender a tecnologia." accent="Escolher com mais clareza." description="Reflexões sobre produto, engenharia e proteção de dados. Conceitos que ajudam a transformar necessidades em decisões."/><section className="section shell" aria-label="Artigos">{showDrafts&&<p className="notice" style={{marginBottom:30}}>Prévia editorial local. Os artigos abaixo estão em rascunho e não são publicados em produção.</p>}<ArticleList items={articles.filter(a=>a.status==='published'||showDrafts)} filters/></section></main>}
