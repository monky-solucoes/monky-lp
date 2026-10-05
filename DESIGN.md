---
name: Monky Soluções
description: Site empresarial predominantemente claro com identidade roxa Monky.
colors:
  roxo: "#632ca6"
  roxo-escuro: "#351451"
  roxo-claro: "#eee4f8"
  texto: "#211a2c"
  texto-suave: "#655e6e"
  fundo-suave: "#f8f7fa"
  borda: "#e7e3eb"
  borda-marca: "#cdb7e3"
  branco: "#fff"
  texto-sobre-roxo: "#e0d0ee"
typography:
  display:
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "clamp(2.3rem, 4vw, 3.45rem)"
    fontWeight: 750
    lineHeight: 1.18
    letterSpacing: "-.04em"
  headline:
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "clamp(1.65rem, 2.55vw, 2.25rem)"
    fontWeight: 720
    lineHeight: 1.18
    letterSpacing: "-.03em"
  title:
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "1.15rem"
    lineHeight: 1.18
    letterSpacing: "-.015em"
  body:
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    lineHeight: 1.6
  label:
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: ".9rem"
    fontWeight: 650
    lineHeight: 1.35
rounded:
  tab: "6px"
  filter: "7px"
  control: "8px"
  dialog-mobile: "10px"
  card: "12px"
  panel: "14px"
  circle: "50%"
spacing:
  inline-sm: "8px"
  inline: "12px"
  grid: "22px"
  content: "24px"
  card: "28px"
  section-mobile: "48px"
  section: "72px"
components:
  button-primary:
    backgroundColor: "{colors.roxo}"
    textColor: "{colors.branco}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "12px 22px"
  button-primary-hover:
    backgroundColor: "{colors.roxo-escuro}"
  button-secondary:
    backgroundColor: "{colors.branco}"
    textColor: "{colors.texto}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "12px 22px"
  button-secondary-hover:
    backgroundColor: "{colors.roxo-claro}"
    textColor: "{colors.roxo}"
  button-light:
    backgroundColor: "{colors.branco}"
    textColor: "{colors.roxo-escuro}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "12px 22px"
  button-demo:
    backgroundColor: "transparent"
    textColor: "{colors.roxo}"
    rounded: "{rounded.control}"
    padding: "12px"
  button-hero-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.branco}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "12px 22px"
  filter:
    backgroundColor: "{colors.branco}"
    textColor: "{colors.texto-suave}"
    rounded: "{rounded.filter}"
    padding: "8px 19px"
  filter-selected:
    backgroundColor: "{colors.roxo}"
    textColor: "{colors.branco}"
  navigation:
    backgroundColor: "{colors.branco}"
    textColor: "{colors.texto-suave}"
  solution-card:
    backgroundColor: "{colors.branco}"
    textColor: "{colors.texto}"
    rounded: "{rounded.card}"
    padding: "{spacing.card}"
  arrow-link:
    textColor: "{colors.roxo}"
  process-number:
    backgroundColor: "{colors.roxo}"
    textColor: "{colors.branco}"
    rounded: "{rounded.circle}"
    width: "48px"
    height: "48px"
---

# Design System: Monky Soluções

## Overview

**Creative North Star: "Site empresarial claro com identidade Monky"**

Site empresarial predominantemente claro, com navegação convencional, texto direto e roxo Monky como cor de ação. A identidade mantém a arte original da logo, exibida em preto por CSS, e a pilha tipográfica existente.

Superfícies brancas e cinza claro organizam o conteúdo com bordas discretas e cantos moderados. O banner roxo da Home e a chamada final escura são os contrastes de marca implementados; imagens existentes e ícones lineares acompanham o conteúdo. A página Como funciona acrescenta uma cena fictícia de conversa, identificada como imagem ilustrativa.

**Key Characteristics:**

- Fundos predominantemente claros e texto quase preto.
- Roxo em ações, estados ativos, ícones e áreas de marca.
- Logo original preta sobre a navegação clara.
- Cartões delimitados por bordas e espaçamento regular.
- Movimento restrito a transições curtas de estado.

