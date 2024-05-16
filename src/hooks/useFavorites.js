import { useState, useEffect } from 'react'
import { useAuth } from './useAuth'

export function useFavorites() {
  const [favoriteCards, setFavoriteCards] = useState([])
  const { id: userId } = useAuth()

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

  const addToFavorites = (newFavorite) => {
    const updatedFavorites = [...favoriteCards, { ...newFavorite, userId }]
    setFavoriteCards(updatedFavorites)
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  }

  return { favoriteCards, removeFromFavorites, clearFavorites, addToFavorites }
}
