'use client'

import { useState } from 'react'
import Icone from '@/components/Icone'
import type { Demonstracao } from '@/types/demonstracao'
import PainelAutomacao from './PainelAutomacao'

export default function FluxoAutomacao({ projeto }: { projeto: Demonstracao }) {
  const [etapa, definirEtapa] = useState(-1)
  const fluxo = projeto.fluxo ?? []
  const terminou = etapa === fluxo.length - 1
  return (
    <div className="simulacao-automacao">
      <p className="nota-simulacao">Acompanhe um caso com dados fictícios. Nenhuma mensagem é enviada e nenhum serviço é conectado.</p>
      <PainelAutomacao id={projeto.id} etapa={etapa} />
      <ol className="fluxo-etapas">
        {fluxo.map((passo, indice) => (
          <li key={passo.titulo} className={indice <= etapa ? 'concluida' : ''} aria-current={indice === etapa ? 'step' : undefined}>
            <span className="numero-fluxo" aria-hidden="true">{indice < etapa ? <Icone nome="check" tamanho={18} /> : indice + 1}</span>
            <div><h3>{passo.titulo}</h3>{indice === etapa && <p>{passo.descricao}</p>}</div>
          </li>
        ))}
      </ol>
      <p role="status" className="status-simulacao">
        {etapa < 0 ? 'Pronto para começar.' : terminou ? 'Fluxo concluído. Esse é um exemplo do caminho que podemos construir.' : `Etapa ${etapa + 1}: ${fluxo[etapa].titulo}.`}
      </p>
      <div className="acoes-simulacao">
        <button type="button" className="botao botao-roxo" onClick={() => definirEtapa(terminou ? -1 : etapa + 1)}>
          {terminou ? 'Reiniciar simulação' : etapa < 0 ? 'Iniciar simulação' : 'Próxima etapa'}
        </button>
        {etapa >= 0 && !terminou && <button className="botao botao-secundario" type="button" onClick={() => definirEtapa(-1)}>Reiniciar</button>}
      </div>
    </div>
  )
}
