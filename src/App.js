import './App.css';
import { useCallback, useState, useEffect } from "react"

function App() {
  const [ names, setNames ] = useState([])
  const [ nameInput, setNameInput ] = useState("")
  const [ suggestion, setSuggestion ] = useState("")

  const parseResponse = useCallback((response) => {
    return response.json()
  }, [])

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=1000")
      .then(parseResponse)
      .then(({ results }) => {
        const names = results.map(result => result.name)
        setNames(names)
      })
  }, [parseResponse])

  const changeHandler = event => {
    let match = ""
    if (event.target.value){
      match = names.find(name => {
        return name.includes(nameInput.toLowerCase())
      })
    }
    setSuggestion(match)
    setNameInput(event.target.value)
  }

  const keyDownHandler = event => {
    if (event.code === "ArrowRight"){
      setNameInput(suggestion)
      setSuggestion("")
    }
  }

  return (
    <div className="App">
      <form>
        <label htmlFor="name">Search for a Pokemon</label>
        <div className="input-container">
          <input
            id="name"
            value={nameInput}
            onChange={changeHandler}
            onKeyDown={keyDownHandler}
          />
          <span className="suggestions">{suggestion}</span>
        </div>
      </form>
    </div>
  );
}

export default App;
