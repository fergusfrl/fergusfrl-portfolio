import { Link } from "gatsby"
import React from "react"
import PropTypes from "prop-types"
import Switch from "./switch"

const LINKS = [
  { label: "About", to: "/" },
  { label: "Blog", to: "/blog/" },
  // { label: "Projects", to: "/projects/" }, TODO: add project back in
]

const Header = ({ toggleDarkMode }) => (
  <header>
    <Link className="logo-link" to="/">
      <h5 className="logo">
        <div className="logo-text">FF</div>
      </h5>
    </Link>
    <div className="links">
      <Switch action={toggleDarkMode} />
      {LINKS.map(link => (
        <Link to={link.to} className="link" key={link.label.toLowerCase()}>
          {link.label}
        </Link>
      ))}
    </div>
  </header>
)

Header.defaultProps = {
  toggleDarkMode: null,
}

Header.propTypes = {
  toggleDarkMode: PropTypes.func,
}

export default Header
