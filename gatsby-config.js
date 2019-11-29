module.exports = {
  siteMetadata: {
    title: `FergusFrl`,
    description: `Fergus Farrell's online blog and project portfolio`,
    author: `Fergus Farrell`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `fergusfrl`,
        short_name: `fergusfrl`,
        start_url: `/`,
        background_color: `#494C4E`,
        theme_color: `#494C4E`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Libre Baskerville`],
        display: "swap",
      },
    },
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: `http://localhost:1337`,
        queryLimit: 100,
        contentTypes: [`blog`, `project`],
      },
    },
  ],
}
