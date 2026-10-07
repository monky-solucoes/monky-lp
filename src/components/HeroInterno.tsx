interface HeroInternoProps { titulo: string; texto: string; className?: string; style?: React.CSSProperties }

export default function HeroInterno({ titulo, texto, className, style }: HeroInternoProps) {
  return (
    <section className={`hero-interno ${className || ''}`} style={style}>
      <div className="container">
        <h1>{titulo}</h1>
        <p>{texto}</p>
      </div>
    </section>
  )
}
