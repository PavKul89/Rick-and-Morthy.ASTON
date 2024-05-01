import { NavLink } from 'react-router-dom'
import './Post.css'

function Post(props) {
  const { image, name, id } = props
  return (
    <NavLink to={`/project/${id}`}>
      <div className="post">
        <img src={image} alt={name} />
        <h2>{name}</h2>
      </div>
    </NavLink>
  )
}

export default Post
