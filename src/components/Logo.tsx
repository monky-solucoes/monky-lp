import Image from 'next/image'

export default function Logo() {
  return (
    <Image
      src="/images/monky-logo.png"
      alt="Monky Soluções"
      width={779}
      height={202}
      priority
      className="logo"
    />
  )
}
