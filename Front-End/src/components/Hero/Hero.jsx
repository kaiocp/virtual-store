import iconeSacolaCompras from './img/compras.svg';
import iconeChevronDown from './img/chevron-down 1.svg';
import '../../reset.css';
import './hero.css';

export default function Hero() {
    return (
        <section className='hero'>
            <div className="hero__main">
                <div className='hero__imgbox'>
                    <img src={iconeSacolaCompras} alt="Compras" />
                </div>            
                <div className='hero__info'>
                    <h1>Explore nossa nova coleção</h1>
                    <p>Aproveite as ofertas e encontre o look ideal para aproveitar o seu São João na Lojinha.</p>
                    <button>Ver descontos <img src={iconeChevronDown}/></button>
                </div>
            </div>
        </section>
    )
}