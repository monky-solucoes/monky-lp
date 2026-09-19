'use client'

import HeroVideo from './HeroVideo'
import { rastrearCliqueWhatsApp, rastrearEvento } from '@/utils/analytics'
import { criarLinkContatoGenerico } from '@/utils/whatsapp'

export default function SecaoHero() {
  return (
    <section className="secao-hero hero-video-banner" id="inicio">
      <div className="container conteudo-hero">
        <div className="texto-hero entrada-hero-texto">
          <span className="sobretitulo sobretitulo-claro">Tecnologia para negócios reais</span>
          <h1>
            Menos rotina.
            <span>Mais resultado.</span>
          </h1>

          <p>
            Sistemas, sites e automações pensados para simplificar processos,
            organizar a operação e ajudar o seu negócio a crescer.
          </p>

          <div className="acoes-hero">
            <a
              className="botao botao-claro"
              href="#demonstracoes"
              onClick={() => rastrearEvento('hero_cta_click', { destino: 'demonstracoes' })}
            >
              Ver exemplos <span>→</span>
            </a>

            <a
              className="botao botao-transparente"
              href={criarLinkContatoGenerico()}
              target="_blank"
              rel="noreferrer"
              onClick={() => rastrearCliqueWhatsApp('hero')}
            >
              Falar com a Monky
            </a>
          </div>
        </div>

        <div className="arte-hero entrada-hero-arte">
          <HeroVideo />
        </div>

        <div className="rodape-hero" aria-hidden="true">
          <span className="linha-hero" />
          <span>Do problema à solução</span>
        </div>
      </div>
    </section>
  )
}
