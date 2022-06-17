import LogoLojinha from './imagens/LogoLojinha.png'
import MenuHamburguer from './imagens/MenuHamburguer.png'
import Navbar from './Navbar'
import Search from './Search'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.headerDiv} id={styles.headerDiv}>
      <div className={styles.headerEsquerda} id={styles.headerEsquerda}>
        <div className={styles.logoLojinha} id={styles.logoLojinha}>
          <img src={LogoLojinha}/>
          <h1>Lojinha</h1>
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
