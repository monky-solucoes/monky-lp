# Alterações desta versão

- Header atualizado para a nova logo Monky Soluções.
- Favicon preservado sem alterações.
- Vídeo `monky-header.mp4` aplicado ao hero e substituído suavemente pelo frame final estático ao terminar.
- Frase atualizada para: **Menos complicação. Mais resultado.**
- Cards de soluções agora levam a exemplos reais da página.
- Cards de projetos continuam abrindo WhatsApp ao clicar no card, com mensagem específica do projeto.
- Botão “Ver projeto” abre o modelo navegável.
- 10 projetos com imagens próprias e telas diferentes por aba.
- Modal dos projetos ajustado para não deixar a faixa branca inferior.
- Abas navegáveis também no mobile, com rolagem horizontal dos controles.
- Novas telas realistas para OficinaPro, CaixaPilot, CarNext, Luxo Automotivo, Nexora CRM, Roteza, DropZone, AçaíWave, Lumière e VitaCare.
- Imagens e assets antigos não utilizados foram removidos para reduzir o tamanho do projeto.

Validação: `npm run typecheck` executado sem erros. O `next build` não pôde ser concluído no ambiente porque o Next tentou baixar o pacote SWC da internet.

## Ajustes de 19/09/2026 — cards e demonstrações

- Removido o seletor **Computador / Celular** das demonstrações; por enquanto os projetos abrem somente com a imagem desktop.
- Removidos a moldura de navegador e o cabeçalho artificiais dentro da demo desktop, porque as imagens já possuem navegador e cabeçalho próprios e estavam aparecendo duplicados.
- Modal desktop limitado à altura da janela: card, abas e imagem ficam contidos na tela, sem o card ultrapassar o cabeçalho e sem rolagem vertical do modal.
- Adicionados botões anterior/próximo visíveis no carrossel de projetos no desktop.
- O carrossel agora avança automaticamente também no desktop a cada 8 segundos, pausa após interação manual e volta ao primeiro projeto após o último.
- O banner principal manteve o mesmo tamanho; apenas o bloco de texto foi deslocado para a direita e os botões foram posicionados um pouco mais abaixo no desktop.

## Ajuste final — carrossel, demos e hero
- Carrossel circular com card central e vizinhos aparentes à esquerda e à direita no desktop e mobile.
- Navegação manual ficou imediata (sem a rolagem suave lenta); autoavanço continua ativo.
- Clique em qualquer card/preview abre a demo; WhatsApp fica apenas nos CTAs de conversa.
- Modal das demos ajustado para não cortar o conteúdo no desktop nem no mobile.
- CTA do modal no mobile simplificado para “Conversar sobre isso”.
- Hero preserva o tamanho do banner, move “Do problema à solução” para a direita e baixa os dois botões.

## 19/09/2026 — revisão de fluidez do carrossel e Explore demo

- O carrossel de projetos deixou de usar `scrollLeft` + varredura de todos os cards durante a rolagem.
- A navegação agora usa `translate3d`, com trilho acelerado por GPU e transição curta.
- O card ativo permanece centralizado com um vizinho aparente em cada lado no desktop, tablet e mobile.
- O carrossel continua infinito nos dois sentidos e aceita arraste/swipe.
- Clique no card, imagem ou `Explorar demo` abre a demonstração; WhatsApp fica restrito ao CTA comercial.
- No mobile, `Quero algo assim` recebeu aparência real de botão.
- Corrigido o `Explorar demo` no mobile: a tela do projeto agora aparece em tamanho legível e o modal rola como uma página única, sem conteúdo cortado.
- Removidos deslocamentos exagerados de hover em cards e botões.
- Fundos interativos pesados foram convertidos para versões estáticas equivalentes, eliminando listeners contínuos de ponteiro e canvas em RAF que continuavam consumindo recursos fora da área visível.

## V27 — carrossel fluido, demos sem corte e interações restauradas

