import Link from 'next/link';
import { CipherField } from './cipher-field';
export function PageHero({title,accent,description,eyebrow,shape=0}:{title:string;accent?:string;description:string;eyebrow:string;shape?:0|1|2}){return <section className="page-hero shell"><div className="breadcrumb"><Link href="/">Início</Link> / {eyebrow}</div><span className="eyebrow">{eyebrow}</span><h1>{title}{accent&&<><br/><span>{accent}</span></>}</h1><p>{description}</p><CipherField shape={shape}/></section>}
