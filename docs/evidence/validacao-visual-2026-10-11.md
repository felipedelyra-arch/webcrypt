# Validação do refinamento visual

Build Next.js final aprovado, após check completo de tipos, lint e testes. As 18 assertions do harness de rotas passaram. Nenhuma porta local foi aberta: o sandbox continua recusando `listen` com `EPERM`.

## Reprodução

```sh
npm run build
node docs/evidence/ssr-request-harness.cjs
node docs/evidence/export-layout.cjs
```

Abrir `home-offline.html` no navegador. O arquivo contém HTML renderizado pelo Next.js, CSS, fontes locais e imagens originais incorporadas. Scripts foram retirados; é uma prévia de layout. Não usar para testar menu, formulário, seleção de serviços ou abertura.

## Evidências finais

- [Desktop de 1440 px](home-desktop-1440.jpg)
- [Celular de 320 px](home-mobile-320.jpg)
- [Celular de 360 px](home-mobile-360.jpg)
- [Métricas em seis larguras](responsive-refinement-2026-10-11.json)
- [Check completo](check-refinement-2026-10-11.log)
- [Build final](build-final-2026-10-11.log)
- [Respostas de rotas](routes-2026-10-11.log)

Marca integrada ao fundo escuro sem retângulo cinza. Órbitas e circuitos presentes. Imagens carregadas e ausência de rolagem horizontal em 320, 360, 768, 1440, 1920 e 3840 px. O cabeçalho de 320 px mantém 20 px até a borda direita.

Ensaio do CSS orbital no Chrome: estado inicial `paused`, com classe `is-moving` manualmente adicionada `running`, depois `paused` ao removê-la; duração do primeiro sinal 18 s. Isso valida o CSS, não a lógica React de pausa e visibilidade. Movimento reduzido foi revisado no código, sem emulação de preferência do sistema nesta execução.

O JPEG da logo continua original; contraste/brilho e composição `screen` removem visualmente o fundo na interface escura. Não existe conversão para PNG com transparência ou vetor. As referências previamente inspecionadas estão documentadas em `../referencias-visuais.md`; tentativas de novas capturas das abas externas ficaram sem resposta e foram interrompidas. Nenhum recurso pago foi adquirido.

Permanecem sem validação integrada: hidratação, abertura por sessão, controle pelo botão, teclado no site hidratado, fluxo do contato com provedor e configuração de produção/TLS. O contato desativado retorna indisponível; os ensaios não enviaram mensagens reais.
