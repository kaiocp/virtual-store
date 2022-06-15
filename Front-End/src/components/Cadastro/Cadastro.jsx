import '../../reset.css';
import './cadastro.css';
import { useState } from 'react';

export default function Cadastro() {
    const [imgUrl, setImgUrl] = useState("");
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [marca, setMarca] = useState("");
    const [cor, setCor] = useState("");
    const [categoria, setCategoria] = useState("");
    const [subcategoria, setSubcategoria] = useState("");
    const [preco, setPreco] = useState(0);
    const [message, setMessage] = useState("");
    const [messageClass, setMessageClass] = useState("");

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let body = {
                product_image_url: imgUrl,
                product_title: titulo,
                product_discription: descricao,
                product_brand: marca,
                product_color: cor,
                product_category: categoria,
                product_subcategory: subcategoria,
                product_price: preco
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
                console.log(body);
                console.log(res.status);
            } else {
                setMessage("Houve um erro ao cadastrar seu produto.");
                setMessageClass("erro");
            }
        } catch (err) {
            console.log(err);
        }
    }    

    return (
        <section className='cadastro'>
            <div className='cadastro__header'>
                <h2>Venha vender com a gente!</h2>
                <p>Cadastre seu produto e venda na Lojinha</p>
            </div>

            <fieldset>
                <form onSubmit={handleSubmit} className='cadastro__form'>
                    <div className='cadastro__form--img'>
                        <label htmlFor="imagemProduto">Preview da imagem</label>
                        <div className='caixa' onClick={(ev) => {
                                ev.preventDefault();
                                document.getElementById('img').focus()}} >
                            <img src={imgUrl ? imgUrl : null} alt="" id="imagemProduto" />
                        </div>                
                    </div>

                    <div className='cadastro__form--fields'>
                        <div className='field'>
                            <label className='label' htmlFor="">Url da imagem</label>
                            <input 
                                className="field--input" 
                                type="text" 
                                id="img"
                                value={imgUrl}
                                onChange={(e) => setImgUrl(e.target.value)}
                                required
                            />
                        </div>
                        <div className='field'>
                            <label className='label' htmlFor="">Título</label>
                            <input 
                                className="field--input" 
                                type="text" 
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                                required 
                            />
                        </div>
                        <div className='field'>
                            <label className='label' htmlFor="" id="d">Descrição do produto</label>
                            <textarea 
                                className="field--input" 
                                type="text"
                                id="f" 
                                maxLength="300"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                required 
                            />
                            <p className="field--maxchar" id="e">(max. 300 caracteres)</p>
                        </div>

                        <div className='field--marca-cor'>
                            <div className='field field-2'>
                                <label className='label' htmlFor="">Marca</label>
                                <input 
                                    className="field--input" 
                                    type="text"
                                    value={marca}
                                    onChange={(e) => setMarca(e.target.value)}
                                    required  
                                />
                            </div>
                            <div className='field field-3'>
                                <label className='label' htmlFor="">Cor</label>
                                <input 
                                    className="field--input" 
                                    type="text"
                                    value={cor}
                                    onChange={(e) => setCor(e.target.value)}
                                    required 
                                />
                            </div>
                        </div>

                        <div className='cadastro__form--fields'>
                            <div className="field--categorias field-2">
                                <div className='field'>
                                    <label className='label' htmlFor="category">Categoria</label>
                                    <select 
                                        className="field--input field--dropwdown"
                                        value={categoria}
                                        onChange={(e) => setCategoria(e.target.value)}                                  
                                    >
                                        <option disabled />
                                        <option value="Bolsa">Bolsa</option>  
                                        <option value="Calça">Calça</option>
                                        <option value="Camisa">Camisa</option>
                                    </select>
                                </div>
                                <div className='field'>
                                    <label className='label' htmlFor="subcategory">Subcategoria</label>
                                    <select 
                                        className="field--input field--dropwdown" 
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
                            <div className='field field-2'>
                                <label className='label' htmlFor="">Preço</label>
                                <input 
                                    className="field--input" 
                                    type="number" 
                                    min="0.00" 
                                    step="0.01"
                                    value={preco}
                                    onChange={(e) => setPreco(e.target.value)}
                                    required 
                                />
                            </div>                    
                        </div>
                        <div className='cadastro__form--btn'>
                            <button type="submit">
                                Cadastrar produto
                            </button>
                            <div className="message">
                                {message ? <p className={messageClass}>{message}</p> : null}
                            </div>
                    </div>
                    </div>
                </form>
            </fieldset>       
        </section>
    )
}