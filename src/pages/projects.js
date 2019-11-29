import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import SEO from "../components/seo"
import Hero from "../components/hero"

const ProjectsPage = () => {
  const projects = useStaticQuery(graphql`
    {
      allStrapiProject(sort: { order: DESC, fields: to_date }) {
        nodes {
          id
          title
          blurb
          slug
          from_date(formatString: "MMMM DD, YYYY")
          to_date(formatString: "MMMM DD, YYYY")
          to_present
          tags {
            label
          }
        }
      }
    }
  `)

  return (
    <>
      <SEO title="Projects" />
      <Hero
        text="Recent Projects I've worked on to solve problems and make peoples lives better"
        highlights={["Recent Projects"]}
      />
      <hr />
      <div className="posts reading-view">
        {projects.allStrapiProject.nodes.map(project => (
          <>
            <Link className="project" to={project.slug} key={project.id}>
              <div>
                <h2 className="project-title">{project.title}</h2>
                <h5 className="blog-subtitle">
                  {project.from_date} -{" "}
                  {project.to_present ? "Present" : project.to_date}
                </h5>
                <div className="tags">
                  {project.tags.map(tag => (
                    <p className="tag">{tag.label}</p>
                  ))}
                </div>
                <h4 className="project-blurb">{project.blurb}</h4>
              </div>
            </Link>
          </>
        ))}
      </div>
    </>
  )
}

export default ProjectsPage
