import Icone from '@/components/Icone'
import Link from 'next/link'
import Image from 'next/image'

const etapas = [
  { nome: 'Você conta o problema', descricao: 'Você explica sua rotina, dificuldade ou ideia. Pode trazer uma planilha, uma mensagem ou simplesmente contar como faz hoje.', resultado: 'Um ponto de partida claro', detalhe: 'O que acontece, quem participa e onde está a dificuldade.' },
  { nome: 'A gente entende', descricao: 'Olhamos para o caminho completo: de onde a informação vem, por onde passa e o que precisa acontecer depois.', resultado: 'A rotina mapeada', detalhe: 'Prioridades, regras e ferramentas que precisam conversar.' },
  { nome: 'Propomos o essencial', descricao: 'Definimos juntos o que entra na primeira versão. Você entende o escopo antes de o desenvolvimento começar.', resultado: 'Um escopo combinado', detalhe: 'O que vamos construir, o que fica para depois e os próximos passos.' },
  { nome: 'Desenvolvemos', descricao: 'A ideia ganha forma em telas e fluxos. Validamos com você para que a solução faça sentido na prática.', resultado: 'Uma solução para testar', detalhe: 'Você acompanha, experimenta e ajuda a ajustar os detalhes.' },
  { nome: 'Evoluímos', descricao: 'Depois de colocar em uso, novas necessidades podem virar melhorias. Cada próximo passo é avaliado e combinado.', resultado: 'Espaço para crescer', detalhe: 'Melhorias e novos módulos conforme a operação precisar.' },
]

export default function SecaoComoFunciona() {
  return (
    <>
      <section className="hero-processo">
        <div className="container abertura-processo">
          <div>
            <h1>Você não precisa chegar sabendo o que precisa.</h1>
            <p>Conte o problema. A solução vem depois.</p>
            <p className="apoio-processo">Uma conversa direta, um escopo claro e você participando das decisões. É assim que uma dificuldade da rotina começa a virar solução.</p>
            <a className="link-seta" href="#etapas">Conheça o caminho <Icone nome="seta" tamanho={18} /></a>
          </div>
          <figure className="foto-conversa">
            <Image src="/images/conversa-monky.png" alt="Cena ilustrativa de uma pessoa sorrindo durante uma conversa de trabalho com notebook." fill priority sizes="(max-width: 700px) calc(100vw - 40px), 520px" />
            <figcaption><h2>Uma conversa<br />de cada vez.</h2><p>Espaço para ouvir, entender e construir juntos.</p></figcaption>
          </figure>
        </div>
      </section>
      <section className="secao secao-processo" id="etapas" aria-labelledby="titulo-processo">
      <div className="container">
        <div className="cabecalho-secao"><h2 id="titulo-processo">Do primeiro contato ao uso no dia a dia.</h2><p>Cada etapa tem um propósito. E uma próxima decisão bem definida.</p></div>
        <ol className="lista-processo processo-detalhado">
          {etapas.map((etapa, indice) => (
            <li key={etapa.nome}>
              <span className="numero-etapa" aria-hidden="true">{String(indice + 1).padStart(2, '0')}</span>
              <div className="explicacao-etapa"><h3>{etapa.nome}</h3><p>{etapa.descricao}</p></div>
              <div className="resultado-etapa"><Icone nome="check" tamanho={18} /><div><strong>{etapa.resultado}</strong><p>{etapa.detalhe}</p></div></div>
            </li>
          ))}
        </ol>
        <div className="ponte-processo"><p>Quer visualizar o que pode sair dessa conversa?</p><Link className="link-seta" href="/projetos">Explore os projetos e automações <Icone nome="seta" tamanho={18} /></Link></div>
      </div>
    </section>
    </>
  )
}
