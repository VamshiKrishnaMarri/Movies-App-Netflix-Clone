import './index.css'

const NotFound = props => {
  const goToHome = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="not-found-app-container" alt="not found">
      <div className="not-found-container">
        <h1 className="not-found-heading">Lost Your Way ?</h1>
        <p className="not-found-description">
          we are sorry, the page you requested could not be found Please go back
          to the homepage.
        </p>
        <button className="not-found-button" type="button" onClick={goToHome}>
          Go To Home
        </button>
      </div>
    </div>
  )
}

export default NotFound
