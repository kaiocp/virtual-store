import LogoLojinha from './imagens/LogoLojinha.png'
import Navbar from './Navbar'
import './Header.css'
export default function Header() {
  return (
    <header className='header'>
        <div className='logoLojinha'>
          <img src={LogoLojinha}/>
          <h1>Lojinha</h1>
          <input type="text"></input>
        </div>
        <div>
          <Navbar/>
        </div>
    </header>
  )
}