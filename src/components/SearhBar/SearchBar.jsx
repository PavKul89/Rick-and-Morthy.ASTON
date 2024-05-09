import React, { useState } from 'react'
import './SearchBar.css'
import SearchResult from '../ResultsList/SearchResult'
import { Link } from 'react-router-dom'

function SearchBar() {
  const [result, setResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasError, setError] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [searchText, setSearchText] = useState('')

  const searchApi = async (text) => {
    setLoading(true)
    let inDebounce
    clearTimeout(inDebounce)
    inDebounce = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?name=${text}`
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const rst = await response.json()

        setResult(rst.results)
        setError(false)
        setSelectedItem(null)
      } catch (error) {
        console.error('Error fetching data:', error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }, 1000)
  }

  const handleSearch = (text) => {
    setSearchText(text)

    window.location.href = `/history?query=${encodeURIComponent(text)}`
    searchApi(text)
  }

  return (
    <div className="App">
      <input
        placeholder="Search..."
        type="text"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value)

          searchApi(e.target.value)
        }}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            handleSearch(e.target.value)
          }
        }}
      />
      <button
        className="search-button"
        onClick={() => handleSearch(searchText)}
      >
        search
      </button>
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
