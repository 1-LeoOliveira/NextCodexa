/* =========================================================
   CONFIGURACAO CENTRAL — altere aqui os dados de contato
   ========================================================= */

export const CONFIG = {
  empresa: 'Next Codexa',
  // WhatsApp com DDI + DDD, somente digitos. Ex.: 5511987654321
  whatsapp: '5511999999999',
  whatsappExibicao: '(11) 99999-9999',
  email: 'contato@nextcodexa.com.br',
  instagram: 'https://instagram.com/nextcodexa',
  linkedin: 'https://linkedin.com/company/nextcodexa',
  cnpj: '00.000.000/0001-00',
  atendimento: 'Seg. a sex., 9h às 18h',
  msgPadrao: 'Olá! Vim pelo site da Next Codexa e gostaria de um orçamento.'
}

/** Monta um link de WhatsApp com mensagem pre-preenchida. */
export function linkWhats(texto = CONFIG.msgPadrao, numero = CONFIG.whatsapp) {
  return `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`
}

/** Dispara eventos de conversao no Meta Pixel / Google Analytics, se instalados. */
export function registrarConversao(origem = 'formulario_site') {
  if (typeof window.fbq === 'function') window.fbq('track', 'Lead')
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'generate_lead', { method: origem })
  }
}

/** Mascara de telefone brasileiro: (00) 00000-0000 */
export function mascaraTelefone(valor) {
  const d = valor.replace(/\D/g, '').slice(0, 11)
  if (d.length > 6) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
  if (d.length > 2) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length > 0) return `(${d}`
  return ''
}

/** Formata numero como moeda brasileira. */
export const brl = (n) =>
  n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
