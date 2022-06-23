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

    // to make useeffect rerender data
    const [state, setState] = useState(false);

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
    }, [state]);

    // increase and decrease qtt
    const handleIncrease = async (id, qtd) => {
        try {
            let res = await fetch(`https://sleepy-cliffs-93443.herokuapp.com/cart/${id}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        prod_total: parseInt(qtd)+1
                    })
                }
            );
            if (res.ok) {
                setState(!state);
            } else {
                console.log(res);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleDecrease = async (id, qtd) => {
        if (parseInt(qtd) > 1) {
            try {
                let res = await fetch(`https://sleepy-cliffs-93443.herokuapp.com/cart/${id}`, {
                    method: "PUT",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(
                        {
                            prod_total: parseInt(qtd)-1
                        })
                    }
                );
                if (res.ok) {
                    setState(!state);
                } else {
                    console.log(res);
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    const handleDelete = async (id) => {
        try {
            let res = await fetch(`https://sleepy-cliffs-93443.herokuapp.com/cart/${id}`, {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' }
                }
            );
            if (res.ok) {
                setState(!state);
            } else {
                console.log(res);
            }
        } catch (err) {
            console.log(err);
        }
    }

    // cep
    const [cepData, setCepData] = useState();
    const [cep, setCep] = useState();
    const [invalidCep, setInvalidCep] = useState(false);
    
    async function buscarCep() {
        let cepFormat = cep.replace("-", "").replace(".", "");
        let url = `https://sleepy-cliffs-93443.herokuapp.com/cart/cep/${cepFormat}`
        const response = await fetch(url);
        const data = await response.json();
        setCepData(data);
    }

    return (
        <section className={styles.carrinhoCheio}>
            <div className={styles.header}>
                <img src={setaVetor}/>
                <p>Carrinho</p>
            </div>
            <div className={styles.carrinhoCheioDesk}>
                <section className={styles.carrinhoCheio__sec1}>
                    <article className={styles.articleCep}>
                        <div className={styles.titulo}>
                            <img src={iconeMapa}/>
                            <h1 className={styles.tituloCep}>Buscar CEP</h1>
                        </div>
                        <div className={styles.buscarDiv}>
                            <input 
                                type="text" 
                                placeholder='Digite um CEP...' 
                                className={styles.inputCep} 
                                id="cep" 
                                onChange={(e) => setCep(e.target.value)} 
                                maxLength="9"
                            />
                            <p className={styles.aplicar} onClick={buscarCep}>Aplicar</p>
                        </div>
                        {cepData?.hasOwnProperty('err') ? (
                            <>
                                <br />
                                <p style={{color: 'red'}}>CEP Inválido</p>
                            </>
                                )
                            :
                            null}
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
                                    value={el.prod_total}
                                    onChange={(e) => setQtd(e.target.value)}
                                    price={el.prod_price}
                                    decreaseQt={() => handleDecrease(el.prod_id, el.prod_total)}
                                    increaseQtd={() => handleIncrease(el.prod_id, el.prod_total)}
                                    delete={() => handleDelete(el.prod_id)}
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

                    <div className={styles.resumo}>
                        <h4>Entrega</h4>
                        <p>R$ {cepData ? cepData?.content?.shipping_cost : '0'}</p>
                    </div>
                    <hr className={styles.hr}/>
                    <div className={`${styles.resumo} ${styles.resumo_total}`}>
                        <h4>Total</h4>
                        <p>R$ {parseFloat(carrinhoData.content.cart_subtotal) + (cepData ? parseFloat(cepData?.content?.shipping_cost) : 0) }</p>
                    </div>
                    <button className={styles.botaoFinalizar}>Finalizar compra</button>
                    </>
                }
                </section>
            </div>
        </section> 
    )

}