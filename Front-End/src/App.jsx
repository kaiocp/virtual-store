
import { useState } from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer';
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  return (
    <div className="App">
      <Header/>
      <Footer />
    </div>
  )
}

export default App
