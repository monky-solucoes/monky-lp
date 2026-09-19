import { criarLinkContatoGenerico } from '@/utils/whatsapp'

export default function SecaoChamadaFinal() {
  return (
    <section className="secao-chamada-final" id="contato">
      <div className="container">
        <div className="chamada-final">
          <div>
            <span className="sobretitulo sobretitulo-claro">Vamos conversar?</span>
            <h2>Pronto para simplificar o seu negócio?</h2>
            <p>Fale com a gente e descubra qual solução faz sentido para a sua empresa.</p>
          </div>

          <a
            className="botao botao-claro"
            href={criarLinkContatoGenerico()}
            target="_blank"
            rel="noreferrer"
          >
            Falar com um especialista <span>→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
