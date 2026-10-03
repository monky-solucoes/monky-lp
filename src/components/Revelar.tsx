'use client'

import type { CSSProperties, ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'

interface PropriedadesRevelar {
  children: ReactNode
  atraso?: number
  className?: string
  ariaHidden?: boolean
  inert?: boolean
}

export default function Revelar({
  children,
  atraso = 0,
  className = '',
  ariaHidden,
  inert,
}: PropriedadesRevelar) {
  const referencia = useRef<HTMLDivElement | null>(null)
  const [visivel, definirVisivel] = useState(false)

  useEffect(() => {
    const elemento = referencia.current

    if (!elemento) return

    const prefereMovimentoReduzido = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefereMovimentoReduzido) {
      definirVisivel(true)
      return
    }

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return
        definirVisivel(true)
        observador.disconnect()
      },
      { threshold: 0.18 },
    )

    observador.observe(elemento)

    return () => observador.disconnect()
  }, [])

  const estilo = {
    '--atraso-revelacao': `${atraso}s`,
  } as CSSProperties

  return (
    <div
      ref={referencia}
      className={`revelar ${visivel ? 'revelar-visivel' : ''} ${className}`.trim()}
      style={estilo}
      aria-hidden={ariaHidden}
      inert={inert || undefined}
    >
      {children}
    </div>
  )
}