- Carrossel voltou ao comportamento nativo de swipe/scroll no mobile, que estava mais fluido.
- Navegação por setas/paginação usa uma animação curta (~145 ms), com resposta imediata no desktop e mobile.
- Loop infinito continua com cópias do catálogo e recentralização invisível.
- Card ativo permanece centralizado e os vizinhos ficam aparentes à esquerda e à direita.
- Recentragem automática ao redimensionar/orientar a tela.
- CTA “Quero algo assim” ganhou aparência clara de botão no mobile.
- Interações/hover anteriores foram restauradas; foi removida a supressão global de movimento da V26.
- Fundo de cases voltou a reagir ao ponteiro, mas só processa quando a seção está próxima da viewport.
- Pontilhado interativo do hero foi restaurado e também pausa fora da viewport para reduzir custo.
- A arte dos dominós não acompanha o ponteiro: somente o pontilhado é interativo.
- Modal desktop: a imagem da demo ocupa o palco com `object-fit: contain`, exibindo a captura inteira sem cortar o rodapé.
- Modal mobile/tablet: captura inteira dentro de um palco limitado e conteúdo externo rolável até o CTA.

## Ajuste final do modal e espaçamento
- Modal agora é renderizado no `body` e sempre abre alinhado à viewport, independente do scroll da página.
- No mobile, a demo voltou a usar a captura completa em largura total, sem miniaturização ou corte.
- O modal mobile passa a rolar como uma página única até o CTA.
- Sidebar do desktop teve espaçamento compactado e CTA reposicionado para evitar áreas vazias.
- Título atualizado para “O projeto pode incluir e muito mais”.

## 06/10/2026 — Refinamento visual completo (Polish final)

### Hero Home
- Ajuste contraste texto complementar: opacity .92, font-weight 500
- Altura limitada (calc(75vh - 92px) / max-height: 520px) para mostrar preview da próxima seção

### Como funciona — Timeline limpa sem linhas
- Desktop: grid 3×2 (01 02 03 / 04 05 06) sem conectores
- Tablet: grid 2×3 sem conectores
- Mobile: lista vertical 1×6 sem linha vertical
- Números grandes em roxo (2.8rem desktop, 2.4rem tablet, 2.2rem mobile)
- Hierarquia clara: número → título → descrição
- CTA final consolidado em linha única com botão roxo
- Removidas todas as linhas/conectores (formato S removido)

### Header 'Alguns projetos'
- Compactado: título + descrição unificados, removido bloco redundante à direita
- Mesmo texto em home e /projetos

### Carousel de Projetos - 3 cards visíveis
- Desktop: min(32vw, 400px), gap 24px, padding 64px
- Tablet: min(65vw, 460px), padding 48px
- Mobile: 78vw, padding 0
- Setas redesenhadas: 44px, borda 2px roxo, sombra suave, posição -72px

### Cards de Projetos padronizados
- Removidos ícones/categorias do topo
- Estrutura: Nome → Descrição → Imagem → 2 benefícios → 2 CTAs
- Botão 'Explorar produto': hover no desktop, visível no tablet/mobile
- Removido destaque fixo do Nexora (borda roxa permanente)

### Botão 'Falar com a Monky' - Texto branco
- Fundo roxo (var(--roxo)), texto branco (#fff)
- Hover: var(--roxo-escuro)
- Consistente em todas as páginas

### Contraste & Legibilidade - Tokens atualizados
- --texto: #16111D, --texto-suave: #443D4D
- --borda: #D4CADB, --borda-forte: #C8C0D4
- --roxo: #5F1EA5
- Fondos: --fundo: #FAF9FC, --fundo-suave: #F4F1F8, --fundo-alt: #EEEAEF

### Ritmo Vertical - Espaçamento consistente
- .secao + .secao sem margin-top extra
- Seções mais compactas e intencionais

### Responsividade testada
- 1920x1080: 3 cards, timeline 3×2, hero 75vh
- 1440x900: 2-3 cards, timeline 2×3, hero ajustado
- 1366x768: 2 cards, timeline 2×3, hero ajustado
- 700px: 1 card, timeline vertical 1×6, hero stack

Build: Typecheck PASS, Build SUCCESS (9 páginas estáticas), TypeScript sem erros
