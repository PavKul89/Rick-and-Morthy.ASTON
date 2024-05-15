import { configureStore } from '@reduxjs/toolkit'
import useReducer from './slices/userSlice'
import { rickAndMortyApi } from './searvices'

export const store = configureStore({
  reducer: {
    [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer,
    user: useReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rickAndMortyApi.middleware),
})
