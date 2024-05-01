import { Link } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import BtnDarkMode from '../BtnDarkMode/BtnDarkMode'
function Menu() {
  const { theme } = useTheme()
  return (
    <nav
      className={
        theme === 'light' ? 'dark-mode-btn-header' : 'light-mode-btn-header'
      }
    >
      <Link to="/">Logo</Link>
      <Link to="/favorites">Favorites</Link>
      <Link to="/history">History</Link>
      <Link to="/search">Search</Link>
      <Link to="/signin">Signin</Link>
      <Link to="/signup">Signup</Link>
      <BtnDarkMode />
    </nav>
  )
}

export default Menu
