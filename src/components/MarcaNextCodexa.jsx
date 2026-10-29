/**
 * Simbolo da Next Codexa: o arquivo original da marca, com o fundo
 * claro removido e um reflexo que atravessa o desenho.
 */
export default function MarcaNextCodexa({ tamanho = 44, className = '' }) {
  return (
    <span
      className={`marca ${className}`}
      style={{ width: tamanho, height: tamanho }}
    >
      <img
        className="marca-img"
        src="/logo-marca.png"
        alt="Next Codexa"
        width={tamanho}
        height={tamanho}
      />

      {/* o reflexo e recortado no formato da propria logo */}
      <span className="marca-brilho" aria-hidden="true">
        <i />
      </span>
    </span>
  )
}
