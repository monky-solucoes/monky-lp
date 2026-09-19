import Icone from '@/components/Icone'
import Revelar from '@/components/Revelar'

const etapas = [
  {
    numero: '01',
    icone: 'chat' as const,
    nome: 'Entender',
    descricao: 'A gente mapeia o problema, o processo atual e onde existe perda de tempo ou oportunidade.',
  },
  {
    numero: '02',
    icone: 'codigo' as const,
    nome: 'Construir',
    descricao: 'Desenhamos e desenvolvemos a solução com foco em uma experiência simples de usar no dia a dia.',
  },
  {
    numero: '03',
    icone: 'raio' as const,
    nome: 'Evoluir',
    descricao: 'Depois de colocar em uso, o sistema pode ganhar novas automações, integrações e módulos.',
  },
]

export default function SecaoComoFunciona() {
  return (
    <section className="secao secao-processo" id="como-funciona">
      <div className="container">
        <div className="cabecalho-secao cabecalho-secao-dividido">
          <div>
            <span className="sobretitulo">Como funciona</span>
            <h2>Da dor do negócio até uma solução funcionando.</h2>
          </div>
          <p>
            Sem complicar o que pode ser simples. O foco é construir o que realmente melhora a operação e pode gerar retorno.
          </p>
        </div>

        <div className="linha-processo">
          {etapas.map((etapa, indice) => (
            <Revelar key={etapa.numero} atraso={indice * 0.07}>
              <article className="etapa-processo">
                <div className="topo-etapa-processo">
                  <span className="icone-etapa"><Icone nome={etapa.icone} tamanho={22} /></span>
                  <strong>{etapa.numero}</strong>
                </div>
                <h3>{etapa.nome}</h3>
                <p>{etapa.descricao}</p>
              </article>
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  )
}
