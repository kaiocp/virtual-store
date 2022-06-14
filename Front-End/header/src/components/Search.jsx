import './Search.css'
import LupaPesquisa from './imagens/LupaPesquisa.png'
export default function Search() {
  return (
    <div className='inputDiv'>
      <img className='searchImg' src={LupaPesquisa}/>
      <input className='inputSearch' placeholder='Pesquise por um produto' type="text"></input>
    </div>
  )
}