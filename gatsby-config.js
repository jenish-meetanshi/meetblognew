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
  pathPrefix: "/blog/testwordpress/public", 
  developMiddleware: app => {
    app.use(
      "/api/", // Replace with your API path
      createProxyMiddleware({
        target: "https://mitfestival.app/meetanshiblog/", // Replace with your target API URL
        changeOrigin: true,
      })
    );
  },
  plugins: [
    {
      resolve: gatsby-source-wordpress,
      options: {
        url: https://mitfestival.app/meetanshiblog/graphql,
      },
    },
  ],
};
