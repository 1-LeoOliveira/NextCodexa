import { Link } from 'react-router-dom'
import { Seta } from './Icones.jsx'

/* --- Mini-previews em CSS puro, um para cada modelo --- */

const PreviewLanding = () => (
  <div className="mock mock-lp" aria-hidden="true">
    <div className="mock-bar"><i /><i /><i /><u /></div>
    <div className="mock-lp-hero">
      <img src="/img/odonto/hero.jpg" alt="" loading="lazy" />
      <span className="ml-pill" />
      <span className="ml-h1" />
      <span className="ml-h1 w70" />
      <span className="ml-txt" />
      <span className="ml-txt w80" />
      <span className="ml-btn" />
    </div>
    <div className="mock-lp-form">
      <span className="ml-ft" />
      <span className="ml-in" /><span className="ml-in" /><span className="ml-in" />
      <span className="ml-sub" />
    </div>
  </div>
)

const PRATOS_PREVIEW = [
  '/img/menu/pizza-margherita.jpg',
  '/img/menu/file.jpg',
  '/img/menu/petit-gateau.jpg'
]

const PreviewMenu = () => (
  <div className="mock mock-menu" aria-hidden="true">
    <div className="mock-menu-capa">
      <img src="/img/menu/capa.jpg" alt="" loading="lazy" />
    </div>
    <div className="mock-menu-top">
      <span className="mm-logo" />
      <span className="mm-tabs"><i /><i className="on" /><i /><i /></span>
    </div>
    <div className="mock-menu-list">
      {PRATOS_PREVIEW.map((src) => (
        <div className="mm-item" key={src}>
          <span className="mm-img">
            <img src={src} alt="" loading="lazy" />
          </span>
          <span className="mm-txt"><u /><u className="w60" /><b /></span>
        </div>
      ))}
    </div>
    <div className="mock-menu-cart"><span /></div>
  </div>
)

const PreviewErp = () => (
  <div className="mock mock-erp" aria-hidden="true">
    <div className="me-side"><i /><i className="on" /><i /><i /><i /></div>
    <div className="me-main">
      <div className="me-kpis"><span /><span /><span /></div>
      <div className="me-chart">
        {[38, 62, 46, 78, 55, 92, 70].map((h, i) => (
          <u key={i} style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="me-rows"><b /><b /><b /></div>
    </div>
  </div>
)

const MODELOS = [
  {
    preview: <PreviewLanding />,
    tipo: 'Landing Page',
    titulo: 'Clínica OdontoVita',
    texto: 'Modelo de landing page para captação de pacientes via tráfego pago: prova social, oferta clara e formulário que cai direto no WhatsApp.',
    tags: ['Alta conversão', 'Tráfego pago', 'Formulário + WhatsApp'],
    rota: '/modelos/landing-page'
  },
  {
    preview: <PreviewMenu />,
    tipo: 'Menu Digital',
    titulo: 'Restaurante Sabor & Arte',
    texto: 'Cardápio digital completo com categorias, busca, carrinho e envio do pedido para o WhatsApp do restaurante. Pronto para QR Code na mesa.',
    tags: ['QR Code', 'Carrinho', 'Pedido no WhatsApp'],
    rota: '/modelos/menu-digital'
  },
  {
    preview: <PreviewErp />,
    tipo: 'Sistema ERP',
    titulo: 'Dashboard de Gestão ERP',
    texto: 'Painel com indicadores, gráfico de faturamento, controle de pedidos, estoque com alerta de mínimo e contas a receber.',
    tags: ['Dashboard', 'Estoque', 'Financeiro'],
    rota: '/modelos/erp'
  }
]

export default function Portfolio() {
  return (
    <section className="section portfolio" id="modelos">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Modelos de referência</span>
          <h2>Nossos projetos e soluções</h2>
          <p>
            Não precisa imaginar: abra os modelos abaixo e navegue como se fosse o cliente final.
            Todos funcionando de verdade.
          </p>
        </div>

        <div className="port-grid">
          {MODELOS.map((m) => (
            <article className="port-card reveal" key={m.titulo}>
              <div className="port-thumb">
                {m.preview}
                <div className="port-ov">
                  <span className="port-kind">{m.tipo}</span>
                </div>
              </div>

              <div className="port-body">
                <h3>{m.titulo}</h3>
                <p>{m.texto}</p>
                <div className="port-tags">
                  {m.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <Link to={m.rota} className="port-link">
                  Ver modelo ao vivo
                  <Seta />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
