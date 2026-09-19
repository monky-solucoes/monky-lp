'use client'

import { useEffect, useRef } from 'react'
import { definirTagClarity, rastrearEvento } from '@/utils/analytics'

const marcasScroll = [25, 50, 75, 90]

export default function AnalyticsEventos() {
  const inicio = useRef<number>(0)
  const marcasEnviadas = useRef(new Set<number>())
  const tempoFinalEnviado = useRef(false)

  useEffect(() => {
    inicio.current = Date.now()
    definirTagClarity('landing', 'monky')

    function enviarTempo(final = false) {
      if (final && tempoFinalEnviado.current) return
      if (final) tempoFinalEnviado.current = true

      const segundos = Math.max(1, Math.round((Date.now() - inicio.current) / 1000))

      rastrearEvento(final ? 'tempo_na_pagina_final' : 'tempo_na_pagina', {
        segundos,
        transport_type: 'beacon',
      })
    }

    function medirScroll() {
      const documento = document.documentElement
      const areaRolavel = documento.scrollHeight - window.innerHeight
      if (areaRolavel <= 0) return

      const percentual = Math.round((window.scrollY / areaRolavel) * 100)
      const marca = marcasScroll.find((valor) => percentual >= valor && !marcasEnviadas.current.has(valor))

      if (!marca) return

      marcasEnviadas.current.add(marca)
      rastrearEvento('scroll_depth', {
        percentual: marca,
      })
    }

    function aoMudarVisibilidade() {
      if (document.visibilityState === 'hidden') enviarTempo()
    }

    function aoSairDaPagina() {
      enviarTempo(true)
    }

    window.addEventListener('scroll', medirScroll, { passive: true })
    document.addEventListener('visibilitychange', aoMudarVisibilidade)
    window.addEventListener('pagehide', aoSairDaPagina)

    return () => {
      window.removeEventListener('scroll', medirScroll)
      document.removeEventListener('visibilitychange', aoMudarVisibilidade)
      window.removeEventListener('pagehide', aoSairDaPagina)
      enviarTempo(true)
    }
  }, [])

  return null
}
