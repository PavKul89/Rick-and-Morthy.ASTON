import React, { useState } from 'react'
import './SearchBar.css'

function SearchBar() {
  const [input, setInput] = useState('')

  const searchData = (value) => {
    fetch('https://rickandmortyapi.com/api/character')
      .then((res) => res.json())
      .then((json) => {
        const results = json.results.filter((user) => {
          return (
            value &&
            user &&
            user.name &&
            user.name.toLowerCase().includes(value)
          )
        })
        console.log(results)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }

  const handleChange = (value) => {
    setInput(value)
    searchData(value)
  }

  return (
    <div className="search-input">
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
      <button className="search-button">Search</button>
    </div>
  )
}

export default SearchBar
