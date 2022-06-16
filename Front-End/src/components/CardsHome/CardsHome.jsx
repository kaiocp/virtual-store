import RetanguloFundo from './imagens/RetanguloFundo.png'
import styles from './CardsHome.module.css'
export default function CardsHome() {
  return (
    <div className={styles.cardsHome}>
      <div className={styles.produtosCards}>
        <img src={RetanguloFundo}/>
        <img src={RetanguloFundo}/>
        <img src={RetanguloFundo}/>
      </div>
    </div>
  )
}