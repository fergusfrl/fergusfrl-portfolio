import React from "react"
import { Link } from "gatsby"
import slugify from "slugify"

const PostNavigation = ({ postType, next, prev }) => {
  return (
    <>
      <div className="navigation-buttons">
        {prev && (
          <Link
            className="nav-link"
            to={`/${postType}/${slugify(prev, {
              lower: true,
              remove: /[/()]/gi,
            })}`}
          >
            ← {prev}
          </Link>
        )}
        <br />
        {next && (
          <Link
            className="nav-link next"
            to={`/${postType}/${slugify(next, {
              lower: true,
              remove: /[/()]/gi,
            })}`}
          >
            {next} →
          </Link>
        )}
      </div>
      <br />
      <br />
      <br />
      <Link className="nav-link all" to={`/${postType}/`}>
        {postType === "blog" ? "All Blogs" : "All Weeks"}
      </Link>
    </>
  )
}

export default PostNavigation
