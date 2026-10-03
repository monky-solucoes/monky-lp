import Link from 'next/link'
import Icone from '@/components/Icone'
import { servicos } from '@/data/servicos'

export default function SecaoSolucoes() {
  return (
    <section className="secao resumo-solucoes" aria-labelledby="titulo-solucoes">
      <div className="container">
        <div className="cabecalho-secao">
          <h2 id="titulo-solucoes">Soluções para simplificar o seu negócio</h2>
          <Link className="link-seta" href="/solucoes">Ver todas as soluções <Icone nome="seta" tamanho={18} aria-hidden="true" /></Link>
        </div>
        <p className="introducao-solucoes">Sua empresa não precisa se adaptar a um sistema cheio de funções que não usa. Podemos criar uma ferramenta para a sua operação, uma página para atrair contatos ou um fluxo que conecte tarefas. Começamos pelo que precisa funcionar melhor.</p>
        <div className="grade-solucoes">
          {servicos.slice(0, 3).map((solucao) => (
            <article className="cartao-solucao" key={solucao.nome}>
              <span className="icone-bloco"><Icone nome={solucao.icone} tamanho={25} aria-hidden="true" /></span>
              <h3>{solucao.nome}</h3>
              <p>{solucao.resumo}</p>
              <div className="exemplos-solucao"><strong>Na prática</strong><ul>{(solucao.icone === 'codigo' ? ['Pedidos, estoque e ordens de serviço', 'Informações em um só lugar'] : solucao.icone === 'site' ? ['Serviços apresentados com clareza', 'Contato e agendamento facilitados'] : ['Contatos encaminhados à equipe', 'Avisos de vencimento e status']).map(exemplo => <li key={exemplo}><Icone nome="check" tamanho={16} />{exemplo}</li>)}</ul></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
