import {Component} from 'react'

import {Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'

import Cookies from 'js-cookie'
import LoadSpin from '../Loader'

import UserContext from '../../context/UserContext'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class SearchElement extends Component {
  state = {
    apiStatus: apiConstants.initial,
    listofResults: [],
    search: '',
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const {search} = this.state

    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${search}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()

      const fetchData = data.results.map(each => ({
        id: each.id,
        backdropPath: each.backdrop_path,
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))

      this.setState({
        apiStatus: apiConstants.success,
        listofResults: fetchData,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onsearch = event => {
    this.setState({search: event.target.value}, this.getDetails)
  }

  onClickInput = event => {
    if (event.key === 'Enter') {
      this.getDetails()
    }
  }

  render() {
    const {search} = this.state

    const onSerarchforrequireditems = () => {
      this.getDetails()
    }

    return (
      <UserContext.Consumer>
        {value => {
          const {username} = value
          console.log(username)

          const renderLoader = () => <LoadSpin />

          const renderSuccessView = () => {
            const {listofResults} = this.state

            const showSearchResults = listofResults.length > 0

            return showSearchResults ? (
              <div className="popular-video-list-container">
                <h1 className="mainheadding">Trending Now</h1>
                <ul className="popular-video-list">
                  {listofResults.map(each => (
                    <li key={each.id}>
                      <Link to={`/movies/${each.id}`} key={each.id}>
                        <img
                          src={each.posterPath}
                          alt={each.title}
                          className="popular-image"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="failure-view-container">
                <img
                  src="https://res.cloudinary.com/dtjcxf7z5/image/upload/v1650384280/Mini%20Project%20Netflix%20Clone/no_results_tjfgmd.png"
                  alt="no movies"
                  className="failure-image"
                />
                <p className="search-content">
                  Your search for {search} did not find any matches.
                  <p>No results found baba</p>
                </p>
              </div>
            )
          }

          const retryButton = () => {
            this.getDetails()
          }

          const renderFailureView = () => (
            <div className="failure-view-container">
              <img
                alt="failure view"
                src="https://res.cloudinary.com/dtjcxf7z5/image/upload/v1650297174/Mini%20Project%20Netflix%20Clone/Background-Complete_t8c6zl.png"
                className="failure-image"
              />
              <p className="search-content">
                Something went wrong. Please try again
              </p>
              <button
                type="button"
                className="try-again-button"
                onClick={retryButton}
              >
                Try Again
              </button>
            </div>
          )

          const getResult = () => {
            const {apiStatus} = this.state
            switch (apiStatus) {
              case apiConstants.success:
                return renderSuccessView()
              case apiConstants.failure:
                return renderFailureView()
              case apiConstants.inProgress:
                return renderLoader()
              default:
                return null
            }
          }

          return (
            <div className="search-element">
              <div className="input-element-container">
                <input
                  type="search"
                  value={search}
                  onChange={this.onsearch}
                  placeholder="Search"
                  onKeyDown={this.onClickInput}
                  className="input-element"
                />
                <button
                  type="button"
                  className="search-button"
                  onClick={onSerarchforrequireditems}
                  testid="searchButton"
                >
                  <HiOutlineSearch size={25} color="white" />
                </button>
              </div>
              {getResult()}
            </div>
          )
        }}
      </UserContext.Consumer>
    )
  }
}
export default SearchElement
