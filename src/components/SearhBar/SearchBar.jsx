import React, { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './SearchBar.css'
import { useSearch } from '../../context/SearchContext'

function SearchBar({ initialSearchText }) {
  const [searchText, setSearchText] = useState(initialSearchText || '')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { addToHistory } = useSearch()
  const inputRef = useRef(null)

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
        setSuggestions(data.results)
      } else {
        setSuggestions([])
      }
    } catch (error) {
      console.error('Error while receiving data:', error)
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
    searchApi(searchText)
    addToHistory(searchText)
    const charactersIds = suggestions.map((character) => character.id)
    const searchString = '/searchResultPage/' + charactersIds.join(',')
    navigate(searchString, { state: { searchText } })
  }

  const handleInputBlur = () => {
    setShowSuggestions(false)
  }

  const handleInputFocus = () => {
    if (searchText.trim() !== '') {
      setShowSuggestions(true)
    }
  }

  useEffect(() => {
    if (location.state?.searchText) {
      setSearchText(location.state.searchText)
    }

    inputRef.current.focus()
  }, [location.state])

  return (
    <div className="App">
      <input
        ref={inputRef}
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
