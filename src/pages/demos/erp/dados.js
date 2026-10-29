/* =========================================================
   Dados de demonstracao do ERP.
   Tudo gerado com semente fixa: os numeros nao mudam a cada
   carregamento, como aconteceria com Math.random solto.
   ========================================================= */

function aleatorio(semente) {
  let s = semente
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

export const PERIODOS = [
  { id: '30d', rotulo: '30 dias' },
  { id: '90d', rotulo: '90 dias' },
  { id: '12m', rotulo: '12 meses' }
]

const MESES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

/** Rotulos do eixo X conforme o periodo. */
function rotulos(periodo) {
  if (periodo === '12m') {
    // Ultimos 12 meses encerrando em outubro.
    return Array.from({ length: 12 }, (_, i) => MESES[(10 + i) % 12])
  }
  if (periodo === '90d') {
    return Array.from({ length: 13 }, (_, i) => `S${i + 1}`)
  }
  // 30 dias corridos, encerrando em 29/10.
  return Array.from({ length: 30 }, (_, i) => {
    const dia = i + 1
    return `${String(dia).padStart(2, '0')}/10`
  })
}

const CONFIG = {
  '30d': { semente: 4817, base: 9400, crescimento: 0.34, ruido: 0.5, fatorMeta: 1.04 },
  '90d': { semente: 9123, base: 48000, crescimento: 0.41, ruido: 0.34, fatorMeta: 1.02 },
  '12m': { semente: 2061, base: 182000, crescimento: 0.62, ruido: 0.2, fatorMeta: 0.96 }
}

/** Serie principal: faturamento realizado x meta. */
function gerarSerie(periodo) {
  const { semente, base, crescimento, ruido, fatorMeta } = CONFIG[periodo]
  const nomes = rotulos(periodo)
  const rnd = aleatorio(semente)

  return nomes.map((rotulo, i) => {
    const avanco = i / Math.max(1, nomes.length - 1)
    const tendencia = base * (1 + crescimento * avanco)
    const faturamento = Math.round(tendencia * (1 + (rnd() - 0.45) * ruido))
    const meta = Math.round(base * fatorMeta * (1 + crescimento * 0.74 * avanco))
    return { rotulo, faturamento, meta }
  })
}

/** Receita por canal de venda — valores bem distintos entre si. */
const CANAIS = {
  '30d': [142800, 86400, 58900, 23600],
  '90d': [498200, 291400, 197300, 79800],
  '12m': [1842000, 1094000, 712400, 298600]
}

const NOMES_CANAIS = ['Loja física', 'E-commerce', 'Representantes', 'Marketplace']

/** Pedidos por dia da semana x faixa de horario. */
function gerarMapaCalor(periodo) {
  const rnd = aleatorio(CONFIG[periodo].semente + 77)
  const dias = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
  const faixas = ['08h', '10h', '12h', '14h', '16h', '18h']

  // Perfil real de loja: pico no meio da manha e no fim da tarde, sabado fraco.
  const pesoDia = [1, 1.05, 1.1, 1.08, 1.22, 0.42]
  const pesoFaixa = [0.72, 1.15, 0.58, 0.95, 1.2, 0.8]

  const celulas = dias.map((dia, d) =>
    faixas.map((faixa, f) => ({
      dia,
      faixa,
      valor: Math.round(18 * pesoDia[d] * pesoFaixa[f] * (0.8 + rnd() * 0.45))
    }))
  )

  return { dias, faixas, celulas }
}

/** Funil comercial. */
const FUNIL = {
  '30d': [420, 268, 154, 86, 51],
  '90d': [1280, 812, 468, 262, 157],
  '12m': [5140, 3268, 1884, 1046, 628]
}

const ETAPAS = ['Leads recebidos', 'Qualificados', 'Proposta enviada', 'Em negociação', 'Fechados']

/** Monta todos os dados de um periodo. */
function montar(periodo) {
  const serie = gerarSerie(periodo)
  const total = serie.reduce((s, p) => s + p.faturamento, 0)
  const totalMeta = serie.reduce((s, p) => s + p.meta, 0)
  const funil = FUNIL[periodo]

  // Ticket medio precisa oscilar de verdade: deriva de um volume de pedidos proprio,
  // senao o minigrafico vira uma linha reta.
  const pedidos = serie.map((p, i) =>
    Math.max(1, Math.round(p.faturamento / (7500 + ((i * 437) % 1900))))
  )

  return {
    serie,
    total,
    totalMeta,
    canais: NOMES_CANAIS.map((nome, i) => ({ nome, valor: CANAIS[periodo][i] })),
    mapaCalor: gerarMapaCalor(periodo),
    funil: ETAPAS.map((etapa, i) => ({ etapa, valor: funil[i] })),
    // Minigraficos dos indicadores: so a forma importa, nao a escala.
    kpis: {
      faturamento: serie.map((p) => p.faturamento),
      pedidos: pedidos,
      ticket: serie.map((p, i) => Math.round(p.faturamento / pedidos[i])),
      conversao: serie.map((_, i) => 100 * (funil[4] / funil[0]) + Math.sin(i / 2) * 1.4)
    }
  }
}

export const DADOS = {
  '30d': montar('30d'),
  '90d': montar('90d'),
  '12m': montar('12m')
}

/** Resumo dos indicadores por periodo. */
export const INDICADORES = {
  '30d': [
    { chave: 'faturamento', rotulo: 'Faturamento', valor: 312000, delta: '+12,4%', sobe: true },
    { chave: 'pedidos', rotulo: 'Pedidos', valor: 37, delta: '+5', sobe: true, bruto: true },
    { chave: 'ticket', rotulo: 'Ticket médio', valor: 8432.5, delta: '+3,1%', sobe: true },
    { chave: 'conversao', rotulo: 'Conversão', valor: 12.1, delta: '-0,8 p.p.', sobe: false, pct: true }
  ],
  '90d': [
    { chave: 'faturamento', rotulo: 'Faturamento', valor: 868400, delta: '+9,7%', sobe: true },
    { chave: 'pedidos', rotulo: 'Pedidos', valor: 103, delta: '+14', sobe: true, bruto: true },
    { chave: 'ticket', rotulo: 'Ticket médio', valor: 8431.0, delta: '+2,2%', sobe: true },
    { chave: 'conversao', rotulo: 'Conversão', valor: 12.3, delta: '+0,4 p.p.', sobe: true, pct: true }
  ],
  '12m': [
    { chave: 'faturamento', rotulo: 'Faturamento', valor: 3947000, delta: '+28,5%', sobe: true },
    { chave: 'pedidos', rotulo: 'Pedidos', valor: 468, delta: '+96', sobe: true, bruto: true },
    { chave: 'ticket', rotulo: 'Ticket médio', valor: 8433.8, delta: '+6,4%', sobe: true },
    { chave: 'conversao', rotulo: 'Conversão', valor: 12.2, delta: '+1,1 p.p.', sobe: true, pct: true }
  ]
}
