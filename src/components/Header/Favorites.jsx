import './Favorites.css'
import Button from '../Button/Button'
import { Link } from 'react-router-dom'
import { useFavorites } from '../../hooks/useFavorites'
import { useAuth } from '../../hooks/useAuth'

function Favorites() {
  const { favoriteCards, removeFromFavorites, clearFavorites } = useFavorites()
  const { id: userId } = useAuth()
  const userFavorites = favoriteCards.filter((card) => card.userId === userId)

  return (
    <div>
      {userFavorites.length > 0 && (
        <button
          className="favorites-btn-clear"
          style={{
            backgroundColor: '#6350d3',
            color: '#fff',
          }}
          onClick={clearFavorites}
        >
          Clear favorites
        </button>
      )}
      <div className="favorites">
        {userFavorites.length === 0 ? (
          <p className="nofavorites">No favorite cards</p>
        ) : (
          userFavorites.map((card) => (
            <div key={card?.id} className="favorites-post">
              <img src={card?.image} alt={card?.name} />
              <h3>{card?.name}</h3>
              <div className="favorites-btn">
                <Button
                  className="favorites-btn"
                  bgColor="#6350d3"
                  textColor="#fff"
                  onClick={() => removeFromFavorites(card.id)}
                >
                  <span className="favorites-btn">Remove</span>
                </Button>
                <Link to={`/project/${card?.id}`}>
                  <Button
                    className="favorites-btn"
                    bgColor="#6350d3"
                    textColor="#fff"
                  >
                    <span>More details</span>
                  </Button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Favorites
