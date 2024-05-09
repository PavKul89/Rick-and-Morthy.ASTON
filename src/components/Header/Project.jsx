import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetchCharacter } from '../../hooks/useFetchCharacter'
import PropTypes from 'prop-types'

function Project() {
  const { id } = useParams()
  const { personInfo, isLoading } = useFetchCharacter(id)
  const { name, status, species, origin, location, gender } = personInfo
  const [imageLoading, setImageLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)

  const handleImageLoaded = () => {
    setImageLoading(false)
  }

  const handleAddToFavorites = () => {
    setIsFavorite(!isFavorite)

    // Получаем избранные карточки из локального хранилища
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || []

    if (isFavorite) {
      // Удаляем карточку из избранного
      const updatedFavorites = storedFavorites.filter((card) => card.id !== id)
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
    } else {
      // Добавляем карточку в избранное
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
        <button onClick={handleAddToFavorites} className="btn-favorites">
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
