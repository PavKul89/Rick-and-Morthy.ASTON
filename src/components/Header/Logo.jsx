import Posts from '../Posts'
import { withErrorBoundary } from 'react-error-boundary'
function Logo() {
  return <Posts />
}

export default withErrorBoundary(Logo, {
  fallback: <div>Something went wrong</div>,
})
