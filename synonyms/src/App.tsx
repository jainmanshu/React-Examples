import { useState } from 'react'
import './App.css'

type Synonyms = {
  word: string
}

const baseApiUrl = 'https://api.datamuse.com'

function App() {
  const [inputWord, setInputWord] = useState<string>("")
  const [syn, setSyn] = useState<Synonyms[]>([])


  const fetchSyn = (word: string) => {
    fetch(`${baseApiUrl}/words?rel_syn=${word}`)
    .then((response) => response.json())
    .then(setSyn)
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    fetchSyn(inputWord)
  }
  const handleFetch = (newWord: string) => {
    setInputWord(newWord)
    fetchSyn(newWord)
  }

  return (
   <div className='App'>
    <form onSubmit={handleSubmit}>
      
      <label htmlFor='input-syn'>
        Enter your Input
      </label>
      <input id='input-syn' type='text' value={inputWord} onChange={(e) => setInputWord(e?.target?.value)}/>
      <button>Search</button>
      </form>
      <div>
        <ul>
          {
          syn.map((s, index) => (
            <li
             key={index} 
             onClick={() => handleFetch(s.word)}>{s.word}</li>
          ))
        }
        </ul>
      </div>
   </div>
  )
}

export default App
