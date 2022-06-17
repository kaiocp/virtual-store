import { Link } from 'react-router-dom';

import styles from './Navbar.module.css'
export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li><Link to="/">Início</Link></li>
        <li><Link to="/produtos">Produtos</Link></li>
        <li><Link to="/anunciar">Anunciar</Link></li>
        <li><Link to="/carrinho"><button>Carrinho</button></Link></li>
      </ul>
    </nav>
  )
}