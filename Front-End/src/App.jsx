import { useState } from 'react';
import Footer from './components/Footer/Footer';
import Hero from './components/Hero/Hero';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Hero />
      <Footer />
    </div>
  )
}

export default App;
