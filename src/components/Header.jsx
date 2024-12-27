import "./Header.css"
import { Link } from "react-router-dom"
import nav from "../data/NavLink"

const Header = () => {
  return <header>
    <nav className="navigation">
      <ul className="nav-menu">
        {nav.map((link) => {
          const { id, path, text } = link
          return <li key={id} className="nav-link">
            <Link to={path}>{text}</Link>
          </li>
        })}
      </ul>
    </nav>
  </header>
}

export default Header