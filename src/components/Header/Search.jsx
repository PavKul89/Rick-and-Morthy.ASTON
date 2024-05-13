import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {  Link } from 'react-router-dom'
import Button from '../Button/Button'
import { useFavorites } from '../../context/FavoritesContext'
import './Search.css'

function Search() {
  const { query } = useParams()
  const { addToFavorites, removeFromFavorites, favorites } = useFavorites()
  const [searchResult, setSearchResults] = useState([])
  const characterIds = idArray.join(',')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const multipleCharacters =
    'https://rickandmortyapi.com/api/character/' + characterIds
  console.log(searchResult)

  useEffect(() => {

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
      {searchResult.map((result) => (
        <li key={result.id}>
          <img src={result.image} alt={result.name} />
          <div>
            <h2>{result.name}</h2>
            <p>Status: {result.status}</p>
            <p>Species: {result.species}</p>
            <p>Origin: {result.origin.name}</p>
            <p>Location: {result.location.name}</p>
          </div>
        </li>
      ))}
    </div>
  )
}

export default Search
