import { contato } from '@/data/contato'

function somenteNumeros(valor: string) {
  return valor.replace(/\D/g, '')
}

export function criarLinkWhatsApp(mensagem: string) {
  const numero = somenteNumeros(contato.numeroWhatsApp)
  const texto = encodeURIComponent(mensagem)

  if (!numero) {
    return `https://wa.me/?text=${texto}`
  }

  return `https://wa.me/${numero}?text=${texto}`
}

export function criarMensagemInteresseProjeto(nomeProjeto: string) {
  return `Oi! Gostei do projeto ${nomeProjeto} que vi no site da Monky. Gostaria de criar algo parecido para o meu negócio. Podemos conversar sobre como adaptar essa ideia, as funcionalidades e os valores?`
}

export function criarLinkInteresseProjeto(nomeProjeto: string) {
  return criarLinkWhatsApp(criarMensagemInteresseProjeto(nomeProjeto))
}

export function criarLinkContatoGenerico() {
  return criarLinkWhatsApp(contato.mensagemGenerica)
}
