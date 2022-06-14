import LogoLojinha from './imagens/LogoLojinha.png'
import Navbar from './Navbar'
import './Header.css'
export default function Header() {
  return (
    <header className='header'>
      <div className='headerEsquerda'>
        <div className='logoLojinha'>
          <img src={LogoLojinha}/>
          <h1>Lojinha</h1>
        </div>
        <input className='inputSearch' placeholder='Pesquise por um produto' type="text"></input>
      </div>
          <Navbar/>
    </header>
  )
}