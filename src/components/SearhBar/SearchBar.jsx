import React, { useState } from 'react'
import './SearchBar.css'

function SearchBar() {
  const [result, setResult] = useState([])
  console.log(result)

  const searchApi = async (text) => {
    let inDebounce
    return (function () {
      clearTimeout(inDebounce)
      console.log(text)
      inDebounce = setTimeout(async () => {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?name=${text}`
        )
        const rst = await response.json()
        setResult(rst.results)
      }, 1000)
    })()
  }
  return (
    <div className="App">
      <input
        placeholder="Search..."
        type="text"
        onKeyUp={(e) => searchApi(e.target.value)}
      />
      <div className="results-list">{result.map((item) => item.name)}</div>
    </div>
  )
}

export default SearchBar
