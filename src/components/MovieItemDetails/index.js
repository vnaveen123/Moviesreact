import {Component} from 'react'
import Header from '../Header'

import UserContext from '../../context/UserContext'
import Footer from '../Footer'
import MovieItem from '../MovieItem'

class MovieItemDetails extends Component {
  render() {
    return (
      <UserContext.Consumer>
        {value => {
          const {username} = value
          console.log(username)

          return (
            <>
              <div className="home-container">
                <Header />
                <MovieItem />
              </div>
              <Footer />
            </>
          )
        }}
      </UserContext.Consumer>
    )
  }
}
export default MovieItemDetails
