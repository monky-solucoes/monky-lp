import PaginaInicial from '@/features/home/PaginaInicial'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { absolute: 'Monky Soluções' },
  description: 'Sistemas, sites e automações sob medida para empresas.',
}

export default function Pagina() {
  return <PaginaInicial />
}
