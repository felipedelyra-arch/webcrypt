# Continuidade — WebCrypt

## Fonte de verdade

O prompt mestre integral está em [briefing-original.md](briefing-original.md), com os 13 tópicos reenviados em 10/10/2026. Retomadas devem ler esse arquivo e este registro, sem pedir ao responsável para enviar o briefing novamente. As instruções mais recentes do responsável prevalecem.

Orientação adicional recebida em 10/10/2026:

> o prompt novamente, deixe o salvo para continuar sempre a produção sem eu ter que mandar novamente. '/home/felipe/Downloads/WhatsApp Image 2026-10-09 at 15.46.04.jpeg''/home/felipe/Downloads/WhatsApp Image 2026-10-09 at 15.46.05.jpeg' use a logo e o nome real da startup. Abra no navegador para ver a produção! Use o astra para ser o desenvolvedor, o arquiteto, para que ele mande e ordene outros modelos para a produção em esforço maximo da produção. Use isso para economizar tokens e trabalhar por muito mais tempo para o site ficar incrivel

## Confirmado

- Nome: WebCrypt — Soluções Tecnológicas, substituindo FluxoTech.
- JPEG do símbolo: 1024 × 1024; JPEG horizontal: 992 × 555. Ambos foram abertos e inspecionados nesta sessão. O símbolo real é W/escudo/cadeado/circuitos; não corresponde ao SVG provisório anterior.
- Projeto Next.js 16.3.8, React 19.2.8, TypeScript e CSS próprio; manter stack, conteúdo real e rolagem natural.
- Tio Panda concluído conforme responsável. Telas novas e autorização/conteúdo de estudos de caso permanecem pendentes. Mercadog sem conclusão confirmada. Três artigos completos em rascunho.
- Prompt anterior também pede HorizonX como referência; ver [referencias-visuais.md](referencias-visuais.md).

## Execução desta retomada

- GPT-6 Astra chamado explicitamente com esforço `max` para marca, direção visual, hero e abertura. GPT-6 Sol com esforço médio para revisão independente. A sessão coordenadora não foi trocada por instrução textual.
- Antes das alterações foi copiada uma base em `/tmp/webcrypt-session-start`; o histórico Git não está acessível neste sandbox. Essa cópia é temporária, não backup permanente.
- Sem ferramenta de cota da assinatura Codex disponível. Higgsfield: consulta retornou 4 créditos/plano gratuito; nenhuma geração ou compra realizada.
- Primeiro `npm run dev` bloqueado pelo sandbox: `listen EPERM 127.0.0.1:3000`. Solicitado ao usuário iniciar o servidor no terminal do computador. Isso não autoriza ampliar permissões.

## Pendências externas

- Vetores oficiais para fidelidade e nitidez independente de resolução; manter os JPEGs originais até recebê-los.
- Endereço correto da FluxoTech: SafeGrowPA.com não acessível na consulta. Nenhum código do site anterior foi localizado nos nomes pesquisados do contexto autorizado.
- Empresa controladora, canal confirmado, domínio, hospedagem persistente e destinatário das notificações.
- Publicação/indexação somente após confirmar conteúdo e destino. Implementação atual de contato precisa de volume privado de instância Node única; fica desativada na Vercel.

Resultados finais e próximos passos serão registrados aqui após os checks, sem confundir código implementado com fluxo efetivamente executado.

## Retomada de validação — 10/10/2026

- Leitura do briefing, continuidade e direção visual realizada. Nenhuma alteração de interface nesta retomada.
- `npm run dev -- --hostname 127.0.0.1` novamente bloqueado por `listen EPERM` na porta 3000. Solicitado início de `npm run dev` no terminal do responsável, mantendo as permissões existentes.
- Chrome DevTools conectado; tentativa de abrir `http://localhost:3000` retornou `net::ERR_CONNECTION_REFUSED`. Inspeção visual e capturas ainda não executadas.
- `npm run check`: typecheck aprovado; lint sem erros, com dois avisos de diretivas eslint-disable desnecessárias em `src/app/opengraph-image.tsx`; testes aprovados (dois arquivos de teste).
- Build falhou em `Could not parse output from TypeScript's --showConfig`. Execução direta de `tsc --showConfig` retornou JSON válido; reprodução com `runTypeScriptCli` do Next retornou código 0 e stdout vazio. Causa ambiental suspeita, ainda não confirmada fora do sandbox. Build permanece não validado.
- Próximo passo: com o servidor iniciado fora do sandbox, abrir a URL no Chrome, inspecionar desktop/celular, abertura e navegação; executar o build fora do sandbox para comparar a falha.

