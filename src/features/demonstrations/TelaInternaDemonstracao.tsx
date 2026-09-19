'use client'

import { useEffect, useState } from 'react'
import Icone from '@/components/Icone'
import type { Demonstracao } from '@/types/demonstracao'
import { rastrearEvento } from '@/utils/analytics'

interface TelaInternaDemonstracaoProps {
  demonstracao: Demonstracao
  indiceAtivo: number
  onNavegar: (indice: number) => void
  modoVisualizacao?: 'desktop' | 'mobile'
}

const idsSistema = new Set(['oficinapro', 'caixapilot', 'nexora', 'roteza'])

const rotulosInicio: Record<string, string> = {
  dropzone: 'Início',
  acaiwave: 'Início',
  oficinapro: 'Painel',
  lumiere: 'Início',
  vitacare: 'Início',
  caixapilot: 'Visão geral',
  carnext: 'Início',
  luxo: 'Início',
  nexora: 'Início',
  roteza: 'Visão geral',
}

function paginasDaDemonstracao(demonstracao: Demonstracao) {
  return [
    {
      id: 'visao-geral',
      titulo: rotulosInicio[demonstracao.id] ?? 'Visão geral',
      imagem: demonstracao.imagem,
      subtitulo: demonstracao.resumo,
    },
    ...demonstracao.telas.map((tela) => ({
      id: tela.id,
      titulo: tela.id === 'visao-geral' ? 'Painel' : tela.titulo,
      imagem: tela.imagem ?? demonstracao.imagem,
      subtitulo: tela.subtitulo,
    })),
  ]
}

