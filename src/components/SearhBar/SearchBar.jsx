import React, { useState, useEffect } from 'react'
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
  // const [debounceTimeout, setDebounceTimeout] = useState(null)

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
      console.error('Ошибка при получении данных:', error)
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
      console.error('Ошибка при получении предложений:', error)
    }
  }

  useEffect(() => {
    if (searchText.trim() === '') {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    const delayDebounceFn = setTimeout(() => {
      fetchSuggestions(searchText)
      setShowSuggestions(true)
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [searchText])

  const handleInputChange = (event) => {
    const text = event.target.value
    setSearchText(text)
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
        <div className="no-suggestions">запрашиваемый персонаж недоступен</div>
      )}
    </div>
  )
}

export default SearchBar
