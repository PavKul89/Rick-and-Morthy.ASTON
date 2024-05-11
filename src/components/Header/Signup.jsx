import { Link } from 'react-router-dom'
import SignupForm from '../Form/SignUpForm'

function Signup() {
  return (
    <div>
      <h1>Signup</h1>
      <SignupForm></SignupForm>

      <p>
        Already have an account? <Link to="/Signin">Signin</Link>
      </p>
    </div>
  )
}

export default Signup
