'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import Icone, { type NomeIcone } from '@/components/Icone'
import Revelar from '@/components/Revelar'
import { demonstracoes } from '@/data/demonstracoes'
import type { Demonstracao } from '@/types/demonstracao'
import { definirTagClarity, rastrearCliqueWhatsApp, rastrearEvento } from '@/utils/analytics'
import { criarLinkWhatsApp } from '@/utils/whatsapp'
import TelaInternaDemonstracao from './TelaInternaDemonstracao'
import FundoInterativoCases from './FundoInterativoCases'

const COPIAS_DO_CARROSSEL = 3

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
  const trilho = useRef<HTMLDivElement | null>(null)
  const indiceVirtualAtual = useRef(demonstracoes.length)
  const temporizadorRolagem = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [demonstracaoAberta, definirDemonstracaoAberta] = useState<Demonstracao | null>(null)
  const [telaAtiva, definirTelaAtiva] = useState(0)

  const demonstracoesCiclicas = useMemo(
    () => Array.from({ length: COPIAS_DO_CARROSSEL }).flatMap(() => demonstracoes),
    [],
  )

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

  useEffect(() => {
    const elementoTrilho = trilho.current
    if (!elementoTrilho || demonstracoes.length === 0) return

    const quadro = requestAnimationFrame(() => {
      rolarParaIndice(demonstracoes.length, 'auto')
      indiceVirtualAtual.current = demonstracoes.length
    })

    function reposicionarAoRedimensionar() {
      const indiceCentral = obterIndiceCentral(indiceVirtualAtual.current)
      rolarParaIndice(indiceCentral, 'auto')
      indiceVirtualAtual.current = indiceCentral
    }

    window.addEventListener('resize', reposicionarAoRedimensionar)

    return () => {
      cancelAnimationFrame(quadro)
      window.removeEventListener('resize', reposicionarAoRedimensionar)
      if (temporizadorRolagem.current) clearTimeout(temporizadorRolagem.current)
    }
  }, [])

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

  function abrirWhatsAppProjeto(demonstracao: Demonstracao, origem = 'card_whatsapp') {
    rastrearCliqueWhatsApp(origem, {
      id: demonstracao.id,
      nome: demonstracao.nome,
      categoria: demonstracao.categoria,
    })
    window.open(criarLinkWhatsApp(demonstracao.mensagemWhatsApp), '_blank', 'noopener,noreferrer')
  }

  function obterCartoes() {
    return Array.from(trilho.current?.querySelectorAll<HTMLElement>('.envoltorio-cartao-demonstracao') ?? [])
  }

  function rolarParaIndice(indice: number, comportamento: ScrollBehavior = 'smooth') {
    const elementoTrilho = trilho.current
    const cartoes = obterCartoes()
    const cartaoDestino = cartoes[indice]
    if (!elementoTrilho || !cartaoDestino) return

    const retanguloTrilho = elementoTrilho.getBoundingClientRect()
    const retanguloCartao = cartaoDestino.getBoundingClientRect()
    const destinoRolagem = elementoTrilho.scrollLeft + (retanguloCartao.left - retanguloTrilho.left)
    elementoTrilho.scrollTo({ left: destinoRolagem, behavior: comportamento })
  }

  function obterIndiceMaisProximo() {
    const elementoTrilho = trilho.current
    const cartoes = obterCartoes()
    if (!elementoTrilho || cartoes.length === 0) return indiceVirtualAtual.current

    const esquerdaDoTrilho = elementoTrilho.getBoundingClientRect().left
    let indiceMaisProximo = 0
    let menorDistancia = Number.POSITIVE_INFINITY

    cartoes.forEach((cartao, indice) => {
      const distancia = Math.abs(cartao.getBoundingClientRect().left - esquerdaDoTrilho)
      if (distancia < menorDistancia) {
        menorDistancia = distancia
        indiceMaisProximo = indice
      }
    })

    return indiceMaisProximo
  }

  function obterIndiceCentral(indiceVirtual: number) {
    const quantidade = demonstracoes.length
    if (quantidade === 0) return 0
    const indiceOriginal = ((indiceVirtual % quantidade) + quantidade) % quantidade
    return quantidade + indiceOriginal
  }

  function centralizarCopiaSeNecessario(indiceVirtual: number) {
    const quantidade = demonstracoes.length
    const estaNaPrimeiraCopia = indiceVirtual < quantidade
    const estaNaUltimaCopia = indiceVirtual >= quantidade * 2
    if (!estaNaPrimeiraCopia && !estaNaUltimaCopia) return

    const indiceCentral = obterIndiceCentral(indiceVirtual)
    indiceVirtualAtual.current = indiceCentral
    rolarParaIndice(indiceCentral, 'auto')
  }

  function mover(direcao: -1 | 1) {
    if (demonstracoes.length === 0) return

    let indiceAtual = indiceVirtualAtual.current
    const quantidade = demonstracoes.length

    if (indiceAtual <= 0 || indiceAtual >= quantidade * COPIAS_DO_CARROSSEL - 1) {
      indiceAtual = obterIndiceCentral(indiceAtual)
      indiceVirtualAtual.current = indiceAtual
      rolarParaIndice(indiceAtual, 'auto')
    }

    const proximoIndice = indiceAtual + direcao
    indiceVirtualAtual.current = proximoIndice
    rolarParaIndice(proximoIndice, 'smooth')
  }

  function sincronizarRolagem() {
    const indiceMaisProximo = obterIndiceMaisProximo()
    indiceVirtualAtual.current = indiceMaisProximo

    if (temporizadorRolagem.current) clearTimeout(temporizadorRolagem.current)
    temporizadorRolagem.current = setTimeout(() => {
      const indiceFinal = obterIndiceMaisProximo()
      indiceVirtualAtual.current = indiceFinal
      centralizarCopiaSeNecessario(indiceFinal)
    }, 160)
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
        <button className="botao-ver-cases" type="button" onClick={() => mover(1)}>
          Ver próximo <Icone nome="seta" tamanho={17} />
        </button>
      </div>

      <div className="container area-carrossel">
        <button
          type="button"
          className="controle-carrossel controle-carrossel-esquerda"
          onClick={() => mover(-1)}
          aria-label="Ver projeto anterior"
        >
          ←
        </button>

        <div className="trilho-demonstracoes" ref={trilho} onScroll={sincronizarRolagem}>
          {demonstracoesCiclicas.map((demonstracao, indiceVirtual) => {
            const indiceOriginal = indiceVirtual % demonstracoes.length
            const copiaCentral = indiceVirtual >= demonstracoes.length && indiceVirtual < demonstracoes.length * 2
            const icone = iconesPorProjeto[demonstracao.id] ?? 'codigo'

            return (
              <Revelar
                key={`${demonstracao.id}-${indiceVirtual}`}
                atraso={copiaCentral ? Math.min(indiceOriginal * 0.055, 0.28) : 0}
                className="envoltorio-cartao-demonstracao"
              >
                <article
                  id={copiaCentral ? `projeto-${demonstracao.id}` : undefined}
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
                    <span className="selo-preview"><Icone nome="olho" tamanho={15} /> Abrir projeto</span>
                    <span className="selo-telas-extra">Demo interativa</span>
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

        <button
          type="button"
          className="controle-carrossel controle-carrossel-direita"
          onClick={() => mover(1)}
          aria-label="Ver próximo projeto"
        >
          →
        </button>
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
