import { createSlice } from '@reduxjs/toolkit'

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: JSON.parse(localStorage.getItem('favorites')) || [],
  reducers: {
    addToFavorites: (state, action) => {
      const newFavorite = action.payload
      const updatedFavorites = [...state, newFavorite]
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
      return updatedFavorites
    },
    removeFromFavorites: (state, action) => {
      const { id, userId } = action.payload
      const updatedFavorites = state.filter(
        (item) => !(item.id === id && item.userId === userId)
      )
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
      return updatedFavorites
    },
  },
})

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions

export default favoritesSlice.reducer
