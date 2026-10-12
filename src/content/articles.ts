export type Article = {
  slug: string;
  title: string;
  description: string;
  category: 'Produto' | 'Segurança' | 'Processo';
  minutes: number;
  status: 'draft' | 'published';
  cover: { src: string; alt: string; width: number; height: number; phone?: boolean };
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
  sources: { label: string; url: string }[];
};

export const articles: Article[] = [
  {
    slug: 'pwa-ou-aplicativo-nativo',
    cover: { src: '/projects/pandavip/home.webp', alt: 'Tela inicial do aplicativo PandaVip em um celular', width: 1170, height: 2532, phone: true },
    title: 'PWA ou aplicativo nativo: como decidir pelo produto',
    description: 'Um roteiro para escolher a experiência móvel a partir das tarefas, dos dispositivos e das restrições reais do projeto.',
    category: 'Produto',
    minutes: 5,
    status: 'draft',
    sections: [
      {
        heading: 'Comece pelo trabalho que a pessoa precisa fazer',
        paragraphs: [
          'A escolha entre uma aplicação web progressiva (PWA) e um aplicativo nativo costuma aparecer cedo demais na conversa. Antes de escolher tecnologia, descreva quem vai usar o produto, qual tarefa precisa concluir e em que condições essa tarefa acontece. Uma equipe em campo com conexão irregular tem necessidades diferentes de alguém que consulta um catálogo pelo navegador. Uma experiência que depende de câmera, localização ou notificações também pede uma análise diferente de uma ferramenta de leitura.',
          'Transforme essas situações em jornadas observáveis: como a pessoa entra, o que precisa consultar, o que altera, o que acontece quando a rede cai e como retoma o trabalho. Defina quais etapas são essenciais e quais são conveniências. Esse mapa evita uma decisão baseada somente no desejo de aparecer em uma loja ou na impressão de que uma opção sempre custa menos.'
        ]
      },
      {
        heading: 'O que uma PWA pode oferecer',
        paragraphs: [
          'Uma PWA usa tecnologias da web e pode reunir recursos como instalação no dispositivo, links compartilháveis e operação com conexão intermitente. O navegador continua sendo uma forma de acesso, o que pode reduzir o atrito para descobrir e testar o produto. Mas a sigla não transforma automaticamente qualquer site em uma boa experiência móvel: é preciso desenhar telas, navegação e estados para esse contexto.',
          'A operação offline exige decisões explícitas. Um service worker pode armazenar recursos e responder a solicitações quando não há rede; isso não significa que todos os dados estarão disponíveis nem que uma ação pendente será enviada com sucesso. Conteúdo antigo, conflito entre edições e falha na sincronização precisam de mensagens e regras. A disponibilidade de APIs e da instalação varia entre navegadores e sistemas. Se uma função for decisiva, valide-a nos dispositivos reais antes de fechar a arquitetura.',
          'A web tende a ser uma candidata forte quando o fluxo deve começar por um link, funcionar em diferentes tamanhos de tela e receber atualizações sem exigir que cada pessoa instale uma nova versão. Ainda assim, desempenho, armazenamento local, permissões e uso em segundo plano devem ser medidos no cenário do produto, não presumidos a partir do nome PWA.'
        ]
      },
      {
        heading: 'Quando o nativo merece prioridade',
        paragraphs: [
          'Um aplicativo nativo pode ser a melhor base quando a experiência depende profundamente de recursos e padrões de uma plataforma, integração específica com o sistema ou trabalho offline que precisa de uma camada de dados local bem definida. A documentação do Android, por exemplo, trata o modo offline como uma decisão da camada de dados: funções críticas precisam continuar úteis sem uma conexão confiável. Isso vale como critério de produto, não como promessa automática de qualquer aplicativo instalado.',
          'O nativo também traz trabalho contínuo: distribuição, diretrizes da loja, revisões, compatibilidade com versões do sistema e manutenção das experiências em cada plataforma escolhida. Avalie esse compromisso junto ao benefício esperado. Publicar em uma loja não resolve, por si só, descoberta, retenção ou qualidade da interface. Da mesma forma, uma PWA não está descartada apenas porque existe interesse em notificações ou instalação; a viabilidade depende do recurso exato e do ambiente de uso.'
        ]
      },
      {
        heading: 'Faça a decisão com uma prova pequena',
        paragraphs: [
          'Registre os requisitos que podem eliminar uma opção: dispositivos atendidos, funções de hardware, expectativa offline, forma de distribuição e requisitos de segurança e acessibilidade. Em seguida, construa uma prova curta do fluxo mais arriscado. Teste a tarefa em aparelhos representativos, com rede lenta e sem rede, e observe instalação, permissões, tempo de resposta e recuperação de erro. Compare também o esforço de evolução do produto, não apenas a primeira entrega.',
          'Se as duas opções atenderem aos requisitos, escolha a que deixa mais simples entregar e manter a experiência essencial. Essa decisão pode ser revista quando o uso real mostrar novas restrições. O importante é documentar o que foi testado e o que permanece hipótese: assim, a tecnologia acompanha o produto em vez de definir o produto antes de conhecer seus usuários.'
        ]
      }
    ],
    sources: [
      { label: 'MDN: O que é uma PWA', url: 'https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/What_is_a_progressive_web_app' },
      { label: 'MDN: Operação offline e em segundo plano', url: 'https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Offline_and_background_operation' },
      { label: 'Android Developers: Aplicativo offline-first', url: 'https://developer.android.com/topic/architecture/data-layer/offline-first' },
      { label: 'Apple Developer: Diretrizes da App Store', url: 'https://developer.apple.com/app-store/guidelines/' }
    ]
  },
  {
    slug: 'seguranca-desde-a-arquitetura',
    cover: { src: '/media/security-tests.webp', alt: 'Resultado dos testes automatizados do formulário de contato da WebCrypt', width: 2400, height: 1500 },
    title: 'Segurança desde a arquitetura, não só no fim do projeto',
    description: 'Como transformar dados, identidade e limites de acesso em decisões verificáveis antes de publicar uma plataforma.',
    category: 'Segurança',
    minutes: 5,
    status: 'draft',
    sections: [
      {
        heading: 'Desenhe primeiro o que precisa ser protegido',
        paragraphs: [
          'Segurança não começa com uma lista de ferramentas. Começa ao identificar dados, pessoas, permissões e caminhos pelos quais uma informação circula. Um formulário público, uma área administrativa e uma integração externa não têm o mesmo nível de confiança. Desenhar essas fronteiras revela perguntas que o layout sozinho não responde: quem pode criar um registro, quem pode vê-lo, quem pode alterá-lo e o que acontece quando uma conta perde acesso.',
          'Faça um inventário enxuto: dados coletados, finalidade, prazo de retenção, serviços que recebem informações e operações críticas. Para cada operação, descreva o resultado permitido e um caso que deve ser negado. Essa disciplina também ajuda a reduzir coleta desnecessária. Quanto menos dado sensível o produto precisa guardar, menor a superfície que precisa proteger e explicar.'
        ]
      },
      {
        heading: 'Identidade não é autorização',
        paragraphs: [
          'Saber quem fez uma requisição não basta para decidir o que essa pessoa pode fazer. A autorização precisa considerar o recurso específico e o contexto da ação. Um usuário autenticado pode ter acesso ao próprio pedido e não ao pedido de outra pessoa; um operador pode consultar dados sem poder alterar regras de cobrança. Essa decisão deve ser aplicada na camada que entrega ou modifica os dados, inclusive quando a interface esconde um botão.',
          'Escreva uma matriz simples com papéis ou relações, recursos e ações. Depois teste os dois lados: o acesso legítimo e uma tentativa de acessar um identificador alheio. Não confie em campos enviados pelo cliente para definir propriedade ou privilégios. Se houver múltiplos clientes, a regra precisa continuar válida para todos eles. Uma interface correta não compensa uma API que aceita uma operação indevida.'
        ]
      },
      {
        heading: 'Converta riscos em critérios de aceite',
        paragraphs: [
          'O OWASP Application Security Verification Standard (ASVS) reúne requisitos de verificação para aplicações web e oferece uma base para discutir rigor conforme o risco. Ele ajuda a sair de frases vagas, como “o sistema deve ser seguro”, para controles que podem ser examinados. Não é um selo que aparece porque uma biblioteca foi instalada; a conformidade depende de evidência sobre a aplicação inteira e do nível escolhido.',
          'Na arquitetura, defina onde entradas são validadas, onde permissões são verificadas, como segredos são armazenados e como falhas são comunicadas sem expor informações internas. Planeje registros úteis para investigar abuso, com cuidado para não copiar senhas, tokens ou dados pessoais para logs. Pense também em recuperação: revogar acesso, corrigir uma configuração e restaurar dados precisam ser possíveis sem improviso durante um incidente.',
          'As prioridades mudam com o produto. Uma página de conteúdo público e uma plataforma que processa dados confidenciais não pedem a mesma profundidade de controle. O ponto comum é tornar visíveis as decisões e os responsáveis. Uma dependência atualizada ou uma varredura automática cobre apenas parte da história; abuso de regras de negócio e acesso entre usuários exigem testes específicos.'
        ]
      },
      {
        heading: 'Verifique durante a construção',
        paragraphs: [
          'Inclua casos de segurança no desenvolvimento normal: um teste para a ação permitida, outro para a mesma ação sem permissão e uma revisão quando um novo tipo de dado entra no fluxo. Ao mudar uma integração, confirme quais credenciais ela usa e qual é o menor acesso necessário. Em um lançamento, confira configuração, proteção dos pontos públicos, mensagens de erro e procedimentos de resposta; depois continue monitorando mudanças relevantes.',
          'Essa abordagem não promete risco zero. Ela produz decisões rastreáveis e falhas mais fáceis de identificar antes que se tornem incidentes. Segurança desde a arquitetura significa que confiança e limites de acesso fazem parte do contrato do produto. Eles são discutidos, implementados e testados junto com cada função, em vez de serem acrescentados quando a interface já parece pronta. Quando o produto muda, revise a matriz de acesso e os fluxos de dados: uma nova tela pode expor uma informação antiga a outro público. Mantenha a evidência dessa revisão junto dos critérios de aceite.'
        ]
      }
    ],
    sources: [
      { label: 'OWASP: Application Security Verification Standard (ASVS)', url: 'https://owasp.org/projects/asvs' },
      { label: 'W3C WAI: Planejamento de acessibilidade em projetos', url: 'https://www.w3.org/WAI/planning-and-managing/plan/' }
    ]
  },
  {
    slug: 'da-necessidade-a-entrega-de-uma-plataforma',
    cover: { src: '/projects/tio-panda/cardapio.webp', alt: 'Cardápio online do site Tio Panda', width: 2400, height: 1500 },
    title: 'Da necessidade à entrega de uma plataforma',
    description: 'Um percurso prático para definir o problema, reduzir incertezas e entregar uma primeira versão que possa ser avaliada.',
    category: 'Processo',
    minutes: 5,
    status: 'draft',
    sections: [
      {
        heading: 'Entenda a necessidade antes de listar telas',
        paragraphs: [
          'Uma ideia costuma chegar como solução: “precisamos de um painel”, “queremos um aplicativo” ou “o atendimento precisa ser automatizado”. O primeiro trabalho é descobrir o que motivou esse pedido. Que tarefa hoje demora demais? Quem sofre com o problema? Como ela é feita agora e qual consequência aparece quando falha? Conversas com pessoas que executam o trabalho, observação do processo e exemplos de casos reais dão uma base melhor que uma lista solta de funcionalidades.',
          'Escreva a necessidade em termos de resultado verificável. Por exemplo: permitir que uma pessoa encontre o andamento de uma solicitação sem telefonar. Isso ainda não decide se a resposta virá por página pública, área autenticada ou mensagem. A formulação mantém espaço para comparar caminhos. Registre também restrições conhecidas: orçamento, prazo, equipamentos, integrações, acessibilidade e quem poderá usar cada dado.'
        ]
      },
      {
        heading: 'Desenhe o primeiro fluxo completo',
        paragraphs: [
          'Escolha a menor jornada que entrega valor do começo ao fim. Mapeie entrada, ação principal, confirmação, erro e retorno posterior. Uma plataforma que cria registros, mas não permite encontrá-los depois, ainda não fechou o ciclo. Priorizar um fluxo inteiro ajuda a revelar permissões, mensagens, dados obrigatórios e responsabilidades entre sistemas.',
          'Faça protótipos leves quando uma interação for incerta e mostre-os a quem realmente fará a tarefa. Observe onde a pessoa hesita e quais termos não reconhece. Uma aprovação visual não prova que o fluxo funciona; peça que a pessoa execute uma tarefa com um objetivo concreto. Anote o que mudou no desenho e por quê. Essa evidência é mais útil que acumular telas bonitas sem decisão de produto.'
        ]
      },
      {
        heading: 'Transforme decisões em uma entrega verificável',
        paragraphs: [
          'Antes de desenvolver, defina critérios de aceite para o caminho principal e seus desvios. Que dado é necessário? Quem tem acesso? O que a pessoa vê quando não há resultados, quando o serviço demora ou quando uma ação falha? Quais informações devem ser preservadas? Perguntas assim conectam produto, design e engenharia e evitam que uma lacuna apareça apenas na demonstração final.',
          'Acessibilidade participa desse processo desde os primeiros desenhos. O W3C recomenda planejar responsabilidades e avaliar páginas e componentes cedo e regularmente. Isso inclui texto compreensível, navegação por teclado, foco visível e alternativas para conteúdo não textual. Segurança segue lógica parecida: um requisito de acesso só é completo quando há uma forma de verificar tanto a ação permitida quanto a negada. O ASVS oferece uma referência para organizar controles técnicos em aplicações web.',
          'Implemente em partes que possam ser demonstradas e revistas. Mantenha dados de teste separados de informações reais e confira as integrações com os responsáveis por cada lado. Ao encontrar um comportamento inesperado, corrija o fluxo antes de ampliar o escopo. Uma primeira versão útil pode ter poucos recursos; ela precisa, porém, lidar honestamente com estados vazios, erros e limites conhecidos.'
        ]
      },
      {
        heading: 'Entregar inclui observar e ajustar',
        paragraphs: [
          'A publicação é uma etapa, não a medida final de sucesso. Antes dela, confirme o percurso principal em dispositivos relevantes, revise conteúdo e permissões, prepare recuperação de falhas e registre o que ainda depende de validação. Depois, observe se as pessoas conseguem concluir a tarefa e quais dúvidas aparecem. Métricas devem responder a perguntas do produto, como abandono de um passo ou tempo para resolver uma solicitação, sem coletar mais dados do que o necessário.',
          'Uma boa passagem para operação identifica quem recebe problemas, como um erro é relatado e quais mudanças exigem nova verificação. Com essas informações, a próxima decisão deixa de ser uma aposta sobre o que parece atraente e passa a responder ao uso real. O caminho da necessidade à entrega, portanto, é um ciclo de entender, testar, construir e aprender. A tecnologia tem valor quando sustenta esse ciclo e torna a tarefa das pessoas mais simples. Registrar hipóteses e critérios de sucesso permite conferir, depois da entrega, se o problema original foi realmente reduzido.'
        ]
      }
    ],
    sources: [
      { label: 'W3C WAI: Planejar acessibilidade', url: 'https://www.w3.org/WAI/planning-and-managing/plan/' },
      { label: 'W3C WAI: Implementar e avaliar continuamente', url: 'https://www.w3.org/WAI/planning-and-managing/implement/' },
      { label: 'W3C WAI: WCAG 2 em resumo', url: 'https://www.w3.org/WAI/standards-guidelines/wcag/glance/' },
      { label: 'OWASP: Application Security Verification Standard (ASVS)', url: 'https://owasp.org/projects/asvs' }
    ]
  }
];
