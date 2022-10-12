import {Component} from 'react'
import {HiOutlineSearch} from 'react-icons/hi'

import Header from '../Header'

import UserContext from '../../context/UserContext'
import Footer from '../Footer'

import SearchElement from '../SearchElement'
import './index.css'

class SearchRoute extends Component {
  render() {
    return (
      <UserContext.Consumer>
        {value => {
          const {username} = value
          console.log(username)

          return (
            <div className="search-main-container">
              <Header />
              <div className="search-container">
                <SearchElement />
              </div>
              <Footer />
            </div>
          )
        }}
      </UserContext.Consumer>
    )
  }
}

export default SearchRoute
