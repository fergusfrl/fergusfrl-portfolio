import { Link } from "gatsby"
import React from "react"
import PropTypes from "prop-types"

const LINKS = [
  { label: "Home", to: "/" },
  { label: "Blog", to: "/blog/" },
  // { label: "Projects", to: "/projects/" }, TODO: add project back in
]

const Header = ({ toggleDarkMode }) => (
  <header>
    <h5 className="logo" onClick={toggleDarkMode}>
      FF
    </h5>
    <div className="links">
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
