import React, { useState } from 'react'

function Favorites() {
  const [favoriteCards, setFavoriteCards] = useState([])
  console.log(favoriteCards)

  const storedFavorites = localStorage.getItem('favorites')
  const parsedFavorites = JSON.parse(storedFavorites)
  console.log('111111111', parsedFavorites)

  if (storedFavorites) {
    const parsedFavorites = JSON.parse(storedFavorites)
    console.log(parsedFavorites)
  }

  // const addToFavorites = (card) => {
  //   setFavoriteCards([...favoriteCards, card])
  // }

  const removeFromFavorites = (id) => {
    const updatedFavorites = favoriteCards.filter((card) => card.id !== id)
    setFavoriteCards(updatedFavorites)
  }

  return (
    <div className="favorites">
      <h1>Избранное</h1>
      <div>{parsedFavorites?.length > 0 && parsedFavorites[0]?.name}</div>
      <div>{parsedFavorites?.length > 0 && parsedFavorites[1]?.name}</div>
      <div>{parsedFavorites?.length > 0 && parsedFavorites[2]?.name}</div>

      {favoriteCards.length === 0 ? (
        <p>Нет избранных карточек</p>
      ) : (
        favoriteCards.map((card) => (
          <div key={card?.id} className="favorite-cart">
            <img src={card?.image} alt={card.name} />
            <h3>{card?.name}</h3>
            <button onClick={() => removeFromFavorites(card.id)}>Remove</button>
          </div>
        ))
      )}
    </div>
  )
}

export default Favorites
