'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

type WakeSliderProps = {
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  bars?: number
  height?: number
  restHeight?: number
  gap?: number
  fillColor?: string
  trackColor?: string
  crestColor?: string
  sensitivity?: number
  reach?: number
  skew?: number
  glide?: number
  smoothing?: number
  showValue?: boolean
  formatValue?: (value: number) => string
  disabled?: boolean
  ariaLabel?: string
  className?: string
}

function limitar(valor: number, minimo: number, maximo: number) {
  return Math.min(maximo, Math.max(minimo, valor))
}

function arredondarPasso(valor: number, minimo: number, passo: number) {
  if (passo <= 0) return valor
  return Math.round((valor - minimo) / passo) * passo + minimo
}

export default function WakeSlider({
  value,
  defaultValue = 50,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  bars = 32,
  height = 56,
  restHeight = 12,
  gap = 4,
  fillColor = '#f5f5f5',
  trackColor = '#27272a',
  crestColor = '',
  sensitivity = 1,
  reach = 6,
  skew = 0.6,
  glide = 0.3,
  smoothing = 100,
  showValue = false,
  formatValue,
  disabled = false,
  ariaLabel = 'Value',
  className = '',
}: WakeSliderProps) {
  const controlado = typeof value === 'number'
  const [valorInterno, definirValorInterno] = useState(() => limitar(defaultValue, min, max))
  const valorAtual = limitar(controlado ? (value as number) : valorInterno, min, max)
  const [velocidade, definirVelocidade] = useState(0)
  const [direcao, definirDirecao] = useState<1 | -1>(1)
  const [arrastando, definirArrastando] = useState(false)
  const trilhoRef = useRef<HTMLDivElement | null>(null)
  const ultimoRef = useRef({ x: 0, tempo: 0, valor: valorAtual })
  const relaxarRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const proporcao = max === min ? 0 : (valorAtual - min) / (max - min)
  const indiceAtivo = proporcao * Math.max(0, bars - 1)

  useEffect(() => {
    ultimoRef.current.valor = valorAtual
  }, [valorAtual])

  useEffect(() => {
    return () => {
      if (relaxarRef.current) clearTimeout(relaxarRef.current)
    }
  }, [])

  const atualizarValor = useCallback((proximo: number) => {
    const ajustado = limitar(arredondarPasso(proximo, min, step), min, max)
    if (!controlado) definirValorInterno(ajustado)
    onChange?.(ajustado)
  }, [controlado, max, min, onChange, step])

  const registrarMovimento = useCallback((x: number, tempo: number) => {
    const anterior = ultimoRef.current
    if (anterior.tempo > 0) {
      const deltaTempo = Math.max(8, tempo - anterior.tempo)
      const deltaX = x - anterior.x
      if (Math.abs(deltaX) > 0.2) definirDirecao(deltaX >= 0 ? 1 : -1)
      const pxPorMs = Math.abs(deltaX) / deltaTempo
      const novaVelocidade = limitar(pxPorMs * 5.5 * sensitivity, 0, 1)
      definirVelocidade((atual) => atual * 0.35 + novaVelocidade * 0.65)
    }
    ultimoRef.current.x = x
    ultimoRef.current.tempo = tempo

    if (relaxarRef.current) clearTimeout(relaxarRef.current)
    relaxarRef.current = setTimeout(() => definirVelocidade(0), Math.max(80, smoothing))
  }, [sensitivity, smoothing])

  const valorPorPonteiro = useCallback((clientX: number, tempo: number) => {
    const trilho = trilhoRef.current
    if (!trilho || disabled) return
    const caixa = trilho.getBoundingClientRect()
    const percentual = limitar((clientX - caixa.left) / Math.max(1, caixa.width), 0, 1)
    registrarMovimento(clientX, tempo)
    atualizarValor(min + percentual * (max - min))
  }, [atualizarValor, disabled, max, min, registrarMovimento])

  function iniciar(evento: React.PointerEvent<HTMLDivElement>) {
    if (disabled) return
    evento.currentTarget.setPointerCapture?.(evento.pointerId)
    definirArrastando(true)
    ultimoRef.current = { x: evento.clientX, tempo: evento.timeStamp, valor: valorAtual }
    valorPorPonteiro(evento.clientX, evento.timeStamp)
  }

  function mover(evento: React.PointerEvent<HTMLDivElement>) {
    if (!arrastando || disabled) return
    valorPorPonteiro(evento.clientX, evento.timeStamp)
  }

  function finalizar(evento: React.PointerEvent<HTMLDivElement>) {
    if (!arrastando) return
    definirArrastando(false)
    evento.currentTarget.releasePointerCapture?.(evento.pointerId)
    if (relaxarRef.current) clearTimeout(relaxarRef.current)
    relaxarRef.current = setTimeout(() => definirVelocidade(0), Math.max(90, smoothing))
  }

  function teclado(evento: React.KeyboardEvent<HTMLDivElement>) {
    if (disabled) return
    const incremento = evento.shiftKey ? step * 5 : step
    if (evento.key === 'ArrowRight' || evento.key === 'ArrowUp') {
      evento.preventDefault()
      definirDirecao(1)
      definirVelocidade(0.42)
      atualizarValor(valorAtual + incremento)
    }
    if (evento.key === 'ArrowLeft' || evento.key === 'ArrowDown') {
      evento.preventDefault()
      definirDirecao(-1)
      definirVelocidade(0.42)
      atualizarValor(valorAtual - incremento)
    }
    if (evento.key === 'Home') {
      evento.preventDefault()
      atualizarValor(min)
    }
    if (evento.key === 'End') {
      evento.preventDefault()
      atualizarValor(max)
    }
  }

  const barras = useMemo(() => Array.from({ length: Math.max(2, bars) }), [bars])
  const leitura = formatValue ? formatValue(valorAtual) : String(Math.round(valorAtual * 100) / 100)

  return (
    <div className={`wake-slider ${className}`.trim()} style={{ ['--wake-gap' as string]: `${gap}px` }}>
      <div
        ref={trilhoRef}
        className={`wake-slider-track ${arrastando ? 'is-dragging' : ''} ${disabled ? 'is-disabled' : ''}`}
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-label={ariaLabel}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={valorAtual}
        aria-valuetext={leitura}
        onPointerDown={iniciar}
        onPointerMove={mover}
        onPointerUp={finalizar}
        onPointerCancel={finalizar}
        onKeyDown={teclado}
      >
        {barras.map((_, indice) => {
          const distanciaBase = indice - indiceAtivo
          const atras = direcao > 0 ? distanciaBase < 0 : distanciaBase > 0
          const alcanceDirecional = reach * (atras ? 1 + skew : Math.max(0.28, 1 - skew * 0.65))
          const distancia = Math.abs(distanciaBase)
          const proximidade = limitar(1 - distancia / Math.max(0.8, alcanceDirecional), 0, 1)
          const curva = proximidade * proximidade * (3 - 2 * proximidade)
          const lift = curva * velocidade
          const altura = restHeight + (height - restHeight) * lift
          const preenchida = indice <= indiceAtivo
          const crestMix = crestColor ? lift : 0

          return (
            <span
              key={indice}
              className="wake-slider-bar-wrap"
              style={{ height: `${height}px` }}
            >
              <span
                className="wake-slider-bar"
                style={{
                  height: `${Math.max(restHeight, altura)}px`,
                  backgroundColor: preenchida ? fillColor : trackColor,
                  boxShadow: crestColor && crestMix > 0.02
                    ? `0 0 ${Math.round(18 * crestMix)}px ${crestColor}`
                    : 'none',
                  transitionDuration: `${Math.max(0.08, glide)}s`,
                }}
              />
            </span>
          )
        })}
      </div>

      {showValue && <output className="wake-slider-value">{leitura}</output>}
    </div>
  )
}
