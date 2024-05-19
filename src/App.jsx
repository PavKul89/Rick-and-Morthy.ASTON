import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider, useDispatch } from 'react-redux'
import { store } from './redux/store'
import React, { Suspense, useEffect } from 'react'
import Favorites from './components/Header/Favorites'
import History from './components/Header/History'
import Logo from './components/Header/Logo'
import NotFound from './components/Header/NotFound'
import Search from './components/Header/Search'
import Signin from './components/Header/Signin'
import Signup from './components/Header/Signup'
import SearchResultPage from './components/Header/SearchResultPage'
import { ThemeProvider } from './context/ThemeContext'
import MainLayout from './layouts/MainLayout'
import { FavoritesProvider } from './context/FavoritesContext'
import { SearchProvider } from './context/SearchContext'
import { setUser } from './redux/slices/userSlice'
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner'
import './App.css'

const Project = React.lazy(() => import('./components/Header/Project'))

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      dispatch(setUser(JSON.parse(userData)))
    }
  }, [dispatch])

  return (
    <Provider store={store}>
      <SearchProvider>
        <FavoritesProvider>
          <ThemeProvider>
            <BrowserRouter>
              <div className="App">
                <Routes>
                  <Route exact path="/" element={<MainLayout />}>
                    <Route index element={<Logo />} />
                    <Route path="favorites" element={<Favorites />} />
                    <Route
                      path="project/:id"
                      element={
                        <Suspense
                          fallback={
                            <h2>
                              <LoadingSpinner />
                            </h2>
                          }
                        >
                          <Project />
                        </Suspense>
                      }
                    />
                    <Route path="history" element={<History />} />
                    <Route
                      path="searchResultPage/:ids"
                      element={<SearchResultPage />}
                    />
                    <Route path="search/result/:query" element={<Search />} />
                    <Route exact path="signin" element={<Signin />} />
                    <Route exact path="signup" element={<Signup />} />
                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Routes>
              </div>
            </BrowserRouter>
          </ThemeProvider>
        </FavoritesProvider>
      </SearchProvider>
    </Provider>
  )
}

export default App
