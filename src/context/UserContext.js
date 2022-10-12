import React from 'react'

const UserContext = React.createContext({
  username: '',
  password: '',

  onChangePassword: () => {},
  onChangeUsername: () => {},
  onLogout: () => {},

  triggerSearchChange: () => {},
  darklightTheme: () => {},
})

export default UserContext