### Correção do build nesta retomada

- A documentação instalada em `node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/useTypeScriptCli.md` confirma a alternativa de checagem pela API JavaScript do TypeScript.
- Alterado somente `next.config.ts`: `experimental.useTypeScriptCli: false`. O projeto usa TypeScript 5.9.3, que oferece essa API; a checagem de tipos permanece ativa. Nenhuma dependência alterada.
- `npm run build` concluído com código 0: compilação, TypeScript, geração de 15 páginas e traces concluídos. A falha anterior de leitura de `--showConfig` foi resolvida usando a opção suportada. A causa subjacente da saída vazia do subprocesso não foi estabelecida.
- O bloqueio de abertura da porta continua separado: sandbox retorna `EPERM`, não é erro de compilação nem ocupação da porta. Não há ferramenta local de preview com inicialização de servidor disponível nesta sessão. Navegador conectado, mas site ainda sem servidor acessível; validação visual continua pendente de início no terminal do responsável.

## Estado para reinício — 11/10/2026

- Nova execução do comando pedido pelo responsável, `npm run dev`, terminou com `listen EPERM 0.0.0.0:3000`.
- Nenhum processo `next dev` ou `next-server` encontrado por `pgrep`. Consulta de portas via `ss` também bloqueada: `Cannot open netlink socket: Operation not permitted`; não comprova disponibilidade da porta.
- Node instalado: v22.23.2. Correção do build preservada. Esta sessão não oferece ferramenta para reiniciar o próprio Codex ou ampliar as permissões do sandbox.
- Retomar após reinício do aplicativo/sessão ou início do servidor em terminal externo, verificar as permissões e a URL efetivamente acessível; nenhuma validação visual concluída até aqui.

## Retomada para leitura da preview — 11/10/2026

- Briefing, continuidade, direção visual e catálogo de recursos relidos; interface preservada nesta retomada.
- Inventário do navegador via CUA retornou `apps: []` e `browsers: []`. Chrome DevTools não listou páginas: perfil `/home/felipe/.cache/chrome-devtools-mcp/chrome-profile` já em uso. Nenhum processo do navegador foi encerrado.
- `npm run dev` voltou a falhar com `listen EPERM 0.0.0.0:3000`; não há servidor local iniciado por esta execução. URL da preview solicitada ao responsável, pois nenhuma aba ou URL de preview foi encontrada.
- `npm run check` concluído com código 0: tipos, lint, dois arquivos de testes e build aprovados. Lint mantém dois avisos de diretivas eslint-disable desnecessárias em `src/app/opengraph-image.tsx`.
- Leitura da preview, capturas desktop/celular e fluxos no navegador continuam pendentes. Checks locais não comprovam esses fluxos nem a operação do contato no destino.

## Diagnóstico e correção local — 11/10/2026

- Servidor Node mínimo sem Next.js reproduziu `listen EPERM` em porta automática (`0`) nos três endereços `127.0.0.1`, `0.0.0.0` e `::1`. A sessão executa sob sandbox com rede restrita, `Seccomp: 2` e `NoNewPrivs: 1`. Isso confirma uma restrição de execução anterior à aplicação; não é conflito específico da porta 3000. Permissões preservadas.
- Chrome DevTools voltou a conectar e listar páginas sem intervenção no perfil. Navegação real para `http://localhost:3000` executada duas vezes nesta investigação: `net::ERR_CONNECTION_REFUSED`. Não houve renderização do site, nem captura visual válida. Não se estabeleceu a causa específica da falha transitória de perfil.
- GPT-6 Sol, esforço médio (`sol_reviewer`), revisou abertura, cabeçalho e circuitos somente por código, em paralelo ao diagnóstico. Encontrou foco invisível ao encerrar/pular a abertura: `intro.tsx` foca o título e `home.css` removia seu contorno.
- Coordenador substituiu a remoção do contorno por `.hero h1:focus-visible` com contorno lima de 2 px e afastamento de 8 px. Removidas duas diretivas eslint-disable desnecessárias em `opengraph-image.tsx`; imagens e conteúdo preservados. Sol revisou a correção sem encontrar regressão demonstrável.
- `npm run check` após as alterações terminou com código 0: tipos, lint sem avisos, dois arquivos de testes e build aprovados (15 páginas geradas). Revisão de código não substitui teste de teclado no site.
- Tentativa de montar ensaio isolado de CSS em aba vazia foi cancelada antes de obter evidência; não contabilizada como validação de foco nem da preview.
- Diagnóstico e comando de início fora do sandbox documentados em `docs/operacao.md`. Pendência indispensável para validar a interface: servidor iniciado no terminal do computador ou URL de preview acessível. Permanecem pendentes desktop/celular, abertura e fluxos reais no navegador.

