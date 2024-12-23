import React, { useState, useEffect } from "react";
import { graphql, Link} from "gatsby";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PostDetail = ({ data }) => {
  const post = data.wpPost;
  const [headings, setHeadings] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [commentName, setCommentName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [parentCommentId, setParentCommentId] = useState(null);
  
  const processComments = (comments) => {
    if (!comments || comments.length === 0) return [];
  
    // First, separate top-level comments and replies
    const topLevelComments = comments.filter(comment => !comment.parent);
    const replyComments = comments.filter(comment => comment.parent);
  
    // Create a new array with nested structure
    return topLevelComments.map(comment => ({
      ...comment,
      replies: replyComments.filter(reply => 
        reply.parent && reply.parent.id === comment.id
      )
    }));
  };

  const processedComments = processComments(post.comments?.nodes || []);
  const ctaImage = post.categories.nodes[0]?.ctaImage;
  const ctaLink = post.categories.nodes[0]?.ctaLink;
  const ctaLinkNofollow = post.categories.nodes[0]?.ctaLinkNofollow;

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(post.content, "text/html");
    
    const extractedHeadings = Array.from(doc.querySelectorAll("h1, h2, h3")).map((heading) => {
      const headingText = heading.innerText.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      
      const headingId = `heading-${headingText}`;
  
      return {
        id: headingId,
        text: heading.innerText,
        level: heading.tagName.toLowerCase(),
      };
    });
  
    setTimeout(() => {
      extractedHeadings.forEach(heading => {
        const matchingElement = Array.from(document.querySelectorAll('h1, h2, h3'))
          .find(el => el.textContent.trim() === heading.text.trim());
        
        if (matchingElement) {
          matchingElement.id = heading.id;
        }
      });
    }, 0);
  
    setHeadings(extractedHeadings);
  }, [post.content]);
  
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!commentName || !commentEmail || !commentText) {
      alert("Please fill in all fields.");
      return;
    }

    const commentData = {
      post: post.databaseId,
      author_name: commentName,
      author_email: commentEmail,
      content: commentText,
      parent: parentCommentId ? parseInt(parentCommentId, 10) : null,
    };

    try {
      const response = await fetch("https://mitfestival.app/meetanshiblog/wp-json/wp/v2/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData);
        alert(`An error occurred: ${errorData.message}`);
        return;
      }

      alert("Comment submitted successfully!");
      setCommentText("");
      setCommentName("");
      setCommentEmail("");
      setParentCommentId(null);
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("An unexpected error occurred.");
    }
  };

  const handleReply = (commentId) => {
    setParentCommentId(commentId);
    document.getElementById("commentForm").scrollIntoView({ behavior: "smooth" });
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    
    if (element) {
      element.scrollIntoView({ 
        behavior: "smooth", 
        block: "start" 
      });
    } else {
      console.warn(`Element with ID "${id}" not found.`);
      
      const headingElements = document.querySelectorAll('h1, h2, h3');
      const matchingElement = Array.from(headingElements).find(el => 
        el.textContent.trim().toLowerCase() === 
        decodeURIComponent(id).replace('heading-', '').replace(/-/g, ' ')
      );
  
      if (matchingElement) {
        matchingElement.scrollIntoView({ 
          behavior: "smooth", 
          block: "start" 
        });
      } else {
        console.error(`Could not find heading matching "${id}"`);
      }
    }
  };

  return (
    <div className="post-detail">
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="home-hero-section post-detail-banner">
              <h1>{post.title}</h1>
              <span>Updated on {post.date}</span>
              <span className="postdetail-heromain">by <Link to={`/author/${post.author.node.slug}`}>{post.author.node.name}</Link> <span className="hero-ellipse"></span> {post.reading_time} min read</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <div className="post-content-main" dangerouslySetInnerHTML={{ __html: post.content }} />

            <div className="comments-section">
              <h3 className="mb-4">Comments</h3>
              {processedComments.length === 0 ? (
                <p>No comments yet.</p>
              ) : (
                <ul className="list-unstyled comments-list">
                  {processedComments.map((comment) => (
                    <li key={comment.id} className="comment-item mb-4 p-3 border rounded">
                      <div className="comment-header d-flex align-items-center mb-2">
                        <div className="comment-author fw-bold me-2">{comment.author.node.name}</div>
                        <small className="text-muted comment-date">{comment.date}</small>
                      </div>
                      
                      <div 
                        className="comment-content mb-2" 
                        dangerouslySetInnerHTML={{ __html: comment.content }}
                      />
                      
                      <button 
                        onClick={() => handleReply(comment.id)} 
                        className="btn btn-sm btn-outline-primary"
                      >
                        Reply
                      </button>

                      {/* Nested replies */}
                      {comment.replies && comment.replies.length > 0 && (
                        <ul className="list-unstyled nested-comments mt-3 ms-4">
                          {comment.replies.map((reply) => (
                            <li key={reply.id} className="nested-comment-item mb-3 p-2 bg-light rounded">
                              <div className="comment-header d-flex align-items-center mb-2">
                                <div className="comment-author fw-bold me-2">{reply.author.node.name}</div>
                                <small className="text-muted comment-date">{reply.date}</small>
                              </div>
                              
                              <div 
                                className="comment-content" 
                                dangerouslySetInnerHTML={{ __html: reply.content }}
                              />
                              
                              <button 
                                onClick={() => handleReply(reply.id)} 
                                className="btn btn-sm btn-outline-secondary mt-2"
                              >
                                Reply
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="comment-form mt-4" id="commentForm">
              <h4 className="mb-4">{parentCommentId ? "Reply to Comment" : "Leave a Comment"}</h4>
              <form onSubmit={handleCommentSubmit} className="p-4 border rounded bg-light">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="commentName" className="form-label">Your Name</label>
                    <input
                      type="text"
                      id="commentName"
                      className="form-control"
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="commentEmail" className="form-label">Your Email</label>
                    <input
                      type="email"
                      id="commentEmail"
                      className="form-control"
                      value={commentEmail}
                      onChange={(e) => setCommentEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="commentText" className="form-label">Your Comment</label>
                  <textarea
                    id="commentText"
                    className="form-control"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write your comment..."
                    rows="4"
                    required
                  ></textarea>
                </div>

                {parentCommentId && (
                  <div className="alert alert-info mb-3">
                    Replying to a comment. 
                    <button 
                      type="button" 
                      className="btn btn-sm btn-link" 
                      onClick={() => setParentCommentId(null)}
                    >
                      Cancel Reply
                    </button>
                  </div>
                )}

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    {parentCommentId ? "Reply to Comment" : "Post Comment"}
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          <div className="col-md-3 blog-sidebar-main">
            <div className="sidebar-main">
              {ctaImage && ctaLink && (
                <div className="cta-section">
                  <a href={ctaLink} target="_blank" rel={ctaLinkNofollow ? "nofollow" : ""}>
                    <img src={ctaImage} alt="CTA" style={{ maxWidth: "100%" }} />
                  </a>
                </div>
              )}

              <div className="table-of-contents">
                <span className="toc-title">Table of Contents</span>
                <ul>
                  {headings.map((heading) => (
                    <li key={heading.id} className={`toc-${heading.level}`}>
                      <button onClick={() => scrollToSection(heading.id)}>{heading.text}</button>
                    </li>
                  ))}
                </ul>
              </div>
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
      databaseId
      title
      content
      reading_time
      date(formatString: "MMMM DD, YYYY")
      author {
        node {
          name
          userImage
          descriptionText
          slug
        }
      }
      comments {
        nodes {
          id
          content
          parent {
            id
          }
          author {
            node {
              name
            }
          }
          date(formatString: "MMMM DD, YYYY")
        }
      }
      categories {
        nodes {
          name
          ctaImage
          ctaLink
          ctaLinkNofollow
        }
      }
    }
  }
`;

export default PostDetail;
