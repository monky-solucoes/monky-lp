import Image from 'next/image'
import Link from 'next/link'
import Icone from '@/components/Icone'
import { criarLinkContatoGenerico } from '@/utils/whatsapp'

export default function SecaoHero() {
  return (
    <section className="secao-hero">
      <div className="container conteudo-hero">
        <div className="texto-hero">
          <p className="assinatura">Menos rotina. Mais resultado.</p>
          <h1>Sistemas, sites e automações para o seu negócio.</h1>
          <p>Criamos soluções sob medida para organizar processos, automatizar tarefas e ajudar sua empresa a crescer.</p>
          <div className="acoes-hero">
            <a className="botao botao-claro" href={criarLinkContatoGenerico()} target="_blank" rel="noreferrer" data-analytics-origem="hero">
              Falar com a Monky <Icone nome="seta" tamanho={18} aria-hidden="true" />
            </a>
            <Link className="botao botao-secundario" href="/projetos">Ver projetos</Link>
          </div>
          <p className="orientacao-hero">Não precisa saber qual sistema pedir. Conte onde sua empresa perde tempo ou organização — a gente ajuda a definir o caminho.</p>
        </div>
        <div className="arte-hero">
          <Image src="/images/hero-dominos.png" alt="" width={1672} height={941} priority
            sizes="(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 600px" />
        </div>
      </div>
    </section>
  )
}
