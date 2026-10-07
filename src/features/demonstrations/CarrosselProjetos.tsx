'use client'

import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import Icone from '@/components/Icone'

// Preserve the original centered, three-copy loop and 5.2-second cadence.
// Geometry is cached on resize instead of measuring every card on every scroll.
export default function CarrosselProjetos({ nomes, children }: { nomes: string[]; children: ReactNode[] }) {
  const total = nomes.length
  const id = useId()
  const trilhoRef = useRef<HTMLDivElement>(null)
  const navegarRef = useRef<(direcao: number) => void>(() => {})
  const [ativo, definirAtivo] = useState(0)
  const [pausado, definirPausado] = useState(false)
  const pausaRef = useRef(false)
  pausaRef.current = pausado

  useEffect(() => {
    const trilho = trilhoRef.current
    if (!trilho || total < 1) return
    let fisico = total
    let origem = 0
    let passo = 1
    let quadro = 0
    let quadroScroll = 0
    let temporizador = 0
    let interacaoAte = 0
    let pressionado = false
    let sobre = false
    let visivel = false
    const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)')
    const normalizar = (indice: number) => ((indice % total) + total) % total

    function posicionar(indice: number) {
      fisico = indice
      trilho!.scrollTo({ left: origem + indice * passo, behavior: 'instant' })
      definirAtivo(normalizar(indice))
    }

    function medir() {
      cancelAnimationFrame(quadro)
      quadro = 0
      trilho!.style.scrollSnapType = ''
      const primeiro = trilho!.children[0] as HTMLElement
      const segundo = trilho!.children[1] as HTMLElement
      const caixa = trilho!.getBoundingClientRect()
      const card = primeiro.getBoundingClientRect()
      passo = segundo.getBoundingClientRect().left - card.left
      origem = trilho!.scrollLeft + card.left + card.width / 2 - caixa.left - caixa.width / 2
      posicionar(total + normalizar(fisico))
    }

    function recentralizar() {
      if (pressionado || quadro || trilho!.contains(document.activeElement)) return
      if (fisico < total || fisico >= total * 2) posicionar(total + normalizar(fisico))
    }

    function mover(direcao: number, manual = true) {
      if (manual) interacaoAte = Date.now() + 7000
      cancelAnimationFrame(quadro)
      clearTimeout(temporizador)
      // Normalize before a rapid succession of clicks can run past the copies.
      if (fisico + direcao < 0 || fisico + direcao >= total * 3) posicionar(total + normalizar(fisico))
      fisico += direcao
      definirAtivo(normalizar(fisico))
      const inicio = trilho!.scrollLeft
      const destino = origem + fisico * passo
      const instante = performance.now()
      if (reduzir.matches) { posicionar(fisico); recentralizar(); return }
      trilho!.style.scrollSnapType = 'none'
      function animar(agora: number) {
        const progresso = Math.min(1, (agora - instante) / 145)
        trilho!.scrollLeft = inicio + (destino - inicio) * (1 - Math.pow(1 - progresso, 3))
        if (progresso < 1) quadro = requestAnimationFrame(animar)
        else {
          quadro = 0
          trilho!.style.scrollSnapType = ''
          recentralizar()
        }
      }
      quadro = requestAnimationFrame(animar)
    }
    navegarRef.current = mover

    function aoRolar() {
      cancelAnimationFrame(quadroScroll)
      quadroScroll = requestAnimationFrame(() => {
        if (!quadro) {
          fisico = Math.max(0, Math.min(total * 3 - 1, Math.round((trilho!.scrollLeft - origem) / passo)))
          definirAtivo(normalizar(fisico))
        }
        clearTimeout(temporizador)
        temporizador = window.setTimeout(recentralizar, 180)
      })
    }
    function aoPressionar() {
      pressionado = true
      interacaoAte = Date.now() + 5200
      cancelAnimationFrame(quadro)
      quadro = 0
      trilho!.style.scrollSnapType = ''
    }
    function aoSoltar() { pressionado = false; temporizador = window.setTimeout(recentralizar, 180) }
    function entrar() { sobre = true }
    function sair() { sobre = false }
    const area = trilho.parentElement!
    const tamanho = new ResizeObserver(medir)
    tamanho.observe(trilho)
    const intersecao = new IntersectionObserver(([entrada]) => { visivel = entrada.isIntersecting }, { threshold: .15 })
    intersecao.observe(trilho)
    trilho.addEventListener('scroll', aoRolar, { passive: true })
    trilho.addEventListener('pointerdown', aoPressionar, { passive: true })
    window.addEventListener('pointerup', aoSoltar, { passive: true })
    window.addEventListener('pointercancel', aoSoltar, { passive: true })
    area.addEventListener('mouseenter', entrar)
    area.addEventListener('mouseleave', sair)
    const intervalo = window.setInterval(() => {
      if (pausaRef.current || reduzir.matches || sobre || pressionado || !visivel || document.hidden || document.querySelector('dialog[open]') || area.contains(document.activeElement) || Date.now() < interacaoAte) return
      mover(1, false)
    }, 5200)
    medir()
    return () => {
      clearInterval(intervalo)
      clearTimeout(temporizador)
      cancelAnimationFrame(quadro)
      cancelAnimationFrame(quadroScroll)
      tamanho.disconnect()
      intersecao.disconnect()
      trilho.removeEventListener('scroll', aoRolar)
      trilho.removeEventListener('pointerdown', aoPressionar)
      window.removeEventListener('pointerup', aoSoltar)
      window.removeEventListener('pointercancel', aoSoltar)
      area.removeEventListener('mouseenter', entrar)
      area.removeEventListener('mouseleave', sair)
      navegarRef.current = () => {}
    }
  }, [total])

  return (
    <div className="carrossel-projetos" role="region" aria-roledescription="carrossel" aria-label="Projetos de exemplo">
      <div className="trilho-projetos" id={id} ref={trilhoRef}>
        {[0, 1, 2].flatMap(copia => children.map((cartao, indice) => (
          <div className="slide-projeto" key={`${copia}-${indice}`} role="group" aria-roledescription="slide"
            aria-label={`${indice + 1} de ${total}: ${nomes[indice]}`} inert={copia !== 1} aria-hidden={copia !== 1 ? true : undefined}>
            {cartao}
          </div>
        )))}
      </div>
      <div className="controles-carrossel" role="group" aria-label="Navegar pelos projetos">
        <button className="seta-carrossel seta-carrossel-anterior" type="button" aria-label="Projeto anterior" aria-controls={id} onClick={() => navegarRef.current(-1)}><Icone nome="seta" tamanho={20} aria-hidden="true" /></button>
        <div className="posicao-carrossel"><span>{ativo + 1} de {total}</span><strong>{nomes[ativo]}</strong></div>
        <button className="seta-carrossel seta-carrossel-proximo" type="button" aria-label="Próximo projeto" aria-controls={id} onClick={() => navegarRef.current(1)}><Icone nome="seta" tamanho={20} aria-hidden="true" /></button>
        <div className="pontos-carrossel" role="group" aria-label="Escolher projeto">
          {nomes.map((nome, indice) => (
            <button key={nome} type="button" aria-label={`Ir para ${nome}`} aria-current={ativo === indice ? 'true' : undefined}
              aria-controls={id} onClick={() => navegarRef.current(indice - ativo)} />
          ))}
        </div>
        <button className="pausa-carrossel" type="button" aria-pressed={pausado} onClick={() => definirPausado(!pausado)}>{pausado ? 'Retomar' : 'Pausar'}</button>
      </div>
    </div>
  )
}
