import React from "react";
import { graphql, Link } from "gatsby";

const IndexPage = ({ data }) => {
  const posts = data.allWpPost.nodes;

  return (
    <main>
      <h1>Blog Posts</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} style={{ marginBottom: "20px" }}>
            <h2>
              <Link to={`/post/${post.slug}`}>{post.title}</Link>
            </h2>
            <p dangerouslySetInnerHTML={{ __html: post.excerpt }} />
            <p><strong>Published on:</strong> {post.date}</p>
            <Link to={`/post/${post.slug}`}>Read More</Link>
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </main>
  );
};

export const query = graphql`
  query {
    allWpPost(sort: { date: DESC }, limit: 10) {
      nodes {
        id
        slug
        title
        excerpt
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;

export default IndexPage;
