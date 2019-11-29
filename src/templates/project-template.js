import React from "react"
import ReactMarkdown from "react-markdown"

import CodeBlock from "../components/code-block"
import PostNavigation from "../components/post-navigation"

const ProjectTemplate = ({
  data: {
    strapiProject: {
      title,
      from_date,
      to_date,
      to_present,
      content,
      prev,
      next,
      tags,
    },
  },
}) => {
  return (
    <div className="blog-view">
      <h1>{title}</h1>
      <h5 className="highlight">
        {`${from_date} - ${to_present ? "present" : to_date}`}
      </h5>
      <div className="tags">
        {tags.map(tag => (
          <p className="tag">{tag.label}</p>
        ))}
      </div>
      <hr />
      <div className="blog-content">
        <ReactMarkdown source={content} renderers={{ code: CodeBlock }} />
      </div>
      <hr />
      <PostNavigation next={next} prev={prev} postType="projects" />
    </div>
  )
}

export default ProjectTemplate

export const projectQuery = graphql`
  query ProjectPostByPath($slug: String!) {
    strapiProject(slug: { eq: $slug }) {
      title
      from_date(formatString: "MMMM DD, YYYY")
      to_date(formatString: "MMMM DD, YYYY")
      to_present
      content
      prev
      next
      tags {
        label
      }
    }
  }
`
