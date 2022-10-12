import {Component} from 'react'
import Header from '../Header'

import UserContext from '../../context/UserContext'
import Footer from '../Footer'
import PopularItem from '../PopularItem'

class Popular extends Component {
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
                <PopularItem />
                <Footer />
              </div>
            </>
          )
        }}
      </UserContext.Consumer>
    )
  }
}
export default Popular
