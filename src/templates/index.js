import React from "react";
import { graphql, Link } from "gatsby";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

const Home = ({ data, pageContext }) => {
  const posts = data?.allWpPost?.nodes || [];
  const { currentPage, numPages } = pageContext;

  const categories = data.allWpCategory.nodes;

  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = currentPage === 2 ? `/` : `/page/${currentPage - 1}`;
  const nextPage = `/page/${currentPage + 1}`;

  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200; // Average reading speed
    const textLength = content.split(' ').length;
    const time = Math.ceil(textLength / wordsPerMinute);
    return time;
  };

  return (
    <main>
      <Header />
      <Hero />

      {/* Categories List */}
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <ul className="category-list-hero list-inline text-center">
              <li className="list-inline-item">
                <Link to="/" className="btn btn-category-link active">All</Link>
              </li>
              {categories
                .filter(category => category.name !== "Uncategorized")
                .map(category => (
                  <li key={category.id} className="list-inline-item">
                    <Link to={`/category/${category.slug}/`} className="btn btn-category-link">
                      {category.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="container blog-list-main-container">
        <div className="row">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="col-md-6 mb-4 blog-list-content-wrapper">
                <h3>
                  <Link to={`/${post.slug}`}>{post.title}</Link>
                </h3>
                <div dangerouslySetInnerHTML={{ __html: post.excerpt.replace(/<a[^>]*class="read-more"[^>]*>.*?<\/a>/, "") }} />
                <div className="listing-blog-info">
                  <span>
                    By <Link to={`/author/${post.author.node.slug}`}>{post.author.node.name}</Link>
                  </span>
                  <span>
                    {" | "}{post.date} 
                  </span>
                  <span>
                    {" | "}{calculateReadingTime(post.excerpt)} min read
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p>No posts found.</p>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="container blog-pagination-main-container">
        <div className="row">
          <div className="col-md-12">
            <div className="pagination">
              {numPages > 1 && (
                <div style={{ marginTop: "20px" }}>
                  {!isFirst && (
                    <Link to={prevPage} style={{ marginRight: "10px" }}>
                      ← Previous
                    </Link>
                  )}

                  {Array.from({ length: numPages }, (_, i) => {
                    const page = i + 1;
                    const isCurrent = currentPage === page;

                    // Show the first, last, current, and nearby pages, and ellipses
                    if (
                      page === 1 || // First page
                      page === numPages || // Last page
                      page === currentPage || // Current page
                      page === currentPage - 1 || // One before current page
                      page === currentPage + 1 // One after current page
                    ) {
                      return (
                        <Link
                          key={i}
                          to={page === 1 ? `/` : `/page/${page}`}
                          style={{
                            marginRight: "10px",
                            textDecoration: "none",
                            color: isCurrent ? "red" : "black",
                          }}
                        >
                          {page}
                        </Link>
                      );
                    }

                    // Insert ellipses
                    if (
                      (page === currentPage - 2 && page > 2) || // Before the current page range
                      (page === currentPage + 2 && page < numPages - 1) // After the current page range
                    ) {
                      return (
                        <span key={i} style={{ marginRight: "10px" }}>
                          ...
                        </span>
                      );
                    }

                    return null; // Hide other pages
                  })}

                  {!isLast && (
                    <Link to={nextPage} style={{ marginLeft: "10px" }}>
                      Next →
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export const query = graphql`
  query HomeQuery($skip: Int!, $limit: Int!) {
    allWpPost(sort: { date: DESC }, skip: $skip, limit: $limit) {
      nodes {
        id
        slug
        title
        excerpt
        date(formatString: "MMMM DD, YYYY")
        author {
          node {
            name
            slug
            avatar {
              url
            }
          }
        }
      }
    }
    allWpCategory {
      nodes {
        id
        name
        slug
      }
    }
  }
`;

export default Home;
