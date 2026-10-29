import { Link } from 'react-router-dom'
import '../styles/demos.css'

/** Barra exibida no topo dos modelos de referencia, com volta para o site. */
export default function BarraModelo({ tipo }) {
  return (
    <div className="demo-bar">
      <div className="demo-bar-in">
        <span>
          <b>Modelo Next Codexa</b> — exemplo de {tipo}
        </span>
        <Link to="/">&larr; Voltar ao site da Next Codexa</Link>
      </div>
    </div>
  )
}
