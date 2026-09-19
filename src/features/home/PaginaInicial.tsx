import Cabecalho from '@/components/Cabecalho'
import CarregamentoInicial from '@/components/CarregamentoInicial'
import Rodape from '@/components/Rodape'
import SecaoDemonstracoes from '@/features/demonstrations/SecaoDemonstracoes'
import BotaoWhatsAppFlutuante from './BotaoWhatsAppFlutuante'
import SecaoChamadaFinal from './SecaoChamadaFinal'
import SecaoComoFunciona from './SecaoComoFunciona'
import SecaoHero from './SecaoHero'
import SecaoOutrasSolucoes from './SecaoOutrasSolucoes'
import SecaoSobre from './SecaoSobre'
import SecaoSolucoes from './SecaoSolucoes'
import SecaoTipoSolucao from './SecaoTipoSolucao'

export default function PaginaInicial() {
  return (
    <>
      <CarregamentoInicial />
      <Cabecalho />
      <main>
        <SecaoHero />
        <SecaoSolucoes />
        <SecaoDemonstracoes />
        <SecaoTipoSolucao />
        <SecaoComoFunciona />
        <SecaoOutrasSolucoes />
        <SecaoSobre />
        <SecaoChamadaFinal />
      </main>
      <Rodape />
      <BotaoWhatsAppFlutuante />
    </>
  )
}
