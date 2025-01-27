const fs = require('fs')
const path = require("path");

// Add schema customization for reading time
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = `
    type WpPost implements Node {
      reading_time: Int
    }
  `;
  createTypes(typeDefs);
};

// Add resolver for reading time calculation
exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    WpPost: {
      reading_time: {
        type: "Int",
        resolve: (source) => {
          // Get content and title
          const content = source.content || "";
          const title = source.title || "";
          
          // Strip HTML tags from content
          const strippedContent = content.replace(/<[^>]*>/g, "");
          
          // Count words (split by whitespace and filter empty strings)
          const words = `${title} ${strippedContent}`
            .split(/\s+/)
            .filter(word => word.length > 0);
          
          // Calculate reading time (238 words per minute)
          const wordsPerMinute = 238;
          const wordCount = words.length;
          
          // Count images (each image adds 12 seconds)
          const imageCount = (content.match(/<img/g) || []).length;
          const imageTime = Math.ceil(imageCount * 12 / 60);
          
          // Calculate total reading time
          const readingTime = Math.ceil(wordCount / wordsPerMinute) + imageTime;
          
          // Ensure minimum of 1 minute
          return Math.max(1, readingTime);
        },
      },
    },
  });
};

// Your existing createPages function
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  // Fetch posts
  const result = await graphql(`
    {
      allWpPost(sort: { date: DESC }) {
        nodes {
          id
          title
          slug
          uri
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


   createPage({
    path: `/sitemap/`,
    component: path.resolve("./src/templates/sitemap.js"),
    context: {
      posts,
    },
  });


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
  
  // Create individual post pages
  posts.forEach((post) => {
    createPage({
      path: `/${post.slug}`,
      component: path.resolve("./src/templates/post-detail.js"),
      context: {
        id: post.id,
      },
    });
  });

  // Create author pages with pagination
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


exports.onPostBuild = ({ graphql }) => {
  graphql(`
    {
      allSitePage {
        edges {
          node {
            path
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      console.log(result.errors);
      return;
    }

    // Construct the sitemap index XML content
    const sitemapIndexXml = `
      <?xml version="1.0" encoding="UTF-8"?>
      <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <sitemap>
          <loc>${process.env.GATSBY_SITE_URL}/sitemap.xml</loc>
        </sitemap>
        <sitemap>
          <loc>${process.env.GATSBY_SITE_URL}/sitemap-posts.xml</loc>
        </sitemap>
        <!-- Add additional sitemaps here as needed -->
      </sitemapindex>
    `;

    // Resolve the path to the public directory and write the sitemap index
    const sitemapIndexPath = path.resolve('public/sitemap_index.xml');
    fs.writeFileSync(sitemapIndexPath, sitemapIndexXml);
  });
};
