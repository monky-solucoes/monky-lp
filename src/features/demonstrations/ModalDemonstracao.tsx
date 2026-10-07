'use client'

import { useEffect, useRef, useState } from 'react'
import type { Demonstracao } from '@/types/demonstracao'
import { criarLinkWhatsApp } from '@/utils/whatsapp'
import TelaInternaDemonstracao from './TelaInternaDemonstracao'
import FluxoAutomacao from './FluxoAutomacao'

export default function ModalDemonstracao({ projeto, fechar }: { projeto: Demonstracao; fechar: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [telaAtiva, definirTelaAtiva] = useState(0)

  useEffect(() => {
    const dialog = dialogRef.current
    dialog?.showModal()
    const overflowAnterior = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      dialog?.close()
      document.body.style.overflow = overflowAnterior
    }
  }, [])

  function fecharDialogo() {
    dialogRef.current?.close()
    fechar()
  }

  return (
    <dialog ref={dialogRef} className="modal-projeto" aria-labelledby="titulo-demonstracao"
      onCancel={(evento) => { evento.preventDefault(); fecharDialogo() }}
      onClick={(evento) => { if (evento.target === evento.currentTarget) fecharDialogo() }}>
      <div className="interior-modal">
        <div className="topo-modal">
          <div><span>Projeto de exemplo</span><h2 id="titulo-demonstracao">{projeto.nome}</h2></div>
          <button type="button" className="fechar-modal" onClick={fecharDialogo} aria-label="Fechar demonstração" autoFocus>×</button>
        </div>
        <div className="conteudo-modal">
          <div className="galeria-modal">
            {projeto.fluxo ? <FluxoAutomacao projeto={projeto} /> : (
              <>
                <div className="abas-galeria-modal" role="group" aria-label="Telas do projeto">
                  <button type="button" aria-pressed={telaAtiva === 0} onClick={() => definirTelaAtiva(0)}>Visão geral</button>
                  {projeto.telas.map((tela, indice) => <button type="button" key={tela.id} aria-pressed={telaAtiva === indice + 1}
                    onClick={() => definirTelaAtiva(indice + 1)}>{tela.id === 'visao-geral' ? 'Painel' : tela.titulo}</button>)}
                </div>
                <TelaInternaDemonstracao demonstracao={projeto} indiceAtivo={telaAtiva} onNavegar={definirTelaAtiva} modoVisualizacao="desktop" />
                <p className="legenda-galeria">Explore as telas pelos botões acima ou pelas setas do teclado.</p>
              </>
            )}
          </div>
          <aside className="descricao-modal">
            <span className="categoria-projeto">{projeto.categoria}</span>
            <p>{projeto.descricao}</p>
            <h3>O projeto pode incluir</h3>
            <ul>{projeto.recursos.map((recurso) => <li key={recurso}>{recurso}</li>)}</ul>
            <p className="nota-projetos">Exemplo conceitual. O conteúdo final é definido com a sua empresa.</p>
            <a className="botao botao-roxo" href={criarLinkWhatsApp(projeto.mensagemWhatsApp)} target="_blank" rel="noreferrer"
              data-analytics-origem="modal_cta" data-analytics-sistema={projeto.id}
              data-analytics-projeto-id={projeto.id} data-analytics-projeto-nome={projeto.nome} data-analytics-categoria={projeto.categoria}>
              Quero algo parecido
            </a>
          </aside>
        </div>
      </div>
    </dialog>
  )
}
