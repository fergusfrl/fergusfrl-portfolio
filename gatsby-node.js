const path = require(`path`)
const slugify = require(`slugify`);
const { ToWords } = require('to-words');

const toWords = new ToWords();

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPost = path.resolve(`src/templates/blog-template.js`)
  const trainingWeekPost = path.resolve(`src/templates/training-week-template.js`)

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

        allStrapiTrainingWeek(limit: $limit) {
          edges {
            node {
              strapiId
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

    console.log("data", res.data);

    // Create routes for Blog
    res.data.allStrapiBlog.edges.forEach(edge => {
      const title = edge.node.title
      const slug = slugify(title, {
        lower: true,
        remove: /[/()]/gi,
      });
      createPage({ path: `blog/${slug}`, component: blogPost, context: { title } });
    });

    // Create routes for Training Week
    res.data.allStrapiTrainingWeek.edges.forEach(edge => {
      const strapiId = edge.node.strapiId;
      const id = slugify(toWords.convert(strapiId - 6), { // TODO: keep in sync with ACTIVITY_WEEK_CORRECTION in ./src/constants
        lower: true,
        remove: /[/()]/gi,
      });
      createPage({ path: `coast-to-coast/week-${id}`, component: trainingWeekPost, context: { strapiId } });
    });
  });
}
