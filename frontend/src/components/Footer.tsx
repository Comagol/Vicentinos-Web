import { Link } from "react-router-dom"
import Logo from '../assets/logo.jpg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import './Footer.css'


const Footer = () => {
  return (
    <div className="footerContainer">
        <Link to="/">
            <img src={Logo} alt="logo" />
        </Link>
        <div className="footerLinks">
            <Link to="https://www.instagram.com/clubvicentinos/?hl=es" target="_blank">
                <FontAwesomeIcon icon={faInstagram} />
            </Link>
        </div>
    </div>
  )
}

export default Footer