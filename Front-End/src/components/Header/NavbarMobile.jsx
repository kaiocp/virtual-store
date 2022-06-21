import { Link } from 'react-router-dom';
import styles from './ModalMenu.module.css'
import IconeFechar from './imagens/IconeFechar.svg'
export default function NavbarMobile({onClose= () => {}}) {
  return (
    <section className={styles.sectionModal}>
      <div>
        <img className={styles.iconeFechar} src={IconeFechar} onClick={onClose}/>
      </div>
      <ul className={styles.linksNav}>
        <li onClick={onClose}><Link to="/">Início</Link></li>
        <li onClick={onClose}><Link to="/produtos">Produtos</Link></li>
        <li onClick={onClose}><Link to="/anunciar">Anunciar</Link></li>
        <li onClick={onClose}><Link to="/carrinho"><button>Carrinho</button></Link></li>
      </ul>
    </section>
  )
}