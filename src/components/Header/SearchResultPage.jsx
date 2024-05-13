import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../Button/Button'
import { Link } from 'react-router-dom'
import { useFavorites } from '../../context/FavoritesContext'
import './Search.css'

function SearchResultPage() {
  const { ids } = useParams()
  const { addToFavorites, removeFromFavorites, favorites } = useFavorites()
  const [searchResult, setSearchResults] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchSearchResults()
  }, [ids])
  const fetchSearchResults = async () => {
    const characterIds = ids.split(',')
    const multipleCharacters =
      'https://rickandmortyapi.com/api/character/' + characterIds.join(',')

    try {
      const res = await fetch(multipleCharacters)
      if (!res.ok) throw new Error('Failed to fetch data')
      const data = await res.json()
      setSearchResults(data)
      setIsLoading(false)
    } catch (error) {
      setError(error.message)
      setIsLoading(false)
    }
  }

  const isFavorite = (id) => favorites.some((item) => item.id === id)

  const handleAddRemoveFavorites = (result) => {
    if (isFavorite(result.id)) {
      removeFromFavorites(result.id)
    } else {
      addToFavorites(result)
    }
  }

  if (isLoading) {
    return <h1>...Loading</h1>
  }

  if (error) {
    return <h1>Error: {error}</h1>
  }

  return (
    <div>
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

export default SearchResultPage
