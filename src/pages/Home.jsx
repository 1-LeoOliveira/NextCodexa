import { useEffect } from 'react'
import useReveal from '../hooks/useReveal.js'
import CeuEstrelado from '../components/CeuEstrelado.jsx'
import Header from '../components/Header.jsx'
import Hero from '../components/Hero.jsx'
import Metricas from '../components/Metricas.jsx'
import Servicos from '../components/Servicos.jsx'
import Portfolio from '../components/Portfolio.jsx'
import Processo from '../components/Processo.jsx'
import Diferenciais from '../components/Diferenciais.jsx'
import Depoimentos from '../components/Depoimentos.jsx'
import Faq from '../components/Faq.jsx'
import Orcamento from '../components/Orcamento.jsx'
import Footer from '../components/Footer.jsx'
import WhatsFlutuante from '../components/WhatsFlutuante.jsx'

export default function Home() {
  useReveal()

  useEffect(() => {
    document.title =
      'Next Codexa | Desenvolvimento de Software sob Medida para o seu Negócio'
  }, [])

  return (
    <>
      <CeuEstrelado />
      <Header />
      <main>
        <Hero />
        <Metricas />
        <Servicos />
        <Portfolio />
        <Processo />
        <Diferenciais />
        <Depoimentos />
        <Faq />
        <Orcamento />
      </main>
      <Footer />
      <WhatsFlutuante />
    </>
  )
}
