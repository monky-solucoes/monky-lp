import Icone from '@/components/Icone'
import { criarLinkContatoGenerico } from '@/utils/whatsapp'

interface ChamadaProps { titulo?: string; texto?: string; rotulo?: string; origem?: string }

export default function SecaoChamadaFinal({
  titulo = 'Tem uma ideia ou um problema para resolver?',
  texto = 'Conte o que está acontecendo na sua empresa e a gente conversa sobre o melhor caminho.',
  rotulo = 'Falar com a Monky',
  origem = 'cta_final',
}: ChamadaProps) {
  return (
    <section className="secao-chamada-final">
      <div className="container chamada-final">
        <div><h2>{titulo}</h2><p>{texto}</p></div>
        <a className="botao botao-claro" href={criarLinkContatoGenerico()} target="_blank" rel="noreferrer" data-analytics-origem={origem}>
          {rotulo} <Icone nome="seta" tamanho={18} aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
