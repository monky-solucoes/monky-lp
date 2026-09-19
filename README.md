# Monky — Landing page

Landing page da Monky Soluções em Next.js + React + TypeScript, sem banco de dados e sem API.

## Visual

Esta versão foi reformulada para ficar próxima da referência aprovada:

- Hero roxo com texto à esquerda e dominós à direita;
- logo PNG transparente;
- quatro cards de soluções;
- área de cases com dois cards amplos no desktop e faixa horizontal no celular;
- cada case possui um exemplo visual real do tipo de sistema;
- faixa horizontal com indicação de gesto no celular;
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

O passo a passo completo de criação, configuração, acesso aos painéis e leitura dos eventos está em [`docs/analytics.md`](docs/analytics.md).

Sem essas duas chaves o site funciona normalmente, mas ainda não envia dados para os painéis de análise.

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

Painéis:

- Google Analytics: https://analytics.google.com/
- Microsoft Clarity: https://clarity.microsoft.com/

## Rodar

```bash
npm install
npm run dev
```

Depois abra:

```text
http://localhost:3000
```


## Vitrine de projetos

A área de projetos utiliza uma faixa horizontal limpa, navegável por rolagem ou gesto de arrastar.

- Cada projeto aparece uma única vez;
- os cards abrem demonstrações navegáveis por telas;
- o projeto selecionado é centralizado antes da abertura;
- a demonstração inclui ações simuladas rastreadas pelo Analytics;
- controles flutuantes não cobrem as telas do produto.
