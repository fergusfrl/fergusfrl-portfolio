import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import SEO from "../components/seo"
import Hero from "../components/hero"

const IndexPage = ({ data }) => {
  return (
    <>
      <SEO title="About" />
      <Hero
        text="Hello, I’m Fergus Farrell. I’m a Software Developer living in Christchurch, NZ."
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
        I work at{" "}
        <a
          href="https://www.batch.nz/"
          target="_blank"
          rel="noopener noreferrer"
          className="highlight"
        >
          Batch
        </a>{" "}
        where we dream up, design and develop websites, web apps and online stores. In the weekends I'm a whitewater
        kayaker, mountain biker and outdoor adventurer.
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
        fluid(maxWidth: 1000, maxHeight: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
