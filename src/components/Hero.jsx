import { Check } from './Icones.jsx'
import { campoEstelar, BRANCAS, LILASES, BRILHANTES } from '../lib/campoEstelar.js'

/* Estrelas proprias do hero, desenhadas ACIMA do escurecedor da foto —
   por isso aparecem com brilho pleno, ao contrario das do ceu de fundo. */
const AREA = { largura: 2400, altura: 1100 }

const HERO_FINAS = campoEstelar({ ...AREA, quantidade: 260, semente: 8675309, cores: BRANCAS })
const HERO_MEDIAS = campoEstelar({ ...AREA, quantidade: 120, semente: 1123581, cores: LILASES })
const HERO_BRILHANTES = campoEstelar({
  ...AREA, quantidade: 46, semente: 2718281, cores: BRILHANTES, desfoque: 2
})

const GARANTIAS = [
  'Projeto entregue em até 30 dias',
  'Suporte e manutenção inclusos',
  'Orçamento sem compromisso'
]

export default function Hero() {
  return (
    <section className="hero" id="topo">
      <div className="hero-bg">
        <img src="/hero.jpg" alt="" aria-hidden="true" fetchPriority="high" />
      </div>

      <div className="hero-estrelas" aria-hidden="true">
        <span className="he-camada" style={{ boxShadow: HERO_FINAS }} />
        <span className="he-camada he-cintila-a" style={{ boxShadow: HERO_MEDIAS }} />
        <span className="he-camada he-grande he-cintila-b" style={{ boxShadow: HERO_BRILHANTES }} />
      </div>

      <div className="container">
        <div className="hero-inner">
          <span className="badge">
            <i /> Vagas abertas para novos projetos este mês
          </span>

          <h1>
            Criamos soluções de software que{' '}
            <span className="grad-text">impulsionam o seu negócio</span>
          </h1>

          <p className="lead">
            Do site que vende sozinho ao sistema que organiza a operação inteira.
            A Next Codexa desenvolve landing pages, cardápios digitais e ERPs sob medida —
            focados em resultado, não em enfeite.
          </p>

          <div className="hero-cta">
            <a href="#orcamento" className="btn btn-primary btn-lg">
              Solicitar orçamento gratuito
            </a>
            <a href="#modelos" className="btn btn-ghost btn-lg">
              Ver modelos prontos
            </a>
          </div>

          <div className="hero-trust">
            {GARANTIAS.map((g) => (
              <span key={g}>
                <Check size={17} strokeWidth={2.5} />
                {g}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
