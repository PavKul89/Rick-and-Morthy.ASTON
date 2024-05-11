import { useState, useEffect } from 'react'

export function useFavorites() {
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

  return { favoriteCards, removeFromFavorites, clearFavorites }
}
