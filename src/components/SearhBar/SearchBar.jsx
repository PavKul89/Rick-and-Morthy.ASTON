import React, { useState } from 'react'
import './SearchBar.css'

function SearchBar() {
  const [result, setResult] = useState([])
  const [loading, setLoading] = useState(false)

  const searchApi = async (text) => {
    setLoading(true)
    let inDebounce
    return (function () {
      clearTimeout(inDebounce)
      inDebounce = setTimeout(async () => {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?name=${text}`
        )
        const rst = await response.json()
        setResult(rst.results)
        setLoading(false)
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
      <div className="results-list">
        {loading ? (
          <div>Loading...</div>
        ) : Array.isArray(result) && result.length > 0 ? (
          result.map((item) => <div key={item.id}>{item.name}</div>)
        ) : (
          <div>There is nothing here</div>
        )}
      </div>
    </div>
  )
}

export default SearchBar
