import Icone from '@/components/Icone'
import Revelar from '@/components/Revelar'
import { solucoes } from '@/data/solucoes'

export default function SecaoSolucoes() {
  return (
    <section className="secao secao-solucoes" id="solucoes">
      <div className="container">
        <div className="cabecalho-secao cabecalho-secao-dividido">
          <div>
            <span className="sobretitulo">Nossas soluções</span>
            <h2>Tecnologia que trabalha pelo seu negócio.</h2>
          </div>

          <p>
            Não entregamos só uma tela bonita. Criamos ferramentas para vender,
            organizar, atender e ganhar tempo na operação.
          </p>
        </div>

        <div className="grade-solucoes">
          {solucoes.map((solucao, indice) => (
            <Revelar key={solucao.nome} atraso={indice * 0.055}>
              <article className="cartao-solucao">
                <span className="simbolo-solucao"><Icone nome={solucao.icone} tamanho={24} /></span>
                <h3>{solucao.nome}</h3>
                <p>{solucao.descricao}</p>
                <a className="seta-cartao-solucao" href={solucao.destino} aria-label={solucao.chamada}>
                  <Icone nome="seta" tamanho={18} />
                </a>
              </article>
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  )
}
