import styles from '../Cadastro/Cadastro.module.css';
import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function FormEdicao() {
    let { productId } = useParams();
    const navigate = useNavigate();

    const [message, setMessage] = useState("");
    const [messageClass, setMessageClass] = useState("");
    const [loading, setLoading] = useState(true);

    const [reqBody, setReqBody] = useState({
        imgUrl: '',
        titulo: '',
        descricao: '',
        marca: '',
        cor: '',
        categoria: '',
        subcategoria: '',
        preco: ''
    })

    useEffect(() => {
        let url = `https://sleepy-cliffs-93443.herokuapp.com/products/${productId}`;
        const fetchData = async () => {
        setLoading(true);
        try {
            const {data: response} = await axios.get(url);
            setReqBody({
                ...reqBody,
                imgUrl: response.content[0].prod_image_url,
                titulo: response.content[0].prod_title,
                descricao: response.content[0].prod_description,
                marca: response.content[0].brand_name,
                cor: response.content[0].color_name,
                categoria: response.content[0].category_name,
                subcategoria: response.content[0].subcategory_name,
                preco: response.content[0].prod_price
            })
        } catch (error) {
            console.error(error.message);
        }
        setLoading(false);
        }
        fetchData();
    }, []);

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let body = {
                prod_image_url: reqBody.imgUrl,
                prod_title: reqBody.titulo,
                prod_description: reqBody.descricao,
                prod_brand: reqBody.marca,
                prod_color: reqBody.cor,
                prod_category: reqBody.categoria,
                prod_subcategory: reqBody.subcategoria,
                prod_price: reqBody.preco
            }
            let res = await fetch(`https://sleepy-cliffs-93443.herokuapp.com/products/${productId}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
                }
            );
            if (res.ok) {
                setMessage("Produto atualizado com sucesso!\nVocê será redirecionado para a página inicial");
                setMessageClass("sucesso");
            } else {
                setMessage("Houve um erro ao atualizar seu produto.");
                setMessageClass("erro");
                console.log(res);
            }
        } catch (err) {
            console.log(err);
        }
    }

    if (messageClass === 'sucesso') {
        setTimeout(() => {navigate('/')}, 2500);
    }

    return (
        <>
        {loading && <h2 style={{
            textAlign: 'center', 
            marginTop: '10rem',
            marginBottom: '10rem'
        }}>Carregando...</h2>}

        {!loading && 
            <section className={styles.cadastro}>
                <div className={styles.cadastro__header}>
                    <h2>Venha vender com a gente!</h2>
                    <p>Cadastre seu produto e venda na Lojinha</p>
                </div>

                <fieldset>
                    <form onSubmit={handleSubmit} className={styles.cadastro__form}>
                        <div className={styles.cadastro__form_img}>
                            <label>Preview da imagem</label>
                            <div className={styles.caixa} onClick={(ev) => {
                                    ev.preventDefault();
                                    document.getElementById('img').focus()}} >
                                <img className={styles.caixa_img} src={reqBody.imgUrl ? reqBody.imgUrl : null} alt="" />
                            </div>                
                        </div>

                        <div className={styles.cadastro__form_fields}>
                            <div className={styles.field}>
                                <label className={styles.label} htmlFor="">Url da imagem</label>
                                <input 
                                    className={styles.field__input}
                                    type="url" 
                                    id="img"
                                    value={reqBody.imgUrl}
                                    onChange={(e) => setReqBody({...reqBody, imgUrl: e.target.value})}
                                    required
                                />
                            </div>
                            <div className={styles.field}>
                                <label className={styles.label} htmlFor="">Título</label>
                                <input 
                                    className={styles.field__input}
                                    type="text" 
                                    value={reqBody.titulo}
                                    onChange={(e) => setReqBody({...reqBody, titulo: e.target.value})}
                                    required 
                                />
                            </div>
                            <div className={styles.field}>
                                <label className={styles.label} htmlFor="" id={styles.d}>Descrição do produto</label>
                                <textarea 
                                    className={styles.field__input}
                                    type="text"
                                    id={styles.f} 
                                    maxLength="300"
                                    value={reqBody.descricao}
                                    onChange={(e) => setReqBody({...reqBody, descricao: e.target.value})}
                                    required 
                                />
                                <p className={styles.field__maxchar} id={styles.e}>(max. 300 caracteres)</p>
                            </div>

                            <div className={styles.field__marca_cor}>
                                <div className={`${styles.field} ${styles.field_2}`}>
                                    <label className={styles.label} htmlFor="">Marca</label>
                                    <input 
                                        className={styles.field__input}
                                        type="text"
                                        value={reqBody.marca}
                                        onChange={(e) => setReqBody({...reqBody, marca: e.target.value})}
                                        required  
                                    />
                                </div>
                                <div className={`${styles.field} ${styles.field_3}`}>
                                    <label className={styles.label} htmlFor="">Cor</label>
                                    <input 
                                        className={styles.field__input} 
                                        type="text"
                                        value={reqBody.cor}
                                        onChange={(e) => setReqBody({...reqBody, cor: e.target.value})}
                                        required 
                                    />
                                </div>
                            </div>

                            <div className={styles.cadastro__form_fields_subsection}>
                                <div className={`${styles.field__categorias} ${styles.field_2}`}>
                                    <div className={styles.field}>
                                        <label className={styles.label} htmlFor="category">Categoria</label>
                                        <select 
                                            className={`${styles.field__input} ${styles.field__dropwdown}`}
                                            value={reqBody.categoria}
                                            onChange={(e) => setReqBody({...reqBody, categoria: e.target.value})}                                 
                                        >
                                            <option disabled />
                                            <option value="Bolsa">Bolsa</option>  
                                            <option value="Calça">Calça</option>
                                            <option value="Camisa">Camisa</option>
                                        </select>
                                    </div>
                                    <div className={styles.field}>
                                        <label className={styles.label} htmlFor="subcategory">Subcategoria</label>
                                        <select 
                                            className={`${styles.field__input} ${styles.field__dropwdown}`}
                                            value={reqBody.subcategoria}
                                            onChange={(e) => setReqBody({...reqBody, subcategoria: e.target.value})}                         
                                        >
                                            <option disabled />
                                            <option value="P">P</option>
                                            <option value="M">M</option>
                                            <option value="G">G</option>
                                            <option value="GG">GG</option>
                                        </select>
                                    </div>  
                                </div>
                                <div className={`${styles.field} ${styles.field_2}`}>
                                    <label className={styles.label} htmlFor="">Preço</label>
                                    <input 
                                        className={styles.field__input}
                                        type="number" 
                                        min="0.00" 
                                        step="0.01"
                                        value={reqBody.preco}
                                        onChange={(e) => setReqBody({...reqBody, preco: e.target.value})}
                                        required 
                                    />
                                </div>                    
                            </div>
                            <div className={styles.cadastro__form_btn}>
                                <button type="submit">
                                    Editar produto
                                </button>
                                <div className={styles.message}>
                                    {message ? 
                                        messageClass === 'sucesso' ?
                                            <p className={styles.sucesso}>{message}</p>
                                            :
                                            <p className={styles.erro}>{message}</p>                                             
                                        : null}
                                </div>
                        </div>
                        </div>
                    </form>
                </fieldset>       
            </section>
        }
        </>
    )
}