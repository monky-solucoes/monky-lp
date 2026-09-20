export interface ParametrosEventoAnalytics {
  [chave: string]: string | number | boolean | undefined
}

export function registrarEvento(
  nome: string,
  parametros: ParametrosEventoAnalytics = {},
) {
  if (typeof window === 'undefined') {
    return
  }

  window.gtag?.('event', nome, parametros)
}

export function registrarVisualizacaoPagina() {
  if (typeof window === 'undefined') {
    return
  }

  window.gtag?.('event', 'page_view', {
    page_title: document.title,
    page_location: window.location.href,
    page_path:
      window.location.pathname +
      window.location.search +
      window.location.hash,
  })
}

export function registrarCliqueWhatsApp(
  origem: string,
  sistema = 'contato_geral',
) {
  registrarEvento('whatsapp_click', {
    origem,
    sistema,
  })
}

export function registrarInteresseSistema(sistema: string) {
  registrarEvento('clique_interesse', {
    sistema,
  })
}

export function registrarDetalhesSistema(sistema: string) {
  registrarEvento('clique_ver_detalhes', {
    sistema,
  })
}

export function registrarCliqueMenu(item: string) {
  registrarEvento('clique_menu', {
    item,
  })
}