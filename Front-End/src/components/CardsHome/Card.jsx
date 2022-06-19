import styles from './Card.module.css'
import RetanguloFundo from './imagens/RetanguloFundo.png'
import RetanguloFundoDesktop from './imagens/RetanguloFundoDesktop.png'
import SetaVerMais from './imagens/SetaVerMais.svg'
export default function Card(props) {
  return (
    <article className={styles.card}>
      <img className={styles.imagemProduto} src={props.imagem} alt="" />
      <div className={styles.textDiv}>
        <h1 className={styles.produtoType}>{props.texto}</h1>
        <p className={styles.vermais}>Ver mais &gt;</p>
      </div>
    </article> 
    )
}
   /*  <div className={styles.cardsDiv}>
     <div className={styles.cardsImagens}>
        <img className={styles.imgRetanguloDesktop} src={RetanguloFundoDesktop}/>
        <img className={styles.imgRetangulo} src={RetanguloFundo}/>
      </div> 
      <img className={styles.imgProduto} src={props.imagem}/>
      <div className={styles.textoCards}>
        <h1 className={styles.textoProduto}>{props.texto}</h1>
         <div className={styles.verMais}> 
          <p className={styles.textoVerMais}>Ver mais</p>
          <img className={styles.setaVerMais} src={SetaVerMais}/>
         </div> 
      </div>
    </div> */