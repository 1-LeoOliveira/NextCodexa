const DEPOIMENTOS = [
  {
    texto: 'A landing page mudou o jogo. Antes eu rodava anúncio para o Instagram e perdia o contato. Hoje o formulário cai no meu WhatsApp e eu falo com o cliente em minutos.',
    iniciais: 'MR',
    nome: 'Marcos Ribeiro',
    cargo: 'Clínica estética — São Paulo/SP'
  },
  {
    texto: 'Troquei o cardápio impresso pelo QR Code e economizei em impressão e em comissão de aplicativo. O pedido chega pronto no WhatsApp, é só preparar.',
    iniciais: 'JS',
    nome: 'Juliana Souza',
    cargo: 'Restaurante — Campinas/SP'
  },
  {
    texto: 'Eu controlava estoque em caderno e planilha. Com o sistema, sei o que tenho, o que falta e quanto entrou no mês sem precisar ficar somando nada.',
    iniciais: 'AF',
    nome: 'André Farias',
    cargo: 'Distribuidora — Belo Horizonte/MG'
  }
]

export default function Depoimentos() {
  return (
    <section className="section" id="depoimentos">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Depoimentos</span>
          <h2>O que dizem nossos clientes</h2>
          <p>
            Resultado real de quem parou de improvisar e passou a ter uma ferramenta feita para o
            próprio negócio.
          </p>
        </div>

        <div className="testi-grid">
          {DEPOIMENTOS.map((d) => (
            <article className="testi reveal" key={d.nome}>
              <span className="quote">&rdquo;</span>
              <div className="stars">★★★★★</div>
              <p>{d.texto}</p>
              <div className="testi-who">
                <span className="avatar">{d.iniciais}</span>
                <div>
                  <b>{d.nome}</b>
                  <span>{d.cargo}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
