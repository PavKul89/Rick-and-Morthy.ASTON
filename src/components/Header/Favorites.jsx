import React, { useState } from 'react'
import FavoriteCart from '../FavoriteCart/FavoriteCart'

function Favorites() {
  const [favoriteCards, setFavoriteCards] = useState([])

  const addToFavorites = (card) => {
    setFavoriteCards([...favoriteCards, card])
  }

  const removeFromFavorites = (id) => {
    const updatedFavorites = favoriteCards.filter((card) => card.id !== id)
    setFavoriteCards(updatedFavorites)
  }

  return (
    <div className="favorites">
      <h1>Избранное</h1>
      {favoriteCards.length === 0 && <p>Нет избранных карточек</p>}
      {favoriteCards.map((card) => (
        <FavoriteCart
          key={card.id}
          id={card.id}
          name={card.name}
          image={card.image}
          removeFromFavorites={removeFromFavorites}
          addToFavorites={addToFavorites} //исправить
        />
      ))}
    </div>
  )
}

export default Favorites
