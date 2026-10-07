import Link from 'next/link'
import Logo from './Logo'
import { contato } from '@/data/contato'
import { navegacao } from '@/data/navegacao'
import { criarLinkHero } from '@/utils/whatsapp'

export default function Rodape() {
  return (
    <footer className="rodape">
      <div className="container grade-rodape">
        <div className="marca-rodape">
          <Link className="base-logo" href="/" aria-label="Monky Soluções — início"><Logo /></Link>
          <p>Tecnologia para negócios reais.</p>
          <span>Desenvolvido em Pelotas/RS.</span>
        </div>
        <nav aria-label="Navegação do rodapé" className="navegacao-rodape">
          <h2>Navegue</h2>
          {navegacao.map((link) => <Link key={link.destino} href={link.destino}>{link.nome}</Link>)}
        </nav>
        <div className="contato-rodape">
          <h2>Vamos conversar</h2>
          <a href={criarLinkHero()} target="_blank" rel="noreferrer" data-analytics-origem="footer">Falar com a Monky</a>
          <a href={`mailto:${contato.email}`}>{contato.email}</a>
          <span>{contato.cidade}</span>
        </div>
      </div>
      <div className="container base-rodape">© {new Date().getFullYear()} Monky. Todos os direitos reservados.</div>
    </footer>
  )
}
