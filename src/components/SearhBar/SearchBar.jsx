import './SearchBar.css'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function SearchBar() {
  const [searchText, setSearchText] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const searchApi = async (text) => {
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
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
      }
    }, 1000)
  }

  const fetchSuggestions = async (text) => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${text}`
      )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      if (data.results) {
        setSuggestions(data.results)
      } else {
        setSuggestions([])
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error)
    }
  }

  const handleInputChange = (event) => {
    const text = event.target.value
    setSearchText(text)
    if (text.trim() !== '') {
      fetchSuggestions(text)
    } else {
      setSuggestions([])
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setSearchText(suggestion.name)
    setSuggestions([])
  }

  const handleSearch = (text) => {
    setSearchText(text)
    searchApi(text)
  }

  return (
    <div className="App">
      <input
        placeholder="Search..."
        type="text"
        value={searchText}
        onChange={(e) => handleInputChange(e)}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            handleSearch(e.target.value)
          }
        }}
      />
      <button className="search-button">Search</button>
      {suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <Link to={`/project/${suggestion.id}`}>{suggestion.name}</Link>
            </div>
          ))}
        </div>
      )}
      {searchText.trim() !== '' && suggestions.length === 0 && (
        <div className="no-suggestions">No suggestions found</div>
      )}
    </div>
  )
}

export default SearchBar
