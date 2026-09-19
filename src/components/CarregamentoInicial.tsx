'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const DURACAO_TOTAL = 1450
const INICIO_SAIDA = 1160

export default function CarregamentoInicial() {
  const [visivel, definirVisivel] = useState(true)
  const [saindo, definirSaindo] = useState(false)
  const [progresso, definirProgresso] = useState(0)

  useEffect(() => {
    const inicio = performance.now()
    let quadro = 0

    function animar(agora: number) {
      const decorrido = agora - inicio
      const percentual = Math.min(100, Math.round((decorrido / INICIO_SAIDA) * 100))
      definirProgresso(percentual)

      if (decorrido >= INICIO_SAIDA) definirSaindo(true)

      if (decorrido < DURACAO_TOTAL) {
        quadro = requestAnimationFrame(animar)
      } else {
        definirVisivel(false)
      }
    }

    quadro = requestAnimationFrame(animar)
    return () => cancelAnimationFrame(quadro)
  }, [])

  if (!visivel) return null

  return (
    <div
      className={`carregamento-inicial carregamento-fluido ${saindo ? 'esta-saindo' : ''}`}
      aria-live="polite"
      aria-label="Carregando experiência Monky"
    >
      <div className="conteudo-loading-fluido">
        <div className="marca-loading-fluido" aria-hidden="true">
          <Image
            className="logo-loading-fluido"
            src="/images/monky-logo.png"
            alt=""
            width={779}
            height={202}
            priority
          />
        </div>

        <div className="status-loading-fluido">
          <div className="rotulo-loading-fluido">
            <span>Preparando sua experiência</span>
            <strong>{progresso}%</strong>
          </div>
          <div
            className="linha-progresso-fluido"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progresso}
            aria-label="Progresso do carregamento"
          >
            <i style={{ transform: `scaleX(${progresso / 100})` }} />
          </div>
        </div>
      </div>
    </div>
  )
}
