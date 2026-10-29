import { useState, useEffect } from 'react'
import {
  Phone, Star, Check, MessageCircle, ShieldCheck, CalendarClock, ScanLine,
  Lock, Clock3, MapPin, Mail, Award, Stethoscope, Sparkles, CheckCircle2
} from 'lucide-react'
import BarraModelo from '../../components/BarraModelo.jsx'
import { linkWhats, mascaraTelefone } from '../../config.js'
import '../../styles/demo-landing.css'

/* Numero fictício usado apenas na demonstração */
const WPP_DEMO = '5511999999999'
const zap = (txt) => linkWhats(txt, WPP_DEMO)

const DIFERENCIAIS = [
  {
    Icone: ShieldCheck,
    titulo: 'Orçamento fechado na hora',
    texto: 'Você sai da avaliação com o valor total do tratamento por escrito. Nada muda no meio do caminho.'
  },
  {
    Icone: CalendarClock,
    titulo: 'Horário que cabe na sua rotina',
    texto: 'Atendemos até as 20h e aos sábados, para você não precisar faltar no trabalho.'
  },
  {
    Icone: ScanLine,
    titulo: 'Tecnologia que evita retrabalho',
    texto: 'Raio-X digital e escaneamento 3D: diagnóstico preciso e menos tempo na cadeira.'
  }
]

const TRATAMENTOS = [
  {
    img: '/img/odonto/implante.jpg',
    titulo: 'Implante dentário',
    texto: 'Dente fixo, natural e definitivo. Procedimento com anestesia e acompanhamento completo.',
    preco: 'R$ 189'
  },
  {
    img: '/img/odonto/aparelho.jpg',
    titulo: 'Aparelho e alinhadores',
    texto: 'Convencional, autoligado ou alinhador transparente. Manutenção mensal inclusa.',
    preco: 'R$ 129'
  },
  {
    img: '/img/odonto/clareamento.jpg',
    titulo: 'Clareamento estético',
    texto: 'Resultado visível já na primeira sessão, com protocolo que respeita a sensibilidade.',
    preco: 'R$ 99'
  }
]

const ESTRUTURA = [
  {
    Icone: Stethoscope,
    titulo: 'Equipe especialista',
    texto: 'Profissionais com pós-graduação em implantodontia, ortodontia e odontopediatria.'
  },
  {
    Icone: ScanLine,
    titulo: 'Raio-X e escâner 3D no local',
    texto: 'Você faz o exame e recebe o diagnóstico na mesma consulta, sem precisar ir a outro lugar.'
  },
  {
    Icone: ShieldCheck,
    titulo: 'Protocolo rígido de biossegurança',
    texto: 'Instrumentais esterilizados com rastreio por lote e sala preparada entre cada paciente.'
  }
]

const DEPOIMENTOS = [
  {
    texto: 'Fiz dois implantes e não senti dor nenhuma. O que mais me tranquilizou foi receber o orçamento fechado antes de começar.',
    foto: '/img/pessoas/renata.jpg',
    nome: 'Renata Silva',
    detalhe: 'Paciente desde 2023'
  },
  {
    texto: 'Cheguei com dor num sábado e fui atendido na hora. Atendimento humano de verdade, do início ao fim.',
    foto: '/img/pessoas/carlos.jpg',
    nome: 'Carlos Mendes',
    detalhe: 'Atendimento de urgência'
  },
  {
    texto: 'Coloquei aparelho aos 38 anos achando que era tarde. Um ano depois meu sorriso mudou completamente.',
    foto: '/img/pessoas/patricia.jpg',
    nome: 'Patrícia Araújo',
    detalhe: 'Tratamento ortodôntico'
  }
]

const NUMEROS = [
  ['18 anos', 'de clínica na mesma região'],
  ['+2.400', 'pacientes atendidos'],
  ['4,9', 'de nota média no Google'],
  ['18x', 'sem juros no cartão']
]

