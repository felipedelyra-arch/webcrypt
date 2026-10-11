'use client';
export default function ErrorPage({reset}:{reset:()=>void}){return <main id="conteudo" className="not-found"><h1>Ops.</h1><h2>Não foi possível carregar esta página.</h2><p>Tente novamente em instantes.</p><button onClick={reset} className="button">Tentar novamente</button></main>}
