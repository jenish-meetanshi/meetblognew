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


module.exports = {
  siteMetadata: {
    siteUrl: `https://5d43103688.nxcli.io/`,
    pathPrefix: "/blog/testwordpress/public"
    title: `My Gatsby WordPress Site`,
  },
  plugins: [
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: `https://mitfestival.app/meetanshiblog/graphql`,
        schema: {
          timeout: 30000,
        },
        develop: {
          hardCacheMediaFiles: true,
        },
        type: {
          MediaItem: {
            createFileNodes: false, // Disable file downloads
          },
          User: {
            // Fetch ACF fields for User type
            excludeFieldNames: [],
          },
        },
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    "gatsby-plugin-netlify",
  ],
};
