import Hero from "../components/Hero/Hero";
import ProductsGrid from "../components/ProductsGrid/ProductsGrid";
import ProductCard from "../components/ProductCard/ProductCard";
import axios from 'axios';
import { useEffect, useState, useRef } from "react";

export default function Home() {
    const [products, setProducts] = useState({});
    const [loading, setLoading] = useState(true);

    const myRef = useRef(null)

    const executeScroll = () => myRef.current.scrollIntoView();

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
            <Hero func={executeScroll} />
            {!loading && (
                <div ref={myRef}>
                    <ProductsGrid
                    pageTitle='Produtos'
                    card={
                        products.content.map(el => (
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
                </div>
            )}
        </>
    )
}