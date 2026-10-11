# WebCrypt — decisões de implementação

## Contexto confirmado
Projeto inicialmente novo. Node 22.23.2 disponível. Em 10/10/2026 foram recebidos e inspecionados dois JPEGs reais: símbolo e logo horizontal WebCrypt. Os demais materiais citados no briefing não estão disponíveis. WebCrypt substitui FluxoTech. Tio Panda concluído (informação do responsável). Mercadog e Tio Panda permanecem rascunhos sem telas antigas. Retomada e evidências: `continuidade.md`.

## Direção antes de implementar
Conceito: engenharia digital protegida. Hero assimétrico, título à esquerda e circuito em perspectiva à direita; área de soluções em lista interativa, processo horizontal, manifesto de segurança e artigos em composição editorial. Evitar uma grade de cartões uniforme. O verde conduz ações e sinais gráficos, sem estatísticas decorativas. Layout próprio; nenhuma biblioteca de componentes copiada.
Atualização visual com a marca real: decisões vigentes em `direcao-visual.md`; procedência e resolução em `recursos-visuais.md`. As descrições abaixo registram a base inicial e não substituem essa direção atualizada.
Tokens: fundo #080A08, superfície #151A16, texto #F3F5F0, secundário #ADB5A8, acento #B5F52B, borda #30392C. Fonte sans geométrica local quando disponível, fallback Arial; monoespaçada apenas nos identificadores técnicos. Escala de espaço 4/8/12/16/24/32/48/64/96. Foco 2px lima com 5px offset. Cantos 4px em ações, 16px em superfícies; diagrama com geometria própria. Movimento 160–600ms, abertura 2,6s, reduced-motion sem movimento. Rolagem nativa (requisito do usuário prevalece sobre a recomendação Lenis da skill).

## Arquitetura
Next.js App Router + React + TypeScript; SSR para conteúdo/SEO, ilhas cliente somente nas interações. CSS próprio e SVG, sem WebGL/vídeo obrigatório. Conteúdo tipado versionado sem MDX remoto ou CMS desnecessário. Rascunhos visíveis somente em desenvolvimento, páginas retornam 404 em produção. Sem cadastro, senhas, painel administrativo ou analytics.

Contato: API limitada e validada; SQLite em volume persistente privado para hospedagem Node de instância única; AES-256-GCM por registro, chaves somente no servidor. Sem volume/chaves/configuração explícita, responde 503 sem fingir entrega. Vercel não recebe gravações em disco efêmero: contato desativado nesse ambiente. Integração gerenciada futura requer armazenamento durável real e revalidação. Notificações por outbox; indisponibilidade não perde contato já persistido. Acesso operacional por CLI local do servidor e permissões de sistema operacional, sem rota pública de leitura.

## Fronteiras e testes autorizados pelo briefing
Navegação/browser, POST /api/contato, armazenamento durável e outbox. Testes sintéticos de sucesso, validação, duplicação, abuso, falha de notificação, indisponibilidade e acesso negado. As fronteiras já foram especificadas explicitamente pelo usuário; não é necessária nova aprovação.

## Hospedagem e lacunas
A descoberta Vercel Marketplace (storage e messaging) falhou por DNS/rede na implementação inicial. Nenhum recurso provisionado. CLI sinalizada pelo ambiente como 60.1.3: recomenda-se atualizar com `npm i -g vercel@latest` (63.1.2 indicada nesta retomada) antes de usar. Nenhum domínio, titularidade ou registro de marca verificado. Publicação depende de responsável legal, canais, política revisada, destino durável e validação visual. Os JPEGs reais já foram recebidos; vetores oficiais ainda faltam. SITE_PUBLISHED=false por padrão. Configuração, scheduler, retenção e recuperação em `operacao.md`; avaliação parcial ASVS e riscos em `seguranca-verificacao.md`.
