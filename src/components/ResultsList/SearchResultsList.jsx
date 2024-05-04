import React from 'react'
import './SearchResultsList.css'

function SearchResultsList({ results }) {
  return (
    <div className="results-list">
      <div>{results.name}</div>
    </div>
  )
}

export default SearchResultsList
