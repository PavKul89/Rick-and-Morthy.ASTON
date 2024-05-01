import { useState, useEffect } from 'react'

function BackToTopButton() {
  const [backToTopButton, setbackToTopButton] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        setbackToTopButton(true)
      } else {
        setbackToTopButton(false)
      }
    })
  }, [])

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  return (
    <div>
      {backToTopButton && (
        <button
          className=""
          style={{
            position: 'fixed',
            bottom: '50px',
            right: '50px',
            height: '50px',
            width: '50px',
            fontSize: '30px',
            color: 'white',
            backgroundColor: 'gray',
            borderRadius: '50px',
          }}
          onClick={scrollUp}
        >
          Up
        </button>
      )}
    </div>
  )
}

export default BackToTopButton
