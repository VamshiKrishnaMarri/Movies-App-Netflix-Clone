import Loader from 'react-loader-spinner'

import './index.css'

const LoadingView = () => (
  <div className="loader-container" testid="loader">
    <Loader type="TailSpin" height={35} color=" #D81F26" />
  </div>
)

export default LoadingView
