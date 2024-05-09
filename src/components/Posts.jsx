import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { withErrorBoundary } from 'react-error-boundary'
import { useTheme } from '../context/ThemeContext'
import BackToTopButton from '../layouts/BackToTopButton'
import Post from './Post'
import SearchBar from './SearhBar/SearchBar'
import SearchResultsList from './ResultsList/SearchResultsList'

function Posts() {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [pageNumber, setPageNumber] = useState(2)
  const [results, setResults] = useState([])
  const [favoriteCards, setFavoriteCards] = useState([])
  const { theme } = useTheme()
  console.log(favoriteCards)

  useEffect(() => {
    if (favoriteCards.length > 0) {
      localStorage.setItem('favorites', JSON.stringify(favoriteCards))
    } else {
      localStorage.removeItem('favorites')
    }
  }, [favoriteCards])

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.results)
      })
      .catch((error) => {
        setError(error.message)
      })
      .finally(() => setIsLoading(false))
  }, [])

  const addToFavorites = (card) => {
    setFavoriteCards([...favoriteCards, card])
  }

  const removeFromFavorites = (id) => {
    const updatedFavorites = favoriteCards.filter((card) => card.id !== id)
    setFavoriteCards(updatedFavorites)
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  }

  const fetchMoreData = () => {
    if (posts.length < 826) {
      fetch(`https://rickandmortyapi.com/api/character/?page=${pageNumber}`)
        .then((res) => res.json())
        .then((nextPosts) => {
          setPosts(posts.concat(nextPosts.results))
          setPageNumber(pageNumber + 1)
        })
        .catch((error) => setError(error.message))
        .finally(() => setIsLoading(false))
    } else {
      setHasMore(false)
    }
  }

  if (isLoading) {
    return <h1>...Loading</h1>
  }

  if (error) {
    return <h1>Error: {error}</h1>
  }

  return (
    <div className="posts">
      <SearchBar setResults={setResults} />
      <SearchResultsList results={results} />
      <InfiniteScroll
        className={
          theme === 'light'
            ? 'infinityScroll-light-theme'
            : 'infinityScroll-dark-theme'
        }
        dataLength={posts.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<p>Loading...</p>}
        endMessage={<p>character list is over</p>}
      >
        {posts.map((post) => (
          <Post
            key={post.id}
            {...post}
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites} // Pass removeFromFavorites as a prop
          />
        ))}
        <BackToTopButton />
      </InfiniteScroll>
    </div>
  )
}

export default withErrorBoundary(Posts, {
  fallback: <div>Something went wrong</div>,
})
