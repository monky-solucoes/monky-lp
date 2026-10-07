export interface CenarioAutomacao {
  titulo: string
  origem: string
  identificador: string
  pessoa: string
  iniciais: string
  assunto: string
  campos: { nome: string; valor: string }[]
  estados: string[]
  registros: string[]
  saida: string
}

// Todos os nomes, identificadores e valores abaixo são fictícios para demonstração.
export const cenariosAutomacao: Record<string, CenarioAutomacao> = {
  'contatos-organizados': {
    titulo: 'Central de atendimento', origem: 'Formulário do site', identificador: 'CT-1042',
    pessoa: 'Marina Costa', iniciais: 'MC', assunto: 'Solicitação de orçamento',
    campos: [{ nome: 'Interesse', valor: 'Sistema de pedidos' }, { nome: 'Responsável', valor: 'Equipe comercial' }, { nome: 'Próxima ação', valor: 'Entender a operação' }],
    estados: ['Recebido', 'Organizado', 'Equipe avisada', 'Pronto para atender'],
    registros: ['Formulário recebido com nome e interesse.', 'Campos conferidos e contato registrado no CRM.', 'Aviso interno preparado para o comercial.', 'Tarefa de retorno criada com o contexto do pedido.'],
    saida: 'Novo contato para acompanhar: Marina quer organizar os pedidos da empresa. Próximo passo: entender a operação.',
  },
  'lembretes-vencimento': {
    titulo: 'Agenda financeira', origem: 'Rotina diária · 09:00', identificador: 'FIN-208',
    pessoa: 'Licença de software', iniciais: 'LS', assunto: 'Conta a pagar',
    campos: [{ nome: 'Valor ilustrativo', valor: 'R$ 480,00' }, { nome: 'Vencimento', valor: 'Amanhã' }, { nome: 'Responsável', valor: 'Equipe financeira' }],
    estados: ['Consulta iniciada', 'Pendente de pagamento', 'Lembrete preparado', 'Acompanhamento salvo'],
    registros: ['Rotina consultou os vencimentos do período.', 'Conta ainda não paga; entra na lista de atenção.', 'Resumo interno preparado para conferência.', 'Lembrete registrado para evitar duplicidade.'],
    saida: 'Atenção ao próximo vencimento: licença de software, R$ 480,00. Confira o pagamento antes de qualquer ação.',
  },
  'pedidos-acompanhados': {
    titulo: 'Operação de pedidos', origem: 'Pedido confirmado', identificador: 'PED-1058',
    pessoa: 'Café Horizonte', iniciais: 'CH', assunto: 'Reposição de embalagens',
    campos: [{ nome: 'Pedido ilustrativo', valor: '200 embalagens kraft' }, { nome: 'Responsável', valor: 'Equipe de separação' }, { nome: 'Entrega', valor: 'Combinar retirada' }],
    estados: ['Pedido recebido', 'Separação atribuída', 'Em preparação', 'Pronto para retirada'],
    registros: ['Pedido confirmado e registrado na operação.', 'Tarefa de separação atribuída à equipe.', 'Preparação registrada no acompanhamento.', 'Aviso interno preparado para combinar a retirada.'],
    saida: 'Pedido PED-1058 preparado. A equipe comercial pode combinar a retirada com o Café Horizonte.',
  },
}
