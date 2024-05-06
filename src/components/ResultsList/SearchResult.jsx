import React from 'react'
import './SearchResult.css'

function SearchResult({ selectedItem }) {
  if (!selectedItem) {
    return null
  }

  return (
    <div className="project-card ">
      <h2>{selectedItem.name}</h2>
      <div className="project-image">
        <img src={selectedItem.image} alt={selectedItem.name} />
      </div>
      <div className="project-details ">
        <p>Status: {selectedItem.status}</p>
        <p>Species: {selectedItem.species}</p>
        <p>Origin: {selectedItem.origin?.name}</p>
        <p>Location: {selectedItem.location?.name}</p>
        <p>Gender: {selectedItem.gender}</p>
        <button className="btn-favotites">Add to favorites</button>
      </div>
    </div>
  )
}

export default SearchResult
