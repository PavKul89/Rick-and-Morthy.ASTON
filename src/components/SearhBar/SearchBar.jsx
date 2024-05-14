import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SearchBar.css'
import { useSearch } from '../../context/SearchContext'

function SearchBar() {
  const [searchText, setSearchText] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const navigate = useNavigate()
  const { addToHistory } = useSearch()

  const searchApi = async (text) => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${text}`
      )
      if (!response.ok) {
        throw new Error('Проблемы с сетью')
      }
      const data = await response.json()
      if (data.results) {
        setSearchResults(data.results)
      } else {
        setSearchResults([])
      }
    } catch (error) {
      console.error('Error receiving data:', error)
    }
  }

  const fetchSuggestions = async (text) => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${text}`
      )
      if (!response.ok) {
        throw new Error('Проблемы с сетью')
      }
      const data = await response.json()
      if (data.results) {
        setSuggestions(data.results)
      } else {
        setSuggestions([])
      }
    } catch (error) {
      console.error('Error receiving offers:', error)
    }
  }

  const handleInputChange = (event) => {
    const text = event.target.value
    setSearchText(text)
    if (text.trim() !== '') {
      fetchSuggestions(text)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setSearchText(suggestion.name)
    setSuggestions([])
    navigate(`/project/${suggestion.id}`)
  }

  const handleSearch = () => {
    const charactersIds = suggestions.map((character) => character.id)
    searchApi(searchText)
    const searchString = '/searchResultPage/' + charactersIds.join(',')
    navigate(searchString)
    setSearchText('')
    addToHistory(searchText)
  }

  const handleInputBlur = () => {
    setShowSuggestions(false)
  }

  const handleInputFocus = () => {
    if (searchText.trim() !== '') {
      setShowSuggestions(true)
    }
  }

  return (
    <div className="App">
      <input
        placeholder="search..."
        type="text"
        value={searchText}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            handleSearch()
          }
        }}
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              onMouseDown={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.name}
            </div>
          ))}
        </div>
      )}
      {searchText.trim() !== '' && suggestions.length === 0 && (
        <div className="no-suggestions">
          the requested character is not available
        </div>
      )}
    </div>
  )
}

export default SearchBar
