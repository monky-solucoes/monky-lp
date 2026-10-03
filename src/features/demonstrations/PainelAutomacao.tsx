import Icone from '@/components/Icone'
import { cenariosAutomacao } from '@/data/cenariosAutomacao'

export default function PainelAutomacao({ id, etapa = 3, compacto = false }: { id: string; etapa?: number; compacto?: boolean }) {
  const cenario = cenariosAutomacao[id]
  if (!cenario) return null
  return (
    <div className={`painel-automacao ${compacto ? 'painel-compacto' : ''}`} data-cenario={id}>
      <div className="barra-painel"><span><Icone nome="raio" tamanho={17} />{cenario.titulo}</span><span className="selo-exemplo">Exemplo</span></div>
      <div className="corpo-painel">
        <div className="origem-painel"><span>{cenario.origem}</span><span>{cenario.identificador}</span></div>
        <div className="contato-painel"><span className="avatar-exemplo">{cenario.iniciais}</span><div><strong>{cenario.pessoa}</strong><span>{cenario.assunto}</span></div></div>
        <div className={`estado-painel ${etapa === 3 ? 'estado-concluido' : ''}`}><Icone nome={etapa === 3 ? 'check' : 'alvo'} tamanho={15} />{etapa < 0 ? 'Aguardando simulação' : cenario.estados[etapa]}</div>
        {!compacto && <dl className="campos-painel">{cenario.campos.map((campo) => <div key={campo.nome}><dt>{campo.nome}</dt><dd>{campo.valor}</dd></div>)}</dl>}
        {!compacto && <div className="atividade-painel"><h3>Registro da execução</h3>{etapa < 0 ? <p>Inicie a simulação para acompanhar este registro.</p> : <ol>{cenario.registros.slice(0, etapa + 1).map((registro, indice) => <li key={registro}><Icone nome="check" tamanho={15} /><span>{registro}</span><small>{String(indice + 1).padStart(2, '0')}</small></li>)}</ol>}</div>}
        {!compacto && etapa >= 2 && <div className="aviso-painel"><Icone nome="chat" tamanho={20} /><div><strong>Prévia do aviso interno</strong><p>{cenario.saida}</p><span>Somente uma prévia. Nenhum aviso foi enviado.</span></div></div>}
      </div>
      <div className="rodape-painel"><Icone nome="camadas" tamanho={14} />{compacto ? 'Entrada → organização → próxima ação' : 'Dados fictícios · execução apenas nesta demonstração'}</div>
    </div>
  )
}
