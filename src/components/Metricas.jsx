import { useEffect, useRef, useState } from 'react'

const DADOS = [
  { alvo: 100, sufixo: '%', texto: 'Código próprio, sem template engessado' },
  { alvo: 30, sufixo: ' dias', texto: 'Prazo médio de entrega' },
  { alvo: 3, sufixo: 'x', texto: 'Mais conversão com página otimizada' },
  { alvo: 24, sufixo: '/7', texto: 'Seu sistema rodando sem parar' }
]

/** Numero que conta de 0 ate o alvo quando entra na tela. */
function Contador({ alvo, sufixo }) {
  const [valor, setValor] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return
        observer.disconnect()

        const duracao = 1400
        const inicio = performance.now()
        const passo = (agora) => {
          const p = Math.min((agora - inicio) / duracao, 1)
          setValor(Math.round(alvo * (1 - Math.pow(1 - p, 3))))
          if (p < 1) requestAnimationFrame(passo)
        }
        requestAnimationFrame(passo)
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [alvo])

  return (
    <b ref={ref}>
      {valor}
      {sufixo}
    </b>
  )
}

export default function Metricas() {
  return (
    <section className="metrics">
      <div className="container">
        <div className="metrics-grid">
          {DADOS.map((d) => (
            <div className="metric reveal" key={d.texto}>
              <Contador alvo={d.alvo} sufixo={d.sufixo} />
              <span>{d.texto}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
