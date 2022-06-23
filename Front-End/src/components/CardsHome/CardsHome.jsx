
import Camisa from './imagens/Camisa.png'
import Tenis from './imagens/Tenis.png'
import Bolsa from './imagens/Bolsa.png'
import styles from './CardsHome.module.css'
import Card from './Card'
import { useNavigate } from 'react-router-dom';

export default function CardsHome() {
  const navigate = useNavigate();
  const produtos = {
    camisa: 'Camisas',
    tenis: 'Tênis',
    bolsa: 'Bolsa'
  }
  return (
    <section className={styles.sectionCards}>
      <div className={styles.cardsDiv}>
        <Card imagem={Camisa} texto={produtos.camisa} redirect={() => navigate('/pesquisa/camisa')} />
        <Card imagem={Tenis} texto={produtos.tenis} redirect={() => navigate('/pesquisa/tenis')}/>
        <Card imagem={Bolsa} texto={produtos.bolsa} redirect={() => navigate('/pesquisa/bolsa')}/>
      </div>
    </section>
  )
}
