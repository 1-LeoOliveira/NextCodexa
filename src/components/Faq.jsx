import { useState, useRef } from 'react'

const PERGUNTAS = [
  {
    q: 'Quanto custa um projeto?',
    a: 'Depende do tamanho e da complexidade. Uma landing page tem um investimento bem menor do que um ERP completo, por exemplo. Por isso fazemos um diagnóstico gratuito antes: você recebe uma proposta com valor fechado, sem taxa escondida e sem cobrança por hora.'
  },
  {
    q: 'Em quanto tempo o projeto fica pronto?',
    a: 'Landing pages costumam ficar prontas entre 7 e 15 dias. Cardápios digitais, entre 10 e 20 dias. Sistemas ERP variam conforme os módulos, normalmente de 30 a 90 dias, com entregas parciais durante o caminho.'
  },
  {
    q: 'Vocês cuidam de domínio e hospedagem?',
    a: 'Sim. Registramos o domínio, configuramos a hospedagem, o certificado de segurança (HTTPS) e deixamos tudo no ar. O domínio e a conta ficam no seu nome — o projeto é seu.'
  },
  {
    q: 'Consigo editar o conteúdo depois sozinho?',
    a: 'Sim. Entregamos painel administrativo nos projetos que precisam de atualização frequente, como cardápio digital e sistemas. Além disso, você recebe um treinamento gravado mostrando como usar.'
  },
  {
    q: 'Vocês também cuidam dos anúncios e do tráfego pago?',
    a: 'Entregamos a página preparada para receber tráfego: pixel do Meta Ads, Google Analytics e eventos de conversão configurados. A gestão dos anúncios pode ser contratada à parte ou feita pela sua agência — a estrutura já estará pronta para os dois casos.'
  },
  {
    q: 'E depois da entrega, tem suporte?',
    a: 'Tem. Todo projeto inclui um período de suporte para ajustes e correções. Depois disso, você pode seguir com um plano de manutenção mensal ou chamar pontualmente quando precisar de uma evolução.'
  }
]

function Item({ pergunta, resposta, aberto, aoClicar }) {
  const respostaRef = useRef(null)

  return (
    <div className={`faq-item${aberto ? ' open' : ''}`}>
      <button className="faq-q" onClick={aoClicar} aria-expanded={aberto}>
        {pergunta}
        <i>+</i>
      </button>
      <div
        className="faq-a"
        ref={respostaRef}
        style={{ maxHeight: aberto ? `${respostaRef.current?.scrollHeight || 300}px` : 0 }}
      >
        <p>{resposta}</p>
      </div>
    </div>
  )
}

export default function Faq() {
  const [abertoIdx, setAbertoIdx] = useState(null)

  return (
    <section className="section" id="faq">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Dúvidas frequentes</span>
          <h2>Tudo o que você precisa saber</h2>
          <p>E se ficar qualquer dúvida depois disso, é só chamar no WhatsApp.</p>
        </div>

        <div className="faq">
          {PERGUNTAS.map((p, i) => (
            <div className="reveal" key={p.q}>
              <Item
                pergunta={p.q}
                resposta={p.a}
                aberto={abertoIdx === i}
                aoClicar={() => setAbertoIdx(abertoIdx === i ? null : i)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
