import type { Metadata } from 'next'
import HeroInterno from '@/components/HeroInterno'
import Icone from '@/components/Icone'
import { servicos } from '@/data/servicos'
import SecaoTipoSolucao from '@/features/home/SecaoTipoSolucao'
import SecaoChamadaFinal from '@/features/home/SecaoChamadaFinal'
import { criarLinkSolucao } from '@/utils/whatsapp'
import { StructuredDataService } from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Soluções',
  description: 'Sistemas personalizados, sites, automações, atendimento e dashboards criados para a rotina da sua empresa.',
}

export default function PaginaSolucoes() {
  return (
    <>
      <HeroInterno titulo="Soluções feitas para a rotina do seu negócio"
        texto="Não trabalhamos com um pacote único. Cada solução parte do problema que precisa ser resolvido."
        className="hero-interno--com-banner" />
      <section className="secao servicos-completos" aria-label="Nossas soluções">
        <div className="container grade-servicos">
          {servicos.map((servico) => (
            <>
              <StructuredDataService
                serviceName={servico.nome}
                description={servico.descricao}
                url={`https://monky-lp-zeta.vercel.app/solucoes#${servico.nome.toLowerCase().replace(/\s+/g, '-')}`}
              />
              <a className="cartao-servico" key={servico.nome} href={criarLinkSolucao(servico.nome)} target="_blank" rel="noreferrer" data-analytics-origem={`solucoes_${servico.icone}`}>
                <span className="icone-bloco"><Icone nome={servico.icone} tamanho={26} aria-hidden="true" /></span>
                <h2>{servico.nome}</h2><p>{servico.descricao}</p>
                <h3>Possibilidades para o seu projeto</h3>
                <ul>{servico.exemplos.map((exemplo) => <li key={exemplo}>{exemplo}</li>)}</ul>
              </a>
            </>
          ))}
          <aside className="orientacao-servicos"><Icone nome="chat" tamanho={32} aria-hidden="true" /><h2>O ponto de partida é a sua rotina.</h2><p>Essas são possibilidades de desenvolvimento sob medida. O escopo de cada solução é definido depois de entender o seu problema.</p></aside>
        </div>
      </section>
      <SecaoTipoSolucao />
      <SecaoChamadaFinal titulo="Não encontrou exatamente o que precisa?" texto="Conte o problema. A solução vem depois." rotulo="Contar meu problema" origem="solucoes_final" />
    </>
  )
}
