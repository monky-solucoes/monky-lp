# Recuperação da experiência original — 03/10/2026

Referência confirmada pelo usuário: versão original do repositório, commit `2de5c34`.
Não é uma reversão integral: mantém tema claro/roxo, textos ajustados, navegação
entre páginas, exemplos de automação, analytics e acessibilidade do diálogo atual.

## Recuperado

- Carrossel centralizado no desktop e no celular, com prévias laterais.
- Continuidade entre último e primeiro item por três cópias do catálogo.
- Avanço automático a cada 5,2 segundos e transição de 145 ms do original.
- Enquadramento amplo: até 720 px no desktop, 76 vw no tablet e 78 vw no celular.
- Cabeçalho do projeto antes da imagem, recursos e dois botões abaixo.
- Todos os projetos na Home; filtros continuam disponíveis em `/projetos`.

O componente `CarrosselProjetos` reaproveita o comportamento original sem
reintroduzir o CSS antigo inteiro ou o fundo interativo. A geometria do trilho
é medida no redimensionamento e reutilizada na rolagem. Cópias auxiliares são
inertes para não triplicar a navegação de teclado/leitor de tela.

## Cuidados preservados

- Pausa explícita; pausa por hover, foco, interação, diálogo aberto, aba oculta
  e carrossel fora da área visível.
- Movimento reduzido desativa reprodução automática e transição animada.
- Filtros reiniciam o carrossel; diálogo devolve foco ao acionador.
- Sem dependências adicionais; capas responsivas e carregamento tardio do modal.
- Cards de serviços com agrupamento e profundidade novamente no mobile.
- Foto de conversa sem selo sobreposto; origem ilustrativa continua no alt e
  na documentação do asset. O painel de mascote/slogan do Sobre foi substituído
  pelo texto de abordagem e compromissos já presentes no processo.

## Comparação de artefatos de produção

A versão original foi extraída para uma pasta temporária independente e
compilada com as mesmas dependências instaladas, sem modificar o checkout.

| Medida | Original | Recuperada |
| --- | ---: | ---: |
| JavaScript inicial da Home, informado pelo Next | 121 kB | 122 kB |
| CSS compilado, bytes | 160.276 | 32.408 |
| CSS comprimido com gzip local, bytes | 28.816 | 7.274 |

Não são medições de Core Web Vitals, FPS, rede móvel ou experiência real.
O JavaScript inicial permanece aproximadamente equivalente; o CSS é menor.
Não se afirma ganho de velocidade percebida com base apenas nesses números.

## Verificação

- Build de produção, lint e tipos aprovados.
- Detector de layout sem ocorrências.
- Loop anterior/próximo atravessando ambos os extremos; filtros e demos.
- Retorno de foco após Escape no diálogo.
- Cinco rotas com um H1 e sem transbordamento horizontal a 390 px.
- Verificação visual móvel e desktop; não substitui teste em dispositivo físico.
