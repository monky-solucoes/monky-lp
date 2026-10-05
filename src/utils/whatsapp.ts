import { contato } from '@/data/contato'

function somenteNumeros(valor: string) {
  return valor.replace(/\D/g, '')
}

export function criarLinkWhatsApp(mensagem: string) {
  const numeroLocal = somenteNumeros(contato.numeroWhatsApp)
  const numero = numeroLocal.length === 10 || numeroLocal.length === 11 ? `55${numeroLocal}` : numeroLocal
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

export const mensagensWhatsapp = {
  hero: 'Oi! Vi o site da Monky e quero conversar sobre meu projeto.',
  solucao: (nome: string) => `Tenho interesse em ${nome}. Podemos conversar?`,
  ctaFinal: 'Não encontrei exatamente o que preciso. Meu problema é: ',
  comoFunciona: 'Gostei do processo. Quero começar contando minha rotina.',
  projetos: 'Vi os projetos no site da Monky e quero conversar sobre uma solução para minha empresa.',
  sobre: 'Conheci a Monky pelo site e quero conversar sobre uma solução para minha empresa.',
}

export function criarLinkHero() {
  return criarLinkWhatsApp(mensagensWhatsapp.hero)
}

export function criarLinkSolucao(nome: string) {
  return criarLinkWhatsApp(mensagensWhatsapp.solucao(nome))
}

export function criarLinkCtaFinal() {
  return criarLinkWhatsApp(mensagensWhatsapp.ctaFinal)
}

export function criarLinkComoFunciona() {
  return criarLinkWhatsApp(mensagensWhatsapp.comoFunciona)
}

export function criarLinkProjetos() {
  return criarLinkWhatsApp(mensagensWhatsapp.projetos)
}

export function criarLinkSobre() {
  return criarLinkWhatsApp(mensagensWhatsapp.sobre)
}
