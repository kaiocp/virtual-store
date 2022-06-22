import styles from './CardCarrinho.module.css';


export default function CardCarrinho(props) {

    // const [qtd, setQtd] = useState();

    return (
        <article className={styles.cardCarrinho}>
            <img src={props.img} alt="Produto" className={styles.cardCarrinho__img} />
            <div className={styles.cardCarrinho__sec1}>
                <div>                    
                    <h4>{props.title}</h4>
                    <p>Vendido por <span>Joaninha</span></p>
                </div>
                <div className={styles.cardCarrinho__sec1_sub}>
                    <p>Cor: {props.color}</p>                   
                    <p>Tamanho: {props.size}</p>                   
                    <p>Marca: {props.brand}</p> 
                </div>
            </div>
            <div className={styles.cardCarrinho__sec2}>
                <div className={styles.cardCarrinho__btnQtd}>
                    <button onClick={props.decreaseQt}>-</button>
                    <input type="number" value={props.qtd} onChange={props.onChange} />
                    <button onClick={props.increaseQtd}>+</button>
                </div>
                <p>R$ {props.price}</p>
                <a onClick={props.delete}>Deletar</a>
            </div>
        </article>
    )
}