Extraído da implementação em `src/styles/globals.css`, dos componentes compartilhados e das seções atuais em 03/10/2026. O contrato da superfície e sua composição estão em `docs/site-claro.md`; as restrições de marca estão em `PRODUCT.md`. Este documento registra o sistema implementado, sem propor novas decisões.

## Colors

A paleta combina roxo de marca com neutros levemente violetas.

### Primary

- **Roxo Monky** (`roxo`): botões principais, links, ícones e seleção de filtros.
- **Roxo profundo** (`roxo-escuro`): chamada final e hover do botão principal.
- **Lavanda clara** (`roxo-claro`): orientação, fluxos de automação e estados leves.
- **Texto lavanda sobre roxo** (`texto-sobre-roxo`): apoio textual no banner e na chamada final.

### Neutral

- **Texto escuro** (`texto`): títulos e conteúdo principal.
- **Texto suave** (`texto-suave`): parágrafos, navegação e notas.
- **Fundo suave** (`fundo-suave`): alternância de seções, rodapé e galeria do diálogo.
- **Borda clara** (`borda`): separação de superfícies e controles.
- **Borda de marca** (`borda-marca`): contorno mais presente nos cartões de solução e serviço.
- **Branco** (`branco`): fundo principal, cartões e texto sobre fundos roxos.

A seção de soluções da Home usa lavanda (`#f5effb`), cartões brancos e títulos roxo-escuro. A seção de projetos em destaque usa fundo branco.

O banner da Home usa o fundo existente `radial-gradient(circle at 78% 44%, rgba(126, 70, 255, .22), transparent 32%), linear-gradient(110deg, #12071d 0%, #251044 44%, #4b1d73 100%)`. Sobre o degradê, uma textura estática de pontos usa `radial-gradient(rgba(213, 190, 255, .2) .8px, transparent .8px)`, repetição de (22px) e máscara lateral. Esse tratamento pertence ao banner; não substitui os fundos claros das demais seções. O botão flutuante do WhatsApp mantém seu verde funcional (`#157b46`).

As rampas do sidecar são amostras auxiliares sintetizadas em OKLCH para o painel, não cores adicionais adotadas pela interface. Os valores normativos estão no frontmatter e no CSS.

## Typography

A mesma pilha Inter/sistema atende títulos, textos e controles. O código declara Inter e alternativas locais; não carrega uma webfont. Assim, a fonte efetivamente renderizada depende das fontes disponíveis no dispositivo. Não há uma razão modular única declarada.

- **Display:** H1 geral conforme frontmatter. O H1 das páginas internas usa `clamp(2.15rem, 3.8vw, 3.15rem)`.
- **Headline:** títulos de seção conforme frontmatter; há reduções locais nos cartões de serviços e na chamada final.
- **Title:** títulos de cartões; a prévia de projeto usa (1.2rem). O peso de H3 segue o estilo padrão do navegador.
- **Body:** entrelinha confortável; descrições de cartões usam (.94rem) ou (.91rem), enquanto introduções usam (1.04rem) ou (1.07rem).
- **Label:** botões têm peso semibold; navegação usa (.86rem, 600). Categoria de projeto usa (.76rem, 650).

Até (700px), o H1 da Home usa `clamp(2rem, 8.5vw, 2.9rem)` e o interno usa `clamp(2rem, 7.8vw, 2.8rem)`. Títulos usam quebra balanceada.

**The Identidade Preservada Rule.** Preservar a arte da logo e a pilha tipográfica existente; a exibição preta é aplicada por CSS.

## Layout

O contêiner tem largura máxima de (1180px), margens laterais mínimas de (32px) no desktop e (20px) até (700px). O ritmo principal de seções está no frontmatter.

Grades de soluções e projetos começam com três colunas; serviços usam duas. Projetos passam a duas colunas até (1050px). Até (700px), cartões e composições de texto usam uma coluna. Os valores na página Sobre usam duas colunas e passam a uma até (700px).

O cabeçalho mede no mínimo (92px), reduzido a (82px) até (960px), quando o menu passa a expansível. Em (1100px), espaçamentos e logo ficam mais compactos. A logo tem largura base de (152px), mantendo proporções; o rodapé usa (138px).

