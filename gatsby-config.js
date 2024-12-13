/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
// module.exports = {
//   // pathPrefix: "/meetanshi-newblog", 
//   siteMetadata: {
//     siteUrl: `https://meetanshiblog.netlify.app/`,
//     title: `My Gatsby WordPress Site`,
//   },
//   plugins: [
//     {
//       resolve: `gatsby-source-wordpress`,
//       options: {
//         url: `https://webguru.dev/graphql`,
//         schema: {
//           timeout: 30000,
//         },
//         develop: {
//           hardCacheMediaFiles: true,
//         },
//         type: {
//           MediaItem: {
//             createFileNodes: false, // Disable file downloads
//           },
//         },
//       },
//     },
//     `gatsby-plugin-image`,
//     `gatsby-plugin-sharp`,
//     `gatsby-transformer-sharp`,
//     "gatsby-plugin-netlify",
//   ],
// };


// module.exports = {
//   siteMetadata: {
//     siteUrl: `https://meetanshiblog.netlify.app/`,
//     title: `My Gatsby WordPress Site`,
//   },
//   plugins: [
//     {
//       resolve: `gatsby-source-wordpress`,
//       options: {
//         url: `https://mitfestival.app/meetanshiblog/graphql`,
//         schema: {
//           timeout: 30000,
//         },
//         develop: {
//           hardCacheMediaFiles: true,
//         },
//       },
//     },
//     `gatsby-plugin-image`,
//     `gatsby-plugin-sharp`,
//     `gatsby-transformer-sharp`,
//     "gatsby-plugin-netlify",
//   ],
//   developMiddleware: (app) => {
//     const proxy = require("http-proxy-middleware");
//     app.use(
//       "/api",
//       proxy({
//         target: "https://mitfestival.app/meetanshiblog",
//         changeOrigin: true,
//       })
//     );
//   },
// };

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = {
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
      resolve: `gatsby-source-wordpress`,
      options: {
        url: `https://mitfestival.app/meetanshiblog/graphql`,
      },
    },
  ],
};