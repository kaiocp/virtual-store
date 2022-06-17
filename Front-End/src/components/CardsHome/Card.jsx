import styles from './Card.module.css'
import RetanguloFundo from './imagens/RetanguloFundo.png'
import RetanguloFundoDesktop from './imagens/RetanguloFundoDesktop.png'
import SetaVerMais from './imagens/SetaVerMais.png'
export default function Card(props) {
  return (
    <div className={styles.cardsImagens}>
      <img className={styles.imgProduto} src={props.imagem}/>
      <h1 className={styles.textoProduto}>{props.texto}</h1>
      <div className={styles.verMais}>
        <p className={styles.textoVerMais}>Ver mais</p>
        <img className={styles.setaVerMais} src={SetaVerMais}/>
      </div>
      <img className={styles.imgRetangulo} src={RetanguloFundo}/>
      <img className={styles.imgRetanguloDesktop} src={RetanguloFundoDesktop}/>
    </div>
  )
}