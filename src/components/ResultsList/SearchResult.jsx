import './SearchResult.css'

function SearchResult({ result }) {
  return (
    <div className="search-result" onClick={(e) => console.log(result)}>
      {result.name}
    </div>
  )
}

export default SearchResult
