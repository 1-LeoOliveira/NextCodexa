import { Link } from 'react-router-dom'
import { Mail, Clock3, MapPin, ArrowUp, MessageCircle, BadgeCheck } from 'lucide-react'
import { CONFIG, linkWhats } from '../config.js'
import { Marca } from './Header.jsx'
import { Instagram, Linkedin, Whats } from './Icones.jsx'

const SERVICOS = [
  'Landing Page',
  'Cardápio digital',
  'Sistema ERP',
  'Site institucional',
  'Integrações e APIs'
]

const MODELOS = [
  { rota: '/modelos/landing-page', nome: 'Clínica OdontoVita' },
  { rota: '/modelos/menu-digital', nome: 'Restaurante Sabor & Arte' },
  { rota: '/modelos/erp', nome: 'Dashboard de Gestão ERP' }
]

export default function Footer() {
  const ano = new Date().getFullYear()

  return (
    <footer className="footer">
      {/* ultima chance de conversao: quem chegou ate aqui leu tudo */}
      <div className="container">
        <div className="foot-cta">
          <div className="foot-cta-txt">
            <h3>Pronto para tirar o seu projeto do papel?</h3>
            <p>
              Diagnóstico gratuito, escopo detalhado e valor fechado.
              Normalmente respondemos no mesmo dia útil.
            </p>
          </div>

          <div className="foot-cta-acoes">
            <a
              href={linkWhats()}
              className="btn btn-wpp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Whats size={19} /> Chamar no WhatsApp
            </a>
            <a href="#orcamento" className="btn btn-ghost">
              Solicitar orçamento
            </a>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="foot-grid">
          <div className="foot-about">
            <Marca />
            <p>
              Desenvolvimento de software sob medida para empresas que querem vender mais e
              operar melhor. Do site que capta cliente ao sistema que organiza a operação.
            </p>

            <div className="socials">
              <a href={CONFIG.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram />
              </a>
              <a href={linkWhats()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <Whats size={18} />
              </a>
              <a href={CONFIG.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin />
              </a>
            </div>
          </div>

          <div className="foot-col">
            <h4>Serviços</h4>
            <ul>
              {SERVICOS.map((s) => (
                <li key={s}><a href="#servicos">{s}</a></li>
              ))}
            </ul>
          </div>

          <div className="foot-col">
            <h4>Modelos prontos</h4>
            <ul>
              {MODELOS.map((m) => (
                <li key={m.rota}><Link to={m.rota}>{m.nome}</Link></li>
              ))}
              <li><a href="#processo">Como funciona</a></li>
              <li><a href="#faq">Dúvidas frequentes</a></li>
            </ul>
          </div>

          <div className="foot-col foot-contato">
            <h4>Fale com a gente</h4>
            <ul>
              <li>
                <a href={linkWhats()} target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={17} />
                  <span>
                    <b>{CONFIG.whatsappExibicao}</b>
                    <small>WhatsApp — resposta rápida</small>
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${CONFIG.email}`}>
                  <Mail size={17} />
                  <span>
                    <b>{CONFIG.email}</b>
                    <small>Para propostas e documentos</small>
                  </span>
                </a>
              </li>
              <li className="estatico">
                <Clock3 size={17} />
                <span>
                  <b>{CONFIG.atendimento}</b>
                  <small>Urgências pelo WhatsApp</small>
                </span>
              </li>
              <li className="estatico">
                <MapPin size={17} />
                <span>
                  <b>Atendimento remoto</b>
                  <small>Clientes em todo o Brasil</small>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* selos de confianca: reduzem o atrito de quem ainda esta em duvida */}
        <div className="foot-selos">
          <span><BadgeCheck size={16} /> Código e domínio no seu nome</span>
          <span><BadgeCheck size={16} /> Valor fechado em contrato</span>
          <span><BadgeCheck size={16} /> Suporte incluso após a entrega</span>
        </div>

        <div className="foot-bottom">
          <span>
            &copy; {ano} {CONFIG.empresa} — Desenvolvimento de Software.
            Todos os direitos reservados.
          </span>
          <span className="foot-cnpj">CNPJ {CONFIG.cnpj}</span>
          <a href="#topo" className="foot-topo" aria-label="Voltar ao topo">
            <ArrowUp size={16} /> Topo
          </a>
        </div>
      </div>
    </footer>
  )
}
