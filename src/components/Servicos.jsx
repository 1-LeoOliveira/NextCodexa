import { Monitor, Prato, Grafico, Janela, Celular, Elo, Engrenagem } from './Icones.jsx'

const SERVICOS = [
  {
    tag: 'Mais procurado',
    icone: <Monitor />,
    titulo: 'Landing Page de Alta Conversão',
    texto: 'Página única, rápida e persuasiva, feita para transformar clique de anúncio em contato de verdade.',
    itens: [
      'Copy e estrutura focadas em conversão',
      'Formulário integrado ao WhatsApp e e-mail',
      'Pixel do Meta e Google Analytics configurados',
      'Carregamento rápido e 100% responsivo'
    ]
  },
  {
    icone: <Prato />,
    titulo: 'Cardápio e Menu Digital',
    texto: 'Seu cardápio no QR Code, com pedido direto no WhatsApp. Sem comissão de aplicativo, sem intermediário.',
    itens: [
      'Cardápio por categorias com fotos e preços',
      'Carrinho e pedido enviado ao WhatsApp',
      'Painel para editar itens e preços',
      'QR Code pronto para mesa, balcão e delivery'
    ]
  },
  {
    tag: 'Avançado',
    icone: <Grafico />,
    titulo: 'Sistema ERP de Gestão',
    texto: 'Vendas, estoque, financeiro e clientes em um só lugar — construído exatamente do jeito que a sua empresa trabalha.',
    itens: [
      'Dashboard com indicadores em tempo real',
      'Controle de estoque, pedidos e financeiro',
      'Níveis de acesso por usuário',
      'Relatórios e exportação de dados'
    ]
  }
]

const EXTRAS = [
  { icone: <Janela />, texto: 'Sites institucionais e blogs' },
  { icone: <Celular />, texto: 'Aplicativos web e mobile' },
  { icone: <Elo />, texto: 'Integrações e APIs' },
  { icone: <Engrenagem />, texto: 'Automação de processos' }
]

export default function Servicos() {
  return (
    <section className="section" id="servicos">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">O que fazemos</span>
          <h2>
            Do básico ao avançado, <span className="grad-text">sob medida</span>
          </h2>
          <p>
            Três frentes principais que resolvem os problemas mais comuns de quem quer
            vender mais e trabalhar melhor.
          </p>
        </div>

        <div className="services-grid">
          {SERVICOS.map((s) => (
            <article className="card reveal" key={s.titulo}>
              {s.tag && <span className="card-tag">{s.tag}</span>}
              <div className="card-ico">{s.icone}</div>
              <h3>{s.titulo}</h3>
              <p>{s.texto}</p>
              <ul>
                {s.itens.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="services-extra">
          {EXTRAS.map((e) => (
            <div className="chip reveal" key={e.texto}>
              {e.icone}
              {e.texto}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
