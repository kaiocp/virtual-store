import iconeSacolaLojinha from './img/fluent_shopping-bag-20-filled.svg';
import iconeFacebook from './img/facebook.svg';
import iconeTwitter from './img/twitter.svg';
import iconeInstagram from './img/instagram.svg';
import './footer.css';


export default function Footer() {
    return (
    <footer className='footer'>
        <div className='footer__main'>
            <div className='footer__links' id='b'>
                <ul>
                    <li><a>Início</a></li>
                    <li><a>Produtos</a></li>
                    <li><a>Anunciar</a></li>
                    <li><a>Carrinho</a></li>
                </ul>
            </div>
            <div className='footer__lojinha' id='a'>
                <img src={iconeSacolaLojinha} alt="Lojinha" />
                <p>Lojinha</p>
            </div>
            <div className='footer__social' id='c'>
                <ul>
                    <li><a href=""><img src={iconeFacebook} alt='Facebook'/></a></li>
                    <li><a href=""><img src={iconeTwitter} alt='Twitter'/></a></li>
                    <li><a href=""><img src={iconeInstagram} alt='Instagram'/></a></li>
                </ul>
            </div>
        </div>
        <div className='footer__message'>
            <p>Feito pela <a href='https://infojr.com.br/' target="_blank">Infojr UFBA</a> com Figma, React e muito <span role="img" aria-label="green-heart">💚</span></p>
        </div>
    </footer>
    )

}