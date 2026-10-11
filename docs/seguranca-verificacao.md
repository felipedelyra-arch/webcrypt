# Segurança: escopo, evidências e lacunas

Data: 10/10/2026. Base consultada: [OWASP ASVS 5.0.0](https://owasp.org/projects/asvs), indicada como versão estável pela OWASP nesta consulta. Objetivo: requisitos aplicáveis ao fluxo de contato, visando nível 2. Esta matriz é um recorte verificável, **não avaliação integral nem certificação ASVS L2**. O [OWASP Top 10](https://top10.owasp.org/) orienta a análise de injeção, acesso indevido, configuração, criptografia e dependências; não substitui requisitos testáveis.

## Modelo de dados e confiança

Visitante não autenticado → navegador → proxy/hospedagem → API Node → volume privado cifrado → processador de outbox → receptor HTTPS da equipe. Leitura: operador autenticado no sistema operacional → CLI → chave do servidor → conteúdo. Nome, contato e descrição são restritos; ID/datas/estado são metadados operacionais. Logs devem conter somente códigos de erro, contagens e IDs quando necessários. A configuração do proxy, banco e receptor é confiável e não vem da requisição pública.

O cadastro é público, mas a leitura não é. A posse de um protocolo não autoriza consulta HTTP; não existe endpoint de leitura. O navegador não recebe chaves, conteúdo de outros contatos ou dados do SQLite. Comprometimento do servidor com acesso às chaves rompe essa fronteira; criptografia em repouso não evita isso. Sem E2EE, contas de clientes, pagamentos ou administração web.

## Matriz do recorte ASVS

| Requisito | Implementação/evidência | Estado e limite |
| --- | --- | --- |
| v5.0.0-1.2.1 / 1.2.3 | JSX escapa textos; API usa JSON; JSON-LD escapa `<`. Teste armazena carga XSS como texto. | Código revisado; execução de XSS no navegador ainda pendente. |
| v5.0.0-1.2.4 | Todas as operações SQLite com dados usam parâmetros. Teste com carga SQL preserva leitura. | Testado localmente, banco sintético. |
| v5.0.0-1.3.6 | URL da notificação vem apenas do ambiente do operador, HTTPS, redirecionamentos recusados. | Não aceita URL de visitante; destino real ainda não escolhido/verificado. |
| v5.0.0-2.1.3 / 2.2.1 / 2.2.2 | Lista fechada de campos/serviços, tipos e limites em `contact.mjs`; validação independente no servidor. | Casos de nome, contato, serviço, campo extra e honeypot testados. |
| v5.0.0-2.3.2 / 2.3.3 | Limites persistentes, transação dos buckets, INSERT durável, chave única de idempotência, recuperação do recibo. | Sucesso, repetição, conflito, limite e falha de armazenamento testados; limite por IP depende do proxy. |
| v5.0.0-3.4.3 / 3.4.4 / 3.4.5 / 3.4.6 | CSP com nonce nas páginas, `object-src none`, `base-uri none`, `frame-ancestors none`; política restritiva na API JSON; nosniff e referrer em configuração. | Código implementado nas páginas/API; recursos estáticos excluídos do proxy não têm CSP. Cabeçalhos no destino ainda não verificados. |
| v5.0.0-3.5.2 / 3.5.3 | POST JSON, origem exata, header de idempotência; não há CORS aberto. | Origem indevida e formato recusados em teste. Não é autenticação nem filtro contra clientes fora do browser. |
| v5.0.0-11.1.1 / 11.1.2 / 11.2.2 | Inventário e procedimento de chaves em `operacao.md`; key ID por registro permite leitura após troca da chave ativa. | Parcial: custódia real, recifragem, recuperação e rotação operacional não exercitadas. |
| v5.0.0-11.2.1 / 11.2.3 / 11.3.2 / 11.3.3 | `node:crypto`, AES-256-GCM com tag e AAD; HMAC-SHA256 separado para limites/recibos. | Chave incorreta e tag adulterada recusadas em teste; texto não aparece em claro no arquivo sintético. |
| v5.0.0-12.1.1 / 12.1.2 / 12.2.1 / 12.2.2 | Contato em produção exige origem HTTPS; notificações HTTPS; HSTS condicionado à URL. | TLS, certificados, cifra e proxy dependem do destino; não verificados. |
| v5.0.0-14.1.1 / 14.1.2 / 14.2.4 | Classificação acima, volume externo privado, política de 90 dias, CLI restrita, metadados mínimos nas notificações. | Diretório externo aceito, caminhos internos/symlinks recusados, exclusão e expiração testadas; operação/backups pendentes. |
| v5.0.0-14.2.1 / 14.3.2 / 14.3.3 | Dados no body, resposta `no-store`, sem conteúdo do formulário em local/sessionStorage. | Código revisado; caches de infraestrutura ainda não verificados. |

Referências consultadas para os identificadores: [V1](https://github.com/OWASP/ASVS/blob/v5.0.0/5.0/en/0x10-V1-Encoding-and-Sanitization.md), [V2](https://github.com/OWASP/ASVS/blob/v5.0.0/5.0/en/0x11-V2-Validation-and-Business-Logic.md), [V3](https://github.com/OWASP/ASVS/blob/v5.0.0/5.0/en/0x12-V3-Web-Frontend-Security.md), [V11](https://github.com/OWASP/ASVS/blob/v5.0.0/5.0/en/0x20-V11-Cryptography.md), [V12](https://github.com/OWASP/ASVS/blob/v5.0.0/5.0/en/0x21-V12-Secure-Communication.md), [V14](https://github.com/OWASP/ASVS/blob/v5.0.0/5.0/en/0x23-V14-Data-Protection.md).

Não aplicáveis ao produto atual: requisitos de senha própria/recuperação/MFA web (sem contas), tokens de sessão autenticada/OAuth (sem login), upload/XML/LDAP/LaTeX (sem parsers ou endpoints), pagamentos (sem transação financeira), WebRTC (sem mídia em tempo real). Identidade de operadores, permissões do SO e provedor continuam no escopo operacional. Os demais requisitos não enumerados ainda não têm avaliação exaustiva.

## Cenários MITRE ATT&CK

| Cenário | Prevenção implementada | Detecção/resposta a configurar |
| --- | --- | --- |
| [T1190 — Exploit Public-Facing Application](https://attack.mitre.org/techniques/T1190/) | Validação, SQL parametrizado, payload limitado, ausência de leitura pública e erro genérico. | Monitorar 4xx/5xx sem body, atualizar dependências, preservar evidência restrita e desativar contato em incidente. |
| [T1499 — Endpoint Denial of Service](https://attack.mitre.org/techniques/T1499/) | Corpo 24 KiB, leitura 5 s, buckets persistentes, limite global, envio de notificação com timeout. | Proxy com limite de conexões, WAF/CDN, alarmes de disco e latência. Não configurados nem teste de carga executado. |

ATT&CK descreve cenários, não certificação. O proxy deve sobrescrever `X-Real-IP` e impedir acesso direto ao Node. Outbox precisa de agendamento e monitoramento: o sucesso do POST significa armazenamento durável, não leitura pela equipe nem entrega da notificação.

## Evidências e riscos residuais

- `docs/evidence/contact-tests.tap`: 11 cenários, reexecutados em 11/10/2026, incluindo injeção sintética, cifragem adulterada, acesso com chave errada, repetição, limite, falha de provedor, exclusão e retenção. A regressão de resposta HTTP 503 do provedor foi reproduzida antes da correção: o corpo permanecia aberto. Agora é cancelado, sem marcar a notificação como enviada nem perder o contato.
- `docs/evidence/contact-config-tests.tap`: banco privado externo, rejeição de caminhos internos/symlinks e condições de produção (HTTPS, proxy confiável e recusa de disco local na Vercel). Reexecutado em 11/10/2026.
- Busca dirigida por padrões de chaves privadas, AWS, Stripe e GitHub em src/public/scripts/tests/docs e `.env.example` não encontrou correspondências. É inspeção limitada, não scanner completo de segredos nem revisão do histórico Git.
- `npm audit --omit=dev --json` falhou com DNS `ENOTFOUND registry.npmjs.org`. Dependências **não foram aprovadas por auditoria de vulnerabilidades**.
- SQLite é experimental no Node usado. Arquitetura atual limita-se a uma instância com volume durável; não escala horizontalmente com disco local.
- Hospedagem, chaves reais, receptor, scheduler, backup, restauração, logs, permissões do operador, controle de rede e revisão jurídica ainda não validados. Não habilitar coleta pública enquanto essas dependências permanecerem ausentes.

Em 11/10/2026, a busca dirigida foi repetida sem correspondências para padrões de chaves privadas, AWS e GitHub em src/public/scripts/tests/docs e `.env.example`; também não encontrou referências a `CONTACT_KEY_V1`, `CONTACT_RATE_KEY`, `CONTACT_NOTIFY_TOKEN` ou `node:sqlite` em `.next/static`. Isso não é auditoria completa de segredos. Nova tentativa de `npm audit --omit=dev --json` falhou novamente com `ENOTFOUND registry.npmjs.org`; vulnerabilidades das dependências continuam sem verificação pelo registry.
