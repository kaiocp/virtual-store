import styles from './Navbar.module.css'
export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li><a href="#">Início</a></li>
        <li><a href="#">Produtos</a></li>
        <li><a href="#">Anunciar</a></li>
        <li><a href="#"><button>Carrinho</button></a></li>
      </ul>
    </nav>
  )
}