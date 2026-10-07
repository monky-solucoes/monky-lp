import type { Metadata, Viewport } from 'next'
import AnalyticsEventos from '@/components/AnalyticsEventos'
import AnalyticsScripts from '@/components/AnalyticsScripts'
import Cabecalho from '@/components/Cabecalho'
import Rodape from '@/components/Rodape'
import BotaoWhatsAppFlutuante from '@/features/home/BotaoWhatsAppFlutuante'
import { StructuredDataLocalBusiness } from '@/components/StructuredData'
import '../styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://monky-lp-zeta.vercel.app'),

  title: {
    default: 'Monky Soluções',
    template: '%s | Monky',
  },

  description:
    'Soluções digitais sob medida para simplificar processos, atendimento e gestão de empresas.',

  applicationName: 'Monky Soluções',

  keywords: [
    'Monky',
    'soluções digitais',
    'sistemas personalizados',
    'automação',
    'sites',
    'landing pages',
    'sistemas para empresas',
    'gestão empresarial',
    'automação de processos',
    'WhatsApp',
  ],

  authors: [
    {
      name: 'Monky',
    },
  ],

  creator: 'Monky',
  publisher: 'Monky',

  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://monky-lp-zeta.vercel.app',
    siteName: 'Monky Soluções',
    title: 'Monky Soluções',
    description:
      'Tecnologia para negócios reais. Soluções digitais sob medida para simplificar processos e ajudar empresas a crescer.',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Monky Soluções',
    description:
      'Soluções digitais sob medida para simplificar processos, atendimento e gestão de empresas.',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#45158A',
}

interface PropriedadesLayout {
  children: React.ReactNode
}

export default function LayoutRaiz({
  children,
}: Readonly<PropriedadesLayout>) {
  return (
    <html lang="pt-BR">
      <head>
        <StructuredDataLocalBusiness />
      </head>
      <body>
        <AnalyticsScripts />
        <AnalyticsEventos />

        <a className="pular-conteudo" href="#conteudo">Pular para o conteúdo</a>
        <Cabecalho />
        <main id="conteudo" tabIndex={-1}>{children}</main>
        <Rodape />
        <BotaoWhatsAppFlutuante />
      </body>
    </html>
  )
}
