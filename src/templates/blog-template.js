import React from "react"
import { graphql } from "gatsby"
import ReactMarkdown from "react-markdown"

import SEO from "../components/seo"
import CodeBlock from "../components/code-block"
import PostNavigation from "../components/post-navigation"
import Subscribe from "../components/subscribe"

const BlogTemplate = ({
  data: {
    strapiBlog: { title, authored_date, time_to_read, content, prev, next },
  },
}) => {
return (
    <>
      <SEO title={title} />
      <div className="blog-view">
        <h1>{title}</h1>
        <h5 className="highlight">{`${authored_date} • ${time_to_read} minute read`}</h5>
        <hr />
        <div className="blog-content">
          <ReactMarkdown
            source={content}
            renderers={{
              code: CodeBlock
            }}
            transformImageUri={uri =>
              uri.startsWith("http")
                ? uri
                : `${process.env.IMAGE_BASE_URL}${uri}`
            }
          />
          <Subscribe />
        </div>
        <hr />
        <PostNavigation
          next={next ? next.title : null}
          prev={prev ? prev.title : null}
          postType="blog"
        />
      </div>
    </>
  )
}

export default BlogTemplate

export const blogQuery = graphql`
  query BlogPostByPath($title: String!) {
    strapiBlog(title: { eq: $title }) {
      title
      authored_date(formatString: "MMMM DD, YYYY")
      time_to_read
      content
      next {
        title
      }
      prev {
        title
      }
    }
  }
`
