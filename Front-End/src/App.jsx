import { useState } from 'react';
import Cadastro from './components/Cadastro/Cadastro';
import Footer from './components/Footer/Footer';
import Hero from './components/Hero/Hero';


function App() {
  return (
    <div className="App">
      <Hero />
      <Cadastro />
      <Footer />
      
    </div>
  )
}

export default App;
