import CarrinhoVazio from "../components/Carrinho/CarrinhoVazio/CarrinhoVazio";
import CarrinhoCheio from "../components/Carrinho/CarrinhoCheio/CarrinhoCheio";
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';

export default function Carrinho() {

    // const [qtd, setQtd] = useState(1);

    // e esses metodos aqui ein
    // const increaseQtd = () => {
    //     setQtd(qtd+1);
    // }
    // const decreaseQtd = () => {
    //     if (qtd > 1) {
    //         setQtd(qtd-1);
    //     } 
    // }

    const [qtdCarrinho, setQtdCarrinho] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        let url = "https://sleepy-cliffs-93443.herokuapp.com/cart";
        const fetchData = async () => {
        setLoading(true);
        try {
            const {data: response} = await axios.get(url);
            setQtdCarrinho(response);
        } catch (error) {
            console.error(error.message);
        }
        setLoading(false);
        }
        fetchData();
    }, []);

    return (
        <>
            {!loading &&(
            (qtdCarrinho?.content?.cart_prod_total >= 1) ?
                <CarrinhoCheio />
                :
                <CarrinhoVazio />
            
            )}
        </>

    )
}