O diálogo ocupa até (1400px), preservando (20px) de margem por lado no desktop e (8px) no mobile. Galeria e coluna lateral de (300px) empilham até (960px). Capas de projeto e prévias de automação usam proporção (8:5). As imagens usam `object-fit: contain`, sem distorção nem corte de conteúdo.

A Home mantém texto e dominós em duas colunas; o banner tem altura mínima de (560px), com arte a (112%) e margem esquerda de (-2%) no desktop. Até (960px), a altura mínima passa a (450px); até (700px), a arte volta a (100%) após texto, ações e orientação, com limite de (430px). A introdução das soluções ocupa até (78ch), seguida dos exemplos práticos de cada cartão.

A abertura de Como funciona divide texto e foto em (1.1fr/.9fr), com intervalo de (70px). A foto é quadrada, passa a (4:5) até (960px) e volta ao quadrado na composição empilhada até (700px). Cada etapa alinha número, explicação e resultado em três colunas; até (960px), o resultado fica abaixo da explicação.

Sobre combina texto e assinatura de marca em duas colunas, seguidos por manifesto e valores. Até (700px), a composição vira uma coluna. O rodapé usa preenchimento vertical de (28px/18px) e três áreas no desktop; links de navegação ficam em duas colunas. No mobile, as áreas empilham e os links ficam em três colunas, mantendo os alvos de (44px).

## Elevation & Depth

A profundidade é principalmente tonal, com bordas finas. Cartões de serviço são planos; cartões de solução usam sombra discreta (`0 6px 18px rgba(53, 20, 81, .06)`). Cartões de projeto têm sombra leve (`0 5px 15px rgba(35, 20, 51, .025)`); a navegação mobile aberta usa `0 14px 22px rgba(33, 26, 44, .07)`.

O diálogo usa `0 24px 80px rgba(25, 13, 40, .22)` sobre backdrop `rgba(25, 16, 36, .62)`. O atalho flutuante de WhatsApp usa `0 6px 18px rgba(17, 55, 33, .17)`. Não há elevação animada dos cartões. Os dominós recebem `drop-shadow(0 22px 26px rgba(12, 5, 20, .25))`; o painel de automação usa `0 8px 24px rgba(40, 20, 62, .09)`. Ambos são tratamentos locais.

## Shapes

Controles, filtros, cartões e painéis usam os raios extraídos no frontmatter. Bordas recorrentes têm (1px). Números de processo e botão flutuante são circulares. Ícones lineares usam `currentColor`, traço (1.9), terminações e junções arredondadas. Nos blocos de solução e serviço, usam caixa roxa de (56px), raio de cartão e símbolo branco de (29px) com traço (2).

A logo usa o arquivo existente `public/images/monky-logo.png`, sem placa de fundo; `filter: brightness(0)` a exibe em preto no cabeçalho e rodapé claros.

## Components

### Buttons

O botão base tem altura mínima de (48px), conteúdo centralizado e espaço de (10px) entre texto e ícone. Há quatro variantes compartilhadas: roxo, secundário contornado, claro e demonstração transparente. O botão de demonstração dentro do cartão usa texto menor (.84rem).

O hover do roxo escurece; o secundário recebe borda roxa e fundo lavanda; o claro recebe `#efe6fa`; demonstração recebe fundo lavanda. No banner, o secundário tem texto branco, borda `#a48abc` e hover `rgba(255, 255, 255, .1)`.

As transições de cor, fundo e borda duram (.16s), com easing CSS padrão. A preferência de movimento reduzido remove essas transições e a rolagem suave. Não existe um tratamento visual próprio de `:active` declarado.

**The Foco Visível Rule.** Controles interativos mantêm contorno de foco visível; sobre o banner roxo, o contorno é branco.

O foco geral usa contorno (`3px solid #8950c5`) com afastamento de (4px). Links contextuais têm altura mínima de (44px) e sublinhado no hover.

### Filters

Filtros têm altura mínima de (44px), borda clara e texto suave. O estado selecionado usa fundo roxo e texto branco; `aria-pressed` expressa a seleção. O hover destaca a borda.

### Cards / Containers

