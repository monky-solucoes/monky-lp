import Icone from '@/components/Icone'
import Link from 'next/link'

const valores = [
  { icone: 'check' as const, titulo: 'Simplicidade', texto: 'Ferramentas claras, com as funções que fazem sentido para o dia a dia.' },
  { icone: 'chat' as const, titulo: 'Contato próximo', texto: 'Uma conversa direta para alinhar necessidades, decisões e próximos passos.' },
  { icone: 'alvo' as const, titulo: 'Soluções sob medida', texto: 'O projeto parte da rotina da empresa, não de um pacote único.' },
  { icone: 'camadas' as const, titulo: 'Evolução contínua', texto: 'Uma base que pode receber melhorias conforme surgem novas necessidades.' },
]

export default function SecaoSobre() {
  return (
    <section className="secao secao-sobre sobre-editorial">
      <div className="container">
        <div className="apresentacao-sobre">
          <div><h1>Tecnologia para negócios reais.</h1><p>A Monky cria soluções digitais para empresas que querem organizar processos, automatizar tarefas e melhorar sua presença digital.</p>
            <p>Primeiro entendemos o problema. Depois construímos o que realmente faz sentido.</p>
            <p className="localizacao-sobre">Desenvolvido em Pelotas/RS.</p>
            <Link className="link-seta" href="/como-funciona">Conheça nosso jeito de trabalhar <Icone nome="seta" tamanho={18} /></Link>
          </div>
          <aside className="compromisso-monky" aria-labelledby="titulo-compromisso">
            <h2 id="titulo-compromisso">A melhor tecnologia é a que faz sentido para quem usa.</h2>
            <p>Não começa pela ferramenta. Começa pela sua rotina, pelas pessoas e pelo problema que precisa ser resolvido.</p>
            <ul>
              <li><Icone nome="check" tamanho={20} aria-hidden="true" /><span>Escopo combinado antes de desenvolver</span></li>
              <li><Icone nome="check" tamanho={20} aria-hidden="true" /><span>Validação com você durante o projeto</span></li>
              <li><Icone nome="check" tamanho={20} aria-hidden="true" /><span>Melhorias conforme a operação precisar</span></li>
            </ul>
          </aside>
        </div>
        <div className="cabecalho-valores"><h2 className="titulo-valores">O que valorizamos</h2><p>Princípios que orientam o que construímos e como conversamos.</p></div>
        <div className="grade-valores">
          {valores.map((valor) => <article key={valor.titulo}><span className="icone-valor"><Icone nome={valor.icone} tamanho={25} aria-hidden="true" /></span><div><h3>{valor.titulo}</h3><p>{valor.texto}</p></div></article>)}
        </div>
      </div>
    </section>
  )
}
