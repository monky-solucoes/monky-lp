import Image from 'next/image'
import Link from 'next/link'
import Icone from '@/components/Icone'
import { criarLinkHero } from '@/utils/whatsapp'
import heroDominos from '../../../public/images/hero-dominos.webp'

export default function SecaoHero() {
  return (
    <section className="secao-hero">
      <div className="container conteudo-hero">
        <div className="texto-hero">
          <p className="assinatura"><span className="assinatura-marco" aria-hidden="true"></span>Menos rotina. Mais resultado.</p>
          <h1>Sistemas e automações<br />para negócios reais.</h1>
          <p>Criamos sistemas, sites e automações sob medida para organizar processos, reduzir tarefas manuais e acelerar resultados.</p>
          <div className="acoes-hero">
            <a className="botao botao-claro" href={criarLinkHero()} target="_blank" rel="noreferrer" data-analytics-origem="hero">
              Falar com a Monky <Icone nome="seta" tamanho={18} aria-hidden="true" />
            </a>
            <Link className="botao botao-secundario" href="/projetos">Ver projetos</Link>
          </div>
          <p className="orientacao-hero">Conte onde sua rotina trava. A gente desenha a solução.</p>
        </div>
        <div className="arte-hero">
          <Image src={heroDominos} alt="" priority
            sizes="(max-width: 480px) calc(100vw - 40px), (max-width: 820px) 430px, (max-width: 1200px) 50vw, 600px" />
        </div>
      </div>
    </section>
  )
}
