import { useId } from 'react'

/**
 * Marca do restaurante Sabor & Arte (ficticia, so para o modelo).
 * Emblema com monograma serifado, talheres cruzados e moldura —
 * desenhado em SVG para ficar nitido em qualquer tamanho.
 */
export default function LogoSaborArte({ tamanho = 70, className = '' }) {
  const id = useId().replace(/:/g, '')

  return (
    <svg
      width={tamanho}
      height={tamanho}
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="Sabor & Arte"
    >
      <defs>
        <linearGradient id={`fundo${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="48%" stopColor="#F05A28" />
          <stop offset="100%" stopColor="#B91C1C" />
        </linearGradient>
      </defs>

      <rect width="64" height="64" rx="19" fill={`url(#fundo${id})`} />

      {/* moldura interna, detalhe de emblema */}
      <rect x="4.6" y="4.6" width="54.8" height="54.8" rx="15.4"
            fill="none" stroke="rgba(255,255,255,.45)" strokeWidth="1.1" />

      {/* talheres cruzados, discretos atras do monograma */}
      <g stroke="rgba(255,255,255,.62)" strokeWidth="1.5" strokeLinecap="round" fill="none">
        {/* garfo */}
        <g transform="rotate(-24 32 32)">
          <path d="M23 13v7" />
          <path d="M26 13v7" />
          <path d="M29 13v7" />
          <path d="M26 20v5" />
        </g>
        {/* faca */}
        <g transform="rotate(24 32 32)">
          <path d="M38 13c2.4 2 2.4 6 0 8" />
          <path d="M38 21v4" />
        </g>
      </g>

      {/* monograma */}
      <text
        x="32" y="41.5" textAnchor="middle"
        fontFamily="'Playfair Display', Georgia, 'Times New Roman', serif"
        fontSize="22" fontWeight="700" fill="#fff" letterSpacing=".5"
      >
        S&amp;A
      </text>

      {/* filete inferior com losango central */}
      <g stroke="rgba(255,255,255,.55)" strokeWidth="1.1" strokeLinecap="round">
        <path d="M19 48h9" />
        <path d="M36 48h9" />
      </g>
      <rect x="30.4" y="46.4" width="3.2" height="3.2" transform="rotate(45 32 48)"
            fill="rgba(255,255,255,.8)" />
    </svg>
  )
}
