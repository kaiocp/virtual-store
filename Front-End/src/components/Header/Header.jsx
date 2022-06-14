import LogoLojinha from './imagens/LogoLojinha.png'
import MenuHamburguer from './imagens/MenuHamburguer.png'
import Navbar from './Navbar'
import Search from './Search'
import './Header.css'
export default function Header() {
  return (
    <header className='headerDiv' id="headerDiv">
      <div className='headerEsquerda' id="headerEsquerda">
        <div className='logoLojinha' id="logoLojinha">
          <img src={LogoLojinha}/>
          <h1>Lojinha</h1>
        </div>
        <img id="menuHamburguer" src={MenuHamburguer}/>
      <div className='navbarDiv' id="navbarDiv">
        <Navbar/>
      </div>
      </div>
      <div className="searchDiv">
        <Search/>
      </div>
    </header>
  )
}