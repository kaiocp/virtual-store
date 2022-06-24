import styles from './Card.module.css'
export default function Card(props) {
  return (
    <article className={styles.card}>
      <img className={styles.imgProduto} src={props.imagem} alt="" />
      <div className={styles.retanguloDiv}>
        <h1 className={styles.nomeProduto}>{props.texto}</h1>
        <a onClick={props.redirect} className={styles.verMais}>Ver mais &gt;</a>
      </div>
    </article> 
    )
}
