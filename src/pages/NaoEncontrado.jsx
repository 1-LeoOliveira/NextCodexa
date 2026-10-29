import { Link } from 'react-router-dom'

export default function NaoEncontrado() {
  return (
    <div className="nf">
      <div>
        <h1 className="grad-text">404</h1>
        <p>Essa página não existe ou foi movida.</p>
        <Link to="/" className="btn btn-primary btn-lg">
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  )
}
