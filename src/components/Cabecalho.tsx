'use client'

import { useState } from 'react'
import Logo from './Logo'
import { criarLinkContatoGenerico } from '@/utils/whatsapp'

const links = [
  { nome: 'Soluções', destino: '#solucoes' },
  { nome: 'LP ou sistema?', destino: '#tipo-solucao' },
  { nome: 'Cases', destino: '#demonstracoes' },
  { nome: 'Como funciona', destino: '#como-funciona' },
  { nome: 'Sobre', destino: '#sobre' },
]

export default function Cabecalho() {
  const [menuAberto, definirMenuAberto] = useState(false)

  function fecharMenu() {
    definirMenuAberto(false)
  }

  return (
    <header className="cabecalho">
      <div className="container conteudo-cabecalho">
        <a href="#inicio" aria-label="Ir para o início" onClick={fecharMenu}>
          <Logo />
        </a>

        <nav className={`navegacao ${menuAberto ? 'aberta' : ''}`}>
          {links.map((link) => (
            <a key={link.destino} href={link.destino} onClick={fecharMenu}>
              {link.nome}
            </a>
          ))}
        </nav>

        <a
          className="botao-contato-cabecalho"
          href={criarLinkContatoGenerico()}
          target="_blank"
          rel="noreferrer"
          data-analytics-origem="header"
        >
          Falar com um especialista <span>→</span>
        </a>

        <button
          type="button"
          className={`botao-menu ${menuAberto ? 'aberto' : ''}`}
          aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuAberto}
          onClick={() => definirMenuAberto((estadoAtual) => !estadoAtual)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
