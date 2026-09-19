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

interface ConfiguracaoMiniProduto {
  chamada: string
  apoio: string
  cta: string
  metricas?: [string, string][]
}

const configuracoesMiniProduto: Record<string, ConfiguracaoMiniProduto> = {
  dropzone: {
    chamada: 'Vista atitude. Encontre seu próximo drop.',
    apoio: 'Coleções autorais, peças exclusivas e compra rápida pelo celular.',
    cta: 'Explorar coleção',
  },
  acaiwave: {
    chamada: 'Seu açaí, do seu jeito.',
    apoio: 'Monte o pedido, escolha os adicionais e receba onde estiver.',
    cta: 'Montar meu açaí',
  },
  oficinapro: {
    chamada: 'Operação da oficina',
    apoio: 'Ordens, agenda e veículos em uma visão simples.',
    cta: 'Nova ordem de serviço',
    metricas: [['OS abertas', '12'], ['Na oficina', '04']],
  },
  lumiere: {
    chamada: 'Cuidado que realça o melhor de você.',
    apoio: 'Tratamentos personalizados com segurança, leveza e naturalidade.',
    cta: 'Agendar avaliação',
  },
  vitacare: {
    chamada: 'Sua saúde acompanhada de perto.',
    apoio: 'Especialistas, cuidado integrado e agendamento sem complicação.',
    cta: 'Agendar consulta',
  },
  caixapilot: {
    chamada: 'Resumo financeiro',
    apoio: 'Entradas, saídas e compromissos sempre à mão.',
    cta: 'Adicionar lançamento',
    metricas: [['Saldo atual', 'R$ 84k'], ['Resultado', '+12%']],
  },
  carnext: {
    chamada: 'O próximo carro começa aqui.',
    apoio: 'Compare o estoque e encontre o veículo certo para o seu momento.',
    cta: 'Ver veículos',
  },
  luxo: {
    chamada: 'Excelência em cada detalhe.',
    apoio: 'Uma seleção exclusiva de veículos para quem exige mais.',
    cta: 'Conhecer o estoque',
  },
  nexora: {
    chamada: 'Pipeline comercial',
    apoio: 'Leads, tarefas e oportunidades no ritmo do seu time.',
    cta: 'Nova oportunidade',
    metricas: [['Em negociação', 'R$ 68k'], ['Oportunidades', '14']],
  },
  roteza: {
    chamada: 'Operação em campo',
    apoio: 'Rotas, equipes e atendimentos acompanhados em tempo real.',
    cta: 'Novo atendimento',
    metricas: [['Rotas hoje', '09'], ['Concluído', '86%']],
  },
}

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
  const configuracaoMini = configuracoesMiniProduto[demonstracao.id] ?? {
    chamada: pagina.titulo,
    apoio: pagina.subtitulo,
    cta: sistema ? 'Novo registro' : 'Quero conhecer',
  }
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
                  <div>
                    <span>{demonstracao.categoria}</span>
                    <h2>{indiceSeguro === 0 ? configuracaoMini.chamada : pagina.titulo}</h2>
                    <p>{indiceSeguro === 0 ? configuracaoMini.apoio : pagina.subtitulo}</p>
                  </div>
                  <button type="button" onClick={() => simularAcao('filtro_mobile')} aria-label="Filtrar informações">
                    <Icone nome="grafico" tamanho={15} />
                  </button>
                </div>

                <div className="demo-celular-captura demo-celular-captura-sistema">
                  <img src={pagina.imagem} alt={`Prévia mobile de ${pagina.titulo} em ${demonstracao.nome}`} />
                  <span><i /> Atualizado agora</span>
                </div>

                <div className="demo-celular-metricas">
                  {(configuracaoMini.metricas ?? [['Hoje', String(indiceSeguro + 8)], ['Progresso', `${72 + indiceSeguro * 4}%`]]).map(([rotulo, valor], indice) => (
                    <article key={rotulo}>
                      <span>{rotulo}</span>
                      <strong>{valor}</strong>
                      <small>{indice === 0 ? 'visão atual' : 'neste período'}</small>
                    </article>
                  ))}
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
                <div className="demo-celular-copy-site">
                  <span>{demonstracao.categoria}</span>
                  <h2>{indiceSeguro === 0 ? configuracaoMini.chamada : pagina.titulo}</h2>
                  <p>{indiceSeguro === 0 ? configuracaoMini.apoio : pagina.subtitulo}</p>
                  <button type="button" onClick={() => simularAcao('cta_mobile')}>
                    {configuracaoMini.cta} <Icone nome="seta" tamanho={15} />
                  </button>
                </div>

                <div className="demo-celular-captura demo-celular-captura-site">
                  <div className="demo-celular-captura-barra" aria-hidden="true"><i /><i /><i /><span /></div>
                  <img src={pagina.imagem} alt={`Versão mobile inspirada na tela ${pagina.titulo} de ${demonstracao.nome}`} />
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
                {configuracaoMini.cta}
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
      className="demo-navegavel demo-desktop-somente-imagem"
      data-demo={demonstracao.id}
    >
      <div
        className="demo-viewport"
        tabIndex={0}
        aria-label={`Tela ${pagina.titulo} do projeto ${demonstracao.nome}`}
      >
        <img
          key={pagina.imagem}
          className="demo-screen-img"
          src={pagina.imagem}
          alt={`${pagina.titulo} do projeto ${demonstracao.nome}`}
        />
      </div>
    </div>
  )
}
