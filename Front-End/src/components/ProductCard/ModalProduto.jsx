import React from "react"
import styles from './ModalProduto.module.css'
import IconeClose from './img/close.svg'
export default function ModalProduto({onClose = () => {}}) {
  return (
    <section className={styles.sectionModalProduto}>
      <div className={styles.iconeClose}>
        <img src={IconeClose} onClick={onClose}/>
      </div>
      <div>
        <h1>teste</h1>
      </div>
    </section>
  )
}