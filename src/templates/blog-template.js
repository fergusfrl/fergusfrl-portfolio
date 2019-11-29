import React from "react"
import { graphql } from "gatsby"
import ReactMarkdown from "react-markdown"

import CodeBlock from "../components/code-block"
import PostNavigation from "../components/post-navigation"

const BlogTemplate = ({
  data: {
    strapiBlog: { title, authored_date, time_to_read, content, prev, next },
  },
}) => {
  return (
    <div className="blog-view">
      <h1>{title}</h1>
      <h5 className="highlight">{`${authored_date} • ${time_to_read} minute read`}</h5>
      <hr />
      <div className="blog-content">
        <ReactMarkdown source={content} renderers={{ code: CodeBlock }} />
      </div>
      <hr />
      <PostNavigation next={next} prev={prev} postType="blog" />
    </div>
  )
}

export default BlogTemplate

export const blogQuery = graphql`
  query BlogPostByPath($slug: String!) {
    strapiBlog(slug: { eq: $slug }) {
      title
      authored_date(formatString: "MMMM DD, YYYY")
      time_to_read
      content
      prev
      next
    }
  }
`
