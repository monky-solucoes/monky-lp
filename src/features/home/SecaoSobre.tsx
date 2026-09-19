import Icone from '@/components/Icone'
import Revelar from '@/components/Revelar'

const diferenciais = [
  {
    icone: 'alvo' as const,
    titulo: 'Feito para o problema certo',
    texto: 'A solução parte da rotina da empresa, não de um pacote genérico cheio de funções que ninguém usa.',
  },
  {
    icone: 'camadas' as const,
    titulo: 'Começa simples e pode crescer',
    texto: 'Dá para lançar o essencial primeiro e adicionar automações, relatórios e novos módulos conforme a necessidade.',
  },
  {
    icone: 'chat' as const,
    titulo: 'Contato direto durante o projeto',
    texto: 'Ajustes e decisões são tratados de forma próxima para o sistema continuar alinhado ao uso real.',
  },
]

export default function SecaoSobre() {
  return (
    <section className="secao secao-sobre" id="sobre">
      <div className="container conteudo-sobre">
        <div className="bloco-sobre-principal">
          <span className="sobretitulo">Sobre a Monky</span>
          <h2>Tecnologia prática para negócios que querem evoluir.</h2>
          <p>
            A Monky cria sistemas, sites e automações pensados para resolver problemas reais da operação. A ideia é deixar processos mais claros, reduzir trabalho manual e criar uma base digital que acompanhe o crescimento da empresa.
          </p>
          <div className="assinatura-sobre">
            <span className="marca-sobre">MONKY</span>
          </div>
        </div>

        <div className="grade-diferenciais-sobre">
          {diferenciais.map((item, indice) => (
            <Revelar key={item.titulo} atraso={indice * 0.06}>
              <article className="diferencial-sobre">
                <span className="icone-diferencial"><Icone nome={item.icone} tamanho={22} /></span>
                <div>
                  <h3>{item.titulo}</h3>
                  <p>{item.texto}</p>
                </div>
              </article>
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  )
}
