import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import UserContext from '../../context/UserContext'
import './index.css'

// context is used  here beacause to pass in account detalis of user

class LoginForm extends Component {
  state = {
    showSubmitError: false,
    errorMsg: '',
    showPass: false,
  }

  showPassword = event => {
    this.setState({showPass: event.target.checked})
  }

  render() {
    const {showPass} = this.state
    const typeofpass = showPass ? 'text' : 'password'
    console.log(typeofpass)
    return (
      <UserContext.Consumer>
        {value => {
          const {username, password, onChangeUsername, onChangePassword} = value

          const onaddName = event => {
            onChangeUsername(event)
          }

          const onaddPassword = event => {
            onChangePassword(event)
          }

          const onSubmitSuccess = jwtToken => {
            const {history} = this.props

            Cookies.set('jwt_token', jwtToken, {
              expires: 30,
            })
            history.replace('/')
          }

          const onFailure = errorMsg => {
            this.setState({showSubmitError: true, errorMsg})
          }

          const onSubmitForm = async event => {
            event.preventDefault()

            const userDetails = {username, password}
            const url = 'https://apis.ccbp.in/login'
            const options = {
              method: 'POST',
              body: JSON.stringify(userDetails),
            }
            const response = await fetch(url, options)
            const data = await response.json()
            if (response.ok === true) {
              onSubmitSuccess(data.jwt_token)
            } else {
              onFailure(data.error_msg)
            }
          }

          const renderPasswordField = () => (
            <>
              <label className="input-label" htmlFor="pass">
                PASSWORD
              </label>
              <input
                type="password"
                id="pass"
                className="password-input-field"
                value={password}
                onChange={onaddPassword}
                placeholder="Password"
              />
            </>
          )

          const renderUsernameField = () => (
            <>
              <label className="input-label" htmlFor="username">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                className="username-input-field"
                value={username}
                onChange={onaddName}
                placeholder="Username"
              />
            </>
          )

          const {showSubmitError, errorMsg} = this.state
          const jwtToken = Cookies.get('jwt_token')

          if (jwtToken !== undefined) {
            return <Redirect to="/" />
          }

          return (
            <div className="login-form-container">
              <div>
                <img
                  src="https://res.cloudinary.com/dtjcxf7z5/image/upload/v1650191862/Mini%20Project%20Netflix%20Clone/MoviesIcon_snclt2.png"
                  alt="login website logo"
                />
              </div>

              <form className="form-container" onSubmit={onSubmitForm}>
                <h1 className="login-heading">Login</h1>
                <div className="input-container">{renderUsernameField()}</div>
                <div className="input-container">{renderPasswordField()}</div>
                {showSubmitError && (
                  <p className="error-message">*{errorMsg}</p>
                )}
                <button type="submit" className="login-button">
                  Login
                </button>
                <div className="showpassword">
                  <input
                    id="showpassword"
                    type="checkbox"
                    onChange={this.showPassword}
                  />
                  <label htmlFor="showpassword">Show Password</label>
                </div>
              </form>
            </div>
          )
        }}
      </UserContext.Consumer>
    )
  }
}

export default LoginForm
