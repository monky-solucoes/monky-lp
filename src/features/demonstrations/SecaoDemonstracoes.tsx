'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import Icone, { type NomeIcone } from '@/components/Icone'
import Revelar from '@/components/Revelar'
import { demonstracoes } from '@/data/demonstracoes'
import type { Demonstracao } from '@/types/demonstracao'
import { definirTagClarity, rastrearCliqueWhatsApp, rastrearEvento } from '@/utils/analytics'
import { criarLinkWhatsApp } from '@/utils/whatsapp'
import TelaInternaDemonstracao from './TelaInternaDemonstracao'
import FundoInterativoCases from './FundoInterativoCases'

const iconesPorProjeto: Record<string, NomeIcone> = {
  dropzone: 'site',
  acaiwave: 'acai',
  oficinapro: 'oficina',
  lumiere: 'alvo',
  vitacare: 'suporte',
  caixapilot: 'grafico',
  carnext: 'carro',
  luxo: 'carro',
  nexora: 'vendas',
  roteza: 'alvo',
}

export default function SecaoDemonstracoes() {
  const [demonstracaoAberta, definirDemonstracaoAberta] = useState<Demonstracao | null>(null)
  const [telaAtiva, definirTelaAtiva] = useState(0)

  useEffect(() => {
    if (!demonstracaoAberta) return

    function fecharComEscape(evento: KeyboardEvent) {
      if (evento.key === 'Escape') definirDemonstracaoAberta(null)
    }

    document.body.classList.add('modal-aberto')
    document.addEventListener('keydown', fecharComEscape)

    return () => {
      document.body.classList.remove('modal-aberto')
      document.removeEventListener('keydown', fecharComEscape)
    }
  }, [demonstracaoAberta])

  function abrirDemonstracao(demonstracao: Demonstracao, origem = 'card') {
    const cartaoSelecionado = document.querySelector<HTMLElement>(`[data-projeto="${demonstracao.id}"]`)
    if (cartaoSelecionado) {
      const retanguloCartao = cartaoSelecionado.getBoundingClientRect()
      const topoCentralizado = window.scrollY + retanguloCartao.top
        - (window.innerHeight - retanguloCartao.height) / 2

      window.scrollTo({ top: topoCentralizado, behavior: 'auto' })

      const trilho = cartaoSelecionado.closest<HTMLElement>('.trilho-demonstracoes')
      if (trilho) {
        const retanguloTrilho = trilho.getBoundingClientRect()
        const novaPosicao = trilho.scrollLeft + retanguloCartao.left - retanguloTrilho.left
          - (retanguloTrilho.width - retanguloCartao.width) / 2
        trilho.scrollTo({ left: novaPosicao, behavior: 'auto' })
      }
    }

    definirTelaAtiva(0)
    definirDemonstracaoAberta(demonstracao)
    definirTagClarity('demo_aberta', demonstracao.id)
    rastrearEvento('card_click', {
      origem,
      projeto_id: demonstracao.id,
      projeto_nome: demonstracao.nome,
      categoria: demonstracao.categoria,
    })
  }

  function abrirWhatsAppProjeto(demonstracao: Demonstracao, origem = 'card_whatsapp') {
    rastrearCliqueWhatsApp(origem, {
      id: demonstracao.id,
      nome: demonstracao.nome,
      categoria: demonstracao.categoria,
    })
    window.open(criarLinkWhatsApp(demonstracao.mensagemWhatsApp), '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="secao secao-demonstracoes" id="demonstracoes">
      <FundoInterativoCases />
      <div className="container cabecalho-demonstracoes">
        <div>
          <span className="sobretitulo">Projetos de exemplo</span>
          <h2>Ideias de sistemas e sites que podem virar uma solução real.</h2>
        </div>
        <p>
          Os exemplos mostram direções visuais e funcionais. Cada projeto pode ser adaptado à identidade,
          ao processo e às necessidades do seu negócio.
        </p>
      </div>

      <div className="container area-carrossel">
        <div className="trilho-demonstracoes">
          {demonstracoes.map((demonstracao, indice) => {
            const icone = iconesPorProjeto[demonstracao.id] ?? 'codigo'

            return (
              <Revelar
                key={demonstracao.id}
                atraso={Math.min(indice * 0.055, 0.28)}
                className="envoltorio-cartao-demonstracao"
              >
                <article
                  id={`projeto-${demonstracao.id}`}
                  className="cartao-demonstracao cartao-demonstracao-clicavel"
                  role="button"
                  tabIndex={0}
                  aria-label={`Abrir demonstração navegável de ${demonstracao.nome}`}
                  data-projeto={demonstracao.id}
                  onClick={() => abrirDemonstracao(demonstracao, 'card')}
                  onKeyDown={(evento) => {
                    if (evento.key === 'Enter' || evento.key === ' ') {
                      evento.preventDefault()
                      abrirDemonstracao(demonstracao, 'card_teclado')
                    }
                  }}
                >
                  <div className="cabecalho-cartao-demonstracao">
                    <span className="mini-icone-projeto"><Icone nome={icone} tamanho={22} /></span>
                    <div className="texto-cartao-demonstracao">
                      <span className="categoria-demonstracao">{demonstracao.categoria}</span>
                      <h3>{demonstracao.nome}</h3>
                      <p>{demonstracao.resumo}</p>
                    </div>
                  </div>

                  <button
                    className="preview-demonstracao preview-simples"
                    type="button"
                    onClick={(evento) => {
                      evento.stopPropagation()
                      abrirDemonstracao(demonstracao, 'preview')
                    }}
                    aria-label={`Ver detalhes de ${demonstracao.nome}`}
                  >
                    <div className="preview-principal preview-principal-unico">
                      <Image
                        src={demonstracao.imagem}
                        alt={`Exemplo visual do projeto ${demonstracao.nome}`}
                        width={1200}
                        height={900}
                      />
                    </div>
                    <span className="selo-preview"><Icone nome="olho" tamanho={15} /> Explorar produto</span>
                    <span className="selo-telas-extra">{demonstracao.telas.length + 1} telas navegáveis</span>
                  </button>

                  <div className="recursos-resumidos">
                    {demonstracao.recursos.slice(0, 2).map((recurso) => (
                      <span key={recurso}><Icone nome="check" tamanho={13} /> {recurso}</span>
                    ))}
                  </div>

                  <div className="acoes-demonstracao">
                    <button
                      type="button"
                      onClick={(evento) => {
                        evento.stopPropagation()
                        abrirDemonstracao(demonstracao, 'botao_card')
                      }}
                    >
                      Explorar demo
                    </button>
                    <a
                      href={criarLinkWhatsApp(demonstracao.mensagemWhatsApp)}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(evento) => {
                        evento.stopPropagation()
                        rastrearCliqueWhatsApp('card_cta', {
                          id: demonstracao.id,
                          nome: demonstracao.nome,
                          categoria: demonstracao.categoria,
                        })
                      }}
                    >
                      Quero algo assim <Icone nome="seta" tamanho={15} />
                    </a>
                  </div>
                </article>
              </Revelar>
            )
          })}
        </div>
      </div>

      {demonstracaoAberta && (
        <div
          className="fundo-modal fundo-modal-visivel"
          onMouseDown={() => definirDemonstracaoAberta(null)}
          role="presentation"
        >
          <section
            className="modal-demonstracao modal-demonstracao-visivel modal-projeto-catalogo"
            onMouseDown={(evento) => evento.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-demonstracao"
          >
            <div className="topo-modal">
              <div>
                <span>{demonstracaoAberta.categoria}</span>
                <strong>{demonstracaoAberta.nome}</strong>
              </div>
              <button type="button" onClick={() => definirDemonstracaoAberta(null)} aria-label="Fechar">×</button>
            </div>

            <div className="conteudo-modal conteudo-modal-catalogo">
              <div className="galeria-modal-projeto">
                <div className="abas-galeria-modal" role="tablist" aria-label="Telas do projeto">
                  <button
                    type="button"
                    className={telaAtiva === 0 ? 'ativa' : ''}
                    onClick={() => definirTelaAtiva(0)}
                  >
                    Visão geral
                  </button>
                  {demonstracaoAberta.telas.map((tela, indice) => (
                    <button
                      type="button"
                      key={tela.id}
                      className={telaAtiva === indice + 1 ? 'ativa' : ''}
                      onClick={() => definirTelaAtiva(indice + 1)}
                    >
                      {tela.id === 'visao-geral' ? 'Painel' : tela.titulo}
                    </button>
                  ))}
                </div>

                <div className="palco-galeria-modal">
                  <TelaInternaDemonstracao
                    demonstracao={demonstracaoAberta}
                    indiceAtivo={telaAtiva}
                    onNavegar={definirTelaAtiva}
                  />
                </div>
              </div>

              <aside className="descricao-modal descricao-modal-catalogo">
                <span className="sobretitulo">{demonstracaoAberta.categoria}</span>
                <h2 id="titulo-demonstracao">{demonstracaoAberta.nome}</h2>
                <p>{demonstracaoAberta.descricao}</p>

                <h3>O projeto pode incluir</h3>
                <ul>
                  {demonstracaoAberta.recursos.map((recurso) => <li key={recurso}>{recurso}</li>)}
                </ul>

                <div className="nota-telas-catalogo">
                  <Icone nome="camadas" tamanho={18} />
                  <p>
                    As telas internas são exemplos funcionais de como os módulos podem ser organizados.
                    O conteúdo final é definido conforme o fluxo real da empresa.
                  </p>
                </div>

                <a
                  className="botao botao-roxo"
                  href={criarLinkWhatsApp(demonstracaoAberta.mensagemWhatsApp)}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => rastrearCliqueWhatsApp('modal_cta', {
                    id: demonstracaoAberta.id,
                    nome: demonstracaoAberta.nome,
                    categoria: demonstracaoAberta.categoria,
                  })}
                >
                  Quero conversar sobre isso <Icone nome="seta" tamanho={17} />
                </a>
              </aside>
            </div>
          </section>
        </div>
      )}
    </section>
  )
}
