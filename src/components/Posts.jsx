import React, { useEffect, useState } from 'react'
import { withErrorBoundary } from 'react-error-boundary'
import { useTheme } from '../context/ThemeContext'
import BackToTopButton from '../layouts/BackToTopButton'
import Post from './Post'
import SearchBar from './SearhBar/SearchBar'
import SearchResultsList from './ResultsList/SearchResultsList'
import { useGetCharactersQuery } from '../redux/searvices'

function Posts() {
  const [results, setResults] = useState([])
  const [favoriteCards, setFavoriteCards] = useState([])
  const { theme } = useTheme()

  const { data, error, isLoading } = useGetCharactersQuery(1)

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites')
    if (storedFavorites) {
      setFavoriteCards(JSON.parse(storedFavorites))
    }
  }, [])

  useEffect(() => {
    if (favoriteCards.length > 0) {
      localStorage.setItem('favorites', JSON.stringify(favoriteCards))
    } else {
      localStorage.removeItem('favorites')
    }
  }, [favoriteCards])

  const addToFavorites = (card) => {
    setFavoriteCards([...favoriteCards, card])
    localStorage.setItem('favorites', JSON.stringify([...favoriteCards, card]))
  }

  const removeFromFavorites = (id) => {
    const updatedFavorites = favoriteCards.filter((card) => card.id !== id)
    setFavoriteCards(updatedFavorites)
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  }

  if (isLoading) {
    return <h1>...Loading</h1>
  }

  if (error) {
    return <h1>Error: {error.message}</h1>
  }

  return (
    <div className="posts">
      <SearchBar setResults={setResults} />
      <SearchResultsList results={results} />
      <div
        className={
          theme === 'light'
            ? 'posts-container-light-theme'
            : 'posts-container-dark-theme'
        }
      >
        {data?.results.map((post) => (
          <Post
            key={post.id}
            {...post}
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
          />
        ))}
        <BackToTopButton />
      </div>
    </div>
  )
}

export default withErrorBoundary(Posts, {
  fallback: <div>Something went wrong</div>,
})
