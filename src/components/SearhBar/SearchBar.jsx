import React, { useState } from 'react'
import './SearchBar.css'

function SearchBar() {
  const [result, setResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasError, setError] = useState(false)
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
        console.log('=>(SearchBar.jsx:19) rst', rst.hasOwnProperty('error'))

        if (rst.hasOwnProperty('error')) {
          setError(true)
        } else {
          setResult(rst.results)
          setError(false)
        }

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
      <button>sdfadf</button>
      <div className="results-list">
        {loading ? (
          <div>Loading...</div>
        ) : !hasError ? (
          result.map((item) => <div key={item.id}>{item.name}</div>)
        ) : (
          <div>There is nothing here</div>
        )}
      </div>
    </div>
  )
}

export default SearchBar
