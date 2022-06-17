import styles from './Card.module.css'
import RetanguloFundo from './imagens/RetanguloFundo.png'
export default function Card(props) {
  return (
    <div className={styles.cardsImagens}>
      <img className={styles.imgProduto} src={props.imagem}/>
      <h1>{props.texto}</h1>
      <img className={styles.imgRetangulo} src={RetanguloFundo}/>
    </div>
  )
}