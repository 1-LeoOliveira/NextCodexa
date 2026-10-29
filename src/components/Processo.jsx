const ETAPAS = [
  {
    titulo: 'Diagnóstico gratuito',
    texto: 'Conversamos sobre o seu negócio, o que você precisa resolver e qual resultado espera alcançar.'
  },
  {
    titulo: 'Proposta e escopo',
    texto: 'Você recebe o escopo detalhado, o prazo e o valor fechado. Nada é iniciado sem a sua aprovação.'
  },
  {
    titulo: 'Desenvolvimento',
    texto: 'Construímos o projeto com entregas parciais, para você acompanhar e pedir ajustes durante o processo.'
  },
  {
    titulo: 'Entrega e suporte',
    texto: 'Publicamos, treinamos você para usar e seguimos dando suporte depois que o projeto está no ar.'
  }
]

export default function Processo() {
  return (
    <section className="section" id="processo">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Como funciona</span>
          <h2>
            Simples do primeiro contato <span className="grad-text">até a entrega</span>
          </h2>
          <p>
            Sem burocracia e sem surpresa no meio do caminho. Você sabe exatamente o que vai
            receber e quando.
          </p>
        </div>

        <div className="steps">
          {ETAPAS.map((e, i) => (
            <div className="step reveal" key={e.titulo}>
              <b>{i + 1}</b>
              <h3>{e.titulo}</h3>
              <p>{e.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
