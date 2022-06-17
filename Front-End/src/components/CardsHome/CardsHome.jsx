import RetanguloFundo from './imagens/RetanguloFundo.png'
import Camisa from './imagens/Camisa.png'
import Tenis from './imagens/Tenis.png'
import Bolsa from './imagens/Bolsa.png'
import styles from './CardsHome.module.css'
import Card from './Card'
export default function CardsHome() {
  const produtos = {
    camisa: 'Camisas',
    tenis: 'Tênis',
    bolsa: 'Bolsa'
  }
  return (
    <section className={styles.sectionCards}>
      <div className={styles.cardsImagens}>
        <Card imagem={Camisa} texto={produtos.camisa}/>
        <Card imagem={Tenis} texto={produtos.tenis}/>
        <Card imagem={Bolsa} texto={produtos.bolsa}/>
      </div>
    </section>
  )
}