const ROSTOS = [
  '/img/pessoas/renata.jpg',
  '/img/pessoas/carlos.jpg',
  '/img/pessoas/patricia.jpg',
  '/img/pessoas/juliana.jpg'
]

const VAZIO = { nome: '', tel: '', caso: '', periodo: 'Manhã (8h às 12h)' }

export default function LandingDemo() {
  const [dados, setDados] = useState(VAZIO)
  const [erros, setErros] = useState({})
  const [enviado, setEnviado] = useState(false)

  useEffect(() => {
    document.title = 'Modelo — Landing Page de Alta Conversão | Next Codexa'
  }, [])

  const alterar = (campo) => (e) => {
    const valor = campo === 'tel' ? mascaraTelefone(e.target.value) : e.target.value
    setDados((d) => ({ ...d, [campo]: valor }))
    setErros((x) => ({ ...x, [campo]: false }))
  }

  const enviar = (e) => {
    e.preventDefault()
    const faltando = {
      nome: !dados.nome.trim(),
      tel: dados.tel.replace(/\D/g, '').length < 10,
      caso: !dados.caso
    }
    if (faltando.nome || faltando.tel || faltando.caso) {
      setErros(faltando)
      return
    }

    const texto =
      `*Novo agendamento pelo site*\n\n` +
      `*Nome:* ${dados.nome}\n` +
      `*WhatsApp:* ${dados.tel}\n` +
      `*Caso:* ${dados.caso}\n` +
      `*Período:* ${dados.periodo}`

    window.open(zap(texto), '_blank', 'noopener')
    setEnviado(true)
    setDados(VAZIO)
  }

  return (
    <div className="lp">
      <BarraModelo tipo="Landing Page de alta conversão" />

      <header className="lp-top">
        <div className="lp-wrap">
          <div className="lp-logo">
            <i><Sparkles size={21} /></i> OdontoVita
          </div>
          <div className="lp-phone">
            <Phone size={20} />
            <span>
              (11) 4002-8922
              <small>Seg. a sáb., 8h às 20h</small>
            </span>
          </div>
          <a href="#agendar" className="lp-btn lp-btn-main lp-btn-sm">
            Agendar avaliação
          </a>
        </div>
      </header>

      <section className="lp-hero">
        <div className="lp-hero-bg">
          <img src="/img/odonto/hero.jpg" alt="" aria-hidden="true" fetchPriority="high" />
        </div>

        <div className="lp-wrap">
          <div>
            <span className="lp-tag">
              <Star size={15} fill="currentColor" />
              Nota 4,9 com mais de 380 avaliações
            </span>

            <h1>
              Recupere o seu sorriso com um{' '}
              <span>plano de tratamento sem surpresa no preço</span>
            </h1>

            <p className="lp-lead">
              Avaliação completa com raio-X digital por <strong>R$ 49</strong> e orçamento fechado
              na hora. Agende hoje e saia da clínica sabendo exatamente o que precisa ser feito.
            </p>

            <ul className="lp-list">
              {[
                'Parcelamento em até 18x sem juros no cartão',
                'Equipe especializada em implante e ortodontia',
                'Atendimento de urgência no mesmo dia'
              ].map((t) => (
                <li key={t}>
                  <span className="lp-check">
                    <Check size={13} strokeWidth={3.5} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>

            <div className="lp-cta">
              <a href="#agendar" className="lp-btn lp-btn-main">
                Quero minha avaliação por R$ 49
              </a>
              <a
                href={zap('Olá! Vi a landing page e gostaria de agendar uma avaliação.')}
                className="lp-btn lp-btn-wpp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={19} /> Falar agora
              </a>
            </div>

            <div className="lp-proof">
              <div className="lp-faces">
                {ROSTOS.map((r) => (
                  <img key={r} src={r} alt="" loading="lazy" />
                ))}
              </div>
              <div>
                <b>+2.400 pacientes atendidos</b>
                <small>Unidade Vila Mariana — São Paulo/SP</small>
              </div>
            </div>
          </div>

          <div id="agendar">
            <form className="lp-form" onSubmit={enviar} noValidate>
              <span className="lp-ribbon">
                <Clock3 size={12} /> Vagas limitadas esta semana
              </span>
              <h2>Agende sua avaliação</h2>
              <p className="lp-form-sub">
                Preencha e nossa recepção confirma o horário em poucos minutos.
              </p>

              {enviado && (
                <div className="lp-ok">
                  <CheckCircle2 size={18} />
                  <span>Recebido! Abrimos o WhatsApp com seus dados para confirmar o horário.</span>
                </div>
              )}

              <div className={`lp-fi${erros.nome ? ' erro' : ''}`}>
                <label htmlFor="lp-nome">Nome completo *</label>
                <input
                  id="lp-nome"
                  value={dados.nome}
                  onChange={alterar('nome')}
                  placeholder="Digite seu nome"
                />
              </div>

              <div className={`lp-fi${erros.tel ? ' erro' : ''}`}>
                <label htmlFor="lp-tel">WhatsApp *</label>
                <input
                  id="lp-tel"
                  type="tel"
                  value={dados.tel}
                  onChange={alterar('tel')}
                  placeholder="(11) 90000-0000"
                />
              </div>

              <div className={`lp-fi${erros.caso ? ' erro' : ''}`}>
                <label htmlFor="lp-caso">Qual o seu caso? *</label>
                <select id="lp-caso" value={dados.caso} onChange={alterar('caso')}>
                  <option value="">Selecione</option>
                  <option>Implante dentário</option>
                  <option>Aparelho ortodôntico</option>
                  <option>Clareamento e estética</option>
                  <option>Limpeza e prevenção</option>
                  <option>Dor / urgência</option>
                </select>
              </div>

              <div className="lp-fi">
                <label htmlFor="lp-per">Melhor período para atendimento</label>
                <select id="lp-per" value={dados.periodo} onChange={alterar('periodo')}>
                  <option>Manhã (8h às 12h)</option>
                  <option>Tarde (12h às 18h)</option>
                  <option>Noite (18h às 20h)</option>
                  <option>Sábado</option>
                </select>
              </div>

              <button type="submit" className="lp-btn lp-btn-main lp-btn-full">
                Confirmar meu agendamento
              </button>

              <p className="lp-form-foot">
                <Lock size={14} />
                Seus dados estão protegidos. Sem ligação insistente.
              </p>
            </form>
          </div>
        </div>
      </section>

      <section className="lp-strip">
        <div className="lp-wrap">
          {NUMEROS.map(([n, t]) => (
            <div key={t}>
              <b>{n}</b>
              <span>{t}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="lp-sec">
        <div className="lp-wrap">
          <div className="lp-head">
            <span className="lp-kick">Por que escolher a OdontoVita</span>
            <h2>Tratamento sério, sem enrolação e sem letra miúda</h2>
            <p>
              O que mais ouvimos de quem chega aqui é que já foi mal atendido em outro lugar.
              A gente resolve isso logo na primeira consulta.
            </p>
          </div>

          <div className="lp-grid3">
            {DIFERENCIAIS.map(({ Icone, titulo, texto }) => (
              <div className="lp-box" key={titulo}>
                <div className="ic"><Icone size={25} strokeWidth={1.8} /></div>
                <h3>{titulo}</h3>
                <p>{texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-sec alt">
        <div className="lp-wrap">
          <div className="lp-head">
            <span className="lp-kick">Tratamentos</span>
            <h2>Os procedimentos mais procurados</h2>
            <p>
              Valores de referência apresentados na avaliação — o plano final é sempre
              personalizado.
            </p>
          </div>

          <div className="lp-grid3">
            {TRATAMENTOS.map((t) => (
              <article className="lp-treat" key={t.titulo}>
                <div className="lp-treat-img">
                  <img src={t.img} alt={t.titulo} loading="lazy" />
                </div>
                <div className="lp-treat-body">
                  <h3>{t.titulo}</h3>
                  <p>{t.texto}</p>
                  <div className="lp-price">
                    <small>a partir de</small>
                    <b>{t.preco}</b>
                    <small>/mês</small>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-sec">
        <div className="lp-wrap lp-clinica">
          <div className="lp-clinica-foto">
            <img src="/img/odonto/clinica.jpg" alt="Equipe da OdontoVita durante um atendimento" loading="lazy" />
            <div className="lp-selo">
              <span className="ic"><Award size={21} /></span>
              <div>
                <b>18 anos de clínica</b>
                <small>Mesma equipe, mesmo endereço</small>
              </div>
            </div>
          </div>

          <div>
            <span className="lp-kick">Nossa estrutura</span>
            <h2>Tudo o que o seu tratamento precisa, no mesmo lugar</h2>
            <p>
              Você não vai ser mandado para outra clínica fazer exame nem esperar semanas por um
              retorno. Diagnóstico, plano e tratamento acontecem aqui dentro.
            </p>

            <ul className="lp-itens">
              {ESTRUTURA.map(({ Icone, titulo, texto }) => (
                <li key={titulo}>
                  <span className="ic"><Icone size={20} strokeWidth={1.9} /></span>
                  <div>
                    <b>{titulo}</b>
                    <span>{texto}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="lp-sec alt">
        <div className="lp-wrap">
          <div className="lp-head">
            <span className="lp-kick">Depoimentos</span>
            <h2>Quem já passou por aqui</h2>
            <p>Avaliações reais de pacientes atendidos na unidade.</p>
          </div>

          <div className="lp-grid3">
            {DEPOIMENTOS.map((d) => (
              <div className="lp-quote" key={d.nome}>
                <div className="lp-stars">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p>{d.texto}</p>
                <div className="lp-who">
                  <img src={d.foto} alt={d.nome} loading="lazy" />
                  <div>
                    <b>{d.nome}</b>
                    <small>{d.detalhe}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-final">
        <div className="lp-wrap">
          <h2>Sua avaliação completa por R$ 49</h2>
          <p>
            Raio-X digital, diagnóstico e plano de tratamento com valor fechado. Agende agora e
            garanta um dos horários desta semana.
          </p>
          <a href="#agendar" className="lp-btn lp-btn-main">
            Agendar minha avaliação
          </a>
          <p className="lp-urg">
            <Clock3 size={15} /> Restam poucos horários disponíveis para esta semana.
          </p>
        </div>
      </section>

      <footer className="lp-foot">
        <div className="lp-wrap">
          <div>
            <div className="lp-logo" style={{ color: '#fff', marginBottom: 14 }}>
              <i><Sparkles size={21} /></i> OdontoVita
            </div>
            <p style={{ margin: 0, maxWidth: 320 }}>
              Clínica odontológica especializada em implante, ortodontia e estética dental.
              Unidade Vila Mariana.
            </p>
          </div>
          <div>
            <h4>Contato</h4>
            <ul>
              <li><Phone size={16} /> (11) 4002-8922</li>
              <li><Mail size={16} /> contato@odontovita.com.br</li>
              <li><Clock3 size={16} /> Seg. a sáb., 8h às 20h</li>
            </ul>
          </div>
          <div>
            <h4>Endereço</h4>
            <ul>
              <li><MapPin size={16} /> Rua das Acácias, 128</li>
              <li><MapPin size={16} /> Vila Mariana — São Paulo/SP</li>
              <li><ShieldCheck size={16} /> CRO-SP 00000</li>
            </ul>
          </div>
        </div>
        <div className="lp-wrap">
          <div className="lp-foot-bot">
            Modelo demonstrativo desenvolvido pela <strong style={{ color: '#fff' }}>Next Codexa</strong> —
            empresa, dados e valores são fictícios.
          </div>
        </div>
      </footer>

      <a
        href={zap('Olá! Vi a landing page e gostaria de agendar uma avaliação.')}
        className="lp-float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessageCircle size={23} />
        <span>Falar no WhatsApp</span>
      </a>
    </div>
  )
}
