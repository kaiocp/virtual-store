import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductsGrid.module.css";

export default function ProductsGrid(props) {
    return (
        <section className={styles.productsGrid}>
            <h2>{props.pageTitle}</h2>
            <div className={styles.productsGrid__cards}>
                {props.card}
            </div>
        </section>
    )
}