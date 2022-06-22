import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import CardCarrinho from '../CardCarrinho/CardCarrinho';
import styles from './CarrinhoCheio.module.css'
import iconeMapa from './img/mapaicone.svg'
import setaVetor from './img/setaVetor.svg';


export default function CarrinhoCheio() {

    const [carrinhoData, setCarrinhoData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let url = `https://sleepy-cliffs-93443.herokuapp.com/cart`;
        const fetchData = async () => {
        setLoading(true);
        try {
            const {data: response} = await axios.get(url);
            setCarrinhoData(response);
        } catch (error) {
            console.error(error.message);
        }
        setLoading(false);
        }
        fetchData();
    }, []);



    // cep
    const [cepData, setCepData] = useState();
    const [cep, setCep] = useState();
    
    async function buscarCep() {
        let cepFormat = cep.replace("-", "").replace(".", "");
        let url = `https://sleepy-cliffs-93443.herokuapp.com/cart/cep/${cepFormat}`
        const response = await fetch(url);
        const data = await response.json();
        setCepData(data);
    }

    return (
        <section className={styles.carrinhoCheio}>
            <section className={styles.carrinhoCheio__sec1}>
                <div className={styles.header}>
                    <img src={setaVetor}/>
                    <p>Carrinho</p>
                </div>
                <article className={styles.articleCep}>
                    <div className={styles.titulo}>
                        <img src={iconeMapa}/>
                        <h1 className={styles.tituloCep}>Buscar CEP</h1>
                    </div>
                    <div className={styles.buscarDiv}>
                        <input type="text" placeholder='Digite um CEP...' className={styles.inputCep} id="cep" onChange={(e) => setCep(e.target.value)}/>
                        <p className={styles.aplicar} onClick={buscarCep}>Aplicar</p>
                    </div>
                </article>

                <hr className={styles.hr}/>

                <section className={styles.cardsCarrinho}>
                {!loading &&
                    carrinhoData.content.products.map(el => (
                        <CardCarrinho
                            key={el.prod_id}
                            img={el.prod_image_url}
                            title={el.prod_title}
                            color={el.color_name}
                            size={el.subcategory_name}
                            brand={el.brand_name}
                            qtd={el.prod_total}
                            onChange={(e) => setQtd(e.target.value)}
                            price={el.prod_price}
                            // decreaseQt={el.}
                            // increaseQtd={el.}
                            delete={() => console.log('deletou')}
                        />
                    ))}
                </section>

            </section>


            <section className={styles.carrinhoCheio__sec2}>
            <h3>Resumo do pedido</h3>
            <hr className={styles.hr}/>
            {!loading && 
            <>
            <div className={styles.resumo}>
                <h4>Subtotal ({carrinhoData.content.cart_prod_total} {carrinhoData.content.cart_prod_tota === 1 ? 'item' : 'itens'})</h4>
                <p>R$ {carrinhoData.content.cart_subtotal}</p>
            </div>
            {cepData ? 
                <div className={styles.resumo}>
                    <h4>Entrega</h4>
                    <p>R$ {cepData?.content?.shipping_cost}</p>
                </div>
                :
                null
            }
            <hr className={styles.hr}/>
            <div className={`${styles.resumo} ${styles.resumo_total}`}>
                <h4>Total</h4>
                <p>R$ {carrinhoData.content.cart_subtotal}</p>
                {/* somar com entrega (?metodo pra atualizar tudo?) */}
            </div>
            </>
            }
            </section>


        </section> 
    )

}