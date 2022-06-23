import React from "react"
import styles from './ModalProduto.module.css'
import IconeClose from './img/close.svg'
import IconeRemover from './img/iconeremover.svg'
import IconeAdicionar from './img/iconeadicionar.svg'
import IconeEditar from './img/iconeeditar.svg'
import IconeDeletar from './img/iconedeletar.svg'
export default function ModalProduto({onClose = () => {},titulo,imagem,desc,marca,preco,cor,tamanho}) {
  return (
    <div className={styles.fundoModal}>
      <section className={styles.sectionModalProduto} id="modal">
        <article className={styles.articleModal}>
          <div className={styles.iconeClose}>
            <img src={IconeClose} onClick={onClose}/>
            <h1 className={styles.tituloDesktop}>{titulo}</h1>
          </div>
        <section className={styles.headerMain}>
          <header className={styles.headerProduto}>
            <h1 className={styles.titulo}>{titulo}</h1>
            <img src={imagem}/>
            <h1 className={styles.tamanho}>{tamanho}</h1>
            <div className={styles.quantidade}>
              <img src={IconeRemover}/>
              <h1>1</h1>
              <img src={IconeAdicionar}/>
            </div>
          </header>
          <main>
          <div className={styles.descDiv}>
            <h1>Descrição</h1>
            <p>{desc}</p>
          </div>
          <div className={styles.descDiv}>
            <h1>Vendedor</h1>
            <p>Lorem Ipsum</p>
          </div>
          <div className={styles.descDiv}>
            <h1>Marca</h1>
            <p>{marca}</p>
          </div>
          <div className={styles.descDiv}>
            <h1>Cor</h1>
            <p>{cor}</p>
          </div>
          <div className={styles.preco}>
           <h1>R$ {parseFloat((preco)).toFixed(2)}</h1>
         </div>
         </main>
        </section>
          <footer>
            <div className={styles.footerDiv}>
              <div className={styles.editar}>
                <div className={styles.editarDiv}>
                  <img src={IconeEditar}/>
                  <h3>Editar</h3>
                </div>
                <div className={styles.deletarDiv}>
                  <img src={IconeDeletar}/>
                  <h3>Deletar</h3>
                </div>
              </div>
              <button className={styles.botaoDiv}>Adicionar ao Carrinho</button>
            </div>
          </footer>
        </article>
      </section>
    </div>
  )

}