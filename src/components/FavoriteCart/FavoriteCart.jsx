import React from 'react'

function FavoriteCart({ id, name, image, removeFromFavorites }) {
  return (
    <div className="favorite-cart">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <button onClick={() => removeFromFavorites(id)}>Remove</button>
    </div>
  )
}

export default FavoriteCart
