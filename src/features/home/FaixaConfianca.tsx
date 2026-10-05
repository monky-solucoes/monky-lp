import Icone from '@/components/Icone'
import { demonstracoes } from '@/data/demonstracoes'
import { automacoes } from '@/data/automacoes'

const setores = [
  { icone: 'escudo' as const, nome: 'Saúde e Beleza' },
  { icone: 'carro' as const, nome: 'Automotivo' },
  { icone: 'mercado' as const, nome: 'E-commerce e Varejo' },
  { icone: 'oficina' as const, nome: 'Serviços e Oficinas' },
  { icone: 'camadas' as const, nome: 'Imobiliário e Construção' },
  { icone: 'codigo' as const, nome: 'Tecnologia e SaaS' },
]

const totalProjetos = demonstracoes.length + automacoes.length

const pontosConfianca = [
  {
    icone: 'alvo' as const,
    titulo: 'Desenvolvimento sob medida',
    texto: 'A solução parte da rotina real da sua empresa, não de um pacote pronto.',
  },
  {
    icone: 'check' as const,
    titulo: 'Começamos pelo essencial',
    texto: 'Sem encher o projeto de funções que sua empresa não vai usar.',
  },
  {
    icone: 'camadas' as const,
    titulo: 'Feito para evoluir',
    texto: 'A solução pode ganhar novos módulos e automações conforme a necessidade.',
  },
]

export default function FaixaConfianca() {
  return (
    <section className="faixa-confianca" aria-label="Como a Monky trabalha">
      <div className="container grade-confianca">
        {pontosConfianca.map((ponto) => (
          <article key={ponto.titulo} className="ponto-confianca">
            <span className="icone-confianca" aria-hidden="true">
              <Icone nome={ponto.icone} tamanho={20} />
            </span>
            <div>
              <h2>{ponto.titulo}</h2>
              <p>{ponto.texto}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="prova-social" aria-label="Setores atendidos e projetos">
        <div className="container">
          <div className="prova-social-numeros">
            <strong>{totalProjetos}+</strong>
            <span>projetos conceituais</span>
          </div>
          <div className="prova-social-setores">
            <span className="setores-label">Atendemos:</span>
            <ul className="lista-setores">
              {setores.map((setor) => (
                <li key={setor.nome}><Icone nome={setor.icone} tamanho={16} aria-hidden="true" />{setor.nome}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
