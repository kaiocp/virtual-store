import React from "react"
import styles from './ModalProduto.module.css'
import IconeClose from './img/close.svg'
import IconeRemover from './img/iconeremover.svg'
import IconeAdicionar from './img/iconeadicionar.svg'
import IconeEditar from './img/iconeeditar.svg'
import IconeDeletar from './img/iconedeletar.svg'
import { Link } from 'react-router-dom';
import { useState } from "react"
export default function ModalProduto({onClose = () => {},titulo,imagem,desc,marca,preco,cor,tamanho,id}) {
  async function deletarProduto() {
    alert("O produto " + titulo + " foi excluido com sucesso")
    let res = await fetch(`https://sleepy-cliffs-93443.herokuapp.com/products/${id}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' }
        })
  }
  function clickEditar() {
    document.body.style.overflow = "auto";
  }
  function removerProduto() {
    if (qtd == 1){
      alert("O produto " + titulo + " já está com a quantidade mínima")
    }else{
      setQtd(qtd - 1)
    }
  }
  const [qtd, setQtd] = useState(1)
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
              <img src={IconeRemover} onClick={removerProduto}/>
              <h1>{qtd}</h1>
              <img src={IconeAdicionar} onClick={() => setQtd(qtd + 1)}/>
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
           <h1>R$ {parseFloat((preco * qtd)).toFixed(2)}</h1>
         </div>
         </main>
        </section>
          <footer>
            <div className={styles.footerDiv}>
              <div className={styles.editar}>
                <div className={styles.editarDiv}>
                  <img src={IconeEditar}/>
                  <Link to={`/atualizar-produto/${id}`} onClick={clickEditar} className={styles.h3}>Editar</Link>
                </div>
                <div className={styles.deletarDiv}>
                  <img src={IconeDeletar} onClick={deletarProduto}/>
                  <h3 onClick={deletarProduto}>Deletar</h3>
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