require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `FergusFrl`,
    description: `Fergus Farrell's online blog and project portfolio`,
    author: `Fergus Farrell`,
    siteUrl: `https://fergusfrl.com`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-scroll-reveal`,
      options: {
        once: true,
      },
    },
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
        apiURL: process.env.STRAPI_URL,
        queryLimit: 100,
        contentTypes: [`blog`, `training-week`, `tag`],
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/`, `/blog`, `/projects`, `/blog/*`, `/projects/*`],
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: `https://fergusfrl.com`,
        sitemap: `https://fergusfrl.com/sitemap.xml`,
      }
    },
    `gatsby-plugin-react-leaflet`,
  ],
}
