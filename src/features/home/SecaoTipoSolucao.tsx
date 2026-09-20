import Icone from '@/components/Icone'
import Revelar from '@/components/Revelar'
import { criarLinkContatoGenerico } from '@/utils/whatsapp'

const exemplos = [
  {
    titulo: 'Clínica',
    lp: 'Apresenta serviços, transmite confiança e leva o visitante ao agendamento.',
    sistema: 'Organiza agenda, pacientes, histórico, atendimentos e rotinas internas.',
  },
  {
    titulo: 'Revenda de carros',
    lp: 'Mostra os veículos, diferenciais da loja e gera contatos de interessados.',
    sistema: 'Controla estoque, leads, propostas, reservas, vendas e acompanhamento comercial.',
  },
  {
    titulo: 'Alimentação',
    lp: 'Apresenta cardápio, promoções e direciona o cliente para fazer o pedido.',
    sistema: 'Organiza pedidos, produção, estoque, clientes e indicadores da operação.',
  },
]

export default function SecaoTipoSolucao() {
  return (
    <section className="secao secao-tipo-solucao" id="tipo-solucao">
      <div className="container">
        <div className="cabecalho-secao cabecalho-secao-dividido cabecalho-tipo-solucao">
          <div>
            <span className="sobretitulo">Landing Page ou Sistema?</span>
            <h2>Qual é a diferença, na prática?</h2>
          </div>
          <p>
            Uma página ajuda o cliente a conhecer e escolher a sua empresa. Um sistema ajuda a sua equipe a trabalhar melhor depois que o cliente chega.
          </p>
        </div>

        <div className="comparacao-tipo-solucao">
          <Revelar>
            <article className="cartao-tipo-solucao cartao-tipo-lp">
              <div className="topo-cartao-tipo-solucao">
                <span className="icone-tipo-solucao"><Icone nome="site" tamanho={25} /></span>
                <span className="etiqueta-tipo-solucao">Para atrair e converter</span>
              </div>
              <h3>Landing Page</h3>
              <p className="definicao-tipo-solucao">
                É uma página feita para <strong>apresentar uma oferta e levar a pessoa a tomar uma ação</strong>, como chamar no WhatsApp, pedir um orçamento ou agendar.
              </p>
              <div className="exemplo-rapido-tipo">
                <span>Exemplo simples</span>
                <strong>“Quero divulgar minha clínica e conseguir mais agendamentos.”</strong>
              </div>
              <ul>
                <li><Icone nome="check" tamanho={15} /> Apresenta a empresa ou serviço</li>
                <li><Icone nome="check" tamanho={15} /> Explica benefícios e diferenciais</li>
                <li><Icone nome="check" tamanho={15} /> Gera contato, venda ou agendamento</li>
                <li><Icone nome="check" tamanho={15} /> Normalmente é mais rápida de lançar</li>
              </ul>
            </article>
          </Revelar>

          <div className="divisor-comparacao" aria-hidden="true">
            <span>ou</span>
          </div>

          <Revelar atraso={0.06}>
            <article className="cartao-tipo-solucao cartao-tipo-sistema">
              <div className="topo-cartao-tipo-solucao">
                <span className="icone-tipo-solucao"><Icone nome="codigo" tamanho={25} /></span>
                <span className="etiqueta-tipo-solucao">Para operar e organizar</span>
              </div>
              <h3>Sistema</h3>
              <p className="definicao-tipo-solucao">
                É uma ferramenta usada no dia a dia para <strong>organizar informações, controlar processos e automatizar tarefas</strong> da empresa.
              </p>
              <div className="exemplo-rapido-tipo">
                <span>Exemplo simples</span>
                <strong>“Quero controlar a agenda, os clientes e o financeiro da minha clínica.”</strong>
              </div>
              <ul>
                <li><Icone nome="check" tamanho={15} /> Possui login e áreas internas</li>
                <li><Icone nome="check" tamanho={15} /> Guarda e organiza informações</li>
                <li><Icone nome="check" tamanho={15} /> Automatiza partes da operação</li>
                <li><Icone nome="check" tamanho={15} /> Pode crescer com novos módulos</li>
              </ul>
            </article>
          </Revelar>
        </div>

        <div className="exemplos-tipo-solucao">
          <div className="titulo-exemplos-tipo">
            <span>Compare com exemplos do dia a dia</span>
            <strong>A mesma empresa pode precisar dos dois.</strong>
          </div>

          <div className="grade-exemplos-tipo">
            {exemplos.map((exemplo, indice) => (
              <Revelar key={exemplo.titulo} atraso={indice * 0.04}>
                <article>
                  <h3>{exemplo.titulo}</h3>
                  <div>
                    <span>Landing Page</span>
                    <p>{exemplo.lp}</p>
                  </div>
                  <div>
                    <span>Sistema</span>
                    <p>{exemplo.sistema}</p>
                  </div>
                </article>
              </Revelar>
            ))}
          </div>
        </div>

        <div className="ajuda-escolha-tipo">
          <div>
            <span className="sobretitulo">Ainda não sabe qual precisa?</span>
            <h3>Conte o problema. A solução vem depois.</h3>
            <p>A gente entende como sua empresa trabalha e indica o formato que faz sentido, sem empurrar complexidade desnecessária.</p>
          </div>
          <a
            className="botao botao-roxo"
            href={criarLinkContatoGenerico()}
            target="_blank"
            rel="noreferrer"
            data-analytics-origem="tipo_solucao_ajuda"
          >
            Contar meu problema <Icone nome="seta" tamanho={17} />
          </a>
        </div>
      </div>
    </section>
  )
}
