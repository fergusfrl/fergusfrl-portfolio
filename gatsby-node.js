const path = require(`path`)
const slugify = require(`slugify`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPost = path.resolve(`src/templates/blog-template.js`)
  const projectPost = path.resolve(`src/templates/project-template.js`)

  return graphql(
    `
      query loadPagesQuery($limit: Int!) {
        allStrapiBlog(limit: $limit) {
          edges {
            node {
              title
            }
          }
        }
      }
    `,
    { limit: 100 }
  ).then(res => {
    if (res.errors) {
      throw res.errors
    }

    console.log("data", res.data)

    res.data.allStrapiBlog.edges.forEach(edge => {
      const title = edge.node.title
      const slug = slugify(title, {
        lower: true,
        remove: /[/()]/gi,
      })
      createPage({ path: `blog/${slug}`, component: blogPost, context: { title } })
    })
  })
}
