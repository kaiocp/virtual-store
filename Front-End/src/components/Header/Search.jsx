import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Search.module.css';
import styles2 from './Header.module.css'
import LupaPesquisa from './imagens/LupaPesquisa.png';


export default function Search() {

  const [query, setQuery] = useState("");

  const navigate = useNavigate(); 

  const runQuery = (query) => { 
    navigate(`/pesquisa/${query}`)
    setQuery("");
  }

  return (
    <div className={styles.inputDiv} id={styles.inputDiv}>
      <img 
      className={styles.searchImg} 
      id={styles.searchImg} 
      src={LupaPesquisa}
      onClick={() => runQuery(query)}
      />
      <input 
        className={styles2.inputSearch} 
        id={styles2.inputSearch} 
        placeholder='Pesquise por um produto' 
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {e.key === 'Enter' ? runQuery(query) : null}}
        >        
      </input>
    </div>
  )
}