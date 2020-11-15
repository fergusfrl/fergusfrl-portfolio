import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import slugify from "slugify"

import SEO from "../components/seo"
import Hero from "../components/hero"

const BlogPage = () => {
  const blogs = useStaticQuery(graphql`
    {
      allStrapiBlog(sort: { order: DESC, fields: authored_date }) {
        nodes {
          id
          title
          blurb
          authored_date(formatString: "MMMM DD, YYYY")
          time_to_read
          tags {
            label
          }
        }
      }
    }
  `)

  return (
    <>
      <SEO title="Blog" />
      <Hero
        text="The Blog: thoughts on life, work and everything in between"
        highlights={["The Blog"]}
      />
      <hr />
      <div className="posts reading-view">
        {
          blogs.allStrapiBlog.nodes
            .map(blog => (
              <Link
                to={slugify(blog.title, {
                  lower: true,
                  remove: /[/()]/gi,
                })}
                className="blog"
                key={blog.id}
              >
                {/* {
                  blog.banner && (
                    <div className="blog-banner">
                      <Img
                        className="image"
                        fluid={blog.banner.childImageSharp.fluid}
                        alt="Blog banner"
                      />
                    </div>
                  )
                } */}
                <h2 className="blog-title">{blog.title}</h2>
                <h5 className="blog-subtitle">
                  {blog.authored_date} • {blog.time_to_read} minute read
                </h5>
                <h4 className="blurb">{blog.blurb}</h4>
                <div className="tags">
                  {blog.tags.map(tag => (
                    <p className="tag">{tag.label}</p>
                  ))}
                </div>
              </Link>
          ))
        }
      </div>
    </>
  )
}

export default BlogPage
