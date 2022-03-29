import {Component} from 'react'
import Cookies from 'js-cookie'
import FailureView from '../FailureView'
import LoadingView from '../LoadingView'
import MovieCard from '../MovieCard'

const apiStatusConstants = {
  initial: 'INITIAL',
  failure: 'FAILURE',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class Originals extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    originalsData: [],
  }

  componentDidMount() {
    this.getOriginalsMovies()
  }

  onClickTryAgain = () => {
    this.getOriginalsMovies()
  }

  getOriginalsMovies = async () => {
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
      const updatedData = data.results.map(each => ({
        id: each.id,
        posterPath: each.poster_path,
        title: each.title,
      }))
      this.setState({
        originalsData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => (
    <FailureView onClickTryAgain={this.onClickTryAgain} />
  )

  renderLoadingView = () => <LoadingView />

  renderSuccessView = () => {
    const {originalsData} = this.state
    return <MovieCard movies={originalsData} />
  }

  renderOriginals = () => {
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
      <div className="trending-now-container">{this.renderOriginals()}</div>
    )
  }
}

export default Originals
