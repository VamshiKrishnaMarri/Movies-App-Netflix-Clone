import {Component} from 'react'
import {Link} from 'react-router-dom'
// import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import MovieInfo from '../MovieInfo'
import LoadingView from '../LoadingView'
import FailureView from '../FailureView'

import Footer from '../Footer'

import './index.css'
// import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  failure: 'FAILURE',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class MovieDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    movieDetails: [],
    similarMovies: [],
    genres: [],
    spokenLanguages: [],
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  onClickTryAgain = () => {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = [data.movie_details].map(each => ({
        // data.movie_details.genres
        // data.movie_details.similar_movies
        //  data.movie_details.spoken_languages
        id: each.id,
        backdropPath: each.backdrop_path,
        budget: each.budget,
        title: each.title,
        overview: each.overview,
        originalLanguage: each.original_language,
        releaseDate: each.release_date,
        count: each.vote_count,
        rating: each.vote_average,
        runtime: each.runtime,
        posterPath: each.poster_path,
      }))
      const updatedSimilarData = data.movie_details.similar_movies.map(
        each => ({
          id: each.id,
          posterPath: each.poster_path,
          title: each.title,
        }),
      )
      const genresData = data.movie_details.genres.map(each => ({
        id: each.id,
        name: each.name,
      }))
      const languagesData = data.movie_details.spoken_languages.map(each => ({
        id: each.id,
        language: each.english_name,
      }))

      this.setState({
        movieDetails: updatedData,
        genres: genresData,
        spokenLanguages: languagesData,
        similarMovies: updatedSimilarData.slice(0, 6),
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => (
    <div className="detail-loader">
      <FailureView onClickTryAgain={this.onClickTryAgain} />
    </div>
  )

  renderLoadingView = () => (
    <div className="detail-loader">
      <LoadingView style={{height: '100vh'}} />
    </div>
  )

  renderSuccessView = () => {
    const {movieDetails, similarMovies, genres, spokenLanguages} = this.state

    return (
      <>
        <div>
          {movieDetails.map(each => (
            <MovieInfo movieInfoDetails={each} key={each.id} />
          ))}
          <div className="genre-container">
            <ul className="ul-item">
              <li className="genre-heading">Genres</li>
              {genres.map(eachGenre => (
                <li className="genre-option" key={eachGenre.id}>
                  {eachGenre.name}
                </li>
              ))}
            </ul>
            <ul>
              <li className="genre-heading">Available Audio</li>
              {spokenLanguages.map(eachLanguage => (
                <li className="genre-option" key={eachLanguage.id}>
                  {eachLanguage.language}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="similar-container">
          <h1 className="more-heading">More Like This</h1>
          <ul className="popular-container">
            {similarMovies.map(each => (
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

  renderMovies = () => {
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
        {this.renderMovies()}
        <Footer />
      </div>
    )
  }
}

export default MovieDetails
