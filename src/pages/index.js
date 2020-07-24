import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import SEO from "../components/seo"
import Hero from "../components/hero"

const IndexPage = ({ data }) => {
  return (
    <>
      <SEO title="Home" />
      <Hero
        text="Hello, I’m Fergus Farrell. I’m a
      Software Developer living in Christchurch, NZ."
        highlights={["Fergus Farrell"]}
      />
      <div className="image-container">
        <Img
          className="image"
          fluid={data.image.childImageSharp.fluid}
          alt="photo of Fergus"
        />
      </div>
      <p className="reading-view about">
        I am a full stack web developer with a passion for simple, clean design.
        <span className="highlight"> Simplicity is elegance.</span>
        <br />
        Currently, I am working at{" "}
        <a
          href="https://comrad.co.nz/"
          target="_blank"
          rel="noopener noreferrer"
          className="highlight"
        >
          Comrad Medical Systems
        </a>{" "}
        to optimise patient flow for efficiency and effectiveness. In the weekends I'm a whitewater
        kayaker, skier and outdoor adventurer.
      </p>
      <p className="reading-view">
        I'm also technology tickerer. At home, using new software tools and
        practices to develop fun and useful applications is where you'll find me
        on a cold Canterbury evening.
        <br />
        If you're eager to learn more abut me and my projects, message me on{" "}
        <a
          href="https://www.linkedin.com/in/fergusfrl/"
          target="_blank"
          rel="noopener noreferrer"
          className="highlight"
        >
          LinkedIn
        </a>{" "}
        and let's go for a coffee.
      </p>
    </>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    image: file(relativePath: { eq: "profile.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1000, maxHeight: 350) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
