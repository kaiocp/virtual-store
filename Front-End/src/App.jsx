import { useState } from 'react';
import Cadastro from './components/Cadastro/Cadastro';
import Footer from './components/Footer/Footer';
import Hero from './components/Hero/Hero';
import Header from './components/Header/Header'

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Cadastro />
      <Footer />
      
    </div>
  )
}

export default App
