import iconeSacolaLojinha from './img/fluent_shopping-bag-20-filled.svg';
import iconeFacebook from './img/facebook.svg';
import iconeTwitter from './img/twitter.svg';
import iconeInstagram from './img/instagram.svg';
import styles from  './Footer.module.css';
import { Link } from 'react-router-dom';


export default function Footer() {
    return (
    <footer className={styles.footer}>
        <div className={styles.footer__main}>
            <div className={styles.footer__links} id={styles.b}>
                <ul>
                    <li><Link to='/'>Início</Link></li>
                    <li><Link to='/produtos'>Produtos</Link></li>
                    <li><Link to='/anunciar'>Anunciar</Link></li>
                    <li><Link to='/carrinho'>Carrinho</Link></li>
                </ul>
            </div>
            <div className={styles.footer__lojinha} id={styles.a}>
                <img src={iconeSacolaLojinha} alt="Lojinha" />
                <p>Lojinha</p>
            </div>
            <div className={styles.footer__social} id={styles.c}>
                <ul>
                    <li><a href="" target="_blank"><img src={iconeFacebook} alt='Facebook'/></a></li>
                    <li><a href="" target="_blank"><img src={iconeTwitter} alt='Twitter'/></a></li>
                    <li><a href="" target="_blank"><img src={iconeInstagram} alt='Instagram'/></a></li>
                </ul>
            </div>
        </div>
        <div className={styles.footer__message}>
            <p>Feito pela <a href='https://infojr.com.br/' target="_blank">Infojr UFBA</a> com Figma, React e muito <span role="img" aria-label="green-heart">💚</span></p>
        </div>
    </footer>
    )

}