'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { registrarEvento as registrarEventoGA } from '@/lib/analytics'

type ParametrosAnalytics = Record<string, string>

function registrarEvento(nome: string, parametros: ParametrosAnalytics) {
  if (typeof window === 'undefined') {
    return
  }

  registrarEventoGA(nome, parametros)

  const clarity = window.clarity

  if (typeof clarity === 'function') {
    clarity('event', nome)
  }
}

function definirTagClarity(chave: string, valor: string) {
  if (typeof window === 'undefined') {
    return
  }

  const clarity = window.clarity

  if (typeof clarity === 'function') {
    clarity('set', chave, valor)
  }
}

function priorizarSessaoClarity(motivo: string) {
  if (typeof window === 'undefined') {
    return
  }

  const clarity = window.clarity

  if (typeof clarity === 'function') {
    clarity('upgrade', motivo)
  }
}

function registrarVisualizacaoPagina() {
  if (typeof window === 'undefined') {
    return
  }

  registrarEventoGA('page_view', {
    page_path: window.location.pathname,
    page_location: window.location.href,
    page_title: document.title,
  })
}

export default function AnalyticsEventos() {
  const caminho = usePathname()
  const ultimoCaminho = useRef<string | null>(null)

  /*
   * Registra a visualização sempre que a rota mudar.
   *
   * O layout compartilhado mantém uma única instância entre as rotas.
   * O ref evita a repetição do efeito inicial no Strict Mode.
   */
  useEffect(() => {
    if (ultimoCaminho.current === caminho) return
    ultimoCaminho.current = caminho
    registrarVisualizacaoPagina()
  }, [caminho])

  /*
   * Escuta cliques nos links do site.
   *
   * Para WhatsApp usamos um único evento: whatsapp_click.
   * A origem identifica exatamente qual parte da landing page gerou o contato.
   */
  useEffect(() => {
    function registrarClique(evento: MouseEvent) {
      const alvo = evento.target

      if (!(alvo instanceof Element)) {
        return
      }

      const link = alvo.closest<HTMLAnchorElement>('a')

      if (!link) {
        return
      }

      const endereco = link.href

      const ehWhatsApp =
        endereco.includes('wa.me') ||
        endereco.includes('api.whatsapp.com') ||
        endereco.includes('whatsapp.com/send')

      if (ehWhatsApp) {
        const origem = link.dataset.analyticsOrigem ?? 'whatsapp_sem_origem'
        const sistema =
          link.dataset.analyticsSistema ??
          link.dataset.analyticsProjetoId ??
          'contato_geral'

        const parametros: ParametrosAnalytics = {
          origem,
          sistema,
          link_url: endereco,
          page_path: window.location.pathname,
          page_location: window.location.href,
        }

        const projetoId = link.dataset.analyticsProjetoId
        const projetoNome = link.dataset.analyticsProjetoNome
        const categoria = link.dataset.analyticsCategoria

        if (projetoId) parametros.projeto_id = projetoId
        if (projetoNome) parametros.projeto_nome = projetoNome
        if (categoria) parametros.categoria = categoria

        definirTagClarity('whatsapp_origem', origem)
        definirTagClarity('whatsapp_sistema', sistema)

        if (projetoId) {
          definirTagClarity('whatsapp_projeto', projetoId)
        }

        registrarEvento('whatsapp_click', parametros)
        priorizarSessaoClarity(`whatsapp ${origem}`)
      }

      /*
       * Evento personalizado.
       *
       * Exemplo:
       *
       * data-analytics-event="clique_interesse"
       * data-analytics-label="Gestão de Oficina"
       */
      const nomeEvento = link.dataset.analyticsEvent

      if (!nomeEvento) {
        return
      }

      /*
       * Evita registrar whatsapp_click duas vezes caso alguém
       * coloque data-analytics-event="whatsapp_click"
       * em um link que já é do WhatsApp.
       */
      if (ehWhatsApp && nomeEvento === 'whatsapp_click') {
        return
      }

      registrarEvento(nomeEvento, {
        rotulo:
          link.dataset.analyticsLabel?.trim() ||
          link.textContent?.trim() ||
          'sem_rotulo',

        origem:
          link.dataset.analyticsOrigem ?? 'site',

        sistema:
          link.dataset.analyticsSistema ?? 'nao_informado',

        link_url: endereco,

        page_path: window.location.pathname,
      })
    }

    document.addEventListener('click', registrarClique)

    return () => {
      document.removeEventListener('click', registrarClique)
    }
  }, [])

  return null
}
