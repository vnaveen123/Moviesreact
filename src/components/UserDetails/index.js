import UserContext from '../../context/UserContext'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const UserDetails = props => (
  <UserContext.Consumer>
    {value => {
      const {username, password, onLogout} = value

      const onLogoutapp = () => {
        onLogout(props)
      }
      const lenthofpassword = password.length

      const maskedpassword = '*' * lenthofpassword
      console.log(maskedpassword)

      return (
        <>
          <div className="userdetails">
            <Header />
            <div className="account-container-2">
              <h1>
                Account
                <hr />
              </h1>

              <div className="account-element">
                <p className="header-element">Member ship</p>
                <div>
                  <p>{username}@gmail.com</p>
                  <p>{`Password: ${maskedpassword}`} </p>
                </div>
              </div>
              <hr />

              <div className="account-element">
                <p className="plandetails">Plan Details</p>
                <div>
                  <p>Premium</p>
                  <p className="typeofaccount">Ultra HD</p>
                </div>
              </div>
              <button
                type="button"
                className="headerbutton"
                onClick={onLogoutapp}
              >
                Logout
              </button>
            </div>

            <Footer />
          </div>
        </>
      )
    }}
  </UserContext.Consumer>
)
export default UserDetails
