import {Component} from 'react'
import Cookies from 'js-cookie'

import Header from '../Header'
import LoadingView from '../LoadingView'
import FailureView from '../FailureView'
import TrendingNow from '../TrendingNow'
import Footer from '../Footer'

import './index.css'
import Originals from '../Originals'
import TopRatedMovies from '../TopRatedMovies'

const apiStatusConstants = {
  initial: 'INITIAL',
  failure: 'FAILURE',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    randomObject: {},
  }

  componentDidMount() {
    this.getMoviePoster()
  }

  onClickTryAgain = () => {
    this.getMoviePoster()
  }

  getMoviePoster = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const arrayLength = data.results.length
      const randomItem =
        data.results[Math.floor(Math.random() * (arrayLength - 1))]

      const updatedData = {
        id: randomItem.id,
        backdropPath: randomItem.backdrop_path,
        title: randomItem.title,
        overview: randomItem.overview,
      }
      this.setState({
        randomObject: {...updatedData},
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderSuccessView = () => {
    const {randomObject} = this.state
    const {title, backdropPath, overview} = randomObject

    return (
      <div
        style={{
          backgroundImage: `url(${backdropPath})`,
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        className="home-container"
        alt={title}
      >
        <Header />
        <div className="heading-container">
          <h1 className="home-movie-heading">{title}</h1>
          <p className="overview">{overview}</p>
          <button className="home-button" type="button">
            Play
          </button>
        </div>
        <div>
          <div className="img-bottom-style"> </div>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="detail-loader">
      <LoadingView testid="loader" style={{height: '100vh'}} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <FailureView onClickTryAgain={this.onClickTryAgain} />
    </div>
  )

  renderHome = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-bg-container">
        {this.renderHome()}
        <h1 className="trending-heading">Trending Now</h1>
        <div className="main-container">
          <TrendingNow />
        </div>
        <h1 className="trending-heading">Top Rated</h1>
        <div className="main-container">
          <TopRatedMovies />
        </div>
        <h1 className="trending-heading">Originals</h1>
        <div className="main-container">
          <Originals />
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
