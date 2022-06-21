import React from "react"
import styles from './ModalProduto.module.css'
import IconeClose from './img/close.svg'
export default function ModalProduto({onClose = () => {},titulo,imagem}) {
  return (
    <section className={styles.sectionModalProduto}>
      <article className={styles.articleModal}>
        <div className={styles.iconeClose}>
          <img src={IconeClose} onClick={onClose}/>
        </div>
        <div className={styles.headerProduto}>
          <h1>{titulo}</h1>
          <img src={imagem}/>
        </div>
      </article>
    </section>
  )
}