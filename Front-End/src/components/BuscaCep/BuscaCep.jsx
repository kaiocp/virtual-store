import styles from './BuscaCep.module.css'
import IconeMapa from './imagens/mapaicone.svg'
import { useState } from 'react'
export default function BuscaCep() {
  const [CepData, setCepData] = useState([]);
  const [Cep, setCep] = useState([]);
  async function buscarCep() {
    let url = `https://sleepy-cliffs-93443.herokuapp.com/cart/cep/${Cep}`
    const response = await fetch(url);
    const data = await response.json();
    setCepData(data);
    }
  return (
    <article className={styles.articleCep}>
      <header className={styles.titulo}>
        <img src={IconeMapa}/>
        <h1 className={styles.tituloCep}>Buscar CEP</h1>
      </header>
      <section className={styles.sectionBusca}>
        <div className={styles.buscarDiv}>
          <p className={styles.aplicar} onClick={buscarCep}>Aplicar</p>
          <input type="text" placeholder='Digite um CEP...' className={styles.inputCep} id="cep" onChange={(e) => setCep(e.target.value)}/>
        </div>
        <div className={styles.sectionEntrega}>
          <h4>Entrega:</h4>
          <p className={styles.precoEntrega}>R$:{CepData?.content?.shipping_cost}</p>
        </div>
        <div className={styles.sectionEntrega}>
          <h4>Tempo estimado:</h4>
          <p className={styles.precoEntrega}>{CepData?.content?.shipping_time} dias</p>
        </div>
      </section>
    </article> 
    )
}