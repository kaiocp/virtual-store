import styles from './Cadastro.module.css';
import { useState } from 'react';

export default function Cadastro() {
    const [imgUrl, setImgUrl] = useState("");
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [marca, setMarca] = useState("");
    const [cor, setCor] = useState("");
    const [categoria, setCategoria] = useState("");
    const [subcategoria, setSubcategoria] = useState("");
    const [preco, setPreco] = useState("");
    const [message, setMessage] = useState("");
    const [messageClass, setMessageClass] = useState("");

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let body = {
                prod_image_url: imgUrl,
                prod_title: titulo,
                prod_description: descricao,
                prod_brand: marca,
                prod_color: cor,
                prod_category: categoria,
                prod_subcategory: subcategoria,
                prod_price: preco
            }
            let res = await fetch("https://sleepy-cliffs-93443.herokuapp.com/products", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
                }
            );
            if (res.ok) {
                setImgUrl("");
                setTitulo("");
                setDescricao("");
                setMarca("");
                setCor("");
                setCategoria("");
                setSubcategoria("");
                setPreco("");
                setMessage("Produto cadastrado com sucesso!");
                setMessageClass("sucesso");
            } else {
                setMessage("Houve um erro ao cadastrar seu produto.");
                setMessageClass("erro");
                console.log(res);
            }
        } catch (err) {
            console.log(err);
        }
    }    

    return (
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
                            <img className={styles.caixa_img} src={imgUrl ? imgUrl : null} alt="" />
                        </div>                
                    </div>

                    <div className={styles.cadastro__form_fields}>
                        <div className={styles.field}>
                            <label className={styles.label} htmlFor="">Url da imagem</label>
                            <input 
                                className={styles.field__input}
                                type="url" 
                                id="img"
                                value={imgUrl}
                                onChange={(e) => setImgUrl(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.field}>
                            <label className={styles.label} htmlFor="">Título</label>
                            <input 
                                className={styles.field__input}
                                type="text" 
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
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
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
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
                                    value={marca}
                                    onChange={(e) => setMarca(e.target.value)}
                                    required  
                                />
                            </div>
                            <div className={`${styles.field} ${styles.field_3}`}>
                                <label className={styles.label} htmlFor="">Cor</label>
                                <input 
                                    className={styles.field__input} 
                                    type="text"
                                    value={cor}
                                    onChange={(e) => setCor(e.target.value)}
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
                                        value={categoria}
                                        onChange={(e) => setCategoria(e.target.value)}                                  
                                    >
                                        <option disabled />
                                        <option value="Bolsa">Bolsa</option>
                                        <option value="Camisa">Camisa</option>
                                        <option value="Tênis">Tênis</option>
                                    </select>
                                </div>
                                <div className={styles.field}>
                                    <label className={styles.label} htmlFor="subcategory">Subcategoria</label>
                                    <select 
                                        className={`${styles.field__input} ${styles.field__dropwdown}`}
                                        value={subcategoria}
                                        onChange={(e) => setSubcategoria(e.target.value)}                           
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
                                    value={preco}
                                    onChange={(e) => setPreco(e.target.value)}
                                    required 
                                />
                            </div>                    
                        </div>
                        <div className={styles.cadastro__form_btn}>
                            <button type="submit">
                                Cadastrar produto
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
    )
}