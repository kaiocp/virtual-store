import LogoLojinha from './imagens/LogoLojinha.svg'
import MenuHamburguer from './imagens/MenuHamburguer.svg'
import Navbar from './Navbar'
import Search from './Search'
import styles from './Header.module.css'
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className={styles.headerDiv} id={styles.headerDiv}>
      <div className={styles.headerEsquerda} id={styles.headerEsquerda}>
        <div className={styles.logoLojinha} id={styles.logoLojinha}>
          <Link to="/"><img src={LogoLojinha}/></Link>
        </div>
        <div className={styles.searchDivDesk} id={styles.searchDivDesk}>
          <Search/>
        </div>
        <img id={styles.menuHamburguer} src={MenuHamburguer}/>
        <div className={styles.navbarDiv} id={styles.navbarDiv}>
          <Navbar/>
        </div>
      </div>
      <div className={styles.searchDiv} id={styles.searchDiv}>
        <Search/>
      </div>
    </header>
  )
}
