# ADR 0002 — Lenis para rolagem suave

Data: 11/10/2026 · Estado: aceito (substitui a regra de "rolagem natural" do briefing)

## Contexto
O briefing original pedia rolagem natural. Em 11/10/2026 o responsável pediu explicitamente: "coloque o lenis também, site travado e lento tira qualquer um do sério". A instrução mais recente prevalece.

## Decisão
`lenis@1.3.26` em `src/components/smooth-scroll.tsx`, montado no layout: `autoRaf`, âncoras suaves, rolagem aninhada permitida. Toque mantém o momento nativo do sistema. Desligado com `prefers-reduced-motion`; parado durante a abertura (eventos `webcrypt:intro-start/end`).

## Consequências
- Única dependência de animação adicionada (~4 kB gz); o capítulo WebGL continua lendo `getBoundingClientRect` no evento `scroll`, que o Lenis dispara normalmente.
- `scrollIntoView`/`scrollTo` programáticos competem com o Lenis; para scroll por código use a instância ou âncoras.
- `lenis.stop()` esconde a barra de rolagem e dispara `resize`; a abertura só encerra em mudanças de layout reais (>40 px de largura ou >160 px de altura).
