import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import styles from './SearchResults.module.css';

export default function SearchResults () {
    let { query } = useParams();

    const [queryData, setQueryData] = useState({});
    const [loading, setLoading] = useState(true);

    let url = `https://sleepy-cliffs-93443.herokuapp.com/products/title/${query}`;

    useEffect(() => {
        const fetchData = async () => {
        setLoading(true);
        try {
            const {data: response} = await axios.get(url);
            setQueryData(response);
            console.log(queryData);
        } catch (error) {
            console.error(error.message);
        }
        setLoading(false);
        }
        fetchData();
    }, []);

    return (
        <section className={styles.pesquisa}>
            {loading && <div>Carregando...</div>}
            {!loading && (
                (queryData.content.length > 0) ? 
                queryData.content.map(el => (
                    <div key={el.prod_id}>
                        <p>{el.product_title}</p>
                        <p>{el.product_discription}</p>
                        <p>{el.product_brand}</p>
                        <p>{el.product_color}</p>
                        <p>{el.product_category}</p>
                        <p>{el.product_price}</p>
                        <p>-------------</p>
                    </div>
                ))
                :
                <p>Nao tem nada aqui nao fia</p>
            )}
        </section>
    )
}