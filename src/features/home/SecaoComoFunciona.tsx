'use client'

import Icone from '@/components/Icone'
import Link from 'next/link'
import Image from 'next/image'

const etapas = [
  {
    numero: '01',
    titulo: 'Você conta o problema',
    descricao: 'Explique sua rotina, dificuldade ou ideia.'
  },
  {
    numero: '02',
    titulo: 'A gente entende',
    descricao: 'Mapeamos o que acontece hoje e onde está o problema.'
  },
  {
    numero: '03',
    titulo: 'Definimos o essencial',
    descricao: 'Combinamos o que entra na primeira versão.'
  },
  {
    numero: '04',
    titulo: 'Desenvolvemos',
    descricao: 'Transformamos a ideia em telas e fluxos.'
  },
  {
    numero: '05',
    titulo: 'Você testa',
    descricao: 'Você valida a solução antes da entrega final.'
  },
  {
    numero: '06',
    titulo: 'Ajustamos e colocamos no ar',
    descricao: 'Refinamos detalhes e entregamos pronta para uso.'
  },
]

export default function SecaoComoFunciona() {
  return (
    <>
      <section className="hero-processo">
        <div className="container abertura-processo">
          <div>
            <h1>Você não precisa chegar sabendo o que precisa.</h1>
            <p>Conte o problema. A solução vem depois.</p>
            <p className="apoio-processo">Uma conversa direta, um escopo claro e você participando das decisões. É assim que uma dificuldade da rotina começa a virar solução.</p>
            <a className="link-seta" href="#etapas">Conheça o caminho <Icone nome="seta" tamanho={18} /></a>
          </div>
          <figure className="foto-conversa">
            <Image src="/images/conversa-monky.webp" alt="Cena ilustrativa de uma pessoa sorrindo durante uma conversa de trabalho com notebook." fill priority sizes="(max-width: 520px) calc(100vw - 40px), (max-width: 820px) 480px, 520px" />
            <figcaption><h2>Uma conversa<br />de cada vez.</h2><p>Espaço para ouvir, entender e construir juntos.</p></figcaption>
          </figure>
        </div>
      </section>
      <section className="secao secao-processo" id="etapas" aria-labelledby="titulo-processo">
        <div className="container">
          <header className="cabecalho-processo">
            <h2 id="titulo-processo">Do primeiro contato ao uso no dia a dia.</h2>
            <p>Cada etapa tem um propósito. E uma próxima decisão bem definida.</p>
          </header>
          <ol className="passo-lista">
            {etapas.map((etapa, indice) => (
              <li key={etapa.numero} className="passo-item">
                <div className="passo-conteudo">
                  <span className="passo-numero" aria-hidden="true">{etapa.numero}</span>
                  <div className="passo-texto">
                    <h3>{etapa.titulo}</h3>
                    <p>{etapa.descricao}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
          <div className="cta-final-processo">
            <p>Quer ver o que podemos construir?</p>
            <Link className="botao botao-roxo" href="/projetos">Explorar projetos <Icone nome="seta" tamanho={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </>
  )
}
