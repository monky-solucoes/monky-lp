'use client'

import { useEffect, useState } from 'react'
import WakeSlider from './WakeSlider'

export default function WakeHeroBackground() {
  const [compacto, definirCompacto] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 640px)')
    const sincronizar = () => definirCompacto(media.matches)
    sincronizar()
    media.addEventListener('change', sincronizar)
    return () => media.removeEventListener('change', sincronizar)
  }, [])

  return (
    <div className="wake-hero-background">
      <WakeSlider
        defaultValue={58}
        min={0}
        max={100}
        step={1}
        bars={compacto ? 24 : 46}
        height={compacto ? 58 : 96}
        restHeight={compacto ? 8 : 12}
        gap={compacto ? 5 : 7}
        fillColor="rgba(214, 195, 255, 0.82)"
        trackColor="rgba(255, 255, 255, 0.07)"
        crestColor="rgba(145, 94, 255, 0.42)"
        sensitivity={1.15}
        reach={compacto ? 5 : 8}
        skew={0.72}
        glide={0.26}
        smoothing={120}
        disabled={false}
        ariaLabel="Efeito visual interativo Monky"
        className="wake-slider-hero"
      />
    </div>
  )
}
