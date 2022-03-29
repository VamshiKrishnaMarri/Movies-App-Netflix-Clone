import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Slider from 'react-slick'

/* Add css to your project */
import './index.css'

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

class MovieCard extends Component {
  constructor(props) {
    super(props)
    this.state = {moviesList: props.movies}
  }

  renderSlider = () => {
    const {moviesList} = this.state
    return (
      <Slider {...settings}>
        {moviesList.map(each => (
          <Link to={`/movies/${each.id}`}>
            <li testid="MovieCard" className="react-slick-item" key={each.id}>
              <img
                className="poster"
                src={each.posterPath}
                alt={each.originalTitle}
              />
            </li>
          </Link>
        ))}
      </Slider>
    )
  }

  render() {
    return (
      <div className="slick-app-container">
        <div style={{width: '80%'}}>{this.renderSlider()}</div>
      </div>
    )
  }
}

export default withRouter(MovieCard)
