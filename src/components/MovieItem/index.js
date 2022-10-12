import {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import LoadSpin from '../Loader'

import MovieContext from '../../context/UserContext'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MovieItem extends Component {
  state = {
    apiStatus: apiConstants.initial,
    movieItemDetails: [],
    similarMovieItems: [],
  }

  componentDidMount() {
    this.getDetails()
  }

  getFormattedData = each => ({
    id: each.id,
    backdropPath: each.backdrop_path,
    title: each.title,
    adult: each.adult,
    budget: each.budget,
    genres: each.genres,
    overview: each.overview,
    posterPath: each.poster_path,
    releaseDate: each.release_date,
    runtime: each.runtime,
    rating: each.vote_average,
    count: each.vote_count,
    similarMovieItems: each.similar_movies,
    spokenLanguage: each.spoken_languages,
  })

  getDetails = async () => {
    this.setState({apiStatus: apiConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/movies-app/movies/${id}`
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

      const fetchData = this.getFormattedData(data.movie_details)

      this.setState({
        apiStatus: apiConstants.success,
        movieItemDetails: fetchData,
        similarMovieItems: fetchData.similarMovieItems.slice(0, 6),
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  render() {
    return (
      <MovieContext.Consumer>
        {value => {
          const {password} = value
          console.log(password)

          const renderLoader = () => <LoadSpin />

          const retryButton = () => {
            this.getDetails()
          }

          const renderSuccessView = () => {
            const {movieItemDetails, similarMovieItems} = this.state
            const {
              title,
              backdropPath,
              runtime,
              adult,
              releaseDate,
              overview,
              genres,
              count,
              rating,
              budget,
              spokenLanguage,
            } = movieItemDetails
            const backgroundImage = backdropPath
            const hoursString = Math.floor(runtime / 60)
            const minutesString = runtime % 60
            const dateString = new Date(releaseDate)
            let dateEnd
            const day = dateString.getDay().toString()
            if (day.endsWith('3')) {
              dateEnd = 'rd'
            } else if (day.endsWith('2')) {
              dateEnd = 'nd'
            } else if (day.endsWith('1')) {
              dateEnd = 'st'
            } else {
              dateEnd = 'th'
            }
            return (
              <div>
                <div
                  style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat',
                  }}
                >
                  <h1 className="movieitemmainheadding">{title}</h1>
                  <div className="movitime">
                    <p className="hours">{`${hoursString}h ${minutesString}m`}</p>
                    <p className="language">{adult ? 'A' : 'U/A'}</p>
                    <p className="hours">{dateString.getFullYear()}</p>
                  </div>
                  <p className="overview">{overview}</p>
                  <button type="button" className="button">
                    Play
                  </button>
                </div>
                <div className="genre-container">
                  <ul className="listofgener">
                    <h1 className="genere">Genres</h1>
                    {genres.map(each => (
                      <li className="genre-option" key={each.id}>
                        <p>{each.name}</p>
                      </li>
                    ))}
                  </ul>
                  <ul className="listofavailable">
                    <h1 className="availabele">Audio Available</h1>
                    {spokenLanguage.map(each => (
                      <li className="genre-option" key={each.id}>
                        <p>{each.english_name}</p>
                      </li>
                    ))}
                  </ul>
                  <ul className="listofavailable">
                    <h1 className="availabele">Rating Count</h1>
                    <li className="genre-option">
                      <p>{count}</p>
                    </li>
                    <h1 className="availabele">Rating Average</h1>
                    <li className="genre-option">
                      <p>{rating}</p>
                    </li>
                  </ul>
                  <ul className="listofavailable">
                    <h1 className="availabele">Budget</h1>
                    <li className="genre-option">
                      <p>{budget} crores</p>
                    </li>
                    <h1 className="availabele">Release Date</h1>
                    <li className="genre-option">
                      <p>{`${day}${dateEnd} ${dateString.toLocaleString(
                        'default',
                        {
                          month: 'long',
                        },
                      )} ${dateString.getFullYear()}`}</p>
                    </li>
                  </ul>
                </div>
                <h1 className="availabele">More like this</h1>
                <ul className="similar-movies-container">
                  {similarMovieItems.map(each => (
                    <li key={each.id} className="similarmovie">
                      <Link to={`/movies/${each.id}`} target="blank">
                        <img
                          src={each.poster_path}
                          alt={each.title}
                          className="moremovies"
                          onClick={this.changeNewMovieDetails}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          }

          const renderFailureView = () => (
            <div className="failure-view-container">
              <img
                alt="failure view"
                src="https://res.cloudinary.com/dtjcxf7z5/image/upload/v1650297174/Mini%20Project%20Netflix%20Clone/Background-Complete_t8c6zl.png"
              />
              <p className="noresults">
                Something went wrong. Please try again
              </p>

              <button
                className="try-again-button"
                type="button"
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
      </MovieContext.Consumer>
    )
  }
}
export default withRouter(MovieItem)
