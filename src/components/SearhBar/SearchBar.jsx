import React, { useState } from 'react'
import './SearchBar.css'
import SearchResult from '../ResultsList/SearchResult'

import { Link } from 'react-router-dom'

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
              <Link key={item.id} to={`/project/${item.id}`}>
                <div>{item.name}</div>
              </Link>
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
