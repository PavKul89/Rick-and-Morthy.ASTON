import './BtnDarkMode.css'
import { useTheme } from '../../context/ThemeContext'

function BtnDarkMode() {
  const { toggleTheme } = useTheme()

  return (
    <div>
      <button className="btn" onClick={toggleTheme}>
        Light/Dark
      </button>
    </div>
  )
}

export default BtnDarkMode
