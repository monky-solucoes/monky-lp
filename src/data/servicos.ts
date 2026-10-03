import type { NomeIcone } from '@/components/Icone'

export const servicos: { nome: string; icone: NomeIcone; resumo: string; descricao: string; exemplos: string[] }[] = [
  {
    nome: 'Sistemas personalizados', icone: 'codigo',
    resumo: 'Ferramentas criadas para organizar processos, informações e operações da sua empresa.',
    descricao: 'Sistemas criados de acordo com a operação da empresa, sem funções desnecessárias.',
    exemplos: ['Gestão e estoque', 'Vendas e atendimento', 'Ordens de serviço', 'Controle interno e operações'],
  },
  {
    nome: 'Sites e Landing Pages', icone: 'site',
    resumo: 'Páginas profissionais para apresentar sua empresa, divulgar serviços e gerar contatos.',
    descricao: 'Páginas criadas para apresentar empresas, serviços, produtos e transformar visitas em oportunidades de contato.',
    exemplos: ['Sites institucionais', 'Páginas de serviços', 'Vitrines e catálogos'],
  },
  {
    nome: 'Automações', icone: 'engrenagem',
    resumo: 'Reduza tarefas repetitivas e conecte processos que hoje dependem de trabalho manual.',
    descricao: 'Automatize tarefas repetitivas, reduza retrabalho e conecte processos que hoje dependem de ações manuais.',
    exemplos: ['Integração entre ferramentas', 'Rotinas e notificações', 'Organização de informações'],
  },
  {
    nome: 'WhatsApp e atendimento', icone: 'whatsapp',
    resumo: 'Contato com clientes mais rápido e organizado.',
    descricao: 'Integrações e fluxos para tornar o contato com clientes mais rápido e organizado.',
    exemplos: ['Fluxos de atendimento', 'Organização de contatos', 'Integração com a operação'],
  },
  {
    nome: 'Dashboards e gestão', icone: 'grafico',
    resumo: 'As informações do negócio em uma visão clara.',
    descricao: 'Centralize informações importantes e acompanhe o que precisa de atenção.',
    exemplos: ['Painéis de acompanhamento', 'Relatórios', 'Indicadores da operação'],
  },
]
