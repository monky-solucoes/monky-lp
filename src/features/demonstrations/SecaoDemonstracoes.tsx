'use client'

import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useRef, useState } from 'react'
import Icone from '@/components/Icone'
import { demonstracoes } from '@/data/demonstracoes'
import { automacoes } from '@/data/automacoes'
import type { Demonstracao } from '@/types/demonstracao'
import { definirTagClarity, rastrearEvento } from '@/utils/analytics'
import { criarLinkWhatsApp } from '@/utils/whatsapp'
import PainelAutomacao from './PainelAutomacao'
import CarrosselProjetos from './CarrosselProjetos'

const ModalDemonstracao = dynamic(() => import('./ModalDemonstracao'))
const ordemProjetos = ['luxo', 'nexora', 'lumiere', 'contatos-organizados', 'lembretes-vencimento', 'pedidos-acompanhados', 'acaiwave', 'oficinapro', 'vitacare', 'caixapilot', 'carnext', 'dropzone', 'roteza']
const projetos = [...demonstracoes, ...automacoes].sort((a, b) => ordemProjetos.indexOf(a.id) - ordemProjetos.indexOf(b.id))
const idsSistemas = new Set(['oficinapro', 'caixapilot', 'nexora', 'roteza'])
const filtros = ['Todos', 'Sistemas', 'Sites', 'Automação'] as const
type Filtro = typeof filtros[number]

function categoriaFiltro(projeto: Demonstracao): Filtro {
  if (projeto.fluxo) return 'Automação'
  return idsSistemas.has(projeto.id) ? 'Sistemas' : 'Sites'
}

export default function SecaoDemonstracoes({ destaque = false }: { destaque?: boolean }) {
  const [filtro, definirFiltro] = useState<Filtro>('Todos')
  const [projetoAberto, definirProjetoAberto] = useState<Demonstracao | null>(null)
  const acionadorRef = useRef<HTMLButtonElement | null>(null)
  const visiveis = projetos.filter((projeto) => destaque || filtro === 'Todos' || categoriaFiltro(projeto) === filtro)

  function abrir(projeto: Demonstracao, botao: HTMLButtonElement) {
    acionadorRef.current = botao
    definirProjetoAberto(projeto)
    definirTagClarity('demo_aberta', projeto.id)
    rastrearEvento('card_click', { origem: destaque ? 'home' : 'projetos', projeto_id: projeto.id, projeto_nome: projeto.nome, categoria: projeto.categoria })
  }

  function fechar() {
    definirProjetoAberto(null)
    acionadorRef.current?.focus()
  }

  return (
    <section className={`secao secao-projetos ${destaque ? 'projetos-destaque' : ''}`} aria-label={destaque ? 'Alguns projetos' : 'Catálogo de projetos'}>
      <div className="container">
        {destaque && (
          <header className="cabecalho-secao projetos-header">
            <div className="projetos-header-texto">
              <h2>Alguns projetos</h2>
              <p className="projetos-subtitulo">Exemplos de sistemas, sites e automações que podemos adaptar à rotina da sua empresa.
              </p>
            </div>
          </header>
        )}
        {!destaque && (
          <>
            <header className="cabecalho-secao projetos-header">
              <div className="projetos-header-texto">
                <h2>Explore por categoria</h2>
                <p className="projetos-subtitulo">Exemplos de sistemas, sites e automações que podemos adaptar à rotina da sua empresa.
              </p>
              </div>
            </header>
            <div className="barra-filtros">
              <div className="filtros-projetos" role="group" aria-label="Filtrar projetos">
                {filtros.map((item) => <button key={item} type="button" aria-pressed={filtro === item}
                  onClick={() => definirFiltro(item)}>{item}</button>)}
              </div>
              <span role="status" className="contagem-projetos">{visiveis.length} exemplos</span>
            </div>
          </>
        )}
        <CarrosselProjetos key={filtro} nomes={visiveis.map(projeto => projeto.nome)}>
          {visiveis.map((projeto) => (
            <article className={`cartao-projeto projeto-${projeto.id}`} key={projeto.id}>
              <div className="cartao-topo">
                <h3 className="projeto-nome">{projeto.nome}</h3>
                <p className="projeto-descricao">{projeto.resumo}</p>
              </div>
              <div className="cartao-imagem-wrapper">
                <button type="button" className="abrir-preview" aria-label={`Explorar ${projeto.nome}`} aria-haspopup="dialog" onClick={(evento) => abrir(projeto, evento.currentTarget)}>
                  {projeto.fluxo ? (
                    <div className="preview-automacao" aria-hidden="true"><PainelAutomacao id={projeto.id} compacto /></div>
                  ) : (
                    <div className="imagem-projeto">
                      <Image src={projeto.imagem} alt={`Prévia do projeto ${projeto.nome}`} width={1586} height={992}
                        sizes="(max-width: 700px) 82vw, (max-width: 960px) 68vw, 440px" />
                    </div>
                  )}
                </button>
                <button type="button" className="btn-explorar" aria-label={`Explorar demonstração de ${projeto.nome}`} onClick={(evento) => { evento.stopPropagation(); abrir(projeto, evento.currentTarget); }}>
                  <Icone nome="olho" tamanho={16} aria-hidden="true" />
                  <span>Explorar produto</span>
                </button>
              </div>
              <div className="cartao-base">
                <ul className="recursos-projeto">{projeto.recursos.slice(0, 2).map(recurso => <li key={recurso}><Icone nome="check" tamanho={14} aria-hidden="true" />{recurso}</li>)}</ul>
                <div className="acoes-projeto">
                  <a className="botao botao-roxo" href={criarLinkWhatsApp(projeto.mensagemWhatsApp)}
                    target="_blank" rel="noreferrer" data-analytics-origem={destaque ? 'home_projeto_cta' : 'card_cta'}
                    data-analytics-sistema={projeto.id} data-analytics-projeto-id={projeto.id}
                    data-analytics-projeto-nome={projeto.nome} data-analytics-categoria={projeto.categoria}>
                    Quero algo parecido <Icone nome="seta" tamanho={16} aria-hidden="true" />
                  </a>
                  <button type="button" className="botao botao-secundario" aria-haspopup="dialog"
                    onClick={(evento) => abrir(projeto, evento.currentTarget)}>
                    Ver demonstração <Icone nome="olho" tamanho={17} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </CarrosselProjetos>
        {destaque && <div className="mais-projetos"><Link className="botao botao-secundario" href="/projetos">Ver todos os projetos <Icone nome="seta" tamanho={18} aria-hidden="true" /></Link></div>}
      </div>
      {projetoAberto && <ModalDemonstracao projeto={projetoAberto} fechar={fechar} />}
    </section>
  )
}