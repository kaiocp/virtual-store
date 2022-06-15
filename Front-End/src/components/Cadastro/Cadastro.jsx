import iconeUploadImagem from './img/arcticons_gallery.svg';
import '../../reset.css';
import './cadastro.css';

export default function Cadastro() {
    return (
        <section className='cadastro'>
            <div className='cadastro__header'>
                <h2>Venha vender com a gente!</h2>
                <p>Cadastre seu produto e venda na Lojinha</p>
            </div>

            <fieldset>
                <form action="" className='cadastro__form'>
                    <div className='cadastro__form--img'>
                        <label htmlFor="imagemProduto">Preview da imagem</label>
                        <div className='caixa'>
                            <input type="image" src={iconeUploadImagem} alt="" id="imagemProduto" onClick={(ev) => {
                                ev.preventDefault();
                                document.getElementById('img').focus()}} />
                        </div>                
                    </div>

                    <div className='cadastro__form--fields'>
                        <div className='field'>
                            <label className='label' htmlFor="">Url da imagem</label>
                            <input className="field--input" type="text" id="img"/>
                        </div>
                        <div className='field'>
                            <label className='label' htmlFor="">Título</label>
                            <input className="field--input" type="text" name="" id="" />
                        </div>
                        <div className='field'>
                            <label className='label' htmlFor="">Descrição do produto</label>
                            <textarea className="field--input" type="text" name="" id="" />
                            <p className="field--maxchar">(max. 300 caracteres)</p>
                        </div>

                        <div className='field--marca-cor'>
                            <div className='field'>
                                <label className='label' htmlFor="">Marca</label>
                                <input className="field--input" type="text" name="" id="" />
                            </div>
                            <div className='field'>
                                <label className='label' htmlFor="">Cor</label>
                                <input className="field--input" type="text" name="" id="" />
                            </div>
                        </div>

                        <div className='cadastro__form--fields'>
                            <div className="field--categorias">
                                <div className='field'>
                                    <label className='label' htmlFor="category">Categoria</label>
                                    <select className="field--input field--dropwdown" list="category" name="Categoria" for="category">
                                        <option defaultValue="" disabled selected></option>
                                        <option value="Red">Red</option>
                                        <option value="Green">Green</option>
                                        <option value="Blue">Blue</option>
                                    </select>
                                </div>
                                <div className='field'>
                                    <label className='label' htmlFor="subcategory">Subcategoria</label>
                                    <select className="field--input field--dropwdown" list="subcategory" name="Subcategoria" for="subcategory">
                                        <option defaultValue="" disabled selected></option>
                                        <option value="Red">Red</option>
                                        <option value="Green">Green</option>
                                        <option value="Blue">Blue</option>
                                    </select>
                                </div>  
                            </div>
                            <div className='field'>
                                <label className='label' htmlFor="">Preço</label>
                                <input className="field--input"  type="text" name="" id="" />
                            </div>                    
                        </div>
                    </div>
                    <div className='cadastro__form--btn'>
                        <button>
                            Cadastrar produto
                        </button>
                    </div>
                </form>
            </fieldset>       
        </section>
    )
}