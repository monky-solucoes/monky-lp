# Analytics da landing page Monky

Este guia explica como ativar e consultar o Google Analytics 4 (GA4) e o Microsoft Clarity já integrados à landing page.

## O papel de cada ferramenta

- **Google Analytics 4:** volume de acessos, origem do tráfego, eventos, cliques, funis e conversões.
- **Microsoft Clarity:** gravações de sessão, mapas de clique, mapas de rolagem e análise visual de dificuldades de uso.

Use o GA4 para responder **quanto aconteceu** e o Clarity para investigar **como e por que aconteceu**.

## 1. Criar e conectar o Google Analytics 4

1. Acesse https://analytics.google.com/ com a conta Google que administrará a Monky.
2. Abra **Administrador** e crie uma conta ou propriedade para a Monky.
3. Em **Fluxos de dados**, adicione um fluxo **Web** com o domínio publicado da landing page.
4. Mantenha a medição otimizada ativada.
5. Abra o fluxo criado e copie o **ID de medição**, no formato `G-XXXXXXXXXX`.
6. Adicione esse valor à variável `NEXT_PUBLIC_GA_ID` no ambiente de produção.

Referência oficial: https://support.google.com/analytics/answer/14183469

## 2. Criar e conectar o Microsoft Clarity

1. Acesse https://clarity.microsoft.com/ com a conta Microsoft que administrará a Monky.
2. Crie um projeto para o domínio publicado da landing page.
3. Abra **Settings > Setup** e localize o identificador do projeto no código de instalação.
4. Adicione esse valor à variável `NEXT_PUBLIC_CLARITY_ID` no ambiente de produção.
5. Não é necessário copiar o script inteiro: o projeto já monta o script usando esse identificador.

Referência oficial: https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-setup

## 3. Configurar as variáveis

Para desenvolvimento local, crie um arquivo `.env.local` na raiz do projeto:

```text
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_ID=xxxxxxxxxx
```

Depois, reinicie o servidor de desenvolvimento. O arquivo `.env.local` não deve ser enviado ao Git.

Na hospedagem, cadastre as mesmas duas variáveis nas configurações de ambiente do projeto e publique novamente. Use os identificadores da propriedade e do projeto de produção.

Sem essas variáveis, a landing continua funcionando, mas não envia dados aos painéis.

## 4. Confirmar que está funcionando

### Google Analytics

1. Abra a landing publicada em uma janela comum do navegador.
2. Navegue pelos cards, abra telas internas e clique em alguns botões.
3. No GA4, abra **Relatórios > Tempo real**.
4. Confirme a visita e os eventos em **Contagem de eventos por nome do evento**.

O relatório em tempo real mostra a atividade recente. Os relatórios processados e as definições personalizadas podem levar de 24 a 48 horas para aparecer. Para uma inspeção técnica detalhada, use o DebugView com o Google Tag Assistant.

Referências oficiais:

- https://support.google.com/analytics/answer/9322688
- https://support.google.com/analytics/answer/7201382

### Microsoft Clarity

1. Abra o projeto da Monky no Clarity.
2. Acesse **Recordings** para conferir as primeiras sessões.
3. Acesse **Heatmaps** e selecione a URL da landing para conferir cliques e rolagem.
4. Em caso de ausência de dados, confirme o domínio, o período selecionado e a instalação em **Settings > Setup**.

As gravações em tempo real podem surgir rapidamente; painéis e mapas podem levar algum tempo para consolidar os dados.

Referências oficiais:

- https://learn.microsoft.com/en-us/clarity/heatmaps/heatmaps-overview
- https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-setup

## 5. Eventos enviados pela landing

