import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function Project() {
  const { id } = useParams()
  const [personInfo, setPersonInfo] = useState({})

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPersonInfo(data)
      })
      .catch((error) => {
        console.log(error.message)
      })
  }, [id])

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
