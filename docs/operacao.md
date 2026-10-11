# Executar e operar a WebCrypt

## Desenvolvimento e verificação

Use Node compatível com `package.json` (verificado nesta sessão: 22.23.2). Após `npm ci`, execute `npm run dev` e abra `http://localhost:3000`. O servidor de desenvolvimento mostra artigos e projetos em rascunho; `npm run build` seguido de `npm start` oculta esses conteúdos. Os comandos de tipos, lint, testes e build estão em `package.json` (`npm run check`).

O formulário fica indisponível sem configuração válida. Para um ensaio local, use dados sintéticos, `SITE_URL=http://localhost:3000`, `CONTACT_TRUST_PROXY=false` e um diretório temporário privado externo ao projeto. Nunca reutilize banco ou credenciais de produção para ensaios. Não publique esse banco temporário.

### Quando a preview não inicia

Nesta sessão de 11/10/2026, `listen EPERM` foi reproduzido também com um servidor Node mínimo em porta automática (`0`), nos endereços `127.0.0.1`, `0.0.0.0` e `::1`. A sessão está sob sandbox com rede restrita e filtro seccomp. O bloqueio independe do Next.js e da porta 3000; trocar porta, instalar dependências ou alterar a interface não corrige essa restrição.

Com as permissões atuais, iniciar o servidor no terminal do computador:

```sh
cd '/home/felipe/Área de trabalho/WebCrypt'
npm run dev
```

Manter esse terminal aberto e acessar `http://localhost:3000`. `ERR_CONNECTION_REFUSED` no navegador indica que nenhum servidor aceitou a conexão nesse endereço. O Chrome DevTools voltou a listar páginas nesta retomada sem excluir locks ou encerrar processos; o erro anterior de perfil em uso não persistiu, mas sua causa específica não foi estabelecida.

## Destino do contato

Implementação atual: uma instância Node, SQLite em volume persistente, diretório canônico absoluto externo ao site e sem links simbólicos. Diretório `0700`, arquivo `0600`, pertencentes ao usuário da aplicação. Não colocar o banco em `public`, no repositório, num volume efêmero ou num caminho servido por HTTP. A aplicação recusa configuração Vercel. Migrar para serviço gerenciado requer decisão de hospedagem e nova integração; nenhum serviço foi provisionado.

As variáveis estão em `.env.example`. Gerar duas chaves independentes de 32 bytes criptograficamente aleatórios, codificadas em Base64: `CONTACT_KEY_V1` cifra mensagens; `CONTACT_RATE_KEY` produz HMACs para limite e idempotência. Injetar pelo gerenciador de segredos/ambiente do servidor, nunca por `NEXT_PUBLIC_*`, Git, console de navegador ou linha de comando compartilhada. `CONTACT_KEY_ID=v1` escolhe a chave de gravação. A amostra não contém valores reais.

Em produção, `SITE_URL` deve ser HTTPS e `CONTACT_TRUST_PROXY=true`. O proxy precisa **substituir**, não anexar ou confiar no `X-Real-IP` enviado pelo cliente. Restrinja a porta Node ao proxy; o `npm start` escuta apenas loopback por padrão. TLS, CDN, WAF e proteção DDoS são responsabilidades do destino e ainda não foram verificados. Limite também conexões, corpo e tempo no proxy: a aplicação limita JSON a 24 KiB, leitura a 5 s e envios a 10/IP/h e 100 globais/h; isso não equivale a proteção DDoS.

## Dados e acesso

Visitante → POST JSON same-origin → validação → SQLite cifrado → recibo. O sucesso só sai depois do INSERT durável. O navegador retém texto somente em memória; `sessionStorage` é usado apenas pela abertura. O contato não vai na URL e a resposta usa `Cache-Control: no-store`.

Nome, e-mail/telefone, empresa, serviço e mensagem são dados restritos à equipe autorizada. No banco, o conteúdo é cifrado com AES-256-GCM (nonce aleatório de 12 bytes, AAD vinculada ao ID e versão de chave). IDs, datas, estado da notificação e HMACs são metadados operacionais protegidos pelas permissões do volume. O servidor com a chave pode ler os dados: não é E2EE. Não há painel/login próprio nem rota HTTP de leitura; acesso administrativo exige conta autorizada no sistema operacional e chaves do servidor.

Com o ambiente secreto já injetado, o operador pode executar:

```sh
node scripts/contact-admin.mjs list
node scripts/contact-admin.mjs get UUID
node scripts/contact-admin.mjs delete UUID
node scripts/contact-admin.mjs prune
node scripts/contact-admin.mjs notify
```

