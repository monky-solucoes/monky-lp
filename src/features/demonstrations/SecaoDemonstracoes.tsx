'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Icone, { type NomeIcone } from '@/components/Icone'
import Revelar from '@/components/Revelar'
import { demonstracoes } from '@/data/demonstracoes'
import type { Demonstracao } from '@/types/demonstracao'
import { definirTagClarity, rastrearEvento } from '@/utils/analytics'
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

const demonstracoesCarrossel = [0, 1, 2].flatMap((copia) =>
  demonstracoes.map((demonstracao, indiceOriginal) => ({ demonstracao, indiceOriginal, copia })),
)

function normalizarIndice(indice: number, total: number) {
  return ((indice % total) + total) % total
}

export default function SecaoDemonstracoes() {
  const [demonstracaoAberta, definirDemonstracaoAberta] = useState<Demonstracao | null>(null)
  const [telaAtiva, definirTelaAtiva] = useState(0)
  const [indiceCardAtivo, definirIndiceCardAtivo] = useState(0)
  const fundoModalRef = useRef<HTMLDivElement>(null)
  const conteudoModalRef = useRef<HTMLDivElement>(null)
  const trilhoRef = useRef<HTMLDivElement>(null)
  const indiceCardAtivoRef = useRef(0)
  const indiceFisicoAtivoRef = useRef(demonstracoes.length)
  const pausaAutomaticaAteRef = useRef(0)
  const temporizadorRecentralizacaoRef = useRef<number | null>(null)
  const animacaoScrollRef = useRef<number | null>(null)

  const animarScrollRapido = useCallback((elemento: HTMLDivElement, destino: number, duracao = 145) => {
    if (animacaoScrollRef.current !== null) {
      window.cancelAnimationFrame(animacaoScrollRef.current)
      animacaoScrollRef.current = null
    }

    const origem = elemento.scrollLeft
    const distancia = destino - origem
    if (Math.abs(distancia) < 1) {
      elemento.scrollLeft = destino
      return
    }

    const inicio = performance.now()
    function quadro(agora: number) {
      const progresso = Math.min(1, (agora - inicio) / duracao)
      const suavizado = 1 - Math.pow(1 - progresso, 3)
      elemento.scrollLeft = origem + distancia * suavizado

      if (progresso < 1) animacaoScrollRef.current = window.requestAnimationFrame(quadro)
      else animacaoScrollRef.current = null
    }

    animacaoScrollRef.current = window.requestAnimationFrame(quadro)
  }, [])

  const centralizarCardFisico = useCallback((indiceFisico: number, comportamento: 'auto' | 'rapido' = 'auto') => {
    const trilho = trilhoRef.current
    if (!trilho) return

    const cartoes = Array.from(trilho.querySelectorAll<HTMLElement>('.envoltorio-cartao-demonstracao'))
    const cartao = cartoes[indiceFisico]
    if (!cartao) return

    const retanguloTrilho = trilho.getBoundingClientRect()
    const retanguloCartao = cartao.getBoundingClientRect()
    const centroTrilho = retanguloTrilho.left + retanguloTrilho.width / 2
    const centroCartao = retanguloCartao.left + retanguloCartao.width / 2
    const destino = trilho.scrollLeft + centroCartao - centroTrilho
    const indiceLogico = normalizarIndice(indiceFisico, demonstracoes.length)

    indiceFisicoAtivoRef.current = indiceFisico
    indiceCardAtivoRef.current = indiceLogico
    definirIndiceCardAtivo(indiceLogico)
    if (comportamento === 'rapido') animarScrollRapido(trilho, destino)
    else trilho.scrollLeft = destino
  }, [animarScrollRapido])

  const recentralizarSeNecessario = useCallback(() => {
    if (temporizadorRecentralizacaoRef.current !== null) {
      window.clearTimeout(temporizadorRecentralizacaoRef.current)
    }

    temporizadorRecentralizacaoRef.current = window.setTimeout(() => {
      const total = demonstracoes.length
      const indiceFisico = indiceFisicoAtivoRef.current
      if (indiceFisico >= total && indiceFisico < total * 2) return

      const indiceLogico = normalizarIndice(indiceFisico, total)
      centralizarCardFisico(total + indiceLogico, 'auto')
    }, 70)
  }, [centralizarCardFisico])

  const rolarParaCard = useCallback((indice: number, pausarAutomatico = false) => {
    const total = demonstracoes.length
    const indiceLogicoAtual = normalizarIndice(indiceFisicoAtivoRef.current, total)
    let deslocamento = indice - indiceLogicoAtual

    if (deslocamento > total / 2) deslocamento -= total
    if (deslocamento < -total / 2) deslocamento += total

    if (pausarAutomatico) pausaAutomaticaAteRef.current = Date.now() + 7000

    centralizarCardFisico(indiceFisicoAtivoRef.current + deslocamento, 'rapido')
    recentralizarSeNecessario()
  }, [centralizarCardFisico, recentralizarSeNecessario])

  useEffect(() => {
    if (!demonstracaoAberta) return

    function fecharComEscape(evento: KeyboardEvent) {
      if (evento.key === 'Escape') definirDemonstracaoAberta(null)
    }

    document.body.classList.add('modal-aberto')
    document.documentElement.classList.add('modal-aberto')
    document.addEventListener('keydown', fecharComEscape)

    const quadro = window.requestAnimationFrame(() => {
      fundoModalRef.current?.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      conteudoModalRef.current?.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      conteudoModalRef.current?.querySelector<HTMLElement>('.descricao-modal-catalogo')?.scrollTo({ top: 0, behavior: 'auto' })
    })

    return () => {
      window.cancelAnimationFrame(quadro)
      document.body.classList.remove('modal-aberto')
      document.documentElement.classList.remove('modal-aberto')
      document.removeEventListener('keydown', fecharComEscape)
    }
  }, [demonstracaoAberta])

  useEffect(() => {
    const quadro = window.requestAnimationFrame(() => {
      centralizarCardFisico(demonstracoes.length, 'auto')
    })

    function recentralizarNoResize() {
      window.requestAnimationFrame(() => {
        centralizarCardFisico(indiceFisicoAtivoRef.current, 'auto')
      })
    }

    window.addEventListener('resize', recentralizarNoResize, { passive: true })
    return () => {
      window.cancelAnimationFrame(quadro)
      window.removeEventListener('resize', recentralizarNoResize)
    }
  }, [centralizarCardFisico])

  useEffect(() => {
    const trilhoAtual = trilhoRef.current!
    if (!trilhoAtual) return

    let quadroAnimacao = 0

    function atualizarCardAtivo() {
      cancelAnimationFrame(quadroAnimacao)
      quadroAnimacao = requestAnimationFrame(() => {
        const cartoes = Array.from(trilhoAtual.querySelectorAll<HTMLElement>('.envoltorio-cartao-demonstracao'))
        const retanguloTrilho = trilhoAtual.getBoundingClientRect()
        const centroTrilho = retanguloTrilho.left + retanguloTrilho.width / 2
        let indiceMaisProximo = 0
        let menorDistancia = Number.POSITIVE_INFINITY

        cartoes.forEach((cartao, indice) => {
          const retanguloCartao = cartao.getBoundingClientRect()
          const centroCartao = retanguloCartao.left + retanguloCartao.width / 2
          const distancia = Math.abs(centroCartao - centroTrilho)
          if (distancia < menorDistancia) {
            menorDistancia = distancia
            indiceMaisProximo = indice
          }
        })

        if (indiceMaisProximo !== indiceFisicoAtivoRef.current) {
          const indiceLogico = normalizarIndice(indiceMaisProximo, demonstracoes.length)
          indiceFisicoAtivoRef.current = indiceMaisProximo
          indiceCardAtivoRef.current = indiceLogico
          definirIndiceCardAtivo(indiceLogico)
        }

        recentralizarSeNecessario()
      })
    }

    function pausarAoInteragir() {
      pausaAutomaticaAteRef.current = Date.now() + 5200
      if (animacaoScrollRef.current !== null) {
        window.cancelAnimationFrame(animacaoScrollRef.current)
        animacaoScrollRef.current = null
      }
    }

    trilhoAtual.addEventListener('scroll', atualizarCardAtivo, { passive: true })
    trilhoAtual.addEventListener('pointerdown', pausarAoInteragir, { passive: true })

    const intervalo = window.setInterval(() => {
      const movimentoReduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const modalAberto = document.body.classList.contains('modal-aberto')
      const retanguloTrilho = trilhoAtual.getBoundingClientRect()
      const carrosselVisivel = retanguloTrilho.bottom > 0 && retanguloTrilho.top < window.innerHeight

      if (movimentoReduzido || modalAberto || document.hidden || !carrosselVisivel) return
      if (Date.now() < pausaAutomaticaAteRef.current) return

      rolarParaCard(indiceCardAtivoRef.current + 1)
    }, 5200)

    return () => {
      cancelAnimationFrame(quadroAnimacao)
      window.clearInterval(intervalo)
      trilhoAtual.removeEventListener('scroll', atualizarCardAtivo)
      trilhoAtual.removeEventListener('pointerdown', pausarAoInteragir)
      if (temporizadorRecentralizacaoRef.current !== null) {
        window.clearTimeout(temporizadorRecentralizacaoRef.current)
      }
      if (animacaoScrollRef.current !== null) {
        window.cancelAnimationFrame(animacaoScrollRef.current)
        animacaoScrollRef.current = null
      }
    }
  }, [recentralizarSeNecessario, rolarParaCard])

  function abrirDemonstracao(demonstracao: Demonstracao, origem = 'card') {
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


  function navegarTelaDemonstracao(indice: number) {
    definirTelaAtiva(indice)
    conteudoModalRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
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
        <div className="indicador-deslize-cards" aria-hidden="true">
          <span>Deslize para ver mais projetos</span>
          <Icone nome="seta" tamanho={17} />
        </div>
        <div className="trilho-demonstracoes" ref={trilhoRef}>
          {demonstracoesCarrossel.map(({ demonstracao, indiceOriginal, copia }, indiceFisico) => {
            const icone = iconesPorProjeto[demonstracao.id] ?? 'codigo'

            return (
              <Revelar
                key={`${copia}-${demonstracao.id}`}
                atraso={Math.min(indiceOriginal * 0.055, 0.28)}
                className="envoltorio-cartao-demonstracao"
              >
                <article
                  id={`projeto-${demonstracao.id}-${copia}`}
                  data-indice-fisico={indiceFisico}
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
                      data-analytics-origem="card_cta"
                      data-analytics-sistema={demonstracao.id}
                      data-analytics-projeto-id={demonstracao.id}
                      data-analytics-projeto-nome={demonstracao.nome}
                      data-analytics-categoria={demonstracao.categoria}
                      onClick={(evento) => evento.stopPropagation()}
                    >
                      Quero algo assim <Icone nome="seta" tamanho={15} />
                    </a>
                  </div>
                </article>
              </Revelar>
            )
          })}
        </div>

        <div className="controles-carrossel-desktop" aria-label="Navegação dos projetos no computador">
          <button
            type="button"
            className="controle-carrossel-desktop controle-carrossel-anterior"
            aria-label="Projeto anterior"
            onClick={() => rolarParaCard(indiceCardAtivoRef.current - 1, true)}
          >
            <Icone nome="seta" tamanho={19} />
          </button>
          <button
            type="button"
            className="controle-carrossel-desktop controle-carrossel-proximo"
            aria-label="Próximo projeto"
            onClick={() => rolarParaCard(indiceCardAtivoRef.current + 1, true)}
          >
            <Icone nome="seta" tamanho={19} />
          </button>
        </div>

        <div className="controles-carrossel-mobile" aria-label="Navegação dos projetos">
          <div className="resumo-carrossel-mobile" aria-live="polite">
            <span>Projeto {indiceCardAtivo + 1} de {demonstracoes.length}</span>
            <strong>{demonstracoes[indiceCardAtivo]?.nome}</strong>
          </div>
          <div className="paginacao-carrossel-mobile" role="tablist" aria-label="Projetos disponíveis">
            {demonstracoes.map((demonstracao, indice) => (
              <button
                type="button"
                role="tab"
                key={demonstracao.id}
                className={indiceCardAtivo === indice ? 'ativa' : ''}
                aria-selected={indiceCardAtivo === indice}
                aria-label={`Mostrar ${demonstracao.nome}`}
                title={demonstracao.nome}
                onClick={() => rolarParaCard(indice, true)}
              />
            ))}
          </div>
        </div>
      </div>

      {demonstracaoAberta && typeof document !== 'undefined' && createPortal(
        <div
          ref={fundoModalRef}
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

            <div ref={conteudoModalRef} className="conteudo-modal conteudo-modal-catalogo">
              <div className="galeria-modal-projeto">
                <div className="abas-galeria-modal" role="tablist" aria-label="Telas do projeto">
                  <button
                    type="button"
                    className={telaAtiva === 0 ? 'ativa' : ''}
                    onClick={() => navegarTelaDemonstracao(0)}
                  >
                    Visão geral
                  </button>
                  {demonstracaoAberta.telas.map((tela, indice) => (
                    <button
                      type="button"
                      key={tela.id}
                      className={telaAtiva === indice + 1 ? 'ativa' : ''}
                      onClick={() => navegarTelaDemonstracao(indice + 1)}
                    >
                      {tela.id === 'visao-geral' ? 'Painel' : tela.titulo}
                    </button>
                  ))}
                </div>

                <div className="palco-galeria-modal modo-desktop">
                  <TelaInternaDemonstracao
                    demonstracao={demonstracaoAberta}
                    indiceAtivo={telaAtiva}
                    onNavegar={navegarTelaDemonstracao}
                    modoVisualizacao="desktop"
                  />
                </div>
              </div>

              <aside className="descricao-modal descricao-modal-catalogo">
                <span className="sobretitulo">{demonstracaoAberta.categoria}</span>
                <h2 id="titulo-demonstracao">{demonstracaoAberta.nome}</h2>
                <p>{demonstracaoAberta.descricao}</p>

                <h3>O projeto pode incluir e muito mais</h3>
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
                  data-analytics-origem="modal_cta"
                  data-analytics-sistema={demonstracaoAberta.id}
                  data-analytics-projeto-id={demonstracaoAberta.id}
                  data-analytics-projeto-nome={demonstracaoAberta.nome}
                  data-analytics-categoria={demonstracaoAberta.categoria}
                >
                  <span className="cta-desktop">Quero conversar sobre isso</span>
                  <span className="cta-mobile">Conversar sobre isso</span>
                  <Icone nome="seta" tamanho={17} />
                </a>
              </aside>
            </div>
          </section>
        </div>,
        document.body,
      )}
    </section>
  )
}
