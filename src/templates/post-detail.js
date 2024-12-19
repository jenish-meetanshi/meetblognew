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
    }
  }
`;

export default PostDetail;
