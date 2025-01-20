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
  pathPrefix: "/blog/testwordpress", // Set path prefix for deployment if required
  developMiddleware: app => {
    app.use(
      "/api/", // Proxy API requests during development
      createProxyMiddleware({
        target: "https://mitfestival.app/meetblog/", // Target API URL
        changeOrigin: true, // Enable changing origin header for CORS
      })
    );
  },
  plugins: [
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: `https://blog.meetanshi.com/graphql`, // WordPress GraphQL endpoint
      },
    },
    `gatsby-plugin-image`, // Enables optimized image handling
    `gatsby-plugin-sharp`, // Image processing
    `gatsby-transformer-sharp`, // Image transformation
    `gatsby-plugin-react-helmet`, // Add metadata to HTML head
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`, // Directory for image files
      },
    },
    {
      resolve: `gatsby-plugin-breadcrumb`,
      options: {
        useAutoGen: true, // Automatically generate breadcrumbs
        exclude: [`/404`, `/404.html`], // Exclude specific paths
        crumbLabelUpdates: [
          {
            pathname: "/blog",
            crumbLabel: "Blog", // Custom label for the /blog path
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: "GTM-NPTMT2BT",
        // Optional settings
        includeInDevelopment: false, 
        routeChangeEvent: "page",
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Meetanshi Blog: Magento, Shopify & Marketing`, // Name for the app
        short_name: `Meetanshi Blog`, // Shortened app name
        start_url: `https://meetanshi.com/blog/`, // Start URL of the app
        icon: `static/favicon.ico`, // Path to favicon
      },
    },
  ],
};
