# Recursos visuais da WebCrypt

## Marca recebida e utilizada

| Recurso | Origem fornecida pelo responsável | Arquivo público | Resolução nativa / tamanho | Uso |
| --- | --- | --- | --- | --- |
| Símbolo W, escudo, cadeado e circuitos | `WhatsApp Image 2026-10-09 at 15.46.04.jpeg` | `/brand/webcrypt-symbol-original.jpg` | 1.024 × 1.024 px / 87.577 bytes | Hero, abertura e aplicação decorativa de segurança |
| Logo horizontal e assinatura | `WhatsApp Image 2026-10-09 at 15.46.05.jpeg` | `/brand/webcrypt-logo-original.jpg` | 992 × 555 px / 43.875 bytes | Cabeçalho, rodapé e imagem de compartilhamento |

Ambos foram visualizados antes do uso. As cópias públicas preservam integralmente os arquivos de origem. Não houve retoque, interpolação, reconstrução da marca ou geração por IA.

Refinamento de 11/10/2026: a apresentação da logo horizontal recebe `contrast(1.7) brightness(1.08)` antes da composição `screen`, para eliminar o fundo cinza do JPEG na interface. Os arquivos continuam originais; esse tratamento CSS não cria transparência no arquivo. Órbitas SVG próprias passam a compor o hero com o símbolo, sem redesenhar a marca.

O logotipo horizontal tem espaço excedente no JPEG. O componente `Brand` usa um enquadramento CSS com proporção 622:192, aproximadamente na região x=200–822/y=189–381 da imagem, sem alterar o arquivo. As bordas escuras integram-se à superfície por composição CSS. O símbolo mantém a imagem original e seu brilho; o enquadramento de apresentação não acrescenta detalhe à fonte.

## Recursos da aplicação

| Recurso | Implementação | Procedência e limites |
| --- | --- | --- |
| Circuitos periféricos do hero | SVG inline, oito traços com sinais CSS | Geometria decorativa própria; não é uma reconstrução do símbolo nem uma simulação de proteção real |
| Abertura | Nome em texto acessível + JPEG do símbolo + CSS | Representação visual de criptografia; não descreve uma função criptográfica do site |
| Ícone do navegador | `src/app/icon.svg` | Contêiner SVG com o JPEG original embutido; viewport recorta apenas margens. Recurso raster, sem promessa de nitidez vetorial |
| Compartilhamento social | `src/app/opengraph-image.tsx`, saída 1.200 × 630 px | Composição feita na aplicação com os dois JPEGs reais e texto Sora; não é arte nativa em 4K |
| Sora 400/500 | `/fonts/sora-regular.ttf`, `/fonts/sora-medium.ttf` | Fontes locais já presentes; licença em `/fonts/Sora-OFL.txt` |
| Ilustrações de serviços e estudos de caso em preparação | CSS e HTML existentes | Diagramas de apresentação. Não são capturas reais de Mercadog ou Tio Panda |

A proposta vetorial antiga `symbol-proposal.svg`, incompatível com o símbolo recebido, foi removida. Não foi criada outra marca alternativa.

## Desempenho e acessibilidade

Os dois arquivos de identidade somam 131.452 bytes e são reutilizados por URL, com dimensões explícitas. O uso de `unoptimized` mantém as fontes fornecidas; nesta entrega não há variantes retocadas ou ampliadas. O hero limita o campo gráfico a 660 px CSS. A interface continua presente sem a animação.

Não há vídeo, biblioteca 3D, áudio automático ou renderização contínua de canvas. Os sinais pausam fora do viewport e com a aba oculta. Movimento reduzido conserva a apresentação estática. As marcas dos links têm nomes acessíveis; as repetições decorativas usam texto alternativo vazio.

## Pendências

- Arquivos vetoriais oficiais do símbolo e logotipo, para nitidez independente da escala e redução do custo do favicon.
- Capturas atualizadas e conteúdo confirmado de Mercadog e Tio Panda antes de publicar os estudos de caso.
- Os cinco outros mockups citados no briefing não foram usados nesta execução porque não estavam disponíveis como arquivos locais identificados.
- Higgsfield não foi usado para gerar imagens ou vídeos nesta revisão; não houve consumo de créditos pela execução visual.

Capturas de navegador e resultados de validação devem ser consultados nas evidências da entrega; este catálogo descreve origem e implementação, sem afirmar testes que não foram executados.

## Substituição do hero — 11/10/2026

O símbolo JPEG deixou o hero e a marca d'água de segurança. A abertura mantém o símbolo oficial; cabeçalho/rodapé preservam a logo horizontal. Novo recurso: SVG inline original com três planos isométricos de software, preenchimentos e traços próprios; recurso vetorial decorativo sem tela de cliente, contadores ou promessa de proteção. Capas dos projetos são composições tipográficas identificadas como apresentações em preparação.
