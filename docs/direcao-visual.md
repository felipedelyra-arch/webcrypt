# Direção visual — 10/10/2026

Fonte de verdade: [briefing original](briefing-original.md). A composição e a identidade partem dos dois JPEGs da WebCrypt fornecidos pelo responsável, visualizados integralmente nesta revisão.

## Público, objetivo e composição

A WebCrypt fala com empresas que precisam de aplicativos, PWAs, plataformas, sistemas e integrações sob medida, com atenção à proteção de dados. A ação principal é **Conversar sobre meu projeto**.

A primeira tela aproxima a mensagem comercial da marca real: título alinhado à esquerda; símbolo W/escudo/cadeado em grande escala à direita; conexões periféricas discretas. O nome horizontal aparece no cabeçalho e no rodapé. Não há indicadores de ataques, clientes, faturamento ou atividade simulada.

```
Marca fornecida                    Navegação / Conversar

Software que faz                   Circuitos periféricos
seu negócio                        Símbolo W original
avançar.                           e iluminação da fonte
Segurança desde a arquitetura.
Texto / ação principal / soluções  Pausar efeitos

                Áreas de atuação
Soluções: seleção                  Aplicação e próximos passos
Segurança: explicação              Fluxo selecionável
Processo: sequência de etapas
Projetos em preparação             Contexto editorial
Artigos                            Convite para conversar
```

A composição usa variação pela função: soluções selecionáveis, fluxo de segurança, processo sequencial e leitura editorial. Mantém a navegação e a rolagem naturais, sem substituir o scroll do navegador.

## Tokens

| Função | Decisão |
| --- | --- |
| Fundo | `#080A08`, preto com leve presença de verde |
| Superfície | `#151A16`, grafite |
| Texto | `#F3F5F0`, branco suave |
| Texto secundário | `#ADB5A8` |
| Ação e identidade | `#B5F52B`, verde-lima; a imagem original mantém seus pixels |
| Divisores | `#30392C` |
| Tipografia | Sora local 400/500 para texto e interface; monospace apenas nos caracteres decorativos |
| Título principal | Escala de aproximadamente 39 a 90 px, ajustada à largura; peso 400 |
| Layout | Shell até 1.480 px e 1.600 px em telas maiores; margens de 20 px em 360 px |
| Espaço | Base de 8 px, com 16/24/32/48/64/96 como referências |
| Foco | Contorno lima de 2 px com afastamento de 5 px |
| Ações | Altura mínima de 44 px; ação principal do hero ≥ 54 px em celular |
| Movimento | Deslocamentos pequenos; curva `cubic-bezier(.22,1,.36,1)` nas entradas |

## Crítica e correções

A proposta anterior usava um escudo inventado, sem a geometria W/cadeado dos arquivos reais. A esfera de caracteres e os orbitais concorriam com a marca pequena. Havia ainda uma marca `W/C` inventada no desenho de portfólio, frases duplicadas e títulos secundários com o mesmo tratamento repetido.

A revisão substitui a identidade pela fornecida. O símbolo real passa a ocupar o centro do campo visual; os circuitos terminam ao redor dele, sem alterar sua geometria. O logotipo horizontal mantém a assinatura original. O portfólio diz que os estudos de caso estão em preparação e não se apresenta como uma captura de projeto concluído.

A paleta escura com lima é uma exigência explícita da marca. A diferenciação vem da geometria real do símbolo, da relação entre texto e imagem e das diferentes formas de apresentar soluções, processo e conteúdo, sem adicionar métricas ou decoração sem função.

## Abertura e movimento

- Abertura somente na home, no máximo uma vez por sessão. O marcador local do componente preserva esse comportamento também na repetição de efeitos do React Strict Mode.
- Duração de 2,6 s: fragmentos; nome decodificado; iluminação progressiva da imagem; breve retorno a caracteres; transição para o símbolo do hero quando ele está visível. Em celular, se o destino está fora da tela, usa uma saída discreta sem rolagem forçada.
- Botão **Pular abertura** disponível e focado imediatamente. Escape encerra; ao sair, o foco retorna ao título. Navegação para outro controle também libera a abertura.
- A camada nasce com `hidden` no HTML. Sem JavaScript, o conteúdo está disponível; CSS encerra visualmente a camada independentemente do timer. Falha de sessionStorage suprime a abertura. Mudança de tamanho, saída da página ou preferência por movimento reduzido encerram a apresentação.
- Nome estável para leitores de tela; caracteres e imagem duplicada da abertura são decorativos.
- O hero usa oito traços SVG, sem loop de redesenho contínuo de canvas. CSS anima sinais pelos circuitos; IntersectionObserver, visibilidade da aba e o botão de pausa controlam a execução. O ponteiro só altera discretamente a camada de circuitos, com um requestAnimationFrame por atualização, sem efeito ao toque.
- `prefers-reduced-motion` remove a abertura e os sinais animados, mantendo logo, símbolo, conteúdo e navegação estáticos. Observers, listeners, intervalos e frames são descartados ao desmontar.

