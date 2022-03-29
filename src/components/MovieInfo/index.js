import Header from '../Header'
import './index.css'

const MovieInfo = props => {
  const {movieInfoDetails} = props
  const {
    title,
    adult,
    backdropPath,
    runtime,
    count,
    budget,
    rating,
    releaseDate,
    overview,
  } = movieInfoDetails

  const hours = Math.floor(runtime / 60)
  const minutes = runtime % 60
  const date = new Date(releaseDate)
  let dateEnd
  const day = date.getDay().toString()
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
    <div className="movie-detail-container">
      <div
        style={{
          backgroundImage: `url(${backdropPath})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }}
        className="movie-details-top-container"
      >
        <Header />
        <div className="heading-container">
          <h1 className="home-movie-heading">{title}</h1>
          <p className="time-container">
            <span className="hours">{`${hours}H ${minutes}M`}</span>
            <span className="adult">{adult ? 'A' : 'U/A'}</span>
            <span className="hours">{date.getFullYear()}</span>
          </p>
          <p className="overview">{overview}</p>
          <button type="button" className="home-button">
            Play
          </button>
        </div>
      </div>
      <div className="genre-container">
        <ul className="ul-item">
          <li className="genre-heading">Rating Count</li>
          <li className="genre-option">{count}</li>
          <li className="genre-heading">Rating Average</li>
          <li className="genre-option">{rating}</li>
        </ul>
        <ul className="ul-item">
          <li className="genre-heading">Budget</li>
          <li className="genre-option">{budget}</li>
          <li className="genre-heading">Release Date</li>
          <li className="genre-option">{`${day}${dateEnd} ${date.toLocaleString(
            'default',
            {month: 'long'},
          )} ${date.getFullYear()}`}</li>
        </ul>
      </div>
    </div>
  )
}

export default MovieInfo
