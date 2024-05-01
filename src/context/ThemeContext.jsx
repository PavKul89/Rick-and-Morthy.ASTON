import React, { createContext, useContext, useMemo, useState } from 'react'

const ThemeContext = createContext()

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  const memoValue = useMemo(() => ({ theme, toggleTheme }), [theme])

  return (
    <ThemeContext.Provider value={memoValue}>{children}</ThemeContext.Provider>
  )
}

const useTheme = () => {
  return useContext(ThemeContext)
}

export { ThemeProvider, useTheme }
