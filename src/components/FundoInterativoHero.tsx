'use client'

import { useEffect, useRef, useState } from 'react'
import DotField from './react-bits/DotField'

export default function FundoInterativoHero() {
  const raiz = useRef<HTMLDivElement | null>(null)
  const [ponteiroAtivo, definirPonteiroAtivo] = useState(false)
  const [visivel, definirVisivel] = useState(true)

  useEffect(() => {
    const ponteiroPreciso = window.matchMedia('(hover: hover) and (pointer: fine)')
    const movimentoReduzido = window.matchMedia('(prefers-reduced-motion: reduce)')

    function sincronizar() {
      definirPonteiroAtivo(ponteiroPreciso.matches && !movimentoReduzido.matches)
    }

    sincronizar()
    ponteiroPreciso.addEventListener('change', sincronizar)
    movimentoReduzido.addEventListener('change', sincronizar)

    return () => {
      ponteiroPreciso.removeEventListener('change', sincronizar)
      movimentoReduzido.removeEventListener('change', sincronizar)
    }
  }, [])

  useEffect(() => {
    const elemento = raiz.current
    if (!elemento || typeof IntersectionObserver === 'undefined') return

    const observador = new IntersectionObserver(
      ([entrada]) => definirVisivel(entrada.isIntersecting),
      { rootMargin: '120px 0px' },
    )
    observador.observe(elemento)
    return () => observador.disconnect()
  }, [])

  return (
    <div className="fundo-interativo-hero" ref={raiz} aria-hidden="true">
      {ponteiroAtivo && visivel && (
        <DotField
          dotRadius={1.8}
          dotSpacing={19}
          cursorRadius={190}
          bulgeStrength={24}
          glowRadius={150}
          gradientFrom="rgba(235, 227, 255, .48)"
          gradientTo="rgba(172, 135, 248, .22)"
          glowColor="#7d52d6"
        />
      )}
    </div>
  )
}
