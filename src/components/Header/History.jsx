import React from 'react'
import { Link } from 'react-router-dom'
import { useSearch } from '../../context/SearchContext'

function History() {
  const { searchHistory } = useSearch()
  console.log(searchHistory)
  return (
    <div className="search-history">
      <h2>Search History</h2>
      <ul>
        {searchHistory.map((query, index) => (
          <li key={index}>
            <Link to={`/search/result/${query}`}>{query}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default History
