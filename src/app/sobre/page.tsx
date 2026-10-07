import type { Metadata } from 'next'
import SecaoSobre from '@/features/home/SecaoSobre'
import SecaoChamadaFinal from '@/features/home/SecaoChamadaFinal'
import { criarLinkSobre } from '@/utils/whatsapp'

export const metadata: Metadata = {
  title: 'Sobre',
  description: 'Conheça a Monky: soluções digitais sob medida, simplicidade e contato próximo. Desenvolvido em Pelotas/RS.',
}

export default function PaginaSobre() {
  return (
    <>
      <SecaoSobre />
      <SecaoChamadaFinal link={criarLinkSobre()} />
    </>
  )
}
