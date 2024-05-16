import React, { createContext, useContext, useState, useEffect } from 'react'

const SearchContext = createContext()

export const useSearch = () => useContext(SearchContext)

export const SearchProvider = ({ children }) => {
  const [searchHistory, setSearchHistory] = useState(() => {
    const savedHistory = localStorage.getItem('searchHistory')
    return savedHistory ? JSON.parse(savedHistory) : []
  })

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
  }, [searchHistory])

  const addToHistory = (query) => {
    setSearchHistory((prevHistory) => [...prevHistory, query])
  }

  const clearHistory = () => {
    setSearchHistory([])
  }

  const removeFromHistory = (index) => {
    setSearchHistory((prevHistory) => prevHistory.filter((_, i) => i !== index))
  }

  return (
    <SearchContext.Provider
      value={{ searchHistory, addToHistory, clearHistory, removeFromHistory }}
    >
      {children}
    </SearchContext.Provider>
  )
}
