import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './SearchBar.css'

import { useNavigate } from 'react-router-dom'

function SearchBar() {
  const [searchText, setSearchText] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [searchResults, setSearchResults] = useState([])

  const navigate = useNavigate()

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
      console.error('Ошибка получения данных:', error)
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
      console.error('Ошибка получения предложений:', error)
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

    const searchString = '/searchResultPage/' + charactersIds.join(',')

    navigate(searchString)
  }

  return (
    <div className="App">
      <input
        placeholder="character search..."
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
        <div className="no-suggestions">Предложений не найдено</div>
      )}
    </div>
  )
}

export default SearchBar
