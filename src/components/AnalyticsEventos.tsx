'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

type ParametrosAnalytics = Record<string, string>

function registrarEvento(nome: string, parametros: ParametrosAnalytics) {
  if (typeof window === 'undefined') {
    return
  }

  const gtag = window.gtag

  if (typeof gtag === 'function') {
    gtag('event', nome, parametros)
  }
}

function registrarVisualizacaoPagina() {
  if (typeof window === 'undefined') {
    return
  }

  const gtag = window.gtag

  if (typeof gtag === 'function') {
    gtag('page_view', {
      page_path: window.location.pathname,
      page_location: window.location.href,
    })
  }
}

export default function AnalyticsEventos() {
  const caminho = usePathname()

  /*
   * Registra a visualização sempre que a rota mudar.
   *
   * Como nossa landing page praticamente trabalha em uma única rota,
   * normalmente será disparado apenas na entrada do usuário.
   */
  useEffect(() => {
    registrarVisualizacaoPagina()
  }, [caminho])

  /*
   * Escuta cliques nos links do site.
   *
   * Isso permite medir automaticamente:
   * - WhatsApp
   * - eventos personalizados adicionados com data-analytics-*
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

      /*
       * WhatsApp
       */
      if (ehWhatsApp) {
        registrarEvento('clique_whatsapp', {
          origem: link.dataset.analyticsOrigem ?? 'site',
          sistema:
            link.dataset.analyticsSistema ?? 'contato_geral',
          link_url: endereco,
          page_path: window.location.pathname,
          page_location: window.location.href,
        })
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
       * Evita registrar clique_whatsapp duas vezes caso alguém
       * coloque data-analytics-event="clique_whatsapp"
       * em um link que já é do WhatsApp.
       */
      if (ehWhatsApp && nomeEvento === 'clique_whatsapp') {
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