`get` imprime dados pessoais: usar terminal privado, sem captura em logs compartilhados. `list` lista os primeiros 50 contatos **ainda não notificados** e suas datas, e remove expirados; não é uma caixa de entrada completa nem um sistema de atendimento. O receptor de notificações precisa preservar os IDs para a equipe consultar. Exclusão remove o registro do banco ativo; backups e metadados retidos no receptor têm procedimento próprio.

## Agendamento obrigatório antes da ativação pública

`notify` é um processador de outbox. O site não dispara um trabalho de fundo sem garantia após responder ao visitante. Configure `CONTACT_NOTIFY_URL` com um endpoint HTTPS controlado pela equipe e `CONTACT_NOTIFY_TOKEN` no servidor. O envio leva somente `{id}` e `Idempotency-Key`; o receptor deve deduplicar e disponibilizar o ID à equipe. Erros deixam o item pendente, para a próxima execução.

Configure um agendador supervisionado no destino, sob o usuário da aplicação, com ambiente secreto injetado, diretório de trabalho do app e **sem execuções sobrepostas**:

- `node scripts/contact-admin.mjs notify`: a cada minuto. Cada lote tem até 50 itens e cada tentativa pode levar 5 s; o agendador deve aguardar o término antes de repetir.
- `node scripts/contact-admin.mjs prune`: diariamente, inclusive sem tráfego no site.
- Monitoramento externo: alertar falha do processo, ausência de execução por 5 minutos, disco próximo do limite e `pending > 0` persistente. O exit code de `notify` sozinho não comprova entrega: falhas individuais são refletidas em `pending`.

Executar teste sintético até o receptor real antes de habilitar `CONTACT_ENABLED=true`: confirmar persistência, notificação, deduplicação, leitura restrita e exclusão; interromper o receptor e comprovar recuperação. Esse agendador, receptor e monitoramento **ainda não foram configurados**. Enquanto não houver destino/operador, manter o formulário desativado em produção.

## Retenção, backup e chaves

Proposta implementada: 90 dias para solicitações e 1 hora para buckets de abuso. `prune` faz remoção física no banco ativo, com `secure_delete`; leitura/notificação também ignoram contatos expirados se o agendador atrasar. O prazo e a política precisam ser confirmados pelo responsável e pela revisão de privacidade. Exclusão em SQLite não garante apagamento físico em SSD, snapshots ou backups.

Antes de backup, suspenda as gravações e o processador de notificações, feche a aplicação e copie o banco consistente para armazenamento cifrado e privado. Guarde cópia das chaves separada do banco, com controle de acesso e recuperação documentados. Defina retenção de backups e registro restrito de exclusões; numa restauração, reaplique exclusões e `prune` antes de abrir o serviço. Teste restauração em ambiente isolado, sem enviar notificações reais. Backup, restauração e agendamento não foram exercitados num destino de produção.

Rotação normal: gere `CONTACT_KEY_V2`, conserve `CONTACT_KEY_V1`, altere `CONTACT_KEY_ID=v2` e reinicie. Novos contatos usam v2; leitura seleciona a chave pelo registro. Remova chaves antigas somente quando não houver registros/backups dependentes. Não há migração automática de recifragem. Em comprometimento, desative o recebimento, preserve evidência restrita, revogue credenciais, avalie exposição e implemente recifragem/recuperação antes da reabertura. Rotacionar `CONTACT_RATE_KEY` invalida a continuidade dos HMACs de idempotência e limite; requer janela controlada e análise dos reenvios pendentes.

## Publicação

Antes de `SITE_PUBLISHED=true`: confirmar domínio, titularidade, dados da controladora, canais, privacidade, logo e conteúdo publicado; executar os fluxos no destino. Publicações para avaliação devem continuar com `SITE_PUBLISHED=false`; rascunhos ficam fora de produção independentemente dessa opção.

Em11/10/2026, publicação explicitamente autorizada pelo responsável e executada na Vercel: https://webcrypt.vercel.app, projeto `webcrypt` em `felipedelyra-8717s-projects`. Deploy final READY `dpl_C4Mgh5r4j1ZmhjcNhPZXLGtLdNte`, ambiente production da plataforma com SITE_PUBLISHED=false e CONTACT_ENABLED=false no build/runtime. A primeira publicação foi marcada production pela plataforma apesar do destino preview solicitado. Contato permanece indisponível; integração e ativação não foram autorizadas por esse pedido visual. Checks online e limites em `docs/continuidade.md` e `docs/evidence/deploy-live-2026-10-11.json`.

Se o destino escolhido for Vercel, recomendo atualizar a CLI instalada antes de usá-la: `npm i -g vercel@latest` (o ambiente sinalizou 60.1.3 → 63.1.2). A atualização não foi executada. O contato atual exige outro armazenamento durável para funcionar nessa plataforma.
