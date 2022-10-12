import {Component} from 'react'

import Slider from 'react-slick'
import {Link} from 'react-router-dom'

import Cookies from 'js-cookie'
import LoadSpin from '../Loader'

import UserContext from '../../context/UserContext'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Trending extends Component {
  state = {
    apiStatus: apiConstants.initial,
    allTrending: [],
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({apiStatus: apiConstants.inProgress})

    const url = 'https://apis.ccbp.in/movies-app/trending-movies'
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
        allTrending: fetchData,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  render() {
    return (
      <UserContext.Consumer>
        {value => {
          const {username, password} = value
          console.log(username)
          console.log(password)

          const renderLoader = () => <LoadSpin />

          const renderSuccessView = () => {
            const {allTrending} = this.state

            const settings = {
              dots: false,
              infinite: false,
              speed: 500,
              slidesToShow: 4,
              slidesToScroll: 1,
              responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                  },
                },
              ],
            }

            return (
              <ul className="m">
                <Slider {...settings} className="slick-container">
                  {allTrending.map(each => (
                    <div className="slick-item" key={each.id}>
                      <li key={each.id}>
                        <Link to={`/movies/${each.id}`} key={each.id}>
                          <img
                            src={each.posterPath}
                            alt={each.title}
                            className="logo-image"
                          />
                        </Link>
                      </li>
                    </div>
                  ))}
                </Slider>
              </ul>
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

          return <div>{getResult()}</div>
        }}
      </UserContext.Consumer>
    )
  }
}
export default Trending
