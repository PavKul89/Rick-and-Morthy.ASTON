import { useState } from 'react'
import './Form.css'

function Form({ title, handleClickForm }) {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  return (
    <div className="form-register">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <input
        type="password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        placeholder="password"
      />
      <button onClick={() => handleClickForm(email, pass)}>{title}</button>
    </div>
  )
}

export default Form
