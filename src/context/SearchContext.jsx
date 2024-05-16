import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
/////////////
const SearchContext = createContext()

export const useSearch = () => useContext(SearchContext)

export const SearchProvider = ({ children }) => {
  const { id: userId } = useAuth()
  const [searchHistory, setSearchHistory] = useState([])

  useEffect(() => {
    if (userId) {
      const savedHistory = localStorage.getItem(`searchHistory_${userId}`)
      setSearchHistory(savedHistory ? JSON.parse(savedHistory) : [])
    }
  }, [userId])

  useEffect(() => {
    if (userId) {
      localStorage.setItem(
        `searchHistory_${userId}`,
        JSON.stringify(searchHistory)
      )
    }
  }, [searchHistory, userId])

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
