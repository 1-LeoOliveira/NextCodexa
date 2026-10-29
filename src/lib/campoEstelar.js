/* =========================================================
   Gerador de campos de estrelas em box-shadow.
   Usado pelo ceu de fundo e pela camada extra do hero.
   ========================================================= */

/** Gerador pseudoaleatorio com semente: o ceu e sempre o mesmo a cada carga. */
function aleatorio(semente) {
  let s = semente
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

/**
 * Monta a lista de box-shadows que desenha uma camada de estrelas.
 *
 * @param {object}   opcoes
 * @param {number}   opcoes.quantidade  quantas estrelas
 * @param {number}   opcoes.semente     semente do aleatorio
 * @param {string[]} opcoes.cores       paleta sorteada por estrela
 * @param {number}   opcoes.largura     area horizontal em px
 * @param {number}   opcoes.altura      area vertical em px
 * @param {number}   [opcoes.desfoque]  raio do brilho, em px
 * @returns {string} valor pronto para a propriedade box-shadow
 */
export function campoEstelar({
  quantidade,
  semente,
  cores,
  largura,
  altura,
  desfoque = 0
}) {
  const rnd = aleatorio(semente)
  const pontos = []

  for (let i = 0; i < quantidade; i += 1) {
    const x = Math.round(rnd() * largura)
    const y = Math.round(rnd() * altura)
    const cor = cores[Math.floor(rnd() * cores.length)]
    pontos.push(desfoque ? `${x}px ${y}px ${desfoque}px ${cor}` : `${x}px ${y}px ${cor}`)
  }

  return pontos.join(',')
}

export const BRANCAS = ['#fff', 'rgba(255,255,255,.75)', 'rgba(226,232,255,.9)']
export const LILASES = ['#DDD6FE', '#C4B5FD', 'rgba(233,213,255,.85)', '#fff']
export const BRILHANTES = ['#EDE9FE', '#C4B5FD', '#fff']
