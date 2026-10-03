'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Logo from './Logo'
import { navegacao } from '@/data/navegacao'
import { registrarCliqueMenu } from '@/lib/analytics'
import { criarLinkContatoGenerico } from '@/utils/whatsapp'

export default function Cabecalho() {
  const caminho = usePathname()
  const [menuAberto, definirMenuAberto] = useState(false)
  const menuRef = useRef<HTMLButtonElement>(null)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => { definirMenuAberto(false) }, [caminho])

  useEffect(() => {
    if (!menuAberto) return
    function fechar(evento: KeyboardEvent) {
      if (evento.key === 'Escape') {
        definirMenuAberto(false)
        menuRef.current?.focus()
      }
    }
    function fora(evento: PointerEvent) {
      if (evento.target instanceof Node && !headerRef.current?.contains(evento.target)) definirMenuAberto(false)
    }
    document.addEventListener('keydown', fechar)
    document.addEventListener('pointerdown', fora)
    return () => {
      document.removeEventListener('keydown', fechar)
      document.removeEventListener('pointerdown', fora)
    }
  }, [menuAberto])

  return (
    <header className="cabecalho" ref={headerRef}>
      <div className="container conteudo-cabecalho">
        <Link className="base-logo" href="/" aria-label="Monky Soluções — início" onClick={() => definirMenuAberto(false)}>
          <Logo />
        </Link>
        <button ref={menuRef} type="button" className="botao-menu"
          aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuAberto} aria-controls="navegacao-principal"
          onClick={() => definirMenuAberto(!menuAberto)}>
          <span /><span /><span />
        </button>
        <nav id="navegacao-principal" aria-label="Navegação principal" className={`navegacao ${menuAberto ? 'aberta' : ''}`}>
          {navegacao.map((link) => (
            <Link key={link.destino} href={link.destino}
              aria-current={caminho === link.destino ? 'page' : undefined}
              onClick={() => { definirMenuAberto(false); registrarCliqueMenu(link.analytics) }}>
              {link.nome}
            </Link>
          ))}
          <a className="botao botao-roxo contato-mobile" href={criarLinkContatoGenerico()}
            target="_blank" rel="noreferrer" data-analytics-origem="header_mobile">Falar com a Monky</a>
        </nav>
        <a className="botao botao-roxo contato-desktop" href={criarLinkContatoGenerico()}
          target="_blank" rel="noreferrer" data-analytics-origem="header">Falar com a Monky</a>
      </div>
    </header>
  )
}
