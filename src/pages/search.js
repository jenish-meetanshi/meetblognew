import React, { useState, useEffect } from 'react';
import { graphql, Link } from 'gatsby';
import Header from "../components/Header";
import Footer from "../components/Footer";

const SearchPage = ({ location, data }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchQuery = urlParams.get('query') || '';
    setQuery(searchQuery);

    if (searchQuery) {
      const filteredResults = data.allWpPost.nodes.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filteredResults);
    }
  }, [location.search, data.allWpPost.nodes]);

  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200; // Average reading speed
    const textLength = content.split(' ').length;
    const time = Math.ceil(textLength / wordsPerMinute);
    return time;
  };

  return (
    <main>
      <Header />
      
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="home-hero-section">
                <h1>Search Results</h1>
                {query && <p>Showing results for: <strong>{query}</strong></p>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <div className="container blog-list-main-container">
        <div className="row">
          {results.length > 0 ? (
            results.map((post) => (
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

      <Footer />
    </main>
  );
};

export const query = graphql`
  query SearchQuery {
    allWpPost {
      nodes {
        id
        title
        excerpt
        slug
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
  }
`;

export default SearchPage;
