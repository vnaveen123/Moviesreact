import './index.css'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

const Footer = () => (
  <>
    <div className="buttoncontainer">
      <button type="button" className="button">
        <FaGoogle />
      </button>
      <button type="button" className="button">
        <FaTwitter />
      </button>
      <button type="button" className="button">
        <FaInstagram />
      </button>
      <button type="button" className="button">
        <FaYoutube />
      </button>
      <br />
    </div>
    <p className="contactus">Contact us</p>
  </>
)

export default Footer
