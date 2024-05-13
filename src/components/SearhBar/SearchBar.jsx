import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './SearchBar.css'

function SearchBar() {
  const [searchText, setSearchText] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const navigate = useNavigate()

  const searchApi = async (text) => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${text}`
      )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      if (data.results) {
      } else {
        setSuggestions([])
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
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

  const handleSearch = () => {
    const charactersIds = suggestions.map((character) => character.id)
    searchApi(searchText)
    const searchString = '/search/' + charactersIds.join(',')
    navigate(searchString)
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
            handleSearch()
          }
        }}
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
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
