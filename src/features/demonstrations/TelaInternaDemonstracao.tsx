'use client'

import { useEffect, useState } from 'react'
import Icone from '@/components/Icone'
import type { Demonstracao } from '@/types/demonstracao'
import { rastrearEvento } from '@/utils/analytics'

interface TelaInternaDemonstracaoProps {
  demonstracao: Demonstracao
  indiceAtivo: number
  onNavegar: (indice: number) => void
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

  return (
    <div
      className={`demo-navegavel ${sistema ? 'demo-sistema' : 'demo-site'}`}
      data-demo={demonstracao.id}
    >
      <div className="demo-browser-bar">
        <div className="demo-browser-controles">
          <div className="demo-browser-pontos" aria-hidden="true"><i /><i /><i /></div>
          <button type="button" onClick={() => navegar(anterior)} aria-label="Voltar uma página">‹</button>
          <button type="button" onClick={() => navegar(proxima)} aria-label="Avançar uma página">›</button>
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

        <button
          type="button"
          className="demo-seta demo-seta-anterior"
          onClick={() => navegar(anterior)}
          aria-label="Página anterior"
        >
          ←
        </button>
        <button
          type="button"
          className="demo-seta demo-seta-proxima"
          onClick={() => navegar(proxima)}
          aria-label="Próxima página"
        >
          →
        </button>

        <div className="demo-acoes-contextuais" aria-label="Ações simuladas da demonstração">
          <button type="button" onClick={() => navegar(proxima)}>
            <span>→</span> Próxima tela
          </button>
          <button type="button" onClick={() => simularAcao(sistema ? 'novo_registro' : 'conversao')}>
            <span>+</span> {sistema ? 'Novo registro' : 'Simular contato'}
          </button>
          {indiceSeguro > 0 && (
            <button type="button" onClick={() => navegar(0)}>
              <span>⌂</span> Voltar ao início
            </button>
          )}
        </div>

        {mensagemToast && (
          <div className="demo-toast" role="status">
            <span>{mensagemToast}</span>
            <button type="button" onClick={() => definirMensagemToast('')} aria-label="Fechar aviso">×</button>
          </div>
        )}
      </div>

      <div className="demo-rodape-pagina">
        <span><b>{pagina.titulo}</b>{pagina.subtitulo ? ` · ${pagina.subtitulo}` : ''}</span>
        <span>Role para explorar · {indiceSeguro + 1} / {paginas.length}</span>
      </div>
    </div>
  )
}
