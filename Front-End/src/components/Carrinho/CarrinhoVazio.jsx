import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import ProductCard from "../ProductCard/ProductCard";
import setaVetor from './img/setaVetor.svg';
import styles from './CarrinhoVazio.module.css';


export default function CarrinhoVazio () {

    const [loading, setLoading] = useState(true);
    const [vistoRecentementeData, setVistoRecentementeData] = useState({
        key: '',
        img: '',
        subcategory: '',
        price: '',
        title: '',
        category: ''
    });

    useEffect(() => {
        let url = `https://sleepy-cliffs-93443.herokuapp.com/products/`;
        const fetchData = async () => {
        setLoading(true);
        try {
            const {data: response} = await axios.get(url);
            setVistoRecentementeData({
                ...vistoRecentementeData,
                key: response.content[0].prod_id,
                img: response.content[0].prod_image_url,
                subcategory: response.content[0].subcategory_name,
                price: response.content[0].prod_price,
                title: response.content[0].prod_title,
                category: response.content[0].category_name
            });
        } catch (error) {
            console.error(error.message);
        }
        setLoading(false);
        }
        fetchData();
    }, []);

    return (
        // Implementar regra para carrinho vazio ou cheio
        <section className={styles.carrinhovazio}>
            <div className={styles.carrinhovazio__desk}>
                <div className={styles.carrinhovazio__header}>
                    <img src={setaVetor}/>
                    <p>Carrinho</p>
                </div>
                <article className={styles.carrinhovazio__article}>
                    <h2>Seu carrinho está vazio :(</h2>
                    <h3><Link to="/" className={styles.underline}>Continue navegando</Link> pela Lojinha e encontre produtos incríveis!</h3>
                </article>
            </div>

            <section className={styles.carrinhovazio__vistoRecentemente}>
                <p>Visto recentemente</p>
                {loading && <h2 style={{
                    textAlign: 'center'}}>
                    Carregando...</h2>}
                {!loading &&
                    <div>
                        <ProductCard
                            key={vistoRecentementeData.key}
                            img={vistoRecentementeData.img}
                            subcategory={vistoRecentementeData.subcategory}
                            price={vistoRecentementeData.price}
                            title={vistoRecentementeData.title}
                            category={vistoRecentementeData.category}
                        />
                    </div>
                }
            </section>
        </section>


    )
}