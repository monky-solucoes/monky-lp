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
      <div className="aura-loading aura-loading-esquerda" aria-hidden="true" />
      <div className="aura-loading aura-loading-direita" aria-hidden="true" />
      <div className="trilha-loading" aria-hidden="true" />

      <div className="conteudo-loading-fluido">
        <div className="orbita-mascote" aria-hidden="true">
          <span className="anel-loading anel-loading-um" />
          <span className="anel-loading anel-loading-dois" />
          <div className="mascote-fluido">
            <Image
              src="/images/monky-mascote.png"
              alt=""
              width={274}
              height={259}
              priority
            />
          </div>
        </div>

        <div className="status-loading-fluido">
          <span>Preparando sua experiência</span>
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
