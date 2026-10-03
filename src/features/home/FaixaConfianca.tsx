import Icone from '@/components/Icone'

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
    </section>
  )
}
