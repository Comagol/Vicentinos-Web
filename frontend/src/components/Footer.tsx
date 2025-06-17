import { Link } from "react-router-dom";
import Logo from '../assets/logo.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
import './Footer.css';

const Footer = () => {
  return (
    <div className="footerContainer">
      <Link to="/" className="footerLeft">
        <img src={Logo} alt="logo" />
      </Link>
      <div className="footerCenter">
        <p>Copyright 2025 Club Vicentinos</p>
        <p>Todos los derechos reservados</p>
      </div>
      <div className="footerLinks">
        <a href="https://www.instagram.com/clubvicentinos/?hl=es" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="https://www.facebook.com/clubvicentinos/?locale=es_LA" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
      </div>
    </div>
  );
};

export default Footer;