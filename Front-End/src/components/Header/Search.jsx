import './Search.css'
import { useState } from 'react'
import LupaPesquisa from './imagens/LupaPesquisa.png'
export default function Search() {
  function pesquisaProduto(e){
    e.preventDefault()
    console.log(produto)
  }
  const [produto, setProduto] = useState()
  return (
    <div className='inputDiv' id='inputDiv'>
      <img className='searchImg' src={LupaPesquisa} onClick={pesquisaProduto}/>
      <input className='inputSearch' id="inputSearch" placeholder='Pesquise por um produto'
      onChange={(e) => setProduto(e.target.value)} type="text"></input>
    </div>
  )
}