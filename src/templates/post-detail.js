import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PostDetail = ({ data }) => {
  const post = data.wpPost;
  const [headings, setHeadings] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [commentName, setCommentName] = useState(""); // Name field
  const [commentEmail, setCommentEmail] = useState(""); // Email field
  const [parentCommentId, setParentCommentId] = useState(null); // For replies
  const comments = post.comments?.nodes || []; // Keep as a read-only reference

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(post.content, "text/html");
    const extractedHeadings = Array.from(doc.querySelectorAll("h1, h2, h3")).map((heading, index) => {
      if (!heading.id) {
        heading.id = `heading-${index}`;
      }
      return {
        id: heading.id,
        text: heading.innerText,
        level: heading.tagName.toLowerCase(),
      };
    });

    setHeadings(extractedHeadings);
  }, [post.content]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentName || !commentEmail || !commentText) {
      alert("Please fill in all fields.");
      return;
    }

    // Simulate API call to submit comment
    console.log("Submitting comment:", {
      name: commentName,
      email: commentEmail,
      text: commentText,
      parent: parentCommentId || null,
    });

    // Reset form fields and parent comment ID
    setCommentText("");
    setCommentName("");
    setCommentEmail("");
    setParentCommentId(null);
  };

  const handleReply = (commentId) => {
    setParentCommentId(commentId); // Set the comment to reply to
    document.getElementById("commentForm").scrollIntoView({ behavior: "smooth" }); // Scroll to form
  };

  return (
    <div>
      <Header />
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="home-hero-section">
                <h1>{post.title}</h1>
                <p><strong>Published on:</strong> {post.date}</p>
                <p><strong>By:</strong> {post.author.node.name}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />

            {/* Comments Section */}
            <div className="comments-section">
              <h3>Comments</h3>
              {comments.length === 0 ? (
                <p>No comments yet.</p>
              ) : (
                <ul>
                  {comments.map((comment) => (
                    <li key={comment.id}>
                      <p><strong>{comment.author.node.name}</strong> said:</p>
                      <p>{comment.content}</p>
                      <p><small>{comment.date}</small></p>
                      <button onClick={() => handleReply(comment.id)}>Reply</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Comment Form */}
            <div className="comment-form" id="commentForm">
              <h4>{parentCommentId ? "Reply to Comment" : "Leave a Comment"}</h4>
              <form onSubmit={handleCommentSubmit}>
                <input
                  type="text"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  placeholder="Your Name"
                  required
                />
                <input
                  type="email"
                  value={commentEmail}
                  onChange={(e) => setCommentEmail(e.target.value)}
                  placeholder="Your Email"
                  required
                />
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write your comment..."
                  required
                />
                <button type="submit">{parentCommentId ? "Reply" : "Post Comment"}</button>
              </form>
            </div>
          </div>
          <div className="col-md-3">
            {/* Table of Contents */}
            <div className="table-of-contents">
              <h4>Table of Contents</h4>
              <ul>
                {headings.map((heading) => (
                  <li key={heading.id} className={`toc-${heading.level}`}>
                    <a href={`#${heading.id}`} className="toc-link">
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export const query = graphql`
  query PostDetailQuery($id: String!) {
    wpPost(id: { eq: $id }) {
      title
      content
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
      comments {
        nodes {
          id
          content
          author {
            node {
              name
            }
          }
          date
        }
      }
    }
  }
`;

export default PostDetail;
