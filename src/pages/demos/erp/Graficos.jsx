import { useRef, useState, useId } from 'react'
import {
  useLargura, escala, tetoAgradavel, caminhoBarra,
  compacto, compactoSeco, percentual, SERIES, RAMPA_ORDINAL, passoRampa
} from '../../../lib/graficos.js'
import { brl } from '../../../config.js'

/* =========================================================
   Graficos do painel. Todos em SVG, sem biblioteca externa.
   Cada um traz a sua camada de hover, como manda um BI.
   ========================================================= */

/** Caixa de leitura que segue o ponteiro. */
function Dica({ x, y, largura, children }) {
  const limitado = Math.max(84, Math.min(x, largura - 84))
  return (
    <div className="gr-dica" style={{ left: limitado, top: y }} role="tooltip">
      {children}
    </div>
  )
}

/* ---------------------------------------------------------
   1. Faturamento x meta — barras + linha, eixo unico
   --------------------------------------------------------- */

export function GraficoCombo({ dados, periodo }) {
  const caixaRef = useRef(null)
  const largura = useLargura(caixaRef, 760)

  // em tela estreita o grafico encolhe e o eixo cede espaco ao desenho
  const estreito = largura < 520
  const altura = estreito ? 236 : 300
  const margem = {
    topo: 16,
    dir: estreito ? 6 : 16,
    base: estreito ? 30 : 34,
    esq: estreito ? 40 : 58
  }

  const [oculta, setOculta] = useState({})
  const [foco, setFoco] = useState(null)

  const area = {
    l: Math.max(80, largura - margem.esq - margem.dir),
    a: altura - margem.topo - margem.base
  }

  const maximo = Math.max(
    ...dados.map((p) => Math.max(oculta.fat ? 0 : p.faturamento, oculta.meta ? 0 : p.meta))
  )
  const teto = tetoAgradavel(maximo * 1.1)

  const passo = area.l / dados.length
  const larguraBarra = Math.max(2, Math.min(34, passo * 0.56))

  const px = (i) => margem.esq + passo * i + passo / 2
  const py = (v) => margem.topo + area.a - escala(v, 0, teto, 0, area.a)

  const linhaMeta = dados
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${px(i)},${py(p.meta)}`)
    .join(' ')

  // Muitos rotulos nao cabem: mostra de N em N conforme o espaco disponivel.
  const porRotulo = estreito ? 64 : 46
  const intervaloRotulo = Math.max(1, Math.ceil(dados.length / Math.max(1, area.l / porRotulo)))

  const aoMover = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width) * largura
    const i = Math.round((x - margem.esq - passo / 2) / passo)
    setFoco(i >= 0 && i < dados.length ? i : null)
  }

  const alternar = (chave) => setOculta((o) => ({ ...o, [chave]: !o[chave] }))

  return (
    <div className="gr" ref={caixaRef}>
      <div className="gr-legenda">
        <button
          className={`gr-leg-item${oculta.fat ? ' off' : ''}`}
          onClick={() => alternar('fat')}
          aria-pressed={!oculta.fat}
        >
          <span className="gr-leg-marca" style={{ background: SERIES.s1 }} />
          Faturamento
        </button>
        <button
          className={`gr-leg-item${oculta.meta ? ' off' : ''}`}
          onClick={() => alternar('meta')}
          aria-pressed={!oculta.meta}
        >
          <span className="gr-leg-linha" style={{ background: SERIES.s2 }} />
          Meta
        </button>
        <span className="gr-leg-dica">clique para ocultar uma série</span>
      </div>

      <div className="gr-area" onPointerMove={aoMover} onPointerLeave={() => setFoco(null)}>
        <svg width="100%" height={altura} viewBox={`0 0 ${largura} ${altura}`} role="img"
             aria-label="Faturamento comparado à meta no período">
          {/* grade e eixo Y */}
          {[0, 0.25, 0.5, 0.75, 1].map((t) => {
            const v = teto * (1 - t)
            const y = margem.topo + area.a * t
            return (
              <g key={t}>
                <line x1={margem.esq} y1={y} x2={largura - margem.dir} y2={y} className="gr-grade" />
                <text x={margem.esq - 10} y={y + 4} textAnchor="end" className="gr-eixo">
                  {compactoSeco(v)}
                </text>
              </g>
            )
          })}

          {/* faixa destacada sob o ponto em foco */}
          {foco !== null && (
            <rect
              x={px(foco) - passo / 2} y={margem.topo}
              width={passo} height={area.a}
              className="gr-faixa"
            />
          )}

          {/* barras de faturamento */}
          {!oculta.fat && dados.map((p, i) => {
            const y = py(p.faturamento)
            return (
              <path
                key={`${periodo}-${p.rotulo}`}
                d={caminhoBarra(px(i) - larguraBarra / 2, y, larguraBarra, margem.topo + area.a - y)}
                fill={SERIES.s1}
                className="gr-barra"
                style={{ animationDelay: `${Math.min(i * 26, 520)}ms`, opacity: foco === null || foco === i ? 1 : 0.55 }}
              />
            )
          })}

          {/* linha de meta */}
          {!oculta.meta && (
            <path
              key={`meta-${periodo}`}
              d={linhaMeta} fill="none" stroke={SERIES.s2} strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
              pathLength="1" className="gr-linha"
            />
          )}

          {/* marcador no ponto em foco */}
          {foco !== null && !oculta.meta && (
            <circle cx={px(foco)} cy={py(dados[foco].meta)} r="4.5"
                    fill={SERIES.s2} stroke="#fff" strokeWidth="2" />
          )}

          {/* eixo X */}
          {dados.map((p, i) =>
            i % intervaloRotulo === 0 ? (
              <text key={p.rotulo} x={px(i)} y={altura - 12} textAnchor="middle" className="gr-eixo">
                {p.rotulo}
              </text>
            ) : null
          )}
        </svg>

        {foco !== null && (
          <Dica x={px(foco)} y={margem.topo} largura={largura}>
            <strong className="gr-dica-tit">{dados[foco].rotulo}</strong>
            {!oculta.fat && (
              <span className="gr-dica-linha">
                <i style={{ background: SERIES.s1 }} />
                <b>{brl(dados[foco].faturamento)}</b> Faturamento
              </span>
            )}
            {!oculta.meta && (
              <span className="gr-dica-linha">
                <i style={{ background: SERIES.s2 }} />
                <b>{brl(dados[foco].meta)}</b> Meta
              </span>
            )}
            <span className={`gr-dica-saldo ${dados[foco].faturamento >= dados[foco].meta ? 'ok' : 'ruim'}`}>
              {dados[foco].faturamento >= dados[foco].meta ? 'Acima da meta' : 'Abaixo da meta'} ·{' '}
              {percentual(Math.abs(dados[foco].faturamento - dados[foco].meta), dados[foco].meta)}
            </span>
          </Dica>
        )}
      </div>
    </div>
  )
}

/* ---------------------------------------------------------
   2. Receita por canal — rosca com leitura central
   --------------------------------------------------------- */

export function Rosca({ dados, periodo }) {
  const [foco, setFoco] = useState(null)
  const cores = [SERIES.s1, SERIES.s2, SERIES.s3, SERIES.s4]

  const total = dados.reduce((s, d) => s + d.valor, 0)
  const tamanho = 230
  const centro = tamanho / 2
  const raio = 84
  const circunferencia = 2 * Math.PI * raio

  let acumulado = 0
  const fatias = dados.map((d, i) => {
    const fracao = d.valor / total
    const fatia = { ...d, cor: cores[i], fracao, inicio: acumulado, i }
    acumulado += fracao
    return fatia
  })

  const destaque = foco === null ? null : fatias[foco]

  return (
    <div className="gr-rosca">
      <div className="gr-rosca-svg">
        <svg width={tamanho} height={tamanho} viewBox={`0 0 ${tamanho} ${tamanho}`} role="img"
             aria-label="Participação de cada canal na receita">
          <g transform={`rotate(-90 ${centro} ${centro})`}>
            {fatias.map((f) => (
              <circle
                key={`${periodo}-${f.nome}`}
                cx={centro} cy={centro} r={raio}
                fill="none"
                stroke={f.cor}
                strokeWidth={foco === f.i ? 30 : 24}
                strokeDasharray={`${f.fracao * circunferencia - 3} ${circunferencia - f.fracao * circunferencia + 3}`}
                strokeDashoffset={-f.inicio * circunferencia}
                className="gr-fatia"
                style={{ animationDelay: `${f.i * 110}ms`, opacity: foco === null || foco === f.i ? 1 : 0.45 }}
                onPointerEnter={() => setFoco(f.i)}
                onPointerLeave={() => setFoco(null)}
                tabIndex={0}
                onFocus={() => setFoco(f.i)}
                onBlur={() => setFoco(null)}
              />
            ))}
          </g>

          <text x={centro} y={centro - 6} textAnchor="middle" className="gr-rosca-valor">
            {compacto(destaque ? destaque.valor : total)}
          </text>
          <text x={centro} y={centro + 14} textAnchor="middle" className="gr-rosca-rot">
            {destaque ? destaque.nome : 'Receita total'}
          </text>
          {destaque && (
            <text x={centro} y={centro + 34} textAnchor="middle" className="gr-rosca-pct"
                  fill={destaque.cor}>
              {percentual(destaque.valor, total)}
            </text>
          )}
        </svg>
      </div>

      {/* rotulos diretos: o valor nunca depende do hover */}
      <ul className="gr-rosca-lista">
        {fatias.map((f) => (
          <li
            key={f.nome}
            className={foco !== null && foco !== f.i ? 'apagado' : ''}
            onPointerEnter={() => setFoco(f.i)}
            onPointerLeave={() => setFoco(null)}
          >
            <span className="gr-leg-marca" style={{ background: f.cor }} />
            <span className="gr-rosca-nome">{f.nome}</span>
            <b>{percentual(f.valor, total)}</b>
            <small>{compacto(f.valor)}</small>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ---------------------------------------------------------
   3. Mapa de calor — pedidos por dia x horario
   --------------------------------------------------------- */

export function MapaCalor({ dados, periodo }) {
  const { dias, faixas, celulas } = dados
  const [foco, setFoco] = useState(null)

  const todos = celulas.flat()
  const maximo = Math.max(...todos.map((c) => c.valor))
  const minimo = Math.min(...todos.map((c) => c.valor))

  return (
    <div className="gr-calor">
      {/* em tela estreita a grade rola na horizontal em vez de espremer as celulas */}
      <div className="gr-calor-rolar">
      <div className="gr-calor-grade" style={{ gridTemplateColumns: `34px repeat(${faixas.length},1fr)` }}>
        <span />
        {faixas.map((f) => (
          <span key={f} className="gr-calor-topo">{f}</span>
        ))}

        {celulas.map((linha, d) => (
          <div key={dias[d]} style={{ display: 'contents' }}>
            <span className="gr-calor-lado">{dias[d]}</span>
            {linha.map((celula, f) => {
              const intensidade = (celula.valor - minimo) / Math.max(1, maximo - minimo)
              const ativa = foco && foco.d === d && foco.f === f
              return (
                <button
                  key={`${periodo}-${d}-${f}`}
                  className={`gr-calor-celula${ativa ? ' ativa' : ''}`}
                  style={{
                    background: passoRampa(intensidade),
                    animationDelay: `${(d * faixas.length + f) * 14}ms`
                  }}
                  onPointerEnter={() => setFoco({ d, f, ...celula })}
                  onPointerLeave={() => setFoco(null)}
                  onFocus={() => setFoco({ d, f, ...celula })}
                  onBlur={() => setFoco(null)}
                  aria-label={`${celula.dia} às ${celula.faixa}: ${celula.valor} pedidos`}
                />
              )
            })}
          </div>
        ))}
      </div>
      </div>

      <div className="gr-calor-rodape">
        <span className="gr-calor-escala">
          <small>menos</small>
          {[0, 0.25, 0.5, 0.75, 1].map((t) => (
            <i key={t} style={{ background: passoRampa(t) }} />
          ))}
          <small>mais</small>
        </span>
        <strong className="gr-calor-leitura">
          {foco
            ? `${foco.dia}, ${foco.faixa} — ${foco.valor} pedidos`
            : `Pico: ${todos.find((c) => c.valor === maximo).dia} às ${todos.find((c) => c.valor === maximo).faixa}`}
        </strong>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------
   4. Funil comercial — barras ordenadas + taxa de passagem
   --------------------------------------------------------- */

export function Funil({ dados, periodo }) {
  const [foco, setFoco] = useState(null)
  const topo = dados[0].valor

  return (
    <div className="gr-funil">
      {dados.map((etapa, i) => {
        const largura = (etapa.valor / topo) * 100
        const anterior = i === 0 ? null : dados[i - 1]
        const passagem = anterior ? (etapa.valor / anterior.valor) * 100 : 100

        return (
          <div
            key={`${periodo}-${etapa.etapa}`}
            className={`gr-funil-etapa${foco === i ? ' ativa' : ''}`}
            onPointerEnter={() => setFoco(i)}
            onPointerLeave={() => setFoco(null)}
          >
            <div className="gr-funil-cab">
              <span>{etapa.etapa}</span>
              <b>{etapa.valor.toLocaleString('pt-BR')}</b>
            </div>

            <div className="gr-funil-trilho">
              <div
                className="gr-funil-barra"
                style={{
                  width: `${largura}%`,
                  background: RAMPA_ORDINAL[i],
                  animationDelay: `${i * 110}ms`
                }}
              />
            </div>

            {anterior && (
              <span className={`gr-funil-passagem${passagem < 60 ? ' alerta' : ''}`}>
                {passagem.toFixed(1).replace('.', ',')}% avançaram de “{anterior.etapa}”
              </span>
            )}
          </div>
        )
      })}

      <div className="gr-funil-total">
        Conversão ponta a ponta:{' '}
        <b>{percentual(dados[dados.length - 1].valor, topo)}</b>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------
   5. Minigrafico dos indicadores
   --------------------------------------------------------- */

export function MiniGrafico({ dados, cor = SERIES.s1, periodo }) {
  const id = useId()
  const largura = 128
  const altura = 36

  const min = Math.min(...dados)
  const max = Math.max(...dados)
  const passo = largura / Math.max(1, dados.length - 1)

  const pontos = dados.map((v, i) => ({
    x: i * passo,
    y: altura - 3 - escala(v, min, max, 0, altura - 8)
  }))

  const linha = pontos.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
  const preenchimento = `${linha} L${largura},${altura} L0,${altura} Z`

  return (
    <svg className="gr-mini" width={largura} height={altura} viewBox={`0 0 ${largura} ${altura}`}
         aria-hidden="true" key={periodo}>
      <defs>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={cor} stopOpacity="0.28" />
          <stop offset="100%" stopColor={cor} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={preenchimento} fill={`url(#g${id})`} className="gr-mini-area" />
      <path d={linha} fill="none" stroke={cor} strokeWidth="2" strokeLinecap="round"
            strokeLinejoin="round" pathLength="1" className="gr-mini-linha" />
      <circle cx={pontos[pontos.length - 1].x - 1.5} cy={pontos[pontos.length - 1].y} r="2.8"
              fill={cor} className="gr-mini-ponta" />
    </svg>
  )
}
