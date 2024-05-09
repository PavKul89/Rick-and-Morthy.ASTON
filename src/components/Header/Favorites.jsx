import React, { useState, useEffect } from 'react'
import './Favorites.css'
import Button from '../Button/Button'
import { Link } from 'react-router-dom'

function Favorites() {
  const [favoriteCards, setFavoriteCards] = useState([])

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites')
    if (storedFavorites) {
      setFavoriteCards(JSON.parse(storedFavorites))
    }
  }, [])

  const removeFromFavorites = (id) => {
    const updatedFavorites = favoriteCards.filter((card) => card.id !== id)
    setFavoriteCards(updatedFavorites)
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  }

  const clearFavorites = () => {
    setFavoriteCards([])
    localStorage.removeItem('favorites')
  }

  return (
    <div>
      <h1>Favorites</h1>
      {favoriteCards.length > 0 && (
        <button
          className="btn-favorites"
          style={{
            backgroundColor: '#6350d3',
            color: '#fff',
          }}
          onClick={clearFavorites}
        >
          Clear Favorites
        </button>
      )}
      <div className="favorites">
        {favoriteCards.length === 0 ? (
          <p className="nofavorites">No favorite cards</p>
        ) : (
          favoriteCards.map((card) => (
            <div key={card?.id} className="favorites-post">
              <img src={card?.image} alt={card.name} />
              <h3>{card?.name}</h3>
              <div className="buttons">
                <Button
                  bgColor="#6350d3"
                  textColor="#fff"
                  onClick={() => removeFromFavorites(card.id)}
                >
                  <span>Remove</span>
                </Button>
                <Link to={`/project/${card.id}`}>
                  <Button bgColor="#6350d3" textColor="#fff">
                    <span>More details</span>
                  </Button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Favorites
