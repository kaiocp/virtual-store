import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './SearchResults.module.css';
import ProductCard from '../ProductCard/ProductCard';
import ProductsGrid from "../ProductsGrid/ProductsGrid";

export default function SearchResults () {
    let { query } = useParams();

    const [queryData, setQueryData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let url = `https://sleepy-cliffs-93443.herokuapp.com/products/title/${query}`;
        const fetchData = async () => {
        setLoading(true);
        try {
            const {data: response} = await axios.get(url);
            setQueryData(response);
        } catch (error) {
            console.error(error.message);
        }
        setLoading(false);
        }
        fetchData();
    }, [query]);

    return (
        <section>
            {loading && <h2 className={styles.empty_query}>Carregando...</h2>}
            {!loading && (
                (queryData.content.length > 0) ?
                <ProductsGrid
                pageTitle={`Resultados de "${query}"`}
                card={
                    queryData.content.map(el => (
                        <ProductCard
                            key={el.prod_id}
                            img={el.prod_image_url}
                            subcategory={el.subcategory_name}
                            price={el.prod_price}
                            title={el.prod_title}
                            category={el.category_name}
                        />
                    ))
                 }
                />
                :
                <div className={styles.empty_query}>
                    <h2>Ah não! Ainda não temos esse produto :(</h2>
                    <h3>Que tal vir <Link to="/anunciar" className={styles.empty_query_link}>anunciar com a gente?</Link></h3>
                </div>
            )}
        </section>
    )
}