import { useState } from 'react';
import Cadastro from './components/Cadastro/Cadastro';
import Footer from './components/Footer/Footer';
import Hero from './components/Hero/Hero';
import Header from './components/Header/Header'
import CardsHome from './components/CardsHome/CardsHome';

function App() {
  const [count, setCount] = useState(0)
  return (
    <div className="App">
      <Header />
      <Hero />
      <CardsHome/>
      <Cadastro />
      <Footer />
    </div>
  )
}

export default App
