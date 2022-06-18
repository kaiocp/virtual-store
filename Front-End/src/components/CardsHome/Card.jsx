import styles from './Card.module.css'
import RetanguloFundo from './imagens/RetanguloFundo.png'
import RetanguloFundoDesktop from './imagens/RetanguloFundoDesktop.png'
import SetaVerMais from './imagens/SetaVerMais.png'
export default function Card(props) {
  return (
    <div className={styles.cardsDiv}>
      <div className={styles.cardsImagens}>
        <img className={styles.imgRetanguloDesktop} src={RetanguloFundoDesktop}/>
        <img className={styles.imgRetangulo} src={RetanguloFundo}/>
      </div>
      <img className={styles.imgProduto} src={props.imagem}/>
    </div>
  )
}