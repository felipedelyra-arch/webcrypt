# Referências visuais — WebCrypt

## Orientação recebida em 10/10/2026

> https://horizonx.so/pt-BR use esse site para estar escolhendo os melhores efeitos e modelos para o site. Vou te passar o prompt novamente e salve ele

Usar [HorizonX](https://horizonx.so/pt-BR) como referência para escolher efeitos e modelos adequados ao WebCrypt. O prompt completo foi recebido e está salvo integralmente em `docs/briefing-original.md`.

## Consulta inicial

Foram consultadas as descrições públicas de [Immersive Robotics](https://horizonx.so/explore/immersive-robotics-landing), [Glyph Sphere](https://horizonx.so/tools/glyph-sphere) e [Entrance Bloom](https://horizonx.so/tools/entrance-bloom). São candidatos para avaliação, sem seleção definitiva. As animações ainda não foram inspecionadas em execução.

A seleção final deve considerar o briefing completo, a identidade da WebCrypt, a stack existente, uso em celular, teclado, movimento reduzido e desempenho. Nenhum template ou código foi adquirido, baixado ou incorporado nesta consulta.

## Inspeção visual na retomada de 10/10/2026

Capturas reais no Chrome DevTools, sem aquisição de código:

- [v0 — Dark portfolio design](https://v0.app/templates/dark-portfolio-design-f8VA9MZaBv3): preview visível com navegação horizontal, título central grande, fundo escuro com partículas e ações agrupadas. Aproveitar hierarquia e respiro; WebCrypt conserva composição assimétrica e a própria paleta, sem reproduzir o gradiente multicolorido.
- [21st.dev — Orbital Sphere Background](https://21st.dev/@mengto/components/orbital-sphere): esfera pontilhada violeta com anéis, texto sobreposto no centro e controles no preview. Inspira profundidade periférica; a marca real agora é o centro da composição. A página informa licença MIT, mas nenhum código desse componente foi copiado.
- [HorizonX — Glyph Sphere](https://horizonx.so/tools/glyph-sphere): globo composto de caracteres sobre preto, com controles de densidade e dimensão. Referência de linguagem criptográfica para caracteres decorativos, com orçamento reduzido. Não foi exportado o componente pago.
- SafeGrowPA.com permaneceu inacessível; endereço correto da FluxoTech solicitado. Não presumir aparência nem funcionalidades do site antigo.

Os JPEGs oficiais fornecidos pelo responsável prevalecem sobre essas referências. Higgsfield consultado: plano gratuito, 4 créditos; nenhum recurso gerado ou cobrado nesta retomada.

## Referências consultadas nesta revisão — 11/10/2026

- [Safe Group](https://safegroupia.com/pt-br): endereço correto agora acessível pelo Chrome real. Inspecionados hero, seção de soluções e vitrine de cases. Usar a relação entre imagem ampla, título, contexto e ação para os projetos, preservando os limites do material disponível. Não importar estatísticas, parcerias, depoimentos ou recursos da Safe. A ferramenta de leitura web falhou, mas o navegador renderizou a página.
- [HorizonX, Immersive Robotics](https://horizonx.so/explore/immersive-robotics-landing): preview visual da composição de peça mecânica e camadas de montagem. Adaptar a ideia de construção por camadas a software, em SVG próprio. A execução completa do demo não foi validada nesta revisão.
- [v0, Dark portfolio design](https://v0.app/templates/dark-portfolio-design-f8VA9MZaBv3): preview inspecionada no navegador; aproveitado respiro da primeira dobra e agrupamento das ações, sem importar gradiente, partículas ou código.
- [21st.dev, Orbital Sphere Background](https://21st.dev/@mengto/components/orbital-sphere): preview visual inspecionada; referência de profundidade e movimento periférico. A esfera anterior foi descartada para atender à rejeição da logo gigante, preservando apenas o princípio de profundidade controlada.

Nenhuma compra, geração em conta ou cópia de código externo.

## Seleção de movimentos das quatro referências — 11/10/2026

Inspeção visual realizada no Chrome, sem aquisição ou importação de recursos.

| Referência | Observação executada | Adaptação para WebCrypt |
| --- | --- | --- |
| [Immersive Robotics, demo](https://immersive-robotics-landing.openship.mdxpreview.xyz/) | Primeira dobra com peças separadas; ao rolar, braço robótico montado em uma cena fixa. | Capítulo curto de montagem: interface, sistemas e dados aproximam-se com a rolagem. Aplicado somente em desktop alto com suporte CSS; celular mantém fluxo normal. |
| [Spiral Flux](https://horizonx.so/tools/spiral-flux) | Preview com painéis fotográficos distribuídos numa espiral em perspectiva. | Aproveitar profundidade na composição de camadas; não reproduzir espiral de fotos sem acervo real. |
| [Reel Flux](https://horizonx.so/tools/reel-flux) | Preview com faixa fotográfica larga, superfícies curvas; descrição pública explica resposta ao arrasto/rolagem. | Faixa de projetos com scroll-snap nativo, botões, toque e teclado. Texto e conteúdo permanecem planos e legíveis; sem deformação, loop infinito ou autoplay. Não foi testado arrasto no preview da referência. |
| [Kai Rennard](https://horizonx.so/explore/kai-rennard), [demo](https://kai-rennard.openship.mdxpreview.xyz/) | Hero com retrato/revelação fluida e seção editorial com grande tipografia sobre imagem e linhas topográficas. Ambas renderizadas e inspecionadas. | Entrada do título em três linhas com defasagem curta; respiro e escala editorial na vitrine. Retratos, assinatura, conteúdo de corrida e efeitos de fluido não transferidos para uma empresa de software. |

Decisão: software que ganha forma e conecta camadas é a narrativa central. A profundidade explica a construção; a galeria ajuda a examinar trabalhos. Evitar deformar conteúdos essenciais ou sugerir resultados de clientes que não tenham sido confirmados. Implementação original em Next/React, SVG e CSS, sem templates pagos ou novas dependências.
