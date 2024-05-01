import Posts from '../Posts'
import { Suspense } from 'react'
function Logo() {
  return (
    <>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Posts />
      </Suspense>
    </>
  )
}

export default Logo
