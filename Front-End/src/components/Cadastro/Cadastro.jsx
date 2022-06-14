import iconeUploadImagem from './img/arcticons_gallery.svg';
import './cadastro.css';

export default function Cadastro() {
    return (
        <section className='cadastro'>
            <div>
                <h2>Venha vender com a gente!</h2>
                <p>Cadastre seu produto e venda na Lojinha</p>
            </div>

            <fieldset>
                <form action="">
                    <div>
                        <div>
                            <label htmlFor="imagemProduto">Preview da imagem</label>
                            <div className='caixa'>
                                <input type="image" src={iconeUploadImagem} alt="" id="imagemProduto" />
                            </div>                    
                        </div>
                    </div>

                    <div>
                        <div>
                            <label htmlFor="">Url da imagem</label>
                            <input type="text" />
                        </div>
                        <div>
                            <label htmlFor="">Título</label>
                            <input type="text" name="" id="" />
                        </div>
                        <div>
                            <label htmlFor="">Descrição do produto</label>
                            <input type="text" name="" id="" />
                            <p>(max. 300 caracteres)</p>
                        </div>

                        <div>
                            <div>
                                <label htmlFor="">Marca</label>
                                <input type="text" name="" id="" />
                            </div>
                            <div>
                                <label htmlFor="">Cor</label>
                                <input type="text" name="" id="" />
                            </div>
                        </div>

                        <div>
                            <div>
                                <div>
                                    <label htmlFor="category">Categoria</label>
                                    <select list="category" name="Categoria" for="category">
                                        <option value="Red">Red</option>
                                        <option value="Green">Green</option>
                                        <option value="Blue">Blue</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="subcategory">Subcategoria</label>
                                    <select list="subcategory" name="Subcategoria" for="subcategory">
                                        <option value="Red">Red</option>
                                        <option value="Green">Green</option>
                                        <option value="Blue">Blue</option>
                                    </select>
                                </div>  
                            </div>
                            <div>
                                <label htmlFor="">Cor</label>
                                <input type="text" name="" id="" />
                            </div>                    
                        </div>
                    </div>
                    <div>
                        <button>Cadastrar produto</button>
                    </div>
                </form>
            </fieldset>       
        </section>
    )
}