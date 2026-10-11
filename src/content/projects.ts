type Shot = { src: string; alt: string; device: 'desktop' | 'mobile'; width: number; height: number };
export type Project = {
  slug: string;
  name: string;
  kind: string;
  url?: string;
  note?: string;
  status: 'draft' | 'published';
  summary: string;
  completion: 'confirmed' | 'unconfirmed';
  screenshots: Shot[];
  sections: { heading: string; body: string }[];
};

const desk = (dir: string, file: string, alt: string): Shot => ({ src: `/projects/${dir}/${file}.webp`, alt, device: 'desktop', width: 2400, height: 1500 });
const mob = (dir: string, file: string, alt: string): Shot => ({ src: `/projects/${dir}/${file}.webp`, alt, device: 'mobile', width: 1170, height: 2532 });

export const projects: Project[] = [
  {
    slug: 'mercadog',
    name: 'Mercadog',
    kind: 'Site institucional',
    url: 'https://www.mercadog.com.br',
    status: 'published',
    completion: 'confirmed',
    summary: 'Site do petshop e clínica veterinária 24h de Tupã/SP: emergência, consultas, banho e tosa e loja reunidos num só lugar, com contato direto pelo WhatsApp.',
    screenshots: [
      desk('mercadog', 'home', 'Página inicial do site Mercadog com chamada para agendar consulta e banho e tosa'),
      desk('mercadog', 'servicos', 'Lista de serviços do Mercadog com disponibilidade de horários'),
      desk('mercadog', 'banho-tosa', 'Seção de banho e tosa com preços de referência e emergência 24 horas'),
      desk('mercadog', 'loja', 'Loja do Mercadog com produtos e preços'),
      mob('mercadog', 'mobile', 'Página inicial do Mercadog no celular')
    ],
    sections: [
      { heading: 'Contexto', body: 'O Mercadog reúne clínica veterinária com atendimento 24 horas, consultas, banho e tosa e loja de produtos no mesmo endereço, no centro de Tupã. O site precisava deixar claro, em poucos segundos, como chegar a cada um desses serviços.' },
      { heading: 'Solução', body: 'Uma página inicial organizada por serviço, com a emergência sempre à mão: o botão de atendimento 24h fica no topo e leva direto ao WhatsApp do veterinário. Banho e tosa e consultas têm páginas próprias para agendamento, e a loja apresenta produtos com preço e pedido finalizado pelo WhatsApp.' },
      { heading: 'Destaques', body: 'Próximos horários livres exibidos ao lado de cada serviço, preços de referência de banho e tosa, seção de emergência em destaque, localização com rota no Google Maps e versão para celular com as ações principais ao alcance do polegar.' }
    ]
  },
  {
    slug: 'tio-panda',
    name: 'Tio Panda',
    kind: 'Site institucional',
    url: 'https://www.tiopanda.com.br',
    status: 'published',
    completion: 'confirmed',
    summary: 'Site do restaurante de culinária oriental e steak house em Tupã/SP, com cardápio em destaque, rodízio, unidades e acesso rápido ao pedido online e ao WhatsApp.',
    screenshots: [
      desk('tio-panda', 'home', 'Página inicial do site Tio Panda com foto de pratos e botão para ver o cardápio'),
      desk('tio-panda', 'rodizio', 'Seção do rodízio do Tio Panda'),
      desk('tio-panda', 'cardapio', 'Pratos mais pedidos do Tio Panda'),
      desk('tio-panda', 'pandavip', 'Chamada para o clube PandaVip no site do Tio Panda'),
      mob('tio-panda', 'mobile', 'Página inicial do Tio Panda no celular')
    ],
    sections: [
      { heading: 'Contexto', body: 'O Tio Panda combina rodízio japonês, pratos à la carte e steaks, com salão, delivery e retirada, além da unidade Tio Panda Fast Box no Hiper Center. O site precisava transmitir o clima da casa e levar o cliente rápido ao pedido.' },
      { heading: 'Solução', body: 'Fotografia grande dos pratos, tipografia forte e um caminho curto até o pedido: o botão Fazer pedido acompanha a navegação, e a página apresenta o rodízio, os pratos mais pedidos, a localização e as formas de pedir. A escolha da unidade fica no topo.' },
      { heading: 'Destaques', body: 'Seção do rodízio com os diferenciais da casa, vitrine dos pratos mais pedidos, chamada para o clube PandaVip, mapa com endereço e versão para celular com pedido e WhatsApp em destaque.' }
    ]
  },
  {
    slug: 'pandavip',
    name: 'PandaVip',
    kind: 'Aplicativo Android e iOS',
    note: 'Telas da versão atual do aplicativo em modo de demonstração, com dados fictícios.',
    status: 'published',
    completion: 'confirmed',
    summary: 'Aplicativo do clube de vantagens do Tio Panda, desenvolvido em Flutter com Firebase: cardápio com pedido para entrega ou retirada, assinatura, prêmios e economia acumulada do sócio.',
    screenshots: [
      mob('pandavip', 'home', 'Tela inicial do PandaVip com economia acumulada e atalhos'),
      mob('pandavip', 'cardapio', 'Cardápio do PandaVip com combinados e preços'),
      mob('pandavip', 'prato', 'Detalhe de um prato com quantidade e observações'),
      mob('pandavip', 'premios', 'Prêmios liberados pelo restaurante no PandaVip'),
      mob('pandavip', 'planos', 'Assinatura do clube com benefícios'),
      mob('pandavip', 'login', 'Tela de acesso do PandaVip'),
      mob('pandavip', 'onboarding', 'Apresentação do PandaVip no primeiro acesso')
    ],
    sections: [
      { heading: 'Contexto', body: 'O PandaVip leva o relacionamento do Tio Panda com seus clientes para o celular: sócios do clube acompanham benefícios, resgatam prêmios liberados pelo restaurante e fazem pedidos sem sair do app.' },
      { heading: 'Solução', body: 'Aplicativo multiplataforma em Flutter, com Firebase no backend. A navegação por abas reúne início, cardápio, prêmios e perfil. A tela inicial mostra a economia acumulada e atalhos para pedido, plano e pedidos anteriores; no cardápio, cada prato aceita quantidade e observações.' },
      { heading: 'Destaques', body: 'Pedido com entrega ou retirada na unidade, assinatura mensal com benefícios, prêmios com validade e status de resgate, notificações e login com e-mail ou Google.' }
    ]
  }
];
