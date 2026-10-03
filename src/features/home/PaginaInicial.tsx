import SecaoDemonstracoes from '@/features/demonstrations/SecaoDemonstracoes'
import SecaoChamadaFinal from './SecaoChamadaFinal'
import SecaoHero from './SecaoHero'
import SecaoSolucoes from './SecaoSolucoes'

export default function PaginaInicial() {
  return (
    <>
      <SecaoHero />
      <SecaoSolucoes />
      <SecaoDemonstracoes destaque />
      <SecaoChamadaFinal />
    </>
  )
}
