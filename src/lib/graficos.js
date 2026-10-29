import { useState, useEffect } from 'react'

/* =========================================================
   Utilitarios de visualizacao de dados
   ========================================================= */

/** Acompanha a largura do elemento, para desenhar o SVG em pixels reais. */
export function useLargura(ref, inicial = 720) {
  const [largura, setLargura] = useState(inicial)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof ResizeObserver === 'undefined') return

    const observador = new ResizeObserver(([entrada]) => {
      const l = entrada.contentRect.width
      if (l > 0) setLargura(l)
    })

    observador.observe(el)
    return () => observador.disconnect()
  }, [ref])

  return largura
}

/** Escala linear de dominio -> alcance. */
export const escala = (valor, dMin, dMax, aMin, aMax) =>
  dMax === dMin ? aMin : aMin + ((valor - dMin) / (dMax - dMin)) * (aMax - aMin)

/** Arredonda o topo do eixo para um numero "redondo" acima do maximo. */
export function tetoAgradavel(maximo) {
  if (maximo <= 0) return 10
  const magnitude = Math.pow(10, Math.floor(Math.log10(maximo)))
  return Math.ceil(maximo / (magnitude / 2)) * (magnitude / 2)
}

/** Barra com o topo arredondado e a base encostada no eixo. */
export function caminhoBarra(x, y, largura, altura, raio = 4) {
  const r = Math.max(0, Math.min(raio, altura, largura / 2))
  return [
    `M${x},${y + altura}`,
    `L${x},${y + r}`,
    `Q${x},${y} ${x + r},${y}`,
    `L${x + largura - r},${y}`,
    `Q${x + largura},${y} ${x + largura},${y + r}`,
    `L${x + largura},${y + altura}`,
    'Z'
  ].join(' ')
}

/** Converte angulo polar (graus, 0 = topo) para coordenada cartesiana. */
export function polar(cx, cy, raio, graus) {
  const rad = ((graus - 90) * Math.PI) / 180
  return { x: cx + raio * Math.cos(rad), y: cy + raio * Math.sin(rad) }
}

/* ---------------- formatadores ---------------- */

/** R$ 312,4 mil — valores curtos para eixos e rotulos. */
export function compacto(valor) {
  const abs = Math.abs(valor)
  if (abs >= 1_000_000) return `R$ ${(valor / 1_000_000).toFixed(1).replace('.', ',')} mi`
  if (abs >= 1_000) return `R$ ${Math.round(valor / 1000)} mil`
  return `R$ ${valor}`
}

/** 312 mil — sem simbolo de moeda, para o eixo. */
export function compactoSeco(valor) {
  const abs = Math.abs(valor)
  if (abs >= 1_000_000) return `${(valor / 1_000_000).toFixed(1).replace('.', ',')}mi`
  if (abs >= 1_000) return `${Math.round(valor / 1000)}k`
  return String(valor)
}

export const percentual = (parte, total) =>
  total === 0 ? '0%' : `${((parte / total) * 100).toFixed(1).replace('.', ',')}%`

/* ---------------- paleta ----------------
   Paleta categorica validada para superficie clara
   (lightness, croma, separacao CVD e contraste conferidos). */
export const SERIES = {
  s1: '#2a78d6', // azul
  s2: '#eb6834', // laranja
  s3: '#1baf7a', // agua
  s4: '#eda100' // amarelo
}

/** Rampa sequencial de um unico tom, do claro ao escuro. */
export const RAMPA_AZUL = [
  '#cde2fb', '#b7d3f6', '#9ec5f4', '#86b6ef', '#6da7ec',
  '#5598e7', '#3987e5', '#2a78d6', '#256abf', '#1c5cab', '#184f95'
]

/** Rampa ordinal: nenhum passo mais claro que o minimo legivel na superficie clara. */
export const RAMPA_ORDINAL = ['#86b6ef', '#5598e7', '#2a78d6', '#1c5cab', '#104281']

/** Escolhe o passo da rampa sequencial conforme a intensidade (0 a 1). */
export const passoRampa = (intensidade) =>
  RAMPA_AZUL[Math.min(RAMPA_AZUL.length - 1, Math.round(intensidade * (RAMPA_AZUL.length - 1)))]
