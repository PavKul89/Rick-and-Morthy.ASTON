import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Button from './Button/Button'

import './Post.css'

function Post({ image, name, id, addToFavorites, removeFromFavorites }) {
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    // Проверяем, добавлено ли изображение в избранное при первоначальной загрузке компонента
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || []
    const isAlreadyFavorite = storedFavorites.some((card) => card.id === id)
    setIsFavorite(isAlreadyFavorite)
  }, [id])

  const handleAddToFavorites = () => {
    setIsFavorite(!isFavorite)
    if (isFavorite) {
      removeFromFavorites(id)
    } else {
      addToFavorites({ image, name, id })
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
