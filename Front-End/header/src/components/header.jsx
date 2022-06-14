import LogoLojinha from './imagens/LogoLojinha.png'
import Navbar from './Navbar'
import Search from './Search'
import './Header.css'
export default function Header() {
  return (
    <header className='header'>
      <div className='headerEsquerda'>
        <div className='logoLojinha'>
          <img src={LogoLojinha}/>
          <h1>Lojinha</h1>
        </div>
        <Search/>
      </div>
      <Navbar/>
    </header>
  )
}