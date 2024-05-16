import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetchCharacter } from '../../hooks/useFetchCharacter'
import PropTypes from 'prop-types'
import { useFavorites } from '../../hooks/useFavorites'
import { useAuth } from '../../hooks/useAuth'

function Project() {
  const { id } = useParams()
  const { personInfo, isLoading } = useFetchCharacter(id)
  const { name, status, species, origin, location, gender } = personInfo
  const [imageLoading, setImageLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)
  const { favoriteCards, removeFromFavorites, addToFavorites } = useFavorites()
  const { isAuth, id: userId } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const isAlreadyFavorite = favoriteCards.some(
      (card) => card.id === id && card.userId === userId
    )
    console.log('useEffect - isAlreadyFavorite:', isAlreadyFavorite)
    setIsFavorite(isAlreadyFavorite)
  }, [id, favoriteCards, userId])

  const handleImageLoaded = () => {
    setImageLoading(false)
  }

  const handleAddOrRemoveFromFavorites = () => {
    if (!isAuth) {
      navigate('/signup')
      return
    }
    if (isFavorite) {
      removeFromFavorites(id)
      setIsFavorite(false)
      console.log('Removed from favorites:', id)
    } else {
      const newFavorite = {
        id,
        name,
        status,
        species,
        origin,
        location,
        gender,
        image: personInfo.image,
      }
      addToFavorites(newFavorite)
      setIsFavorite(true)
      console.log('Added to favorites:', newFavorite)
    }
  }

  return (
    <div className="project-card">
      <div className="project-image">
        {isLoading ? (
          <div className="loader">Loading...</div>
        ) : (
          <img
            src={personInfo.image}
            alt=""
            onLoad={handleImageLoaded}
            style={{ display: imageLoading ? 'none' : 'block' }}
          />
        )}
        {imageLoading && !isLoading && (
          <div className="image-loader">loading image...</div>
        )}
      </div>
      <div className="project-details">
        <p className="project-name"> {name}</p>
        <p>Status: {status}</p>
        <p>View: {species}</p>
        <p>Origin: {origin?.name}</p>
        <p>Location: {location?.name}</p>
        <p>Floor: {gender}</p>
        <button
          onClick={handleAddOrRemoveFromFavorites}
          className="btn-favorites"
          style={{
            backgroundColor: isFavorite ? '#7950f2' : '#6350d3',
            color: '#fff',
          }}
        >
          {isFavorite ? 'Remove' : 'Add to favorites'}
        </button>
      </div>
    </div>
  )
}

Project.propTypes = {
  id: PropTypes.string.isRequired,
}

export default Project
