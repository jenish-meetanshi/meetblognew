const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // Fetch all posts with pagination
  const result = await graphql(`
    {
      allWpPost(sort: { date: DESC }) {
        nodes {
          id
          slug
          title
          excerpt
          date(formatString: "MMMM DD, YYYY")
        }
        totalCount
      }
    }
  `);

  const posts = result.data.allWpPost.nodes;
  const postsPerPage = 10; // Adjust the number of posts per page
  const numPages = Math.ceil(posts.length / postsPerPage);

  // Create paginated blog list pages
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/page/${i + 1}`,
      component: path.resolve("./src/templates/blog-list.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });

  // Create individual post detail pages
  posts.forEach((post) => {
    createPage({
      path: `/post/${post.slug}`,
      component: path.resolve("./src/templates/post-detail.js"),
      context: {
        id: post.id,
      },
    });
  });
};
