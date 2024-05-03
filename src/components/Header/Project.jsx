import React from 'react'
import { useParams } from 'react-router-dom'
import { useFetchCharacter } from '../../hooks/useFetchCharacter'

function Project() {
  const { id } = useParams()
  const { personInfo } = useFetchCharacter(id)
  const { name, status, species, origin, location, gender } = personInfo

  return (
    <div className="project-card">
      <div className="project-image">
        <img src={personInfo.image} alt="" />
      </div>
      <div className="project-details">
        <p className="project-name"> {name}</p>
        <p>Status: {status}</p>
        <p>Species: {species}</p>
        <p>Origin: {origin?.name}</p>
        <p>Location: {location?.name}</p>
        <p>Gender: {gender}</p>
      </div>
    </div>
  )
}

export default Project
