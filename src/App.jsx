import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Carregando from './components/Carregando.jsx'
import Home from './pages/Home.jsx'
import LandingDemo from './pages/demos/LandingDemo.jsx'
import MenuDemo from './pages/demos/MenuDemo.jsx'
import ErpDemo from './pages/demos/ErpDemo.jsx'
import NaoEncontrado from './pages/NaoEncontrado.jsx'

/** Leva a pagina para o topo a cada troca de rota. */
function RolarAoTopo() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

/** Tempo que a animacao de abertura fica na tela, em milissegundos. */
const DURACAO_INTRO = 3000
const DURACAO_SAIDA = 560

/** Decide se a abertura deve rodar: so na primeira carga da sessao. */
function devoMostrarIntro() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  try {
    return !sessionStorage.getItem('nc-intro-vista')
  } catch {
    return true
  }
}

export default function App() {
  const [introAtiva, setIntroAtiva] = useState(devoMostrarIntro)
  const [introSaindo, setIntroSaindo] = useState(false)

  useEffect(() => {
    if (!introAtiva) return

    try {
      sessionStorage.setItem('nc-intro-vista', '1')
    } catch {
      /* navegacao anonima: a abertura roda de novo, sem problema */
    }

    document.body.style.overflow = 'hidden'

    const inicioSaida = setTimeout(() => setIntroSaindo(true), DURACAO_INTRO)
    const fim = setTimeout(() => {
      setIntroAtiva(false)
      document.body.style.overflow = ''
    }, DURACAO_INTRO + DURACAO_SAIDA)

    return () => {
      clearTimeout(inicioSaida)
      clearTimeout(fim)
      document.body.style.overflow = ''
    }
  }, [introAtiva])

  return (
    <>
      {introAtiva && <Carregando saindo={introSaindo} />}
      <RolarAoTopo />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/modelos/landing-page" element={<LandingDemo />} />
        <Route path="/modelos/menu-digital" element={<MenuDemo />} />
        <Route path="/modelos/erp" element={<ErpDemo />} />
        <Route path="*" element={<NaoEncontrado />} />
      </Routes>
    </>
  )
}
