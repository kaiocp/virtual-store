import CardCarrinho from "../components/Carrinho/CardCarrinho/CardCarrinho";
import CarrinhoVazio from "../components/Carrinho/CarrinhoVazio/CarrinhoVazio";
import { useState } from "react";
import styles from '../components/Carrinho/CardCarrinho/CardCarrinho.module.css'
import CarrinhoCheio from "../components/Carrinho/CarrinhoCheio/CarrinhoCheio";

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

    return (
        // <CarrinhoVazio />
        // <CardCarrinho 
        //     img="https://cdn.dooca.store/117/products/bolsa-feminina-rosa_640x640+fill_ffffff.jpg?v=1626967527&webp=0"
        //     title="bolsa"
        //     color="rosa"
        //     size="M"
        //     brand="Renner"
        //     qtd={qtd}
        //     onChange={(e) => setQtd(e.target.value)}
        //     price="100,00"
        //     decreaseQt={decreaseQtd}
        //     increaseQtd={increaseQtd}
        //     delete={() => console.log('deletou')}
        // />
        <CarrinhoCheio />

    )
}