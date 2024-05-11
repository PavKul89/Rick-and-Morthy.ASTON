import { Link } from 'react-router-dom'
import Login from '../Form/Login'

function Signin() {
  return (
    <div>
      <hi>Signin</hi>
      <Login></Login>

      <p>
        Or <Link to="/Signup">Signup</Link>
      </p>
    </div>
  )
}

export default Signin