## Continuação autônoma — 11/10/2026

- Revisão independente do contato por GPT-6 Sol (`sol_reviewer`, médio) e verificação de conteúdo/rotas por GPT-6 Luna (`luna_helper`, baixo), somente leitura e sem novas delegações. Nenhum defeito demonstrável adicional reportado nesses escopos; isso não comprova fluxos em produção.
- Coordenador reproduziu uma falha no descarte da resposta de erro do provedor: teste `Response(ReadableStream, status 503)` falhou com `cancelled=false`. Em `flushNotifications`, movido o cancelamento do corpo para antes da verificação de status. Teste passou após a correção, com contato preservado e notificação pendente. Sol revisou esse diff mínimo, usando o trecho anterior registrado como base; Git segue indisponível.
- Evidências TAP atualizadas: 11 cenários de contato aprovados e teste de configuração ampliado para exigir HTTPS/proxy em produção e recusar disco local na Vercel. Dados sintéticos e diretórios temporários locais; nenhuma notificação real enviada.
- Busca dirigida por padrões de segredos e por referências às chaves/SQLite no bundle cliente sem correspondências. Nova auditoria npm falhou com DNS `ENOTFOUND`; não há aprovação de vulnerabilidades.
- Nova navegação real para `http://localhost:3000` ainda retornou `ERR_CONNECTION_REFUSED`. Validação visual permanece bloqueada pelo servidor ausente; não houve mudança de permissões, publicação ou compra de créditos.
- `npm run check` final concluído com código 0: tipos, lint sem avisos, testes e build aprovados. Saída salva em `docs/evidence/check-2026-10-11.log`. Os ensaios detalhados do contato/configuração estão nos arquivos TAP citados acima. Próxima etapa executável fora deste bloqueio: iniciar `npm run dev` no terminal do computador e validar abertura, teclado, navegação, desktop e celular pelo navegador conectado.

## Prévia renderizada e refinamento de marca — 11/10/2026

- Renderização real do build Next.js obtida com `getRequestHandler()` e streams HTTP em memória, sem abrir porta nem alterar permissões. Script reproduzível: `docs/evidence/ssr-request-harness.cjs`, com assertions de 18 respostas: páginas públicas, rascunhos inacessíveis, 404, métodos do contato, robots/sitemap e noindex. A CSP é verificada nas respostas HTML; não se trata de um servidor HTTP/TLS acessível no navegador.
- `docs/evidence/export-layout.cjs` incorpora CSS, fontes e JPEGs do build no HTML renderizado e remove scripts. `docs/evidence/home-offline.html` foi aberto no Chrome real. Inspeção de layout em 320, 360, 768, 1440, 1920 e 3840 px sem rolagem horizontal; fontes e imagens carregadas. Isso valida o layout estático, não hidratação, menu, abertura ou envio de contato. Tentativa de hidratação por `file:` não funcionou e foi descartada.
- Ajustados logo do cabeçalho em 320 px e quebras do título no celular. `npm run check` passou após esses ajustes; evidência: `docs/evidence/check-visual-2026-10-11.log`.
- Pedido mais recente do responsável: corrigir integração da logo com o fundo, aproveitar referências v0/21st.dev/HorizonX e remover aparência genérica/travessões. JPEGs originais preservados; contraste/brilho CSS antes de `screen` retiram os tons de fundo na apresentação. Não há PNG transparente nem vetor novo.
- Hero ganhou órbitas SVG e sinais de 18/24 segundos, reutilizando pausa, observação de visibilidade e movimento reduzido existentes. Removidos fragmentos decorativos, traço antes do subtítulo, falsa tela na chamada de projetos e frases de preenchimento. Sol Builder limpou separadores de texto/aria/metadados; Sol Reviewer revisou somente leitura e apontou duas ocorrências restantes, corrigidas pelo coordenador. Nenhum subagente criou agentes.
- `npm run check` após o refinamento passou com código 0: tipos, lint, testes e build. Evidência: `docs/evidence/check-refinement-2026-10-11.log`. Build adicional com as duas correções finais de texto também passou (código 0), registrado em `docs/evidence/build-final-2026-10-11.log`. Harness de 18 respostas aprovado novamente sobre a versão compilada.
- Capturas finais reais de viewport: `docs/evidence/home-desktop-1440.jpg`, `home-mobile-320.jpg` e `home-mobile-360.jpg`. O retângulo cinza da logo não aparece nessas capturas; conteúdo sem travessões e órbitas presentes. Métricas finais em `responsive-refinement-2026-10-11.json`. Ensaio CSS no Chrome confirmou `paused → running → paused` ao alternar manualmente a classe existente; não comprova botão React/IntersectionObserver na página hidratada.
- Limitações mantidas: servidor sem porta acessível devido a `EPERM`; interações completas e contato no provedor não validados no navegador; nenhuma publicação ou compra de créditos.

