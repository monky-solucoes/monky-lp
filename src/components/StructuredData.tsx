import type { Metadata } from 'next'
import { servicos } from '@/data/servicos'
import { contato } from '@/data/contato'

export function StructuredDataLocalBusiness() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Monky Soluções',
    description: 'Soluções digitais sob medida para simplificar processos, atendimento e gestão de empresas.',
    url: 'https://monky-lp-zeta.vercel.app',
    telephone: `+55 ${contato.numeroWhatsApp.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4')}`,
    email: contato.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Pelotas',
      addressRegion: 'RS',
      addressCountry: 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -31.7649,
      longitude: -52.3374,
    },
    priceRange: '$$',
    currenciesAccepted: 'BRL',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer, PIX',
    areaServed: {
      '@type': 'Country',
      name: 'Brasil',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços Digitais',
      itemListElement: servicos.map((servico, index) => ({
        '@type': 'Offer',
        position: index + 1,
        itemOffered: {
          '@type': 'Service',
          name: servico.nome,
          description: servico.descricao,
          provider: {
            '@type': 'LocalBusiness',
            name: 'Monky Soluções',
          },
        },
      })),
    },
    sameAs: [
      'https://wa.me/5553999999999',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

interface StructuredDataServiceProps {
  serviceName: string
  description: string
  url: string
}

export function StructuredDataService({ serviceName, description, url }: StructuredDataServiceProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Monky Soluções',
      url: 'https://monky-lp-zeta.vercel.app',
    },
    areaServed: 'Brasil',
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: url,
      servicePhone: `+55 ${contato.numeroWhatsApp.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4')}`,
      servicePostalAddress: {
        '@type': 'PostalAddress',
        addressLocality: 'Pelotas',
        addressRegion: 'RS',
        addressCountry: 'BR',
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function StructuredDataFAQ() {
  const faqs = [
    {
      question: 'A Monky cria sites ou apenas sistemas?',
      answer: 'Criamos os dois. Sites institucionais, landing pages, e-commerces e também sistemas personalizados (CRM, ERP, gestão de Ordens de Serviço, financeiro, etc). A solução depende do seu problema.',
    },
    {
      question: 'Como funciona o processo de desenvolvimento?',
      answer: '1) Você conta o problema. 2) A gente entende sua rotina e mapeia o fluxo. 3) Propomos o escopo essencial (MVP). 4) Desenvolvemos com validações. 5) Evoluímos conforme a operação precisar.',
    },
    {
      question: 'Preciso saber exatamente o que quero antes de falar com vocês?',
      answer: 'Não. O ponto de partida é a sua dificuldade ou rotina. A gente ajuda a definir o caminho e o escopo juntos, antes de qualquer código.',
    },
    {
      question: 'Quanto custa um projeto?',
      answer: 'Depende do escopo. Trabalhamos com orçamento fechado por etapa (MVP + evoluções). O primeiro passo é uma conversa para entender o problema e dimensionar.',
    },
    {
      question: 'Vocês atendem apenas Pelotas/RS?',
      answer: 'Atendemos empresas de todo o Brasil. O desenvolvimento é remoto e a comunicação acontece por WhatsApp, chamadas de vídeo e e-mail.',
    },
  ]

  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}