Cartões de solução usam ícone branco em superfície roxa, borda de marca e preenchimento base do frontmatter. Em (1050px), o preenchimento cai para (22px); em (700px), usa (24px). Cartões de serviço usam (32px), reduzidos a (26px) no mobile.

Os cartões de solução incluem uma área “Na prática”, separada por borda superior, com dois exemplos e ícones de confirmação. O espaço superior é de (24px), com preenchimento de (18px) após a divisória; itens usam (.82rem) e entrelinha (1.5).

Cartões de projeto mantêm a imagem ou painel compacto de automação acima do texto, com conteúdo interno de (24px) e ações abaixo. O título, resumo, categoria e identificação como exemplo permanecem legíveis. A trilha do carrossel ocupa toda a largura da janela, permitindo que os cartões vizinhos saiam pelas laterais enquanto o conteúdo editorial continua alinhado ao contêiner. Não há estado de hover ou foco no cartão estático; as ações internas recebem esses estados.

### Navigation

Cabeçalho branco com logo preta, links de navegação e contato. A rota atual usa texto roxo e sublinhado de (2px) no desktop. No menu mobile aberto, recebe fundo lavanda e cantos discretos. O menu fecha ao navegar, clicar fora ou usar Escape; Escape retorna o foco ao acionador.

### Demonstration Dialog

Diálogo nativo com cabeçalho fixo durante a rolagem interna e botão de fechar (44px). A abertura concentra o foco no fechamento; Escape e clique no backdrop fecham o diálogo. Ao fechar, o foco retorna ao botão que abriu a demonstração. Seletores de tela usam `aria-pressed`. As automações exibem dados fictícios em painéis HTML, com status, campos, registro de execução e prévia de aviso interno; os botões avançam ou reiniciam as etapas. O painel informa que nenhum aviso foi enviado. A versão compacta da capa omite campos, registro e aviso, mantendo origem, identificação, assunto e status.

O painel usa superfície branca, borda discreta, raio de (10px) e barra de título com selo “Exemplo”. Os acentos locais distinguem atendimento, financeiro e pedidos: roxo, verde (`#26624b`) e azul (`#34598c`). São cores dos cenários demonstrados, sem ampliar a paleta global da marca. A conclusão recebe fundo verde suave e rótulo textual. Os campos são uma lista descritiva em três colunas, empilhada até (700px), não um formulário.

### Process

Etapas usam círculos roxos com números brancos tabulares, explicação e uma caixa lavanda que explicita o resultado esperado. Divisórias horizontais separam as linhas; a antiga linha vertical entre os círculos está desativada nessa variante detalhada. Cada resultado combina ícone de confirmação, título e detalhe.

A abertura inclui `public/images/conversa-monky.png`, cena fictícia criada com image_gen para humanizar a página. O rótulo “Imagem ilustrativa” fica visível sobre a foto; uma legenda branca usa degradê escuro para leitura. O prompt está registrado em `docs/conversa-monky-prompt.txt`. A imagem não representa equipe ou cliente real.

### Brand Signature

Na página Sobre, o mascote existente (`public/images/monky-mascote.png`) acompanha “Menos rotina. Mais resultado.” sobre painel roxo-escuro. O bloco tem raio de (14px), preenchimento de (40px) e altura mínima de (350px); no mobile, o preenchimento passa a (30px) e a altura é natural. Os valores usam ícones em caixas lavanda de (48px), com texto ao lado e divisórias inferiores.

Não há formulário de entrada de dados no site atual; nenhum padrão de campo ou validação é definido aqui. Os snippets do sidecar representam a aparência dos componentes, sem reproduzir a lógica React.

## Do's and Don'ts

### Do:

- Do preservar a arte original da logo, sua exibição preta e a pilha tipográfica existente.
- Do manter a predominância clara e o banner roxo da Home solicitado pelo usuário.
- Do conservar foco visível, controles de pelo menos 44px e indicação semântica de estado.
- Do identificar projetos e automações como exemplos ou simulações.

### Don't:

- Don't adicionar neon, efeitos exagerados ou trocar a identidade visual aprovada.
- Don't apresentar demonstrações como clientes, resultados comprovados ou integrações reais.
- Don't usar imagens recortadas de modo a esconder conteúdo importante das prévias.
