import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import slugify from "slugify";

import SEO from "../components/seo";
import Hero from "../components/hero";
import Subscribe from "../components/subscribe";

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
  `);

  return (
    <>
      <SEO title="Blog" />
      <Hero
        text="The Blog: technical guides, interesting projects and some fun things I've learned"
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
                <h2 className="blog-title">{blog.title}</h2>
                <h5 className="blog-subtitle">
                  {blog.authored_date} • {blog.time_to_read} minute read
                </h5>
                <h4 className="blurb">{blog.blurb}</h4>
                <div className="tags">
                  {blog.tags.sort().map(tag => (
                    <p className="tag">{tag.label}</p>
                  ))}
                </div>
              </Link>
          ))
        }
        <Subscribe />
      </div>
    </>
  )
}

export default BlogPage
