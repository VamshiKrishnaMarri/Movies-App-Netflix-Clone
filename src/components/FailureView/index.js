import './index.css'

const FailureView = props => {
  const {onClickTryAgain} = props

  return (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dps34f4by/image/upload/v1647500780/alert-triangle_yp7fwc.png"
        alt="failure"
        height={35}
      />
      <p className="failure-heading">Something went wrong, Please try again.</p>
      <button
        type="button"
        className="failure-button"
        onClick={onClickTryAgain}
      >
        Try Again
      </button>
    </div>
  )
}

export default FailureView