## Nova direção de movimento e vitrine — 11/10/2026

- Pedido atual: retirar logo gigante da home e profissionalizar movimento/projetos com referências HorizonX, v0, 21st.dev e endereço correto Safe Group. Briefing completo, continuidade e recursos lidos. Skills aplicadas: project-bootstrap, frontend-design, v0-design-inspiration, smooth-scroll (adaptada à exigência de rolagem natural), React best practices, revisão de código, web-design-guidelines e a11y-debugging para escopo de conferência.
- Hero substituído por composição SVG própria de três camadas: experiência, sistemas e dados. JPEG gigante retirado do hero e da marca d'água na segurança; marca oficial preservada no cabeçalho, rodapé e abertura. Entrada curta, planos com oscilação leve e sinais luminosos reutilizam pausa, IntersectionObserver, visibilidade da aba e reduced-motion existentes. Entrada de títulos por CSS view timelines com fallback estático. Sem dependências novas.
- Abertura ajustada para terminar no lado do símbolo do cabeçalho, pois o alvo antigo `.core-symbol` foi removido. Seu alinhamento final precisa de validação visual em execução; não tratado como aprovado.
- Vitrine reutilizada na home e /projetos, com painéis amplos, capas tipográficas e contexto disponível. Sem capturas fictícias, resultados ou tecnologias inventados. Rascunhos locais e bloqueio de produção preservados.
- Direção, hero e integração pelo coordenador da sessão atual. Agentes configurados `sol_builder` para vitrine e `sol_reviewer` para revisão de leitura, sem subdelegação. Não foi feita troca da sessão para Astra; nenhuma estimativa de cota ou compra.
- Base de comparação local em `/tmp/webcrypt-motion-before` (page.tsx, home.css, circuit.tsx e intro.tsx). Histórico Git permanece inacessível. Revisão independente não encontrou falha confirmada, mas destacou risco de alinhamento do merge da abertura ao recorte do JPEG; requer navegador.
- Servidor `npm run dev` inicialmente falhou com EPERM; execução escalada pela ferramenta autorizada iniciou o servidor em `http://localhost:3000` (sessão exec 86221). Preview local real em desenvolvimento, sem publicação. Não remover seus rascunhos antes da avaliação.
- Chrome renderizou a home real com nova arte em desktop. Safe Group foi visualmente inspecionado no hero e vitrine de cases, bem como previews v0/21st/HorizonX. As chamadas posteriores ao Chrome foram canceladas, incluindo conferência de viewport móvel; não há captura móvel nova validada, ensaio de teclado, pausa/retomada, abertura ou reduced-motion nesta revisão. Capturas anteriores não comprovam o novo estado.
- `npm run check` concluído com código 0: tipos, lint, dois arquivos de teste e build. Log: `docs/evidence/check-motion-2026-10-11.log`. Harness de 18 respostas concluído com código 0 sobre o build atual: `docs/evidence/routes-motion-2026-10-11.jsonl`. Harness atualizado ao novo estado vazio do portfólio e ampliado com assertions de ausência dos nomes dos rascunhos na home/portfólio em produção e retirada do hero antigo. Isso verifica HTML/rotas, não interação hidratada.
- Avaliação da direção solicitada ao responsável por pergunta assíncrona; resposta ainda pendente. Próximo passo: validar mobile/teclado/abertura/pausa no servidor acessível e incorporar feedback. Publicação aguarda aprovação visual e as pendências institucionais/operacionais já registradas.