export default function TelaInternaDemonstracao({
  demonstracao,
  indiceAtivo,
  onNavegar,
  modoVisualizacao = 'desktop',
}: TelaInternaDemonstracaoProps) {
  const paginas = paginasDaDemonstracao(demonstracao)
  const indiceSeguro = Math.min(Math.max(indiceAtivo, 0), paginas.length - 1)
  const pagina = paginas[indiceSeguro]
  const sistema = idsSistema.has(demonstracao.id)
  const [menuMobileAberto, definirMenuMobileAberto] = useState(false)
  const [mensagemToast, definirMensagemToast] = useState('')

  const anterior = indiceSeguro > 0 ? indiceSeguro - 1 : paginas.length - 1
  const proxima = indiceSeguro < paginas.length - 1 ? indiceSeguro + 1 : 0

  function navegar(indice: number) {
    definirMenuMobileAberto(false)
    onNavegar(indice)
    const destino = paginas[indice]

    rastrearEvento('demo_screen_view', {
      projeto_id: demonstracao.id,
      projeto_nome: demonstracao.nome,
      tela_id: destino?.id,
      tela_titulo: destino?.titulo,
    })
  }

  function simularAcao(tipo: string) {
    const mensagem = sistema
      ? 'Ação simulada no sistema. Essa interação também fica marcada nos relatórios.'
      : 'Interesse simulado. Essa tela já pode virar um ponto de conversão no funil.'

    definirMensagemToast(mensagem)
    rastrearEvento('demo_action_click', {
      projeto_id: demonstracao.id,
      projeto_nome: demonstracao.nome,
      tela_id: pagina.id,
      acao: tipo,
    })
  }

  useEffect(() => {
    function aoPressionar(evento: KeyboardEvent) {
      const alvo = evento.target as HTMLElement | null
      if (alvo?.tagName === 'INPUT' || alvo?.tagName === 'TEXTAREA' || alvo?.tagName === 'SELECT') return
      if (evento.key === 'ArrowLeft') navegar(anterior)
      if (evento.key === 'ArrowRight') navegar(proxima)
    }

    window.addEventListener('keydown', aoPressionar)
    return () => window.removeEventListener('keydown', aoPressionar)
  }, [anterior, proxima])

  useEffect(() => {
    if (!mensagemToast) return

    const temporizador = window.setTimeout(() => definirMensagemToast(''), 3300)
    return () => window.clearTimeout(temporizador)
  }, [mensagemToast])

  if (modoVisualizacao === 'mobile') {
    return (
      <div className="demo-celular" data-demo={demonstracao.id}>
        <div className="demo-celular-aparelho">
          <div className="demo-celular-status" aria-hidden="true">
            <span>9:41</span>
            <i />
            <span>5G&nbsp; 100%</span>
          </div>

          <header className="demo-celular-header">
            <button type="button" onClick={() => navegar(0)} aria-label={`Início de ${demonstracao.nome}`}>
              <span>{demonstracao.nome.charAt(0)}</span>
              <strong>{demonstracao.nome}</strong>
            </button>
            <button
              type="button"
              className={`demo-celular-menu ${menuMobileAberto ? 'aberto' : ''}`}
              aria-label={menuMobileAberto ? 'Fechar menu da demonstração' : 'Abrir menu da demonstração'}
              aria-expanded={menuMobileAberto}
              onClick={() => definirMenuMobileAberto((valor) => !valor)}
            >
              <i /><i /><i />
            </button>

            {menuMobileAberto && (
              <div className="demo-celular-menu-painel">
                <strong>Telas do projeto</strong>
                {paginas.map((item, indice) => (
                  <button
                    key={`menu-celular-${item.id}-${indice}`}
                    type="button"
                    className={indice === indiceSeguro ? 'ativo' : ''}
                    onClick={() => navegar(indice)}
                  >
                    <span>{String(indice + 1).padStart(2, '0')}</span>
                    {item.titulo}
                  </button>
                ))}
              </div>
            )}
          </header>

          <nav className="demo-celular-abas" aria-label={`Telas mobile de ${demonstracao.nome}`}>
            {paginas.map((item, indice) => (
              <button
                key={`celular-${item.id}-${indice}`}
                type="button"
                className={indice === indiceSeguro ? 'ativo' : ''}
                onClick={() => navegar(indice)}
              >
                {item.titulo}
              </button>
            ))}
          </nav>

          <main className="demo-celular-conteudo">
            {sistema ? (
              <div className="demo-celular-painel-sistema">
                <div className="demo-celular-painel-titulo">
                  <span>{demonstracao.categoria}</span>
                  <h2>{pagina.titulo}</h2>
                  <p>Visão rápida da operação no celular.</p>
                </div>
                <div className="demo-celular-metricas">
                  <article><span>Hoje</span><strong>{indiceSeguro + 8}</strong><small>itens ativos</small></article>
                  <article><span>Progresso</span><strong>{72 + indiceSeguro * 4}%</strong><small>do período</small></article>
                </div>
                <div className="demo-celular-lista">
                  {demonstracao.recursos.slice(0, 3).map((recurso, indice) => (
                    <article key={recurso}>
                      <span><Icone nome={indice === 0 ? 'raio' : indice === 1 ? 'grafico' : 'camadas'} tamanho={15} /></span>
                      <div><strong>{recurso}</strong><small>Atualizado agora</small></div>
                      <b>{indice + 2}</b>
                    </article>
                  ))}
                </div>
              </div>
            ) : (
              <div className="demo-celular-hero-site">
                <span>{demonstracao.categoria}</span>
                <h2>{pagina.titulo}</h2>
                <p>{pagina.subtitulo}</p>
                <button type="button" onClick={() => simularAcao('cta_mobile')}>
                  Quero conhecer <Icone nome="seta" tamanho={15} />
                </button>
                <div className="demo-celular-vitrine" aria-hidden="true">
                  <i><Icone nome="site" tamanho={22} /></i>
                  <div><span /><span /><span /></div>
                </div>
              </div>
            )}

            <section>
              <span className="demo-celular-etapa">Tela {indiceSeguro + 1} de {paginas.length}</span>
              <h3>{sistema ? 'Resumo do módulo' : 'Destaques desta página'}</h3>
              <p>{sistema ? pagina.subtitulo : demonstracao.resumo}</p>

              <div className="demo-celular-recursos">
                {demonstracao.recursos.slice(0, 3).map((recurso) => (
                  <span key={recurso}><Icone nome="check" tamanho={13} /> {recurso}</span>
                ))}
              </div>

              <button
                className="demo-celular-cta"
                type="button"
                onClick={() => simularAcao(sistema ? 'novo_registro_mobile' : 'conversao_mobile')}
              >
                {sistema ? 'Simular novo registro' : 'Simular contato'}
                <Icone nome="seta" tamanho={15} />
              </button>

              {mensagemToast && <p className="demo-celular-feedback" role="status">{mensagemToast}</p>}
            </section>
          </main>

          {sistema && (
            <nav className="demo-celular-rodape" aria-label="Navegação do sistema">
              <button type="button" onClick={() => navegar(0)} className={indiceSeguro === 0 ? 'ativo' : ''}>
                <Icone nome="site" tamanho={16} />
                <span>Início</span>
              </button>
              <button type="button" onClick={() => navegar(proxima)} className={indiceSeguro > 0 ? 'ativo' : ''}>
                <Icone nome="camadas" tamanho={16} />
                <span>{indiceSeguro > 0 ? pagina.titulo : 'Módulos'}</span>
              </button>
              <button type="button" onClick={() => simularAcao('acao_rapida_mobile')}>
                <Icone nome="raio" tamanho={16} />
                <span>Ação rápida</span>
              </button>
            </nav>
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      className={`demo-navegavel ${sistema ? 'demo-sistema' : 'demo-site'}`}
      data-demo={demonstracao.id}
    >
      <div className="demo-browser-bar">
        <div className="demo-browser-controles">
          <div className="demo-browser-pontos" aria-hidden="true"><i /><i /><i /></div>
        </div>
        <div className="demo-browser-endereco">
          <Icone nome={sistema ? 'codigo' : 'site'} tamanho={13} />
          <span>{sistema ? 'app' : 'www'}.{demonstracao.id}.com.br/{pagina.id}</span>
        </div>
        <span className="demo-badge-navegavel">demo interativa</span>
      </div>

      <header className="demo-header-real">
        <button
          type="button"
          className="demo-marca"
          onClick={() => navegar(0)}
          aria-label={`Ir para a página inicial de ${demonstracao.nome}`}
        >
          <span className="demo-marca-simbolo" aria-hidden="true">{demonstracao.nome.charAt(0)}</span>
          <strong>{demonstracao.nome}</strong>
        </button>

        <nav className="demo-header-nav" aria-label={`Páginas de ${demonstracao.nome}`}>
          {paginas.map((item, indice) => (
            <button
              key={`${item.id}-${indice}`}
              type="button"
              className={indice === indiceSeguro ? 'ativo' : ''}
              aria-current={indice === indiceSeguro ? 'page' : undefined}
              onClick={() => navegar(indice)}
            >
              {item.titulo}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className={`demo-menu-mobile ${menuMobileAberto ? 'aberto' : ''}`}
          aria-label="Abrir menu da demonstração"
          aria-expanded={menuMobileAberto}
          onClick={() => definirMenuMobileAberto((valor) => !valor)}
        >
          <span /> <span /> <span />
        </button>

        {menuMobileAberto && (
          <div className="demo-menu-mobile-painel">
            {paginas.map((item, indice) => (
              <button
                key={`mobile-${item.id}-${indice}`}
                type="button"
                className={indice === indiceSeguro ? 'ativo' : ''}
                onClick={() => navegar(indice)}
              >
                {item.titulo}
              </button>
            ))}
          </div>
        )}
      </header>

      <div className="demo-viewport" tabIndex={0} aria-label={`Conteúdo de ${pagina.titulo}. Role para ver a página completa.`}>
        <img
          key={pagina.imagem}
          className="demo-screen-img"
          src={pagina.imagem}
          alt={`${pagina.titulo} do projeto ${demonstracao.nome}`}
        />

      </div>

      <div className="demo-rodape-pagina">
        <span className="demo-rodape-descricao">
          <b>{pagina.titulo}</b>{pagina.subtitulo ? ` · ${pagina.subtitulo}` : ''}
        </span>
        {mensagemToast ? (
          <span className="demo-feedback-inline" role="status">{mensagemToast}</span>
        ) : (
          <button
            className="demo-acao-simulada"
            type="button"
            onClick={() => simularAcao(sistema ? 'novo_registro' : 'conversao')}
          >
            {sistema ? '+ Novo registro' : 'Simular contato'}
          </button>
        )}
        <span className="demo-contador-telas">Tela {indiceSeguro + 1} de {paginas.length}</span>
      </div>
    </div>
  )
}
