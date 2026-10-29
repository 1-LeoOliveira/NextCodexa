import { campoEstelar, BRANCAS, LILASES, BRILHANTES } from '../lib/campoEstelar.js'
import '../styles/estrelas.css'

/**
 * Fundo estelar do site: nebulosa lilas, campo de estrelas em parallax
 * e meteoros ocasionais. Puro CSS — anima so transform/opacity.
 */

// A altura precisa casar com o translate da animacao (1700px) para o loop ser contínuo.
const camada = (quantidade, semente, cores) =>
  campoEstelar({ quantidade, semente, cores, largura: 2400, altura: 1700 })

// Calculadas uma vez, no carregamento do modulo.
const CAMADA_1 = camada(300, 20260101, BRANCAS)
const CAMADA_2 = camada(130, 77400213, LILASES)
const CAMADA_3 = camada(48, 31415927, BRILHANTES)

export default function CeuEstrelado() {
  return (
    <div className="ceu" aria-hidden="true">
      <div className="ceu-nuvem n1" />
      <div className="ceu-nuvem n2" />
      <div className="ceu-nuvem n3" />
      <div className="ceu-nuvem n4" />

      <div className="ceu-poeira" />

      <div className="ceu-camada c1" style={{ boxShadow: CAMADA_1 }} />
      <div className="ceu-camada c2" style={{ boxShadow: CAMADA_2 }} />
      <div className="ceu-camada c3 ceu-cintilar" style={{ boxShadow: CAMADA_3 }} />

      <span className="ceu-meteoro m1" />
      <span className="ceu-meteoro m2" />
      <span className="ceu-meteoro m3" />

      <div className="ceu-vinheta" />
    </div>
  )
}
