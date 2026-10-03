interface HeroInternoProps { titulo: string; texto: string }

export default function HeroInterno({ titulo, texto }: HeroInternoProps) {
  return (
    <section className="hero-interno">
      <div className="container">
        <h1>{titulo}</h1>
        <p>{texto}</p>
      </div>
    </section>
  )
}
