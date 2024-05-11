import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useFetchCharacter } from '../../hooks/useFetchCharacter'
import PropTypes from 'prop-types'
import { useFavorites } from '../../hooks/useFavorites'

function Project() {
  const { id } = useParams()
  const { personInfo, isLoading } = useFetchCharacter(id)
  const { name, status, species, origin, location, gender } = personInfo
  const [imageLoading, setImageLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)
  const { favoriteCards, removeFromFavorites } = useFavorites()

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || []
    const isAlreadyFavorite = storedFavorites.some((card) => card.id === id)
    setIsFavorite(isAlreadyFavorite)
  }, [id, favoriteCards])

  const handleImageLoaded = () => {
    setImageLoading(false)
  }

  const handleAddOrRemoveFromFavorites = () => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || []
    if (isFavorite) {
      const updatedFavorites = storedFavorites.filter((card) => card.id !== id)
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
      setIsFavorite(false)
      removeFromFavorites(id)
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
      localStorage.setItem(
        'favorites',
        JSON.stringify([...storedFavorites, newFavorite])
      )
      setIsFavorite(true)
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
          <div className="image-loader">Loading image...</div>
        )}
      </div>
      <div className="project-details">
        <p className="project-name"> {name}</p>
        <p>Status: {status}</p>
        <p>Species: {species}</p>
        <p>Origin: {origin?.name}</p>
        <p>Location: {location?.name}</p>
        <p>Gender: {gender}</p>
        <button
          onClick={handleAddOrRemoveFromFavorites}
          className="btn-favorites"
          style={{
            backgroundColor: isFavorite ? '#7950f2' : '#6350d3',
            color: '#fff',
          }}
        >
          {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        </button>
      </div>
    </div>
  )
}

Project.propTypes = {
  id: PropTypes.string.isRequired,
}

export default Project
