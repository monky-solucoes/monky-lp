import Logo from './Logo'
import { contato } from '@/data/contato'
import { criarLinkContatoGenerico } from '@/utils/whatsapp'

export default function Rodape() {
  return (
    <footer className="rodape">
      <div className="container grade-rodape">
        <div className="marca-rodape">
          <Logo />
          <p>Tecnologia para negócios reais.</p>
        </div>

        <div className="navegacao-rodape">
          <h3>Navegação</h3>
          <a href="#solucoes">Soluções</a>
          <a href="#demonstracoes">Cases</a>
          <a href="#sobre">Sobre</a>
        </div>

        <div className="contato-rodape">
          <h3>Contato</h3>
          <a href={criarLinkContatoGenerico()} target="_blank" rel="noreferrer">
            Falar no WhatsApp
          </a>
          <a href={`mailto:${contato.email}`}>{contato.email}</a>
          <span className="cidade-rodape">{contato.cidade}</span>
        </div>
      </div>

      <div className="container base-rodape">
        <span>© 2026 Monky. Todos os direitos reservados.</span>
      </div>
    </footer>
  )
}
