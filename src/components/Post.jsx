import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import Button from './Button/Button'
import './Post.css'

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
        <div className="buttons">
          <Button bgColor="#7950f2" textColor="#fff">
            <span>Add to favorites</span>
          </Button>
          <Button bgColor="#6350d3" textColor="#fff">
            <span>More details</span>
          </Button>
        </div>
        <h3>{name}</h3>
      </div>
    </NavLink>
  )
}

export default Post
