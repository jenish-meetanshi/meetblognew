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
        target: "https://mitfestival.app/meetblog/", // Replace with your target API URL
        changeOrigin: true,
      })
    );
  },
  plugins: [
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: `https://blog.meetanshi.com/graphql`,
      },
      protocol: 'https',
        useACF: true,
        https: {
          rejectUnauthorized: false, // Disable SSL verification (only for testing)
        },
    },
    `gatsby-plugin-image`, 
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
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
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: 'GTM-NPTMT2BT', // Replace this with your GTM container ID

        // Optional settings
        includeInDevelopment: false, // Set to true to include in development
        routeChangeEvent: 'page', // Optional, for SPA or other use cases
      },
    },
  ],
};
