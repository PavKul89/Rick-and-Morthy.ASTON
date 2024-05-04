import './SearchResult.css'

function SearchResult({ result }) {
  return <div className="search-result">{result.name}</div>
}

export default SearchResult