## Referências HorizonX aplicadas — 11/10/2026

- Quatro URLs fornecidas pelo responsável abertas no Chrome: demo Immersive Robotics, Spiral Flux, Reel Flux e página Kai Rennard. Demo Kai Rennard também aberta e inspecionada. Seleção e limites documentados em `docs/referencias-visuais.md`, seção mais recente. Nada adquirido/exportado; nenhum asset ou código premium copiado.
- Implementação coordenada na sessão atual: capítulo curto de montagem vinculado à rolagem nativa, planos de software aproximando-se, contorno integrando as camadas e entrada do título em três linhas. Somente desktop >=900px e janela >=800px, com suporte a view timelines e sem movimento reduzido. Celulares, janelas baixas e browsers sem suporte conservam fluxo normal. Controle de pausa congela também montagem de scroll. Sem novas dependências.
- Sol Builder implementou rail de projetos em `project-showcase.tsx/.css` e `project-rail.tsx`, com scroll snap nativo, botões48px, teclado e foco que revela painel. Filtro SSR de rascunhos mantido. Sol Reviewer revisou somente leitura contra `/tmp/webcrypt-horizon-before`; levantou risco de capítulo fixo em janela menor que o hero. Coordenador elevou breakpoint de altura para800px e limitou arte à altura disponível. Controles reservam espaço para não deslocar painel na hidratação.
- Evidências de navegador em `docs/evidence/horizon-browser-checks.md`: montagem desktop, pausa/retomada, pausa fora da tela, limites dos botões do rail, navegação por teclado, foco no segundo case e ausência de overflow da página em320/360px. Home e portfólio inspecionados visualmente em desktop e360px, capturas mostradas na conversa. Arquivo de captura solicitado no workspace recusado pelo servidor MCP; captura adicional320px não concluída (chamada encerrada por demora). Nenhum caminho fora das permissões foi usado.
- `npm run check` final código0: tipos, lint, dois arquivos de testes e build. `docs/evidence/check-horizon-final-2026-10-11.log`. Primeira execução parou com143 antes de completar build; a execução final completa valida o código posterior. Harness18 respostas código0: `docs/evidence/routes-horizon-2026-10-11.jsonl`, com rascunhos bloqueados e validação de conteúdo novo.
- Preferência real de movimento reduzido não foi emulada pelas ferramentas; regras revisadas, mas teste de sistema ainda pendente. Sem ensaio físico de gesto móvel, medição Lighthouse ou validação do provedor. Tentativas finais de abertura/pulo aguardaram a ferramenta de navegador; atualizar evidência somente se obtiver retorno verificável.
- Preview continua local em `http://localhost:3000`, sem deploy. Marca gigante não voltou. Telas e resultados dos projetos continuam aguardando confirmação; capas tipográficas locais não são screenshots. Direção do responsável prevalece.

- Retorno final verificável do Chrome recebido: replay, pulo e restauração de foco aprovados por assertions; término natural aprovado após2800ms. Atualizado `horizon-browser-checks.md`. Alinhamento visual do merge do símbolo não conferido quadro a quadro. Viewport da prévia devolvido a1440×1000 e página ao topo para avaliação.
- Sol Reviewer conferiu os ajustes finais de altura, título/reduced-motion e reserva de espaço dos controles; não encontrou novo defeito demonstrável. Sua revisão permanece estática e complementar às execuções acima.

## Publicação autorizada — 11/10/2026

