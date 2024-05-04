import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

function Post(props) {
  const { image, name, id } = props
  Post.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }

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
