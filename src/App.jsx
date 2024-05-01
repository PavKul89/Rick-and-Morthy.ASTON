import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import React from 'react'
import Favorites from './components/Header/Favorites'
import History from './components/Header/History'
import Logo from './components/Header/Logo'
import NotFound from './components/Header/NotFound'
import Search from './components/Header/Search'
import Signin from './components/Header/Signin'
import Signup from './components/Header/Signup'

import { ThemeProvider } from './context/ThemeContext'
import MainLayot from './layouts/MainLayout'
import { Suspense } from 'react'

const InfoPerson = React.lazy(() => import('./components/Header/Project'))

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<MainLayot />}>
              <Route index element={<Logo />} />
              <Route path="favorites" element={<Favorites />} />
              <Route
                path="project/:id"
                element={
                  <Suspense fallback={<h2>Loading...</h2>}>
                    <InfoPerson />
                  </Suspense>
                }
              />
              <Route path="history" element={<History />} />
              <Route path="search" element={<Search />} />
              <Route path="signin" element={<Signin />} />
              <Route path="signup" element={<Signup />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
