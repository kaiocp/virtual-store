import iconeSacolaCompras from './img/compras.svg';
import iconeChevronDown from './img/chevron-down 1.svg';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.hero__main}>
                <div className={styles.hero__imgbox}>
                    <img src={iconeSacolaCompras} alt="Compras" />
                </div>            
                <div className={styles.hero__info}>
                    <h1>Explore nossa nova coleção</h1>
                    <p>Aproveite as ofertas e encontre o look ideal para aproveitar o seu São João na Lojinha.</p>
                    <button>Ver descontos <img src={iconeChevronDown}/></button>
                </div>
            </div>
        </section>
    )
}