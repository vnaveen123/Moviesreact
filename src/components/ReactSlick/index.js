import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const ReactSlick = () => {
  const settings = {
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 1,
  }
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/movies-app/grindhouse-movie-poster.png"
            alt="0"
          />
          <h1>Avathar</h1>
        </div>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/movies-app/clifford-the-big-red-dog-movie-poster.png"
            alt="1"
          />
        </div>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/movies-app/titanic-movie-poster.png"
            alt="2"
          />
        </div>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/movies-app/avatar-theatrical-movie-poster.png"
            alt="3"
          />
        </div>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/movies-app/a-few-good-men-movie-poster.png"
            alt="4"
          />
        </div>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/movies-app/squid-game-south-korean-movie-poster.png"
            alt="5"
          />
        </div>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/movies-app/the-pursuit-of-happyness-movie-poster.png"
            alt="6"
          />
        </div>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/movies-app/king-richard-movie-poster.png"
            alt="7"
          />
        </div>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/movies-app/king-richard-movie-poster.png"
            alt="7"
          />
        </div>
      </Slider>
    </div>
  )
}

export default ReactSlick
