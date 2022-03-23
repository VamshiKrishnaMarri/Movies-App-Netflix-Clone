import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="contact-us-container">
    <div className="contact-icons-container">
      <button type="button" className="icon-button" testid="searchButton">
        <FaGoogle className="contact-icon" />
      </button>
      <button type="button" className="icon-button" testid="searchButton">
        <FaTwitter className="contact-icon" />
      </button>
      <button type="button" className="icon-button" testid="searchButton">
        <FaInstagram className="contact-icon" />
      </button>
      <button type="button" className="icon-button" testid="searchButton">
        <FaYoutube className="contact-icon" />
      </button>
    </div>
    <p className="contact-heading">Contact us</p>
  </div>
)
export default Footer
