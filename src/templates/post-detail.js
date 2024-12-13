import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
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
    const addHeadingIds = () => {
      const extractedHeadings = [];
      const headingElements = document.querySelectorAll('h1, h2, h3');
      
      headingElements.forEach((heading) => {
        const headingText = heading.textContent.toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');
        
        const headingId = `heading-${headingText}`;
        
        // Add or update the ID for the heading
        heading.id = headingId;
        
        extractedHeadings.push({
          id: headingId,
          text: heading.textContent,
          level: heading.tagName.toLowerCase(),
        });
      });
      
      setHeadings(extractedHeadings);
    };

    // Use MutationObserver to wait for content to be fully rendered
    const observer = new MutationObserver((mutations, obs) => {
      const contentElement = document.querySelector('.post-content-main');
      if (contentElement) {
        addHeadingIds();
        obs.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Fallback for cases where content is already loaded
    if (document.querySelector('.post-content-main')) {
      addHeadingIds();
      observer.disconnect();
    }

    return () => {
      observer.disconnect();
    };
  }, [post.content]);
  
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!commentName || !commentEmail || !commentText) {
      alert("Please fill in all fields.");
      return;
    }

    // Add CORS headers and use appropriate WordPress authentication
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
          // Add necessary authentication headers if required by your WordPress setup
          // "Authorization": `Bearer YOUR_AUTH_TOKEN` 
        },
        body: JSON.stringify(commentData),
        credentials: 'include' // This helps with CORS and authentication
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData);
        alert(`An error occurred: ${errorData.message || 'Unable to submit comment'}`);
        return;
      }

      const newComment = await response.json();
      alert("Comment submitted successfully!");
      
      // Reset form
      setCommentText("");
      setCommentName("");
      setCommentEmail("");
      setParentCommentId(null);

      // Optionally, you might want to trigger a page reload or 
      // fetch updated comments dynamically
      window.location.reload();
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("An unexpected error occurred. Please try again.");
    }
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
              <p><strong>Published on:</strong> {post.date}</p>
              <p><strong>By:</strong> {post.author.node.name}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <div 
              className="post-content-main" 
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />

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
          
          <div className="col-md-3">
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

export default PostDetail;
