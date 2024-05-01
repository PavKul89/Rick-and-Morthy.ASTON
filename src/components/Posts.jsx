import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useTheme } from '../context/ThemeContext'
import BackToTopButton from '../layouts/BackToTopButton'
import Post from './Post'

function Posts() {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [pageNumber, setPageNumber] = useState(2)

  const { theme } = useTheme()

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setPosts(data.results)
      })
      .catch((error) => {
        setError(error.message)
      })
      .finally(() => setIsLoading(false))
  }, [])

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
          <Post key={post.id} {...post} />
        ))}
        <BackToTopButton />
      </InfiniteScroll>
    </div>
  )
}

export default Posts