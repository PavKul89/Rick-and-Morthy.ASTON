import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function Search() {
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

  if (isLoading) {
    return <h1>...Loading</h1>
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
