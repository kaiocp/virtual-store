import styles from './Search.module.css'
import { useState } from 'react'
import LupaPesquisa from './imagens/LupaPesquisa.png'
export default function Search() {
  function pesquisaProduto(e){
    e.preventDefault()
    console.log(produto)
  }
  const [produto, setProduto] = useState()
  return (
    <div className={styles.inputDiv} id={styles.inputDiv}>
      <img className={styles.searchImg} id={styles.searchImg} src={LupaPesquisa} onClick={pesquisaProduto}/>
      <input className={styles.inputSearch} id={styles.inputSearch} placeholder='Pesquise por um produto'
      onChange={(e) => setProduto(e.target.value)} type="text"></input>
    </div>
  )
}