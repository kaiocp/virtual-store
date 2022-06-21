import LogoLojinha from './imagens/LogoLojinha.svg'
import MenuHamburguer from './imagens/MenuHamburguer.svg'
import Navbar from './Navbar'
import Search from './Search'
import styles from './Header.module.css'
import { useState } from 'react'
import ModalMenu from './modalMenu'
import NavbarMobile from './NavbarMobile'
import { Link } from 'react-router-dom';
export default function Header() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  return (
    <header className={styles.headerDiv}>
      <div className={styles.headerEsquerda}>
        <div className={styles.logoLojinha}>
          <Link to="/"><img src={LogoLojinha}/></Link>
        </div>
        <div className={styles.searchDivDesk}>
          <Search/>
        </div>
        <img className={styles.menuHamburguer} onClick={() => setIsModalVisible(true)} src={MenuHamburguer}/>
        {isModalVisible ? 
        <ModalMenu>
          <NavbarMobile onClose={() => setIsModalVisible(false)}/>
        </ModalMenu>: null}
        <div className={styles.navbarDiv} id={styles.navbarDiv}>
          <Navbar/>
        </div>
      </div>
      <div className={styles.searchDiv}>
        <Search/>
      </div>
    </header>
  )
}
