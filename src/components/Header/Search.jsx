import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Button from '../Button/Button'
import { useFavorites } from '../../context/FavoritesContext'
import SearchBar from '../SearhBar/SearchBar'
import { useAuth } from '../../hooks/useAuth'
import './Search.css'

function Search() {
  const { isAuth } = useAuth
  const { query } = useParams()
  const { addToFavorites, removeFromFavorites, favorites } = useFavorites()
  const [searchResult, setSearchResults] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?name=${query}`
        )
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const data = await response.json()
        setSearchResults(data.results)
        setIsLoading(false)
      } catch (error) {
        setError(error.message)
        setIsLoading(false)
      }
    }

    fetchSearchResults()
  }, [query])

  const isFavorite = (id) => favorites.some((item) => item.id === id)

  const handleAddRemoveFavorites = (result) => {
    if (isFavorite(result.id)) {
      removeFromFavorites(result.id)
    } else {
      addToFavorites(result)
    }
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return <h1>Error: {error}</h1>
  }

  return (
    <div>
      <SearchBar />
      <div>Search Result</div>
      <div className="search-result">
        {searchResult.map((result) => (
          <div className="search-card" key={result.id}>
            <img src={result.image} alt={result.name} />
            <div>{result.name}</div>
            <div className="buttons">
              <button
                style={{
                  backgroundColor: isFavorite(result.id)
                    ? '#7950f2'
                    : '#6350d3',
                  color: '#fff',
                }}
                onClick={() => handleAddRemoveFavorites(result)}
              >
                {isFavorite(result.id)
                  ? 'Remove from favorites'
                  : 'Add to favorites'}
              </button>
              <Link to={`/project/${result.id}`}>
                <Button bgColor="#6350d3" textColor="#fff">
                  <span>More details</span>
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Search
