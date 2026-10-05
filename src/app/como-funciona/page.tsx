import type { Metadata } from 'next'
import SecaoComoFunciona from '@/features/home/SecaoComoFunciona'
import SecaoChamadaFinal from '@/features/home/SecaoChamadaFinal'
import { criarLinkComoFunciona } from '@/utils/whatsapp'
import { StructuredDataFAQ } from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Como funciona',
  description: 'Da primeira conversa à evolução da solução: conheça o processo de desenvolvimento da Monky.',
}

export default function PaginaComoFunciona() {
  return (
    <>
      <StructuredDataFAQ />
      <SecaoComoFunciona />
      <SecaoChamadaFinal 
        titulo="Vamos começar pela sua rotina?" 
        texto="Você explica a dificuldade. A gente ajuda a encontrar o caminho mais simples." 
        rotulo="Contar meu problema" 
        origem="como_funciona_final"
        link={criarLinkComoFunciona()}
      />
    </>
  )
}
