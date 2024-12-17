const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // Fetch posts, categories, authors, etc.
  const result = await graphql(`
    {
      allWpPost(sort: { date: DESC }) {
        nodes {
          id
          slug
          title
          excerpt
          categories {
            nodes {
              slug
              name
            }
          }
          author {
            node {
              slug
            }
          }
        }
      }
      allWpCategory {
        nodes {
          id
          slug
          name
        }
      }
      allWpUser {
        nodes {
          id
          slug
          name
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  const posts = result.data.allWpPost.nodes;
  const categories = result.data.allWpCategory.nodes;
  const authors = result.data.allWpUser.nodes;
  const postsPerPage = 10;
  const numPages = Math.ceil(posts.length / postsPerPage);

  // Create homepage and paginated versions
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/page/${i + 1}`,
      component: path.resolve("./src/templates/index.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });

  // Create search page (newly added)
  createPage({
    path: "/search",
    component: path.resolve("./src/templates/search-page.js"), // The template for displaying search results
    context: {
      posts, // Pass all posts to the search page template
    },
  });

  // Create category and author pages with pagination
  categories.forEach(category => {
    const categoryPosts = posts.filter(post =>
      post.categories.nodes.some(cat => cat.slug === category.slug)
    );

    const numPages = Math.ceil(categoryPosts.length / postsPerPage);

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/category/${category.slug}/` : `/category/${category.slug}/${i + 1}`,
        component: path.resolve("./src/templates/category-detail.js"),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          categorySlug: category.slug,
          categoryName: category.name,
          numPages,
          currentPage: i + 1,
        },
      });
    });
  });

  authors.forEach(author => {
    const authorPosts = posts.filter(post =>
      post.author.node.slug === author.slug
    );

    const numPages = Math.ceil(authorPosts.length / postsPerPage);

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/author/${author.slug}/` : `/author/${author.slug}/${i + 1}`,
        component: path.resolve("./src/templates/author-detail.js"),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          authorSlug: author.slug,
          currentPage: i + 1,
          numPages,
        },
      });
    });
  });
};
