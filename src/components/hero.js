import React from "react"
import PropTypes from "prop-types"

const Hero = ({ text, highlights }) => {
  const renderHighlightedText = () => {
    var finalText = text
    highlights.forEach(highlight => {
      finalText = finalText.replace(
        highlight,
        `<span class="highlight">${highlight}</span>`
      )
    })
    return finalText
  }

  return (
    <h1
      className="reading-view hero"
      dangerouslySetInnerHTML={{ __html: renderHighlightedText() }}
    ></h1>
  )
}

Hero.defaultProps = {
  text: "",
  highlights: [],
}

Hero.propTypes = {
  text: PropTypes.string,
  highlights: PropTypes.arrayOf(PropTypes.string),
}

export default Hero
