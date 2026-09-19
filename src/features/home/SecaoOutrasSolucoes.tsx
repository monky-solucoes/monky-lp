import Icone from '@/components/Icone'
import { demonstracoes } from '@/data/demonstracoes'
import { criarLinkContatoGenerico, criarLinkWhatsApp } from '@/utils/whatsapp'

const demonstracaoWhatsApp = demonstracoes.find((demonstracao) => demonstracao.id === 'automacao-whatsapp')
const demonstracaoSite = demonstracoes.find((demonstracao) => demonstracao.id === 'site-institucional')

const outrasSolucoes = [
  {
    icone: 'whatsapp' as const,
    nome: 'Automação de WhatsApp',
    descricao: 'Atendimento e vendas com menos trabalho repetitivo.',
    link: demonstracaoWhatsApp ? criarLinkWhatsApp(demonstracaoWhatsApp.mensagemWhatsApp) : criarLinkContatoGenerico(),
  },
  {
    icone: 'site' as const,
    nome: 'Sites institucionais',
    descricao: 'Sua empresa com presença profissional e mais credibilidade.',
    link: demonstracaoSite ? criarLinkWhatsApp(demonstracaoSite.mensagemWhatsApp) : criarLinkContatoGenerico(),
  },
  {
    icone: 'codigo' as const,
    nome: 'Sistemas personalizados',
    descricao: 'Soluções sob medida para o processo real da sua empresa.',
    link: criarLinkContatoGenerico(),
  },
]

export default function SecaoOutrasSolucoes() {
  return (
    <section className="secao-outras-solucoes">
      <div className="container">
        <span className="sobretitulo">Também podemos construir</span>
        <div className="grade-outras-solucoes">
          {outrasSolucoes.map((solucao) => (
            <a className="cartao-outra-solucao" key={solucao.nome} href={solucao.link} target="_blank" rel="noreferrer">
              <span className="icone-outra-solucao"><Icone nome={solucao.icone} tamanho={22} /></span>
              <div>
                <h3>{solucao.nome}</h3>
                <p>{solucao.descricao}</p>
              </div>
              <span className="seta-outra-solucao"><Icone nome="seta" tamanho={16} /></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
