import { useState } from 'react'
import { CONFIG, linkWhats, registrarConversao, mascaraTelefone } from '../config.js'
import { Check, Whats } from './Icones.jsx'

const SERVICOS = [
  'Landing Page de alta conversão',
  'Cardápio / Menu digital',
  'Sistema ERP de gestão',
  'Site institucional',
  'Aplicativo web ou mobile',
  'Ainda não sei, preciso de ajuda'
]

const BENEFICIOS = [
  'Diagnóstico e proposta sem custo',
  'Valor fechado, sem surpresa depois',
  'Você fala direto com quem desenvolve',
  'Sem compromisso de contratação'
]

const VAZIO = { nome: '', whats: '', email: '', servico: '', msg: '' }

export default function Orcamento() {
  const [dados, setDados] = useState(VAZIO)
  const [erros, setErros] = useState({})
  const [enviado, setEnviado] = useState(false)

  const alterar = (campo) => (e) => {
    const valor = campo === 'whats' ? mascaraTelefone(e.target.value) : e.target.value
    setDados((d) => ({ ...d, [campo]: valor }))
    setErros((x) => ({ ...x, [campo]: false }))
  }

  const enviar = (e) => {
    e.preventDefault()

    const faltando = {
      nome: !dados.nome.trim(),
      whats: dados.whats.replace(/\D/g, '').length < 10,
      servico: !dados.servico
    }

    if (faltando.nome || faltando.whats || faltando.servico) {
      setErros(faltando)
      return
    }

    const texto =
      `*Novo orçamento pelo site — ${CONFIG.empresa}*\n\n` +
      `*Nome:* ${dados.nome}\n` +
      `*WhatsApp:* ${dados.whats}\n` +
      (dados.email ? `*E-mail:* ${dados.email}\n` : '') +
      `*Serviço:* ${dados.servico}\n` +
      (dados.msg ? `*Projeto:* ${dados.msg}` : '')

    registrarConversao('formulario_orcamento')
    window.open(linkWhats(texto), '_blank', 'noopener')

    setEnviado(true)
    setDados(VAZIO)
  }

  return (
    <section className="section" id="orcamento">
      <div className="container">
        <div className="cta-wrap reveal">
          <div className="cta-copy">
            <span className="eyebrow">Orçamento gratuito</span>
            <h2>Vamos tirar o seu projeto do papel?</h2>
            <p>
              Preencha o formulário ao lado e receba uma proposta com escopo, prazo e valor.
              Normalmente respondemos no mesmo dia útil.
            </p>

            <ul className="cta-bullets">
              {BENEFICIOS.map((b) => (
                <li key={b}>
                  <Check /> {b}
                </li>
              ))}
            </ul>

            <a
              href={linkWhats()}
              className="btn btn-wpp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Whats /> Prefiro falar no WhatsApp
            </a>
          </div>

          <form className="form" onSubmit={enviar} noValidate>
            <h3>Solicite seu orçamento</h3>
            <p className="form-sub">Leva menos de 1 minuto. Sem compromisso.</p>

            {enviado && (
              <div className="form-ok">
                Pronto! Abrimos o WhatsApp com os seus dados preenchidos — é só enviar a mensagem.
              </div>
            )}

            <div className={`field${erros.nome ? ' erro' : ''}`}>
              <label htmlFor="nome">Seu nome *</label>
              <input
                id="nome"
                value={dados.nome}
                onChange={alterar('nome')}
                placeholder="Como podemos te chamar?"
              />
            </div>

            <div className={`field${erros.whats ? ' erro' : ''}`}>
              <label htmlFor="whats">WhatsApp *</label>
              <input
                id="whats"
                type="tel"
                value={dados.whats}
                onChange={alterar('whats')}
                placeholder="(00) 00000-0000"
              />
            </div>

            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                value={dados.email}
                onChange={alterar('email')}
                placeholder="seu@email.com"
              />
            </div>

            <div className={`field${erros.servico ? ' erro' : ''}`}>
              <label htmlFor="servico">O que você precisa? *</label>
              <select id="servico" value={dados.servico} onChange={alterar('servico')}>
                <option value="">Selecione uma opção</option>
                {SERVICOS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="msg">Conte rapidamente sobre o projeto</label>
              <textarea
                id="msg"
                value={dados.msg}
                onChange={alterar('msg')}
                placeholder="Ex.: tenho uma pizzaria e quero um cardápio digital com pedido no WhatsApp."
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block btn-lg">
              Quero meu orçamento gratuito
            </button>
            <p className="form-note">
              Seus dados são usados apenas para o contato comercial. Nada de spam.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
