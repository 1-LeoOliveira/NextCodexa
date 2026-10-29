/* Icones em SVG usados em todo o site. */

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.9,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  viewBox: '0 0 24 24'
}

export const Check = ({ size = 18, strokeWidth = 2.6 }) => (
  <svg width={size} height={size} {...base} strokeWidth={strokeWidth}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

export const Seta = ({ size = 18 }) => (
  <svg width={size} height={size} {...base} strokeWidth={2.2}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export const Monitor = ({ size = 26 }) => (
  <svg width={size} height={size} {...base}>
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
)

export const Prato = ({ size = 26 }) => (
  <svg width={size} height={size} {...base}>
    <path d="M3 11h18" />
    <path d="M5 11V7a7 7 0 0 1 14 0v4" />
    <path d="M4 11v6a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-6" />
  </svg>
)

export const Grafico = ({ size = 26 }) => (
  <svg width={size} height={size} {...base}>
    <path d="M3 3v18h18" />
    <rect x="7" y="12" width="3" height="6" />
    <rect x="12.5" y="8" width="3" height="10" />
    <rect x="18" y="4.5" width="3" height="13.5" />
  </svg>
)

export const Janela = ({ size = 20 }) => (
  <svg width={size} height={size} {...base}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 9h18" />
  </svg>
)

export const Celular = ({ size = 20 }) => (
  <svg width={size} height={size} {...base}>
    <rect x="6" y="2" width="12" height="20" rx="2.5" />
    <path d="M11 18h2" />
  </svg>
)

export const Elo = ({ size = 20 }) => (
  <svg width={size} height={size} {...base}>
    <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.8 1.7" />
    <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.8-1.7" />
  </svg>
)

export const Engrenagem = ({ size = 20 }) => (
  <svg width={size} height={size} {...base}>
    <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l2.8 2.8M16.2 16.2 19 19M19 5l-2.8 2.8M7.8 16.2 5 19" />
    <circle cx="12" cy="12" r="3.2" />
  </svg>
)

export const Raio = ({ size = 22 }) => (
  <svg width={size} height={size} {...base}>
    <path d="M13 2 4.5 13H11l-1 9 8.5-11H12l1-9z" />
  </svg>
)

export const Relogio = ({ size = 22 }) => (
  <svg width={size} height={size} {...base}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </svg>
)

export const Escudo = ({ size = 22 }) => (
  <svg width={size} height={size} {...base}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

export const Balao = ({ size = 22 }) => (
  <svg width={size} height={size} {...base}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)

export const Whats = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
    <path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.1-.7.2-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.6 0-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.7s1.2 3.1 1.3 3.3c.2.2 2.4 3.7 5.8 5.1 2.1.9 3 1 4 .8.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4z" />
  </svg>
)

export const Instagram = ({ size = 18 }) => (
  <svg width={size} height={size} {...base}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" stroke="none" />
  </svg>
)

export const Linkedin = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.9 8.4H3.6V21h3.3V8.4zM5.25 3a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8zM21 13.9c0-3.4-1.8-5-4.2-5-1.9 0-2.8 1.1-3.3 1.8V8.4H10.2V21h3.3v-6.6c0-1.6.9-2.4 2-2.4s1.9.7 1.9 2.4V21H21v-7.1z" />
  </svg>
)
