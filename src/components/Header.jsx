import { useEffect, useState } from 'react'
import MarcaNextCodexa from './MarcaNextCodexa.jsx'

const LINKS = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#modelos', label: 'Modelos' },
  { href: '#processo', label: 'Como funciona' },
  { href: '#depoimentos', label: 'Depoimentos' },
  { href: '#faq', label: 'Dúvidas' }
]

export function Marca() {
  return (
    <a href="#topo" className="brand" aria-label="Next Codexa - início">
      <MarcaNextCodexa tamanho={44} />
      <span className="brand-txt">
        <strong>NEXT CODEXA</strong>
        <span>Desenvolvimento de Software</span>
      </span>
    </a>
  )
}

export default function Header() {
  const [rolou, setRolou] = useState(false)
  const [menuAberto, setMenuAberto] = useState(false)

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 24)
    aoRolar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => window.removeEventListener('scroll', aoRolar)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuAberto ? 'hidden' : ''
    const aoTeclar = (e) => e.key === 'Escape' && setMenuAberto(false)
    document.addEventListener('keydown', aoTeclar)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', aoTeclar)
    }
  }, [menuAberto])

  const fechar = () => setMenuAberto(false)

  return (
    <>
      <header className={`header${rolou ? ' scrolled' : ''}`}>
        <div className="container">
          <Marca />

          <nav className={`nav${menuAberto ? ' open' : ''}`}>
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={fechar}>
                {l.label}
              </a>
            ))}
            <a href="#orcamento" className="btn btn-primary" onClick={fechar}>
              Orçamento grátis
            </a>
          </nav>

          <a href="#orcamento" className="btn btn-primary">
            Orçamento grátis
          </a>

          <button
            className={`burger${menuAberto ? ' aberto' : ''}`}
            onClick={() => setMenuAberto((v) => !v)}
            aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuAberto}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {menuAberto && <div className="nav-backdrop" onClick={fechar} />}
    </>
  )
}
