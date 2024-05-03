import { useEffect, useState } from 'react'

export const useFetchCharacter = (id) => {
  const [personInfo, setPersonInfo] = useState({})
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPersonInfo(data)
      })
      .catch((error) => {
        setError(error.message)
        setIsLoading(false)
      })
      .finally(() => setIsLoading(false))
  }, [id])

  return { personInfo, error, isLoading }
}
