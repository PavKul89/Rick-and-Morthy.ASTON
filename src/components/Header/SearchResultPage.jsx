import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Button from '../Button/Button'
import { useFavorites } from '../../context/FavoritesContext'
import './Search.css'
import SearchBar from '../SearhBar/SearchBar'
import { useAuth } from '../../hooks/useAuth'
///////////////999999999999999
function SearchResultPage() {
  const navigate = useNavigate()
  const { isAuth } = useAuth()
  const { ids } = useParams()
  const { addToFavorites, removeFromFavorites, favorites } = useFavorites()
  const [searchResult, setSearchResults] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSearchResults = async () => {
      const characterIds = ids.split(',')
      const multipleCharacters =
        'https://rickandmortyapi.com/api/character/' + characterIds.join(',')

      try {
        const res = await fetch(multipleCharacters)
        if (!res.ok) throw new Error('Failed to fetch data')
        const data = await res.json()
        setSearchResults(Array.isArray(data) ? data : [data])
        setIsLoading(false)
      } catch (error) {
        setError(error.message)
        setIsLoading(false)
      }
    }

    fetchSearchResults()
  }, [ids])

  const isFavorite = (id) => favorites.some((item) => item.id === id)

  const handleAddRemoveFavorites = (result) => {
    if (!isAuth) {
      navigate('/signup')
      return
    }
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

export default SearchResultPage
