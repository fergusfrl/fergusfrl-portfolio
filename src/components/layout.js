import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from "./footer"

const Layout = ({ children }) => {
  const [darkMode, setDarkMode] = React.useState(false)

  /* UNCOMMENT TO ENABLE AUTO DARK MODE */
  // const checkDarkMode =
  //   typeof window !== "undefined" &&
  //   window.matchMedia &&
  //   window.matchMedia("(prefers-color-scheme: dark)").matches

  // React.useEffect(() => {
  //   setDarkMode(checkDarkMode)
  // }, [checkDarkMode])

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev)
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div className="content">
        <Header
          siteTitle={data.site.siteMetadata.title}
          toggleDarkMode={toggleDarkMode}
        />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
