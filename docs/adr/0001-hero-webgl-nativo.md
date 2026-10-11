# ADR 0001 — Hero em WebGL2 nativo, sem bibliotecas de animação

Data: 11/10/2026 · Estado: aceito

## Contexto
O responsável pediu a landing mais tecnológica possível, com animações que prendam a atenção, usando HorizonX, 21st.dev e v0 como referência. O briefing exige rolagem natural, movimento reduzido, pausa fora da tela e orçamento de desempenho. O hero anterior (SVG isométrico) era correto, mas estático.

## Decisão
Capítulo de hero com `CipherField` (`src/components/cipher-field.tsx`): 16 mil partículas (7 mil em celular/CPU fraca) em WebGL2 puro. Bits dispersos se montam numa esfera de dados; a rolagem nativa transforma a esfera em três camadas (experiência, sistemas, dados) e depois no símbolo oficial, amostrado dos pixels do JPEG fornecido. Sem three.js, GSAP, Motion ou Lenis.

## Consequências
- Zero KB de dependência nova; shader de ~40 linhas controlado pelo projeto. Custo: manutenção de código WebGL próprio.
- Fallback: sem WebGL2 ou com falha de shader/contexto, fica só o brilho CSS; o conteúdo nunca depende do canvas.
- Movimento reduzido: sem capítulo fixo (fluxo normal) e quadro estático. Pausa global por `html[data-motion="paused"]`, que também congela marquee, feixe do CTA e diagramas.
- O símbolo em partículas é uma composição a partir do JPEG oficial, não um vetor nem uma reconstrução da marca.

## Atualização — páginas internas
O mesmo componente atende os heróis internos com a prop `shape` (forma fixa, sem capítulo de rolagem), em vez de um segundo componente. Abaixo de 850 px o canvas é ocultado e o loop não roda (`clientWidth` zero).
