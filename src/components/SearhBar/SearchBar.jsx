import React, { useState } from 'react'
import './SearchBar.css'
import SearchResult from '../ResultsList/SearchResult'

function SearchBar() {
  const [result, setResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasError, setError] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

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

        if (rst.error) {
          setError(true)
        } else {
          setResult(rst.results)
          setError(false)
          setSelectedItem(null)
        }

        setLoading(false)
      }, 1000)
    })()
  }

  const handleClick = (item) => {
    setSelectedItem(item)
  }

  return (
    <div className="App">
      <input
        placeholder="Search..."
        type="text"
        onKeyUp={(e) => searchApi(e.target.value)}
      />
      <button className="search-button">search</button>
      {!selectedItem ? (
        <div className="results-list">
          {loading ? (
            <div>Loading...</div>
          ) : !hasError ? (
            result.map((item) => (
              <div key={item.id} onClick={() => handleClick(item)}>
                {item.name}
              </div>
            ))
          ) : (
            <div>There is nothing here</div>
          )}
        </div>
      ) : (
        <SearchResult selectedItem={selectedItem} />
      )}
    </div>
  )
}

export default SearchBar
