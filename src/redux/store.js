import { configureStore } from '@reduxjs/toolkit'
import useReducer from './slices/userSlice'
import { rickAndMortyApi } from './searvices'
import favoritesSlice from './slices/favoritesSlice'

export const store = configureStore({
  reducer: {
    [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer,
    user: useReducer,
    favorites: favoritesSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rickAndMortyApi.middleware),
})
