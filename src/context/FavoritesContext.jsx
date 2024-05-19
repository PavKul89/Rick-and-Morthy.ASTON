import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react'
////////////////////////////////////вернись сюда
const FavoritesContext = createContext()

export const useFavorites = () => useContext(FavoritesContext)

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || []
    setFavorites(storedFavorites)
  }, [])

  const addToFavorites = (character) => {
    const updatedFavorites = [...favorites, character]
    setFavorites(updatedFavorites)
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  }

  const removeFromFavorites = (id) => {
    const updatedFavorites = favorites.filter(
      (character) => character.id !== id
    )
    setFavorites(updatedFavorites)
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  }

  const memoValue = useMemo(
    () => ({
      favorites,
      addToFavorites,
      removeFromFavorites,
    }),
    [favorites]
  )

  return (
    <FavoritesContext.Provider value={memoValue}>
      {children}
    </FavoritesContext.Provider>
  )
}
