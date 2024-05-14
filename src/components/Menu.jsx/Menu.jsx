import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import BtnDarkMode from '../BtnDarkMode/BtnDarkMode'
import { useAuth } from '../../hooks/useAuth'
import { useDispatch } from 'react-redux'
import { removeUser } from '../../redux/slices/userSlice'

function Menu() {
  const { isAuth, email } = useAuth()
  const { theme } = useTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(removeUser())
    navigate('/')
  }

  return (
    <nav
      className={
        theme === 'light' ? 'dark-mode-btn-header' : 'light-mode-btn-header'
      }
    >
      <Link to="/">Logo</Link>
      {isAuth && <Link to="/favorites">Favorites</Link>}
      {isAuth && <Link to="/history">History</Link>}
      {isAuth ? (
        <>
          <button className="btn-exit" onClick={handleLogout}>
            EXIT {email}
          </button>
        </>
      ) : (
        <>
          <Link to={isAuth ? '/favorites' : '/signup'}>Favorites</Link>
          <Link to={isAuth ? '/history' : '/signup'}>History</Link>
          <Link to="/signin">Signin</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
      <BtnDarkMode />
    </nav>
  )
}

export default Menu
