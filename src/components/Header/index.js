import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {MdCancel} from 'react-icons/md'
import {CgPlayList} from 'react-icons/cg'

import UserContext from '../../context/UserContext'

import './index.css'

class Header extends Component {
  state = {showListofpoular: false}

  render() {
    const {showListofpoular} = this.state

    return (
      <UserContext.Consumer>
        {value => {
          const {a} = value
          console.log(a)
          console.log('Header')

          const clickToClose = () => {
            this.setState(prevState => ({
              showListofpoular: !prevState.showListofpoular,
            }))
          }

          return (
            <nav className="nav-header">
              <div className="nav-content">
                <div className="nav-bar-large-container">
                  <Link to="/">
                    <img
                      className="website-logo"
                      src="https://res.cloudinary.com/dtjcxf7z5/image/upload/v1650191862/Mini%20Project%20Netflix%20Clone/MoviesIcon_snclt2.png"
                      alt="website logo"
                    />
                  </Link>

                  <ul className="nav-menu">
                    <Link to="/" className="nav-link">
                      <li className="nav-menu-item">Home</li>
                    </Link>

                    <Link to="/popular" className="nav-link">
                      <li className="nav-menu-item">Popular</li>
                    </Link>
                  </ul>

                  <ul className="nav-menu-profile">
                    <Link to="/search" className="nav-link">
                      <li className="nav-menu-item">
                        <button
                          type="button"
                          className="search-button"
                          testid="searchButton"
                        >
                          <HiOutlineSearch size={25} color="white" />
                        </button>
                      </li>
                    </Link>
                    <Link to="/account" className="nav-link">
                      <li className="nav-menu-item">
                        <img
                          src="https://res.cloudinary.com/dtjcxf7z5/image/upload/v1650194938/Mini%20Project%20Netflix%20Clone/Avatar_ayfkv8.png"
                          alt="profile"
                          className="profile"
                        />
                      </li>
                    </Link>
                    <ul className="nav-menu-mobile">
                      <Link to="/search" className="nav-link">
                        <li className="nav-menu-item-mobile">
                          <button type="button" className="search-button">
                            <HiOutlineSearch size={25} color="white" />
                          </button>
                        </li>
                      </Link>
                      <li className="nav-menu-item-mobile">
                        <button
                          type="button"
                          onClick={clickToClose}
                          className="nav-button"
                        >
                          <CgPlayList size={25} color="white" />
                        </button>
                      </li>
                    </ul>
                  </ul>
                </div>
              </div>

              {showListofpoular ? (
                <ul className="nav-menu-mobile">
                  <ul className="nav-menu-list-mobile">
                    <Link to="/" className="nav-link">
                      <li className="nav-menu-item-mobile">Home</li>
                    </Link>
                    <Link to="/popular" className="nav-link">
                      <li className="nav-menu-item-mobile">Popular</li>
                    </Link>
                    <Link to="/account" className="nav-link">
                      <li className="nav-menu-item-mobile">Account</li>
                    </Link>

                    <li className="nav-menu-item-mobile">
                      <button
                        type="button"
                        onClick={clickToClose}
                        className="nav-button"
                        testid="searchButton"
                      >
                        <MdCancel size={25} color="white" />
                      </button>
                    </li>
                  </ul>
                </ul>
              ) : null}
            </nav>
          )
        }}
      </UserContext.Consumer>
    )
  }
}
export default withRouter(Header)
