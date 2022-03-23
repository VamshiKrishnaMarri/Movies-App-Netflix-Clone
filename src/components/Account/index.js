import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const Account = props => {
  const username = localStorage.getItem('username')
  const password = localStorage.getItem('password')
  const encrypted = '*'.repeat(password.length)
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="app-container">
      <Header />

      <div className="account-section-container">
        <h1 className="account-heading">Account</h1>
        <hr className="line" />
        <div className="membership-container">
          <p className="membership-heading">Member ship</p>
          <div>
            <p className="username-heading">{username}@gmail.com</p>
            <p className="password-heading">Password:{encrypted}</p>
          </div>
        </div>
        <hr className="line" />
        <div className="membership-container">
          <p className="membership-heading">Plan Details</p>
          <p className="username-heading">Premium</p>
          <p className="ultra-hd">Ultra HD</p>
        </div>
        <hr className="line" />
        <div className="logout-button-container">
          <button
            type="button"
            onClick={onClickLogout}
            className="logout-button"
          >
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Account
