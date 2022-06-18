import styles from './ProductCard.module.css';

export default function ProductCard(props) {
    return (
        <div className={styles.productCard}>
            <img 
                className={styles.productCard__img}
                src={props.img} 
                alt="" 
            />
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