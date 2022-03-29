import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class Search extends Component {
  state = {isLoading: false, searchMovies: [], query: ''}

  componentDidMount() {
    this.getMovies()
  }

  searchInput = value => {
    this.setState({query: value}, this.getMovies)
  }

  getMovies = async () => {
    await this.setState({isLoading: true})
    const {query} = this.state

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${query}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.results.map(each => ({
        posterPath: each.poster_path,
        title: each.title,
        id: each.id,
      }))
      console.log(response)
      console.log(data)
      this.setState({
        searchMovies: updatedData,
        isLoading: false,
      })
    }
  }

  renderSearchPage = () => (
    <div className="search-heading-container">
      <h1 className="search-heading">
        Search the movie,by clicking on the search Icon
      </h1>
    </div>
  )

  renderMoviesList = () => {
    const {searchMovies} = this.state

    return (
      <>
        <div className="popular-movies-list-container">
          <ul className="search-movies-container">
            {searchMovies.map(each => (
              <Link to={`/movies/${each.id}`}>
                <li className="search-item" key={each.id}>
                  <img
                    className="search-poster"
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

  renderLoading = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={60} width={60} />
    </div>
  )

  renderNotfoundMovies = () => {
    const {query} = this.state
    return (
      <div className="search-heading-container">
        <img
          src="https://res.cloudinary.com/dps34f4by/image/upload/v1647330016/Group_7394_xf44nv.png"
          alt="no movies"
          className="search-not-found-image"
        />
        <h1 className="search-not-found-heading">
          Your search for {query} did not find any matches.{' '}
        </h1>
      </div>
    )
  }

  renderSearchList = () => {
    const {searchMovies, isLoading} = this.state
    let result
    if (isLoading) {
      result = this.renderLoading()
    } else {
      result =
        searchMovies.length === 0
          ? this.renderNotfoundMovies()
          : this.renderMoviesList()
    }
    return result
  }

  renderPopularPage = () => {
    const {query} = this.state
    const isFilled = query === ''
    return (
      <div className="home-search-background">
        <Header searchInput={this.searchInput} />
        {isFilled ? this.renderSearchPage() : this.renderSearchList()}
      </div>
    )
  }

  render() {
    return <>{this.renderPopularPage()}</>
  }
}

export default Search
