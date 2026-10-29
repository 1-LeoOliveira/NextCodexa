import { useEffect, useRef, useState } from 'react'
import { Raio, Relogio, Escudo, Balao } from './Icones.jsx'

const PONTOS = [
  {
    icone: <Raio />,
    titulo: 'Feito sob medida',
    texto: 'Nada de template genérico. O projeto nasce a partir da sua operação e da sua marca.'
  },
  {
    icone: <Relogio />,
    titulo: 'Prazo que se cumpre',
    texto: 'Cronograma definido no contrato e entregas parciais para você acompanhar a evolução.'
  },
  {
    icone: <Escudo />,
    titulo: 'Você é o dono do projeto',
    texto: 'Código, domínio e dados ficam no seu nome. Sem refém de plataforma ou mensalidade obrigatória.'
  },
  {
    icone: <Balao />,
    titulo: 'Atendimento direto',
    texto: 'Você fala com quem desenvolve, não com atendente. Resposta rápida no WhatsApp.'
  }
]

const BARRAS = [
  { rotulo: 'Contatos recebidos pelo site', valor: '+180%', largura: '88%' },
  { rotulo: 'Tempo gasto em tarefa manual', valor: '-65%', largura: '65%' },
  { rotulo: 'Erros de pedido e de estoque', valor: '-80%', largura: '80%' },
  { rotulo: 'Velocidade de atendimento', valor: '+120%', largura: '72%' }
]

export default function Diferenciais() {
  const painelRef = useRef(null)
  const [animar, setAnimar] = useState(false)

  useEffect(() => {
    const el = painelRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setAnimar(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="section" id="sobre">
      <div className="container">
        <div className="why">
          <div className="why-intro reveal">
            <span className="eyebrow">Por que a Next Codexa</span>
            <h2>
              Software é meio. <span className="grad-text">Resultado é o fim.</span>
            </h2>
            <p>
              Não entregamos um site bonito que ninguém usa nem um sistema cheio de função que
              ninguém entende. Entregamos a solução mais direta possível para o problema que está
              travando o seu negócio hoje.
            </p>

            <div className="why-list">
              {PONTOS.map((p) => (
                <div className="why-item" key={p.titulo}>
                  <span className="ico">{p.icone}</span>
                  <div>
                    <h3>{p.titulo}</h3>
                    <p>{p.texto}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="why-visual reveal" ref={painelRef}>
            <h4>Impacto típico depois do projeto no ar</h4>

            {BARRAS.map((b, i) => (
              <div className="bar" key={b.rotulo}>
                <div className="lbl">
                  <span>{b.rotulo}</span>
                  <b>{b.valor}</b>
                </div>
                <div className="track">
                  <span
                    className="fill"
                    style={{
                      width: animar ? b.largura : 0,
                      transitionDelay: `${i * 140}ms`
                    }}
                  />
                </div>
              </div>
            ))}

            <div className="why-note">
              Médias observadas em projetos do mesmo tipo. O resultado real depende do seu mercado,
              da sua oferta e do investimento em divulgação — e isso a gente conversa antes de começar.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
