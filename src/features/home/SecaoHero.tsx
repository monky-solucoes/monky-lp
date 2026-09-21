'use client'

import Image from 'next/image'
import FundoInterativoHero from '@/components/FundoInterativoHero'
import { rastrearEvento } from '@/utils/analytics'
import { criarLinkContatoGenerico } from '@/utils/whatsapp'

export default function SecaoHero() {
  return (
    <section className="secao-hero hero-dominos" id="inicio">
      <FundoInterativoHero />
      <div className="container conteudo-hero">
        <div className="bloco-texto-hero entrada-hero-texto">
          <div className="texto-hero">
            <span className="sobretitulo sobretitulo-claro">Tecnologia para negócios reais</span>
            <h1>
              Menos rotina.
              <span>Mais resultado.</span>
            </h1>

            <p>
              Sistemas, sites e automações pensados para simplificar processos,
              organizar a operação e ajudar o seu negócio a crescer.
            </p>
          </div>

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
              data-analytics-origem="hero"
            >
              Falar com a Monky
            </a>
          </div>
        </div>

        <div className="arte-hero entrada-hero-arte">
          <Image
            src="/images/hero-dominos.png"
            alt="Dominós da Monky representando automação, organização e crescimento"
            width={1672}
            height={941}
            priority
            sizes="(max-width: 960px) 100vw, 58vw"
          />
        </div>

        <div className="rodape-hero" aria-hidden="true">
          <span className="linha-hero" />
          <span>Do problema à solução</span>
        </div>
      </div>
    </section>
  )
}
