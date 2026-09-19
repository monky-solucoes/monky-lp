import { criarLinkContatoGenerico } from '@/utils/whatsapp'

export default function BotaoWhatsAppFlutuante() {
  return (
    <a
      className="whatsapp-flutuante"
      href={criarLinkContatoGenerico()}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar com a Monky no WhatsApp"
    >
      <span className="whatsapp-flutuante-tooltip" aria-hidden="true">Fale com a gente</span>
      <span className="whatsapp-flutuante-icone" aria-hidden="true">
        <svg viewBox="0 0 32 32" role="img">
          <path
            fill="currentColor"
            d="M16.03 4.3c-6.45 0-11.7 5.16-11.7 11.5 0 2.03.54 4.02 1.57 5.76L4.23 27.7l6.34-1.62a11.8 11.8 0 0 0 5.45 1.34h.01c6.45 0 11.7-5.16 11.7-11.51 0-3.08-1.22-5.97-3.44-8.14a11.68 11.68 0 0 0-8.26-3.47Zm0 20.66h-.01c-1.7 0-3.38-.45-4.85-1.3l-.35-.2-3.76.96.99-3.6-.23-.37a9.05 9.05 0 0 1-1.43-4.88c0-5 4.14-9.06 9.23-9.06 2.47 0 4.78.94 6.52 2.65a8.93 8.93 0 0 1 2.71 6.4c0 5-4.14 9.07-9.22 9.07Zm5.06-6.78c-.28-.14-1.65-.8-1.91-.89-.25-.09-.44-.13-.63.14-.18.27-.72.89-.88 1.07-.16.18-.32.2-.6.07-.28-.14-1.17-.42-2.23-1.35a8.35 8.35 0 0 1-1.55-1.89c-.16-.27-.02-.42.12-.55.13-.13.28-.34.42-.51.14-.16.18-.27.28-.45.09-.18.05-.34-.02-.48-.07-.13-.63-1.49-.86-2.04-.23-.54-.46-.47-.63-.48h-.54c-.19 0-.49.07-.74.34-.26.27-.98.94-.98 2.3 0 1.35 1 2.66 1.14 2.84.14.18 1.96 2.95 4.75 4.14.66.29 1.18.46 1.58.59.66.2 1.27.17 1.75.1.53-.08 1.65-.66 1.88-1.3.23-.65.23-1.2.16-1.31-.07-.12-.25-.19-.53-.32Z"
          />
        </svg>
      </span>
      <span className="whatsapp-flutuante-pulso" aria-hidden="true" />
    </a>
  )
}
