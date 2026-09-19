import type { Metadata } from 'next'
import AnalyticsEventos from '@/components/AnalyticsEventos'
import AnalyticsScripts from '@/components/AnalyticsScripts'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Monky Soluções',
  description: 'Soluções digitais sob medida para simplificar processos, atendimento e gestão de empresas.',
}

export default function LayoutRaiz({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <AnalyticsScripts />
        <AnalyticsEventos />
        {children}
      </body>
    </html>
  )
}
