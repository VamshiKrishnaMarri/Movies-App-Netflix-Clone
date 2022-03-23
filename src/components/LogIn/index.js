import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LogIn extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')

    const {username, password} = this.state
    localStorage.setItem('username', username)
    localStorage.setItem('password', password)
  }

  onSubmitError = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitError(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMsg, showSubmitError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="log-in-app-container">
        <img
          src="https://res.cloudinary.com/dps34f4by/image/upload/v1646985280/Group_7399_1_rs0qmy.png"
          className="logo"
          alt="login website logo"
        />
        <div className="login-container">
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <h1 className="form-heading">Login</h1>
            <div className="input-container">
              <label className="input-label" htmlFor="username">
                USERNAME
              </label>
              <input
                type="text"
                className="input"
                value={username}
                id="username"
                placeholder="Enter Username"
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="input-container">
              <label className="input-label" htmlFor="password">
                PASSWORD
              </label>
              <input
                type="Password"
                className="input"
                value={password}
                id="password"
                placeholder="Enter Password"
                onChange={this.onChangePassword}
              />
            </div>
            {showSubmitError && <p className="error-msg">*{errorMsg}</p>}
            <div className="button-container">
              <button type="submit" className="sign-in-button">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
export default LogIn
