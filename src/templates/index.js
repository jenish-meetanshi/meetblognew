import React from "react";
import { graphql, Link } from "gatsby";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import AuthorSlider from "../components/AuthorSlider";

const Home = ({ data, pageContext }) => {
  const posts = data?.allWpPost?.nodes || [];
  const stickyPosts = data?.stickyPosts?.nodes || [];
  const categories = data.allWpCategory.nodes;
  const { currentPage, numPages } = pageContext;

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

      {/* Sticky Posts */}
      {stickyPosts.length > 0 && (
        <div className="container ">
          <div className="row">
            <div className="col-md-12">
            {stickyPosts.map((post) => (
              <div key={post.id} className="sticky-posts-main-container blog-list-content-wrapper text-center">
                <div className="listing-blog-info">
                {post.author.node.userImage && (
                        <img
                          src={post.author.node.userImage}
                          alt={`${post.author.node.name}'s Image`}
                          className="user-image"
                        />
                      )}
                  <span>
                    <Link to={`/author/${post.author.node.slug}`}>{post.author.node.name}</Link>
                  </span>
                  <span>
                    {" | "}{post.date} 
                  </span>
                  <span>
                    {" | "}{calculateReadingTime(post.excerpt)} min read
                  </span>
                </div>
                <h2>
                  <Link to={`/${post.slug}`}>{post.title}</Link>
                </h2>
                <div dangerouslySetInnerHTML={{ __html: post.excerpt.replace(/<a[^>]*class="read-more"[^>]*>.*?<\/a>/, "") }} />
              </div>
            ))}
            </div>
          </div>
        </div>
      )}

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
                    {post.author.node.userImage && (
                      <img
                        src={post.author.node.userImage}
                        alt={`${post.author.node.name}'s Image`}
                        className="user-image"
                      />
                    )}
                  <span>
                    <Link to={`/author/${post.author.node.slug}`}>{post.author.node.name}</Link>
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
              {numPages > 1 && (
                <div className="pagination">
                  {Array.from({ length: numPages }, (_, i) => {
                    const page = i + 1;
                    const isCurrent = currentPage === page;

                    if (
                      page === 1 || 
                      page === numPages || 
                      page === currentPage || 
                      page === currentPage - 1 || 
                      page === currentPage + 1 
                    ) {
                      return (
                        <Link
                          key={i}
                          to={page === 1 ? `/` : `/page/${page}`}
                          // style={{
                          //   marginRight: "10px",
                          //   textDecoration: "none",
                          //   color: isCurrent ? "red" : "black",
                          // }}
                          className={`page-number ${currentPage === page ? "active" : ""}`}
                        >
                          {page}
                        </Link>
                      );
                    }

                    if (
                      (page === currentPage - 2 && page > 2) || 
                      (page === currentPage + 2 && page < numPages - 1) 
                    ) {
                      return (
                        <span key={i} className="page-ellipsis">
                          ...
                        </span>
                      );
                    }
                    return null; 
                  })}
                </div>
              )}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <AuthorSlider />
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
};

export const query = graphql`
  query HomeQuery($skip: Int!, $limit: Int!) {
    allWpPost(
      sort: { date: DESC }
      skip: $skip
      limit: $limit
      filter: { isSticky: { eq: false } } 
    ) {
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
            userImage
          }
        }
      }
    }
    stickyPosts: allWpPost(filter: { isSticky: { eq: true } }, sort: { date: DESC }) {
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
            userImage
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
