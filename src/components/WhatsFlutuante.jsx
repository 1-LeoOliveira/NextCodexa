import { linkWhats } from '../config.js'
import { Whats } from './Icones.jsx'

export default function WhatsFlutuante({ texto, numero }) {
  return (
    <a
      href={linkWhats(texto, numero)}
      className="wpp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
    >
      <Whats size={24} />
      <span>Falar no WhatsApp</span>
    </a>
  )
}
