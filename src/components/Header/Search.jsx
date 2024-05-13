import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Link } from 'react-router-dom'
import Button from '../Button/Button'
import './Search.css'

function Search({ id }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const { ids } = useParams()
  const idArray = ids.split(',')

  const [searchResult, setSearchResults] = useState([])
  const characterIds = idArray.join(',')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const multipleCharacters =
    'https://rickandmortyapi.com/api/character/' + characterIds
  console.log(searchResult)

  useEffect(() => {
 SearchCharacter
    fetch(multipleCharacters)
      .then((res) => {
        console.log(res)
        return res.json()
      })

      .then((data) => {
        console.log('это дата', data)
        setSearchResults(data)
      })

      .catch((error) => {
        setError(error.message)
      })
      .finally(() => setIsLoading(false))
  }, [])

SearchCharacter
  if (isLoading) {
    return <h1>...Loading</h1>
  }


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
    fetchSearchResults(){
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
      <div>Search Result</div>

      <div className="search-result">
        {searchResult.map((result) => (
          <div className="search-card" key={result.id}>
            <img src={result.image} alt={result.name} />
            <div>{result.name}</div>
            <div className="buttons">
              <button
                style={{
                  backgroundColor: isFavorite ? '#7950f2' : '#6350d3',
                  color: '#fff',
                }}
                // onClick={handleAddToFavorites}
              >
                {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
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
