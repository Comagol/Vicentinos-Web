import { Link } from "react-router-dom"
import Logo from '../../public/images/logo.jpg'

const Navbar = () => {
  return (
    <nav>
        <Link to="/">
            <img src={Logo} alt="logo" />
        </Link>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/payment-status">Estado de pago</Link>
                </li>
                <li>
                    <Link to="/member-card">Carnet de Socio</Link>
                </li>
                <li>
                    <Link to="/news">Noticias</Link>
                </li>
            </ul>
    </nav>
  )
}

export default Navbar