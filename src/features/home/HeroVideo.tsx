'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [finalizado, setFinalizado] = useState(false)
  const [reduzirMovimento, setReduzirMovimento] = useState(false)

  const iniciarVideo = useCallback(() => {
    const video = videoRef.current
    if (!video) return

    video.defaultPlaybackRate = 0.85
    video.playbackRate = 0.85
    void video.play().catch(() => {
      // O poster permanece visível se o navegador bloquear a reprodução automática.
    })
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const atualizar = () => setReduzirMovimento(media.matches)
    atualizar()
    media.addEventListener?.('change', atualizar)
    return () => media.removeEventListener?.('change', atualizar)
  }, [])

  useEffect(() => {
    if (reduzirMovimento) {
      setFinalizado(true)
      return
    }

    setFinalizado(false)
    iniciarVideo()
  }, [iniciarVideo, reduzirMovimento])

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
          controls={false}
          controlsList="nodownload noplaybackrate noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          loop={false}
          muted
          playsInline
          preload="auto"
          tabIndex={-1}
          onLoadedMetadata={iniciarVideo}
          onEnded={() => setFinalizado(true)}
          aria-hidden="true"
        />
      )}

      <div className="hero-video-mascara" aria-hidden="true" />
    </div>
  )
}
