import React from "react";
import { graphql, Link } from "gatsby";
import { Helmet } from "react-helmet";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Sitemap = ({ data }) => {
  const posts = data.allWpPost.nodes;

  return (
    <main>
      <Helmet>
        <title>Sitemap - Meetanshi Blog</title>
        <meta name="description" content="Sitemap page listing all blog posts on Meetanshi's blog with links to each post." />
        <link rel="canonical" href="https://meetanshi.com/blog/sitemap/" />
      </Helmet>
      <Header />
      <div className="container-lg my-5">
        <h1>Sitemap</h1>
        <p>Browse all blog posts:</p>
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <Link to={`/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </main>
  );
};

export const query = graphql`
  query SitemapQuery {
    allWpPost(sort: { date: DESC }) {
      nodes {
        id
        title
        slug
      }
    }
  }
`;

export default Sitemap;
