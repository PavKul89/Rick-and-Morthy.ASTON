import React from 'react'
import './SearchBar.css'

function SearchBar() {
  return (
    <div className="search-input">
      <input placeholder="Type to search..." />
      <button className="search-button">Search</button>
    </div>
  )
}

export default SearchBar
