import ProductsGrid from "../components/ProductsGrid/ProductsGrid";
import ProductCard from "../components/ProductCard/ProductCard";
import axios from 'axios';
import { useEffect, useState } from "react";

export default function Products() {
    const [products, setProducts] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        let url = "https://sleepy-cliffs-93443.herokuapp.com/products/";
        const fetchData = async () => {
        setLoading(true);
        try {
            const {data: response} = await axios.get(url);
            setProducts(response);
        } catch (error) {
            console.error(error.message);
        }
        setLoading(false);
        }
        fetchData();
    }, []);

    return (
        <>
            {loading && <h2 style={{
                textAlign: 'center', 
                marginTop: '10rem',
                marginBottom: '10rem'
                }}>Carregando...</h2>}
            {!loading && (
                <ProductsGrid
                    pageTitle='Produtos'
                    card={
                        products.content.map(el => (
                            <ProductCard
                                produtoid={el.prod_id}
                                img={el.prod_image_url}
                                subcategory={el.subcategory_name}
                                price={el.prod_price}
                                title={el.prod_title}
                                category={el.category_name}
                                brand={el.brand_name}
                                desc={el.prod_description}
                                cor={el.color_name}
                            />
                        ))
                    }
                />
            )}
        </>
    )
}