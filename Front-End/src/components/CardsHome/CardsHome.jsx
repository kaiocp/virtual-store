import RetanguloFundo from './imagens/RetanguloFundo.png'
import Camisa from './imagens/Camisa.png'
import Tenis from './imagens/Tenis.png'
import Bolsa from './imagens/Bolsa.png'
import styles from './CardsHome.module.css'
export default function CardsHome() {
  return (
    <section className={styles.sectionCards}>
      <div className={styles.produtosImagens}>
        <img src={Camisa}/>
        <img src={Tenis}/>
        <img src={Bolsa}/>
      </div>
      <div className={styles.cardsImagens}>
        <img src={RetanguloFundo}/>
        <img src={RetanguloFundo}/>
        <img src={RetanguloFundo}/>
      </div>
    </section>
  )
}