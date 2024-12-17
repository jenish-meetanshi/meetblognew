const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = {
  pathPrefix: "/blog/testwordpress/public", // Set your path prefix if needed
  developMiddleware: app => {
    app.use(
      "/api/", // API path to be proxied
      createProxyMiddleware({
        target: "https://mitfestival.app/meetanshiblog/", // Target WordPress site
        changeOrigin: true,
      })
    );
  },
  plugins: [
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: `https://mitfestival.app/meetanshiblog/graphql`, // GraphQL endpoint
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
  ],
};