| Evento | O que significa | Principais parâmetros |
| --- | --- | --- |
| `hero_cta_click` | Clique em “Ver exemplos” no banner | `destino` |
| `card_click` | Abertura de uma demonstração | `origem`, `projeto_id`, `projeto_nome`, `categoria` |
| `demo_screen_view` | Navegação entre telas de uma demonstração | `projeto_id`, `projeto_nome`, `tela_id`, `tela_titulo` |
| `demo_viewport_change` | Alternância entre a prévia de computador e celular | `projeto_id`, `visualizacao` |
| `demo_action_click` | Clique em uma ação simulada dentro da demonstração | `projeto_id`, `projeto_nome`, `tela_id`, `acao` |
| `whatsapp_click` | Clique que levou ao WhatsApp | `origem`, `projeto_id`, `projeto_nome`, `categoria` |
| `scroll_depth` | Visitante atingiu 25%, 50%, 75% ou 90% da página | `percentual` |
| `tempo_na_pagina` | Tempo registrado quando a página perde visibilidade | `segundos` |
| `tempo_na_pagina_final` | Tempo registrado ao encerrar a visita | `segundos` |

Os mesmos nomes de evento são enviados ao Clarity. Além disso, sessões com clique de WhatsApp recebem a identificação do projeto e são priorizadas para análise.

## 6. Preparar os relatórios do GA4

Para enxergar os parâmetros nas Explorações e relatórios, abra **Administrador > Definições personalizadas** e crie dimensões personalizadas com escopo **Evento** para:

- `origem`
- `projeto_id`
- `projeto_nome`
- `categoria`
- `tela_id`
- `tela_titulo`
- `acao`
- `visualizacao`
- `destino`

Crie métricas personalizadas para `segundos` e `percentual` somente se elas forem necessárias nos relatórios. Parâmetros são coletados pelo site; dimensões e métricas personalizadas tornam esses parâmetros analisáveis na interface do GA4.

Referência oficial: https://support.google.com/analytics/answer/14240153

Marque `whatsapp_click` como **evento principal** no GA4. Esse é o indicador de intenção comercial mais importante da landing e permite comparar quais origens e projetos geram mais contatos.

Referência oficial: https://support.google.com/analytics/answer/9322688

## 7. Análise recomendada

Faça uma revisão semanal com este roteiro:

1. No GA4, compare `card_click` por `projeto_nome` para descobrir quais ofertas chamam mais atenção.
2. Compare `demo_screen_view` por `tela_titulo` para entender quais partes dos produtos são mais exploradas.
3. Compare `demo_viewport_change` por `projeto_id` e `visualizacao` para saber quais demos despertam interesse na experiência mobile.
4. Compare `whatsapp_click` por `projeto_nome` e `origem` para descobrir quais cards realmente geram intenção de contato.
5. Compare os cliques com `tempo_na_pagina_final` e `scroll_depth` para separar curiosidade rápida de visitas mais interessadas.
6. No Clarity, filtre sessões com os eventos `card_click` e `whatsapp_click` e assista às gravações.
7. Abra os mapas de clique e rolagem para localizar cards ignorados, cliques sem resposta e seções que poucas pessoas alcançam.

O Clarity também permite integrar o projeto ao Google Analytics. Essa integração ajuda a abrir gravações relacionadas aos segmentos analisados no GA4 e pode ser ativada nas configurações do projeto.

## 8. Acesso da equipe

- No GA4, adicione cada responsável em **Administrador > Gerenciamento de acesso** com o menor nível necessário.
- No Clarity, adicione os responsáveis nas configurações de equipe do projeto.
- Não compartilhe senha de conta e não registre credenciais no repositório.

## 9. Privacidade antes da publicação

GA4 e Clarity coletam dados de uso. Antes de ativá-los em produção, publique uma política de privacidade adequada e valide a necessidade de consentimento de cookies conforme a LGPD e os locais atendidos pelo negócio.

A implementação atual carrega as ferramentas quando os identificadores estão configurados. Caso seja necessário consentimento prévio, o carregamento deve ser condicionado à escolha do visitante antes da publicação.

O Clarity mascara conteúdo sensível por padrão, mas as configurações de mascaramento devem ser revisadas no painel do projeto.
