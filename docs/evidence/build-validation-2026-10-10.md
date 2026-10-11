# Build — 10/10/2026

Comando executado: `npm run build`.

Resultado: código de saída 0, Next.js 16.3.8 com webpack.

- Compilação concluída.
- Checagem TypeScript concluída, sem desativar a validação.
- Geração de 15 páginas concluída.
- Otimização e traces concluídos.

Correção: `experimental.useTypeScriptCli: false` em `next.config.ts`, alternativa documentada na versão instalada para usar a API JavaScript do TypeScript 5.9.3. O subprocesso CLI reproduziu saída vazia apesar de código 0; execução direta de `tsc --showConfig` havia retornado JSON válido.

Limite: servidor local bloqueado pelo sandbox (`listen EPERM 127.0.0.1:3000`); tentativa de acesso pelo Chrome retornou `ERR_CONNECTION_REFUSED`. Este resultado não comprova renderização, navegação nem contato no navegador.
