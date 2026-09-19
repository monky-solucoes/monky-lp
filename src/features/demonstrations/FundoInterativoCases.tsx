'use client'

import { useEffect, useRef } from 'react'

export default function FundoInterativoCases() {
  const raiz = useRef<HTMLDivElement | null>(null)
  const quadro = useRef<number | null>(null)
  const alvo = useRef({ x: 50, y: 35, scroll: 0 })

  useEffect(() => {
    const elemento = raiz.current
    if (!elemento) return

    function desenhar() {
      if (!elemento) return
      elemento.style.setProperty('--mouse-x', `${alvo.current.x}%`)
      elemento.style.setProperty('--mouse-y', `${alvo.current.y}%`)
      elemento.style.setProperty('--scroll-shift', `${alvo.current.scroll}px`)
      quadro.current = null
    }

    function solicitar() {
      if (quadro.current !== null) return
      quadro.current = requestAnimationFrame(desenhar)
    }

    function mover(evento: PointerEvent) {
      alvo.current.x = (evento.clientX / window.innerWidth) * 100
      alvo.current.y = (evento.clientY / window.innerHeight) * 100
      solicitar()
    }

    function rolar() {
      alvo.current.scroll = Math.max(-26, Math.min(26, window.scrollY * 0.018))
      solicitar()
    }

    window.addEventListener('pointermove', mover, { passive: true })
    window.addEventListener('scroll', rolar, { passive: true })
    rolar()

    return () => {
      window.removeEventListener('pointermove', mover)
      window.removeEventListener('scroll', rolar)
      if (quadro.current !== null) cancelAnimationFrame(quadro.current)
    }
  }, [])

  return (
    <div className="fundo-interativo-cases" ref={raiz} aria-hidden="true">
      <span className="orb-cases orb-cases-um" />
      <span className="orb-cases orb-cases-dois" />
      <span className="malha-cases" />
      <span className="linha-cases linha-cases-um" />
      <span className="linha-cases linha-cases-dois" />
    </div>
  )
}
