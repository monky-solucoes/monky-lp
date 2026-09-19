import type { SVGProps } from 'react'

export type NomeIcone =
  | 'engrenagem'
  | 'vendas'
  | 'escudo'
  | 'suporte'
  | 'acai'
  | 'mercado'
  | 'oficina'
  | 'whatsapp'
  | 'grafico'
  | 'site'
  | 'carro'
  | 'codigo'
  | 'raio'
  | 'check'
  | 'seta'
  | 'olho'
  | 'alvo'
  | 'camadas'
  | 'chat'

interface IconeProps extends SVGProps<SVGSVGElement> {
  nome: NomeIcone
  tamanho?: number
}

const propriedadesPadrao = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.9,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export default function Icone({ nome, tamanho = 22, ...props }: IconeProps) {
  const conteudo = {
    engrenagem: (
      <>
        <path d="M12 15.4a3.4 3.4 0 1 0 0-6.8 3.4 3.4 0 0 0 0 6.8Z" />
        <path d="M19.1 13.1a7.8 7.8 0 0 0 0-2.2l2-1.55-2-3.46-2.45.99a8.4 8.4 0 0 0-1.9-1.1L14.4 3h-4.0l-.37 2.77a8.4 8.4 0 0 0-1.9 1.1L5.69 5.9l-2 3.46 2 1.55a7.8 7.8 0 0 0 0 2.2l-2 1.55 2 3.46 2.45-.99a8.4 8.4 0 0 0 1.9 1.1l.37 2.77h4l.37-2.77a8.4 8.4 0 0 0 1.9-1.1l2.45.99 2-3.46-2.03-1.55Z" />
      </>
    ),
    vendas: (
      <>
        <path d="M4 19V9" /><path d="M10 19V5" /><path d="M16 19v-7" /><path d="M3 19h18" />
        <path d="m5 7 5-4 4 3 5-4" /><path d="m17 2 2 .1-.1 2" />
      </>
    ),
    escudo: (
      <>
        <path d="M12 3 4.5 6v5.5c0 4.6 3 7.8 7.5 9.5 4.5-1.7 7.5-4.9 7.5-9.5V6L12 3Z" />
        <path d="m8.5 12 2.2 2.2 4.8-5" />
      </>
    ),
    suporte: (
      <>
        <path d="M4 13v-2a8 8 0 0 1 16 0v2" /><path d="M4 13h3v5H5a1 1 0 0 1-1-1v-4Z" />
        <path d="M20 13h-3v5h2a1 1 0 0 0 1-1v-4Z" /><path d="M17 18c0 2-1.8 3-5 3" />
      </>
    ),
    acai: <><path d="M7 10h10l-1.3 9H8.3L7 10Z" /><path d="M9 10c.4-3 2.1-5 5-5 1.9 0 3 1.1 3.5 2.4" /><path d="M12.5 5 15 2" /></>,
    mercado: <><path d="M3 5h2l2 10h10l2-7H6" /><circle cx="9" cy="19" r="1.5" /><circle cx="17" cy="19" r="1.5" /></>,
    oficina: <><path d="m14.7 6.3 3-3a4 4 0 0 0-5 5l-7.8 7.8a2.1 2.1 0 1 0 3 3l7.8-7.8a4 4 0 0 0 5-5l-3 3-3-3Z" /></>,
    whatsapp: <><path d="M20 11.8A8 8 0 0 1 8.1 18.9L4 20l1.1-4A8 8 0 1 1 20 11.8Z" /><path d="M8.6 8.2c.6 3 3 5.4 6 6" /></>,
    grafico: <><path d="M4 19V9h4v10H4Z" /><path d="M10 19V5h4v14h-4Z" /><path d="M16 19v-7h4v7h-4Z" /></>,
    site: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 8h18" /><path d="M7 6h.01M10 6h.01" /></>,
    carro: <><path d="m5 14 1.6-5h10.8l1.6 5" /><path d="M4 14h16v4H4v-4Z" /><path d="M7 18v2M17 18v2" /><path d="M7.5 14h.01M16.5 14h.01" /></>,
    codigo: <><path d="m9 7-5 5 5 5" /><path d="m15 7 5 5-5 5" /><path d="m13 5-2 14" /></>,
    raio: <path d="m13 2-8 12h7l-1 8 8-12h-7l1-8Z" />,
    check: <path d="m5 12 4 4L19 6" />,
    seta: <><path d="M5 12h14" /><path d="m14 7 5 5-5 5" /></>,
    olho: <><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" /><circle cx="12" cy="12" r="2.5" /></>,
    alvo: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" /></>,
    camadas: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5" /><path d="m3 16 9 5 9-5" /></>,
    chat: <><path d="M5 5h14v11H9l-4 3V5Z" /><path d="M8 9h8M8 12h5" /></>,
  }[nome]

  return (
    <svg
      width={tamanho}
      height={tamanho}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      {...propriedadesPadrao}
      {...props}
    >
      {conteudo}
    </svg>
  )
}
