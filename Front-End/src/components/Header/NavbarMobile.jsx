import { Link } from 'react-router-dom';
export default function NavbarMobile() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Início</Link></li>
        <li><Link to="/produtos">Produtos</Link></li>
        <li><Link to="/anunciar">Anunciar</Link></li>
        <li><Link to="/carrinho"><button>Carrinho</button></Link></li>
      </ul>
    </nav>
  )
}