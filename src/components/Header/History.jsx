import React from 'react'

function History() {
  // Получаем параметры URL
  const searchParams = new URLSearchParams(window.location.search)
  const query = searchParams.get('query')

  return (
    <div>
      <h1>History</h1>
      <p>{query}</p>
      {/* Здесь можно использовать результаты поиска из параметров URL */}
    </div>
  )
}

export default History
