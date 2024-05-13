import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Form from './Form'
import { setUser } from '../../redux/slices/userSlice'

function SignupForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleRegister = (email, password) => {
    const auth = getAuth()

    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          })
        )
        navigate('/')
      })
      .catch(console.error)
  }

  return <Form title="register" handleClickForm={handleRegister} />
}

export default SignupForm