- Responsável pediu explicitamente: “publique quero ver como ficou”. Publicado na conta `felipedelyra-8717s-projects`, projeto novo `webcrypt`, link público **https://webcrypt.vercel.app**. Deploy final `dpl_C4Mgh5r4j1ZmhjcNhPZXLGtLdNte`, estado READY; URL imutável https://webcrypt-dagaywifs-felipedelyra-8717s-projects.vercel.app.
- CLI 60.1.3 autenticada; upgrade global recomendado, não executado. Primeiro deploy solicitado com `--target=preview`, mas a Vercel marcou a primeira publicação como production. Correção enviada explicitamente com `--prod` para atualizar o mesmo alias. SITE_PUBLISHED=false e CONTACT_ENABLED=false no build/runtime: sem indexação, sem recebimento e sem rascunhos. Isso não confirma domínio próprio nem operação institucional.
- `.vercelignore` protege arquivos internos, credenciais locais, docs, testes e scripts administrativos do upload. Lista de arquivos conferida antes do envio, sem `.aws`, `.codex`, `.agents`, `.env*` ou banco. Link da CLI criou `.env.local` com credencial OIDC, mantida fora do upload e do Git.
- Metadados usam SITE_URL quando configurada; fallback HTTPS de VERCEL_URL na plataforma e localhost localmente. Typecheck e teste das três configurações passaram fora do sandbox, que havia bloqueado subprocesso Node.
- Primeiro runtime falhou com ENOENT de `public/brand/webcrypt-logo-original.jpg`: leitura no topo do módulo Open Graph exigia arquivos não incluídos no pacote serverless. Corrigido com outputFileTracingIncludes restrito aos JPEGs de marca e à fonte Sora. Build local final código0 (`docs/evidence/build-deploy-2026-10-11.log`); assertions dos traces da home/contato/projetos/sobre aprovadas (`deploy-traces-2026-10-11.json`). Revisão independente somente leitura por GPT-6.1 Sol sem defeito demonstrável, complementar ao runtime.
- Build Vercel final aprovado. **28 verificações online aprovadas**: páginas públicas, assets JS/CSS/fontes, JPEGs, imagem Open Graph PNG, noindex/CSP, robots bloqueado, sitemap vazio, dois cases em rascunho404 e POST contato503. Evidência `docs/evidence/deploy-live-2026-10-11.json`; harness correspondente `deploy-live-check.mjs`.
- Chrome inspecionou o link público em1440×1000 e360×800; capturas reais mostradas na conversa. Home correta, controle de pausa/retomada e menu móvel responderam; largura móvel360 sem overflow; sem erros/avisos de console na navegação corrigida. Aba19 devolvida a desktop para avaliação.
- Limites: preferência real reduced-motion, gesto físico, Lighthouse, domínio próprio e fluxo real de contato não verificados. Cases/artigos aguardam revisão/material confirmado e continuam ocultos no link público; rail demonstrado anteriormente no ambiente local não aparece com catálogo público vazio.

## Redesign de movimento com Claude Code — 11/10/2026

- Pedido: landing mais tecnológica/futurista com animações de alta qualidade, referências HorizonX/21st.dev/v0, Opus 5.5 como arquiteto e modelos menores na implementação.
- Modelos realmente usados: Claude Opus 5.5 (coordenação, arquitetura, núcleo WebGL, integração, revisão); dois `implementer` Claude Sonnet (efeitos de resposta; diagramas de segurança/processo); `reviewer` Claude Opus (revisão do diff). Nenhuma geração paga; código dos componentes 21st.dev (pago) não foi obtido, apenas metadados das referências Particle Hero, Orbital Sphere, Scramble Text e Spotlight Card.
- Git inicializado localmente sem commit; a base anterior está no índice (`git diff` mostra o redesign).
- Novo hero: `cipher-field.tsx` (ADR `docs/adr/0001-hero-webgl-nativo.md`), título com decifração (`decrypt-text.tsx`), legendas e trilho de progresso do capítulo. `circuit.tsx` removido.
- Resposta: spotlight seguindo o ponteiro (`pointer-glow.tsx`, `effects.css`), marquee de capacidades, feixe na borda do CTA, pacotes de dados no fluxo de segurança, trilho e setas de teclado no processo.
- Verificado no Chrome (dev, localhost:3000): esfera, camadas e símbolo em 1440px; celular emulado 390×844 com CTA acima da dobra e sem rolagem horizontal; fallback CSS exercitado por um erro de shader corrigido. typecheck, lint e testes aprovados.
- Pendente: emulação real de prefers-reduced-motion, Lighthouse/INP com WebGL ativo, aparelho físico, deploy da nova versão (aguarda pedido do responsável).
- Revisão Opus: 1 alta (hero cortado em celulares baixos), 3 médias (scroll sem guarda de visibilidade, cópia invisível clicável, loops sem pausa fora da home), 7 baixas (shaders não liberados, CSS morto, rótulo do passo só por cor no celular). Todas corrigidas, exceto `loseContext` no unmount: incompatível com o Strict Mode reutilizando o canvas; os contextos são liberados pelo GC ao sair da home.
- Medido após correções: 320×568 e 360×640 com hero completo na tela, sem rolagem horizontal; cópia esmaecida não captura clique; pausa global alterna canvas e marquee. `npm run check` código 0: `docs/evidence/check-webgl-2026-10-11.log`.
