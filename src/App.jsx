import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>RUMBL</h1>
        <h2>A dating app but for recipes!</h2>
        <p>Swipe right to find your next favorite meal</p>
        
      </div>
      
    </>
  )
}

export default App
