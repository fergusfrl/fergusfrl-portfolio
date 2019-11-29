const path = require(`path`)

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
              slug
            }
          }
        }
        allStrapiProject(limit: $limit) {
          edges {
            node {
              slug
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
      const slug = edge.node.slug
      createPage({ path: slug, component: blogPost, context: { slug } })
    })

    res.data.allStrapiProject.edges.forEach(edges => {
      const slug = edges.node.slug
      createPage({ path: slug, component: projectPost, context: { slug } })
    })
  })
}
