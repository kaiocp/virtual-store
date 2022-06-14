import './Navbar.css'
export default function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><a href="#">Início</a></li>
        <li><a href="#">Produtos</a></li>
        <li><a href="#">Anunciar</a></li>
        <li><a href="#"><button>Contato</button></a></li>
        </ul>
    </nav>
  )
}