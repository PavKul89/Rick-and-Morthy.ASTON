import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import React from 'react'
import Favorites from './components/Header/Favorites'
import History from './components/Header/History'
import Logo from './components/Header/Logo'
import NotFound from './components/Header/NotFound'
import Search from './components/Header/Search'
import Signin from './components/Header/Signin'
import Signup from './components/Header/Signup'
import { ThemeProvider } from './context/ThemeContext'
import MainLayout from './layouts/MainLayout'
import { Suspense } from 'react'
import './App.css'

const Project = React.lazy(() => import('./components/Header/Project'))

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Provider store={store}>
          <div className="App">
            <Routes>
              <Route exact path="/" element={<MainLayout />}>
                <Route index element={<Logo />} />
                <Route path="favorites" element={<Favorites />} />
                <Route
                  path="project/:id"
                  element={
                    <Suspense fallback={<h2>Loading...</h2>}>
                      <Project />
                    </Suspense>
                  }
                />
                <Route path="history" element={<History />} />
                <Route path="search/:ids" element={<Search />} />
                <Route exact path="signin" element={<Signin />} />
                <Route exact path="signup" element={<Signup />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </div>
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
