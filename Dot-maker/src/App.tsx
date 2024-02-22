import { useState, type MouseEvent } from 'react'
import './App.css'

interface Dots {
  x: number,
  y: number
}

function App() {
  const [dots, setDots] = useState<Dots[]>([])
  const [prevDots, setPrevDots] = useState<Dots[]>([])

  const handleClick = (e: MouseEvent) => {
    const {clientX, clientY} = e
    setDots([...dots, {x: clientX, y: clientY}])
  }

  const handleClear = () => {
    setDots([])
    setPrevDots([])
  }

  const handleUndo = () => {
    if (dots.length > 0) {
    const newDots = [...dots]
    const lastDots = newDots.pop() as Dots
    Promise.all([
    setPrevDots([...prevDots, lastDots]),
    setDots(newDots)
    ])
  }
  }

  const handleRedo = () => {
    if (prevDots.length > 0) {
    const newDots = [...prevDots]
    const lastDots = newDots.pop() as Dots
    Promise.all([
    setPrevDots(newDots),
    setDots([...dots, lastDots])
    ])
  }
  }

  return (
    <div className='App'>
      <div id='button-wrapper'>
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleRedo}>Redo</button>
        <button onClick={handleClear}>Clear</button>
      </div>
      <div id='click-area' onClick={handleClick}>
        {
          dots.map(({x:dotX, y: dotY}: Dots, i: number) => (
            <div 
            key={`${i}-dots`} 
            className='dots' 
            style={{left: dotX, top:dotY}}
            />
             ))
          }
      </div>
    </div>
  )
}

export default App
