import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Anunciar from './pages/Anunciar';
import SearchResults from './components/SearchResults/SearchResults';
import Products from './pages/Products';
import FormEdicao from './components/FormEdicao/FormEdicao';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />

        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route path='/anunciar' element={<Anunciar />}></Route>
          <Route path='/produtos' element={<Products />}></Route>
          <Route path='/atualizar-produto/:productId' element={<FormEdicao />}></Route>
          <Route path='/pesquisa/:query' element={<SearchResults />}></Route>
        </Routes>

        <Footer />
      </Router>
    </div>
  )
}

export default App
