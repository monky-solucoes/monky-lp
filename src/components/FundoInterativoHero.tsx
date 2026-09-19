'use client'

import { useEffect, useState } from 'react'
import DotField from './react-bits/DotField'

export default function FundoInterativoHero() {
  const [ativo, definirAtivo] = useState(false)

  useEffect(() => {
    const ponteiroPreciso = window.matchMedia('(hover: hover) and (pointer: fine)')
    const movimentoReduzido = window.matchMedia('(prefers-reduced-motion: reduce)')

    function sincronizar() {
      definirAtivo(ponteiroPreciso.matches && !movimentoReduzido.matches)
    }

    sincronizar()
    ponteiroPreciso.addEventListener('change', sincronizar)
    movimentoReduzido.addEventListener('change', sincronizar)

    return () => {
      ponteiroPreciso.removeEventListener('change', sincronizar)
      movimentoReduzido.removeEventListener('change', sincronizar)
    }
  }, [])

  return (
    <div className="fundo-interativo-hero" aria-hidden="true">
      {ativo && (
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
