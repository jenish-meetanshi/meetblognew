import React from "react";
import { graphql, Link } from "gatsby";

const BlogList = ({ data, pageContext }) => {
  const posts = data.allWpPost.nodes;
  const { currentPage, numPages } = pageContext;

  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map((post) => (
        <div key={post.id} style={{ marginBottom: "20px" }}>
          <h2>
            <Link to={`/post/${post.slug}`}>{post.title}</Link>
          </h2>
          <p dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          <p><strong>Published on:</strong> {post.date}</p>
          <Link to={`/post/${post.slug}`}>Read More</Link>
        </div>
      ))}

      {/* Pagination */}
      <div>
        {Array.from({ length: numPages }).map((_, i) => (
          <Link
            key={i}
            to={i === 0 ? `/` : `/page/${i + 1}`}
            style={{
              marginRight: "10px",
              textDecoration: "none",
              color: currentPage === i + 1 ? "red" : "black",
            }}
          >
            {i + 1}
          </Link>
        ))}
      </div>
    </div>
  );
};

export const query = graphql`
query BlogListQuery($skip: Int!, $limit: Int!) {
  allWpPost(sort: {date: DESC}, skip: $skip, limit: $limit) {
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

export default BlogList;
