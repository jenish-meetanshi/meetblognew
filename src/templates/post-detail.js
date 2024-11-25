import React from "react";
import { graphql } from "gatsby";

const PostDetail = ({ data }) => {
  const post = data.wpPost;

  return (
    <div>
      <h1>{post.title}</h1>
      <p><strong>Published on:</strong> {post.date}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
};

export const query = graphql`
  query PostDetailQuery($id: String!) {
    wpPost(id: { eq: $id }) {
      title
      content
      date(formatString: "MMMM DD, YYYY")
    }
  }
`;

export default PostDetail;
