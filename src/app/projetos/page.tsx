import type { Metadata } from 'next'
import HeroInterno from '@/components/HeroInterno'
import SecaoDemonstracoes from '@/features/demonstrations/SecaoDemonstracoes'
import SecaoChamadaFinal from '@/features/home/SecaoChamadaFinal'

export const metadata: Metadata = {
  title: 'Projetos',
  description: 'Explore exemplos de sites, sistemas e fluxos de automação que podem ser adaptados ao seu negócio.',
}

export default function PaginaProjetos() {
  return (
    <>
      <HeroInterno titulo="Projetos e possibilidades" texto="Alguns exemplos de soluções que mostram como diferentes negócios podem usar tecnologia de forma simples." />
      <SecaoDemonstracoes />
      <SecaoChamadaFinal />
    </>
  )
}
