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
  flags: {
    DEV_SSR: true,
    FAST_DEV: true,
  },
  polyfill: false,
  siteMetadata: {
    siteUrl: 'https://5d43103688.nxcli.io/blog/testwordpress',
  },
  pathPrefix: "/blog/testwordpress-new",
  developMiddleware: app => {
    app.use(
      "/api/",
      createProxyMiddleware({
        target: "https://blog.meetanshi.com/",
        changeOrigin: true,
      })
    );
  },
  plugins: [
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: `https://blog.meetanshi.com/graphql`,
        schema: {
          timeout: 3000000,
          perPage: 20,
          requestConcurrency: 5,
        },
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-breadcrumb`,
      options: {
        useAutoGen: true,
        exclude: [`/404/`, `/404.html`],
        crumbLabelUpdates: [
          {
            pathname: "/blog",
            crumbLabel: "Blog",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Meetanshi Blog: Magento, Shopify & Marketing`,
        short_name: `Meetanshi Blog`,
        start_url: `/blog/`,
        icon: `static/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
      },
    },
  ],
};
