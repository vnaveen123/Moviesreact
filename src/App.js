import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './App.css'
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import UserDetails from './components/UserDetails'
import Popular from './components/Popular'
import MovieItemDetails from './components/MovieItemDetails'
import SearchRoute from './components/Search'

import UserContext from './context/UserContext'

import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

class App extends Component {
  state = {username: '', password: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onLogout = props => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
    this.setState({username: '', password: ''})
  }

  render() {
    const {username, password} = this.state

    return (
      <UserContext.Provider
        value={{
          username,
          password,
          onChangeUsername: this.onChangeUsername,
          onChangePassword: this.onChangePassword,
          onLogout: this.onLogout,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/account" component={UserDetails} />
          <ProtectedRoute exact path="/popular" component={Popular} />
          <ProtectedRoute exact path="/search" component={SearchRoute} />
          <ProtectedRoute
            exact
            path="/movies/:id"
            component={MovieItemDetails}
          />

          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </UserContext.Provider>
    )
  }
}

export default App