## Marca e limites dos arquivos

Os JPEGs originais estão em `public/brand/`; não foram retocados, redesenhados ou ampliados. O cabeçalho enquadra a área útil do logotipo por CSS. O fundo e as margens do símbolo são integrados visualmente por composição CSS. O ícone do navegador embute o JPEG original em um contêiner SVG; **isso não o transforma em um vetor**.

O vetor oficial continua pendente para máxima nitidez em ampliações e usos gráficos. A página limita a dimensão de apresentação do recurso. Tela 4K não equivale a um arquivo de marca com detalhe nativo em 4K.

## Referências e validação

As referências consultadas e seus limites estão em [referências visuais](referencias-visuais.md). Nenhum código de template foi importado, nenhuma geração paga foi feita e nenhuma dependência foi adicionada.

A inspeção visual final e as evidências de navegador são responsabilidade da validação integrada registrada pelo coordenador. Não considerar os breakpoints ou a revisão de código como prova de renderização visual. O refinamento preserva rascunhos e depende das capturas atuais de Mercadog e Tio Panda para completar os estudos de caso.

## Refinamento solicitado em 11/10/2026

O responsável rejeitou o retângulo do JPEG no cabeçalho e o excesso de decoração genérica. A marca mantém a geometria e as duas cores originais. Contraste e brilho na imagem eliminam os tons baixos do fundo antes da composição `screen`; isso remove visualmente o retângulo sobre a superfície escura, sem converter o JPEG em arquivo com canal alfa.

O foco visual fica na marca rodeada por órbitas oblíquas e sinais lentos. A profundidade orbital adapta a referência do 21st.dev; o nome decodificado na abertura mantém a inspiração do Glyph Sphere do HorizonX. O respiro e a hierarquia de título/ação seguem a referência de composição do v0. Nenhum código ou componente dessas referências foi adquirido ou copiado.

Foram retirados o traço antes do subtítulo, fragmentos de código decorativos do hero, números soltos da abertura, frases de preenchimento e a tela fictícia da chamada de projetos. Travessões usados como separadores saíram dos textos e metadados. A rolagem permanece natural. Os novos sinais respeitam o mesmo controle de pausa, visibilidade e movimento reduzido dos circuitos existentes.

## Revisão de movimento e portfólio — 11/10/2026

Pedido mais recente substitui a direção anterior de logo gigante no hero. O hero passa a apresentar três planos isométricos próprios, representando experiência, sistemas e dados. Preto/grafite, branco suave, lima e Sora local permanecem. A marca oficial aparece no cabeçalho/rodapé e na abertura, sem repetição gigante na seção de segurança.

O movimento combina entrada curta do hero, oscilação de 6 px em 9 segundos, sinais de borda e resposta moderada ao ponteiro. Reutiliza pausa, IntersectionObserver, visibilidade da aba e movimento reduzido. Os títulos entram por timelines CSS de rolagem onde suportadas; outros navegadores recebem conteúdo estático. Rolagem natural preservada conforme briefing, sem Lenis/GSAP ou dependências novas.

Portfólio passa a ter painéis editoriais amplos com capas tipográficas. Não são capturas de produto nem marcas reconstruídas dos clientes. Conteúdo em rascunho aparece apenas no ambiente de desenvolvimento; produção continua sem os cases não aprovados. Tio Panda mantém apenas a confirmação de conclusão existente. Novas telas e conteúdo confirmado continuam necessários para demonstrar qualidade com evidência.

## Capítulo de montagem e ritmo editorial — 11/10/2026

A composição isométrica passa a se montar com a rolagem, em um capítulo de apenas 380 px adicionais no desktop. Durante a montagem, um contorno geométrico integra as três camadas; representa a arquitetura da solução, não proteção operacional medida. Pausa congela também as animações de scroll. Telas menores, janelas baixas, movimento reduzido e navegadores sem view timelines recebem o hero em fluxo normal.

O título entra em três linhas com intervalos de 100 ms no desktop. No celular, conserva quebra natural e conteúdo estático. A vitrine passa a uma faixa lateral com o próximo painel parcialmente visível no desktop e um projeto por largura no celular, barra de rolagem disponível e controles de 48 px. Não há autoplay, rotação automática ou fotografia fictícia.
