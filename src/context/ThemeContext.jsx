import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react'
import { loggerMiddleware } from '../redux/loggerMiddleware'

const ThemeContext = createContext()

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')

  const setThemeWithMiddleware = (newTheme) => {
    loggerMiddleware(() => setTheme(newTheme))({
      type: 'SET_THEME',
      payload: newTheme,
    })
  }

  const toggleTheme = () => {
    setThemeWithMiddleware(theme === 'light' ? 'dark' : 'light')
  }

  const memoValue = useMemo(() => ({ theme, toggleTheme }), [theme])

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  return (
    <ThemeContext.Provider value={memoValue}>{children}</ThemeContext.Provider>
  )
}

const useTheme = () => {
  return useContext(ThemeContext)
}

export { ThemeProvider, useTheme }
