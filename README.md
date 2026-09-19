# Monky — Landing page

Landing page em Next.js + React + TypeScript, sem banco de dados e sem API.

## Visual

Esta versão foi reformulada para ficar próxima da referência aprovada:

- Hero roxo com texto à esquerda e dominós à direita;
- logo PNG transparente;
- quatro cards de soluções;
- área de cases com três cards visíveis no desktop;
- cada case possui um exemplo visual real do tipo de sistema;
- carrossel horizontal com setas flutuantes nas laterais;
- cards compactos de outras soluções;
- CTA roxo;
- rodapé escuro;
- responsividade para notebook, tablet e celular.

## WhatsApp

O número fica em:

```text
src/data/contato.ts
```

Use apenas números, incluindo DDI e DDD:

```ts
numeroWhatsApp: '5553999999999'
```

Cada case possui uma mensagem específica de interesse.

## Analytics

A landing está preparada para Google Analytics 4 e Microsoft Clarity.

Crie um `.env.local` com:

```text
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_ID=xxxxxxxxxx
```

Eventos enviados ao GA4:

- `card_click`: qual card abriu uma demonstração;
- `demo_screen_view`: quais telas internas foram navegadas;
- `demo_action_click`: ações simuladas dentro da demo;
- `whatsapp_click`: quais cards ou CTAs levaram ao WhatsApp;
- `tempo_na_pagina` e `tempo_na_pagina_final`: tempo de permanência;
- `scroll_depth`: profundidade de rolagem.

Recomendação: use o GA4 para números, origem de tráfego, eventos e funis. Use o Microsoft Clarity para heatmaps, gravações de sessão e leitura visual de onde o visitante clicou ou travou.

## Rodar

```bash
npm install
npm run dev
```

Depois abra:

```text
http://localhost:3000
```


## Carrossel infinito

A área de projetos agora utiliza um carrossel circular.

- A seta para a direita pode ser clicada indefinidamente.
- A seta para a esquerda também pode ser clicada indefinidamente.
- Ao chegar ao último projeto, o próximo volta ao primeiro sem mostrar um fim.
- Ao voltar antes do primeiro, o carrossel continua pelo último.
- Arraste e swipe também são recentralizados automaticamente.
- O botão "Ver mais cases" utiliza o mesmo avanço infinito.
