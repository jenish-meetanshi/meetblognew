/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = {
  pathPrefix: "/blog/testwordpress", 
  developMiddleware: app => {
    app.use(
      "/api/", // Replace with your API path
      createProxyMiddleware({
        target: "https://5d43103688.nxcli.io/blog/", // Replace with your target API URL
        changeOrigin: true,
      })
    );
  },
  plugins: [
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: `https://5d43103688.nxcli.io/blog/graphql`,
      },
    },
    `gatsby-plugin-image`, 
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`, // Path to your image folder
      },
    },
     {
      resolve: `gatsby-plugin-breadcrumb`,
      options: {
        useAutoGen: true, // Automatically generate breadcrumbs
        exclude: [`/404`, `/404.html`], // Exclude pages from breadcrumbs
        crumbLabelUpdates: [
          {
            pathname: "/blog",
            crumbLabel: "Blog",
          },
        ],
      },
    },
  ],
};
