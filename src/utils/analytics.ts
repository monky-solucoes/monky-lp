'use client'

type ValorEvento = string | number | boolean | undefined

type ParametrosEvento = Record<string, ValorEvento>

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...argumentos: unknown[]) => void
    clarity?: (...argumentos: unknown[]) => void
  }
}

function existeJanela() {
  return typeof window !== 'undefined'
}

export function rastrearEvento(nome: string, parametros: ParametrosEvento = {}) {
  if (!existeJanela()) return

  window.gtag?.('event', nome, parametros)
  window.clarity?.('event', nome)
}

export function definirTagClarity(chave: string, valor: string | string[]) {
  if (!existeJanela()) return

  window.clarity?.('set', chave, valor)
}

export function priorizarSessaoClarity(motivo: string) {
  if (!existeJanela()) return

  window.clarity?.('upgrade', motivo)
}

export function rastrearCliqueWhatsApp(origem: string, projeto?: {
  id: string
  nome: string
  categoria?: string
}) {
  const parametros: ParametrosEvento = {
    origem,
    projeto_id: projeto?.id,
    projeto_nome: projeto?.nome,
    categoria: projeto?.categoria,
  }

  rastrearEvento('whatsapp_click', parametros)

  if (projeto) {
    definirTagClarity('whatsapp_projeto', projeto.id)
    priorizarSessaoClarity(`whatsapp ${projeto.id}`)
  }
}
