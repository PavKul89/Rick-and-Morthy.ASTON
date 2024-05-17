import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import Button from './Button/Button'
import './Post.css'
import { useAuth } from '../hooks/useAuth'
////////////////////22222222
function Post({ image, name, id, addToFavorites, removeFromFavorites }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const { isAuth, id: userId } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || []
    const isAlreadyFavorite = storedFavorites.some(
      (card) => card?.id === id && card?.userId === userId
    )
    setIsFavorite(isAlreadyFavorite)
    setIsUserLoggedIn(isAuth)
  }, [id, isAuth, userId])

  const handleAddToFavorites = () => {
    if (!isAuth) {
      navigate('/signup')
      return
    }
    setIsFavorite(!isFavorite)

    if (isFavorite) {
      removeFromFavorites(id)
    } else {
      addToFavorites({ image, name, id, userId })
    }
  }

  return (
    <div className="post">
      <img src={image} alt={name} />
      <div className="buttons">
        <button
          style={{
            backgroundColor: isFavorite ? '#7950f2' : '#6350d3',
            color: '#fff',
          }}
          onClick={handleAddToFavorites}
        >
          {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        </button>
        <Link to={`/project/${id}`}>
          <Button bgColor="#6350d3" textColor="#fff">
            <span>More details</span>
          </Button>
        </Link>
      </div>
      <h3>{name}</h3>
    </div>
  )
}

Post.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  addToFavorites: PropTypes.func.isRequired,
  removeFromFavorites: PropTypes.func.isRequired,
}

export default Post
