import styles from './ProductCard.module.css';
import noImage from './img/noImage.svg';
import { useState, useEffect } from 'react';
import ModalProduto from './ModalProduto';
export default function ProductCard(props) {
    const [isProdutoVisible, setIsProdutoVisible] = useState(false)
    return (
        <div className={styles.productCard}>
            <img 
                className={styles.productCard__img}
                src={props.img ? props.img : noImage} 
                alt="Produto"
                onClick={() => setIsProdutoVisible(true)}
            />
            {isProdutoVisible ?
                <ModalProduto onClose={() => setIsProdutoVisible(false)} 
                titulo={props.title}
                imagem={props.img}
                >
                </ModalProduto>: null}

            <div className={styles.productCard__subcategory}>
                <p>{props.subcategory}</p>
            </div>
            <div className={styles.productCard__info}>
                <h3>R$ {parseFloat((props.price)).toFixed(2)}</h3>
                <h4>{props.title}</h4>
                <p>{props.category}</p>
            </div>

        </div>
    )
}