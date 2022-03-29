import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
}

class Popular extends Component {
  state = {
    apiStatus: apiStatusConstants.failure,
    popularMovies: [],
  }

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/movies-app/popular-movies'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.results.map(each => ({
        posterPath: each.poster_path,
        backdropPath: each.backdrop_path,
        id: each.id,
        overview: each.overview,
        title: each.title,
      }))
      console.log(data)
      console.log(response)
      this.setState({
        apiStatus: apiStatusConstants.success,
        popularMovies: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" height={40} color="#d81f26" />
    </div>
  )

  onClickTryAgain = () => {
    this.getPopularMovies()
  }

  renderFailureView = () => (
    <div className="failure-bg-container">
      <div className="failure-view">
        <img
          src="https://res.cloudinary.com/dps34f4by/image/upload/v1647168025/Background-Complete_bn4zsr.png"
          alt="failure view"
          className="failure-image"
        />
        <p className="failure-heading">
          Something went wrong. Please try again
        </p>
        <button
          type="button"
          className="failure-button"
          onClick={this.onClickTryAgain}
        >
          Try Again
        </button>
      </div>
    </div>
  )

  renderSuccessView = () => {
    const {popularMovies} = this.state
    return (
      <>
        <div className="popular-movies-list-container">
          <ul className="popular-container">
            {popularMovies.map(each => (
              <Link to={`/movies/${each.id}`}>
                <li className="popular-item" key={each.id}>
                  <img
                    className="popular-poster"
                    src={each.posterPath}
                    alt={each.title}
                  />
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderPopularMoviesView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <Header />
        <h1 className="trending-heading">Explore the Popular Movies Here</h1>
        {this.renderPopularMoviesView()}
        <div style={{alignSelf: 'flex-end'}}>
          <Footer />
        </div>
      </div>
    )
  }
}

export default Popular
