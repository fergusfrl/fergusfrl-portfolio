import React, { useState } from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import slugify from "slugify";

import SEO from "../components/seo";
import Hero from "../components/hero";
import Subscribe from "../components/subscribe";
import FilterChip from "../components/filter-chip";

const BlogPage = () => {
  const [filters, setFilters] = useState([]);

  const handleFilter = ({ operation, value }) => {
    if (operation === 'add') {
      setFilters([...filters, value])
    }

    if (operation === 'remove') {
      setFilters(filters.filter(item => item !== value))
    }
  }

  const data = useStaticQuery(graphql`
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

      allStrapiTag(sort: {fields: label, order: ASC}) {
        nodes {
          label
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
      <div className="blog-filter">
        { data.allStrapiTag.nodes.map(tag => <FilterChip key={tag.label} label={tag.label} handleFilter={handleFilter} />) }
      </div>
      <div className="posts reading-view">
        {
          data.allStrapiBlog.nodes
            .filter(blog => {
              if (filters.length === 0) return true;
              return blog.tags.some(tag => filters.includes(tag.label));
            })
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
                    <p key={`${blog.id}-${tag.label}`} className="tag">{tag.label}</p>
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
