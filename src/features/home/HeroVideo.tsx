'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [finalizado, setFinalizado] = useState(false)
  const [reduzirMovimento, setReduzirMovimento] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const atualizar = () => setReduzirMovimento(media.matches)
    atualizar()
    media.addEventListener?.('change', atualizar)
    return () => media.removeEventListener?.('change', atualizar)
  }, [])

  useEffect(() => {
    if (reduzirMovimento) setFinalizado(true)
  }, [reduzirMovimento])

  return (
    <div className={`hero-video ${finalizado ? 'hero-video-finalizado' : ''}`}>
      <Image
        src="/images/hero-video-final.jpg"
        alt="Sequência visual da Monky representando automação, organização e crescimento"
        fill
        priority
        sizes="(max-width: 900px) 100vw, 58vw"
        className="hero-video-poster"
      />

      {!reduzirMovimento && (
        <video
          ref={videoRef}
          className="hero-video-elemento"
          src="/videos/monky-header.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={() => setFinalizado(true)}
          aria-hidden="true"
        />
      )}

      <div className="hero-video-mascara" aria-hidden="true" />
      <div className="hero-video-assinatura">
        <span>monky soluções</span>
        <strong>Menos complicação. Mais resultado.</strong>
      </div>
    </div>
  )
}
