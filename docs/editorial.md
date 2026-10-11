# Política editorial

Os três artigos em `src/content/articles.ts` são rascunhos completos em português. `status: 'draft'` permanece até revisão editorial e técnica: conferir clareza, precisão, links, direitos de uso e adequação à voz da WebCrypt. Nenhum texto deve sugerir que uma recomendação geral descreve práticas já executadas pela empresa. As fontes em cada artigo são referências para afirmações técnicas, não endossos da WebCrypt.

Os projetos em `src/content/projects.ts` também permanecem como rascunhos. Mercadog tem conclusão não confirmada. Tio Panda tem conclusão confirmada pelo usuário, mas isso não confirma escopo, tecnologias, resultados, depoimentos ou autorização para publicar imagens. Capturas novas de ambos estão pendentes: só adicionar arquivos e textos alternativos após obter material real, autorização de uso e conferir que nenhuma imagem revela dados pessoais ou sensíveis. Não reutilizar capturas encontradas sem confirmação de origem e licença.

Modelo para completar cada projeto, quando houver evidência aprovada:

1. **Contexto e necessidade:** problema, público e restrições confirmados.
2. **Solução e participação da WebCrypt:** entregáveis e responsabilidades comprovados.
3. **Experiência:** telas reais, estados importantes e decisões de interface verificáveis.
4. **Resultado:** apenas indicadores ou efeitos autorizados e sustentados por evidência; omitir a seção se não houver dados.

Enquanto esses dados faltarem, `sections` e `screenshots` ficam vazios. Para publicar um projeto, revisar o texto com o responsável, validar cada captura e então alterar `status` para `published`. O campo `completion` registra somente a confirmação da conclusão e não controla publicação.

Fontes consultadas para os artigos: [MDN — PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/What_is_a_progressive_web_app), [MDN — operação offline](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Offline_and_background_operation), [Android Developers — offline-first](https://developer.android.com/topic/architecture/data-layer/offline-first), [Apple Developer — App Review](https://developer.apple.com/app-store/guidelines/), [OWASP — ASVS](https://owasp.org/projects/asvs), [W3C WAI — planejamento](https://www.w3.org/WAI/planning-and-managing/plan/), [W3C WAI — implementação](https://www.w3.org/WAI/planning-and-managing/implement/) e [W3C WAI — WCAG em resumo](https://www.w3.org/WAI/standards-guidelines/wcag/glance/).
