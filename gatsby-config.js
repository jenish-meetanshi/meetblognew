/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */

module.exports = {
  siteMetadata: {
    siteUrl: `https://5d43103688.nxcli.io/`,
    title: `My Gatsby WordPress Site`,
  },
  pathPrefix: `/blog/testwordpress/public`,
  trailingSlash: "always",
  plugins: [
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: `https://5d43103688.nxcli.io/blog/graphql`,
        schema: {
          timeout: 30000,
        },
        develop: {
          hardCacheMediaFiles: true,
        },
        type: {
          MediaItem: {
            excludeFieldNames: ["mediaDetails", "localFile"], // Exclude heavy fields
            excludeByField: (field) => !field.isReferenced,  // Custom logic (optional)
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

