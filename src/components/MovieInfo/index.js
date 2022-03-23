import './index.css'

const MovieInfo = props => {
  const {movieInfoDetails} = props
  const {
    title,
    adult,
    backdropPath,
    runtime,
    releaseDate,
    overview,
    genres,
    count,
    rating,
    budget,
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
          height: '100%',
          width: '100%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
        className="movie-details-top-container"
      >
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
        <ul>
          <li className="genre-heading">Genres</li>
          {genres.map(each => (
            <li className="genre-option" key={each.id}>
              {each.name}
            </li>
          ))}
        </ul>
        <ul>
          <li className="genre-heading">Available Audio</li>
          <li className="genre-option">English</li>
          <li className="genre-option">Hindi</li>
          <li className="genre-option">Telugu</li>
        </ul>
        <ul>
          <li className="genre-heading">Rating Count</li>
          <li className="genre-option">{count}</li>
          <li className="genre-heading">Rating Average</li>
          <li className="genre-option">{rating}</li>
        </ul>
        <ul>
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
