import type { Demonstracao } from '@/types/demonstracao'

// Exemplos conceituais. A demonstração é local e não envia mensagens nem conecta serviços.
export const automacoes: Demonstracao[] = [
  {
    id: 'contatos-organizados',
    nome: 'Contatos organizados',
    categoria: 'Automação / Atendimento',
    resumo: 'Do formulário ao atendimento: registre o contato e avise quem vai acompanhar a conversa.',
    descricao: 'Exemplo de fluxo que recebe uma solicitação pelo site, organiza as informações e prepara o próximo passo do atendimento. Integrações e regras são definidas conforme a rotina da empresa.',
    imagem: '',
    recursos: ['Entrada pelo formulário', 'Registro centralizado', 'Aviso à equipe', 'Próxima ação definida'],
    telas: [],
    mensagemWhatsApp: 'Oi! Vi o exemplo de automação de contatos da Monky. Gostaria de organizar os contatos recebidos na minha empresa.',
    fluxo: [
      { titulo: 'Contato recebido', descricao: 'Uma pessoa preenche o formulário do site solicitando informações sobre um serviço.' },
      { titulo: 'Informações organizadas', descricao: 'O fluxo confere os campos e registra a solicitação na ferramenta de atendimento.' },
      { titulo: 'Equipe avisada', descricao: 'A pessoa responsável recebe um aviso com o contexto necessário para iniciar a conversa.' },
      { titulo: 'Atendimento acompanhado', descricao: 'A solicitação fica com responsável e próxima ação. O retorno ao cliente é feito pela equipe.' },
    ],
  },
  {
    id: 'lembretes-vencimento',
    nome: 'Lembretes de vencimento',
    categoria: 'Automação / Financeiro',
    resumo: 'Organize contas a vencer e prepare lembretes para a equipe sem conferir cada registro manualmente.',
    descricao: 'Exemplo de rotina que consulta vencimentos, separa pendências e avisa a equipe. Envio a clientes, quando necessário, depende dos canais autorizados e das regras combinadas.',
    imagem: '',
    recursos: ['Consulta de vencimentos', 'Conferência de status', 'Aviso interno', 'Histórico de acompanhamento'],
    telas: [],
    mensagemWhatsApp: 'Oi! Vi o exemplo de lembretes de vencimento da Monky. Gostaria de conversar sobre uma automação parecida.',
    fluxo: [
      { titulo: 'Rotina iniciada', descricao: 'No horário definido, a rotina consulta os registros financeiros disponíveis.' },
      { titulo: 'Pendências conferidas', descricao: 'Contas já pagas são ignoradas. As contas a vencer são separadas para acompanhamento.' },
      { titulo: 'Lembrete preparado', descricao: 'A equipe recebe um resumo das pendências para conferir e decidir as próximas ações.' },
      { titulo: 'Histórico atualizado', descricao: 'O acompanhamento é registrado para evitar lembretes repetidos sobre a mesma pendência.' },
    ],
  },
  {
    id: 'pedidos-acompanhados',
    nome: 'Pedidos acompanhados',
    categoria: 'Automação / Operação',
    resumo: 'Conecte a entrada do pedido à operação e mantenha a equipe informada sobre cada etapa.',
    descricao: 'Exemplo de integração entre a entrada de pedidos e o acompanhamento interno. O fluxo organiza tarefas e atualiza o status conforme a equipe avança.',
    imagem: '',
    recursos: ['Registro do pedido', 'Tarefa para a operação', 'Atualização de status', 'Aviso de conclusão'],
    telas: [],
    mensagemWhatsApp: 'Oi! Vi o exemplo de acompanhamento de pedidos da Monky. Quero entender como automatizar etapas da minha operação.',
    fluxo: [
      { titulo: 'Pedido registrado', descricao: 'Um pedido confirmado entra no fluxo com as informações necessárias para o atendimento.' },
      { titulo: 'Tarefa criada', descricao: 'A operação recebe uma tarefa com responsável e instruções para preparar o pedido.' },
      { titulo: 'Status atualizado', descricao: 'Conforme a equipe trabalha, o status é atualizado no ponto central de acompanhamento.' },
      { titulo: 'Conclusão sinalizada', descricao: 'A equipe comercial recebe a confirmação para combinar a entrega ou o próximo contato.' },
    ],
  },
]
