import React from 'react'
import './SearchResultsList.css'

function SearchResultsList({ results }) {
  return <div className="results-list">{results.map}</div>
}

export default SearchResultsList
