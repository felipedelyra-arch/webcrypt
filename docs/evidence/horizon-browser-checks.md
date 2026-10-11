# Verificações de movimento no Chrome — 11/10/2026

Ambiente: servidor Next dev real em http://localhost:3000, Chrome DevTools, dados locais e rascunhos. Capturas mostradas na conversa; gravação de screenshot no caminho do workspace recusada pela ferramenta, portanto não há arquivos de captura desta rodada. Capturas anteriores não são evidência da versão nova.

## Assertions executadas

- Desktop 1440 × 1000: hero com timeline `--assembly`; seção externa mede 1280 px. Em scrollY=480, hero top=0 e planos apresentam matrizes Y de 36, -20 e -76; contorno final opacity=1. Em scrollY=0, plano dados Y=0. Isso confirma montagem nativa vinculada à rolagem.
- Pausa pelo botão React: aria-pressed=true e três loops CSS pausados. O plano dados permaneceu Y=-76 após rolagem de 480 para 150. Assertion de congelamento passou. Retomada pelo botão executada.
- Após sair do hero para projetos, assertion confirmou ausência da classe `is-moving`, mantendo loops pausados fora da tela.
- Rail desktop: botão próximo chegou a scrollLeft=817 (máximo817), próximo desativado e anterior ativo. Botão anterior retornou a scrollLeft<=2. Assertions de limites passaram.
- Rail com foco: ArrowRight iniciou deslocamento nativo. Tab do link Mercadog ao link Tio Panda revelou o segundo painel no celular: scrollLeft=334, link inteiramente dentro do viewport. Assertion de link e limites visuais passou.
- Celular360×800: documentElement.scrollWidth=360 e innerWidth=360; hero position=relative. Hero e portfólio inspecionados visualmente.
- Celular320×800: documentElement.scrollWidth=320 e innerWidth=320; hero position=relative. Assertions de ausência de overflow passaram.

- Abertura pela ação React: replay abriu overlay; pulo o fechou e devolveu foco ao botão de replay. Assertions passaram. Replay adicional terminou naturalmente após2800ms; assertion de overlay hidden passou. Não comprova alinhamento visual do merge ao JPEG.

## Limitações

- A configuração real `prefers-reduced-motion` não foi emulada pela ferramenta; regras CSS/JS foram revisadas. Não apresentar como teste executado de preferência do sistema.
- Sem teste físico de gesto de arrasto em dispositivo móvel, sem auditoria Lighthouse ou métricas de campo nesta rodada.
- Um estado transitório em memória usado na inspeção (`window.__motionEvidence`) foi perdido após hot reload; a assertion de Tab foi repetida sem depender desse estado e passou. Não foi um defeito de navegação do site.
- Os ensaios em desenvolvimento não validam provedor de contato ou segurança da infraestrutura de produção.
