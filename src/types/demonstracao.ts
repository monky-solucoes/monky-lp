export type TipoTelaDemonstracao = 'grade' | 'lista' | 'agenda' | 'formulario' | 'dashboard'

export interface ItemTelaDemonstracao {
  titulo: string
  detalhe?: string
  status?: string
}

export interface MetricaTelaDemonstracao {
  rotulo: string
  valor: string
}

export interface TelaDemonstracao {
  id: string
  imagem?: string
  titulo: string
  subtitulo: string
  tipo: TipoTelaDemonstracao
  destaque?: string
  acao?: string
  itens: ItemTelaDemonstracao[]
  metricas?: MetricaTelaDemonstracao[]
}

export interface Demonstracao {
  id: string
  nome: string
  categoria: string
  resumo: string
  descricao: string
  imagem: string
  recursos: string[]
  telas: TelaDemonstracao[]
  mensagemWhatsApp: string
  fluxo?: { titulo: string; descricao: string }[]
}
