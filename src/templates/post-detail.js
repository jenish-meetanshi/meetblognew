import React, { useState, useEffect } from "react";
import { graphql, Link} from "gatsby";
import { Breadcrumb } from "gatsby-plugin-breadcrumb"; // Import Breadcrumb
import { Helmet } from "react-helmet";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PostDetail = ({ data, pageContext }) => {
  const post = data.wpPost;
  const { breadcrumb } = pageContext;
  const [headings, setHeadings] = useState([]);
 
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
  <main>
    <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://meetanshi.com/blog/${post.slug}`,
            },
            headline: post.title,
            description: post.excerpt,
            author: {
              "@type": "Person",
              name: post.author.node.name,
              url: `https://meetanshi.com/blog/author/${post.author.node.slug}`,
              image: post.author.node.userImage, // URL of the author's image
              jobTitle: post.author.node.designation, // Author's designation
            },
            datePublished: post.date,
            publisher: {
              "@type": "Organization",
              legalName: "Meetanshi Technologies LLP",
              name: "Meetanshi",
              url: "https://meetanshi.com/",
              sameAs: [
                "https://in.linkedin.com/company/meetanshi",
                "https://www.youtube.com/c/MeetanshiInc",
                "https://www.facebook.com/MeetanshiInc/",
                "https://www.instagram.com/meetanshiinc/",
                "https://x.com/MeetanshiInc",
                "https://github.com/MeetanshiInc",
              ],
              logo: {
                "@type": "ImageObject",
                url: "https://meetanshi.com/media/logo/stores/1/logo.png",
              },
            },
          })}
        </script>
      </Helmet>
    <div className="post-detail">
      <Header />
      <div className="container-lg">
        <div className="row">
          <div className="col-md-12">
            <div className="home-hero-section post-detail-banner">
              <Breadcrumb className="post-detail-hero-breadcrumb"
                  crumbs={breadcrumb.crumbs}
                  crumbSeparator=" / "
                  crumbLabel={breadcrumb.crumbs[breadcrumb.crumbs.length - 1].crumbLabel}
                />
              <h1>{post.title}</h1>
              <span className="postdetail-heromain">by&nbsp;<Link className="blog-detail-author-link" to={`/author/${post.author.node.slug}`}>{post.author.node.name}</Link> <span className="hero-ellipse"></span> {post.reading_time} min read</span>
              <span>Updated on {post.date}</span>          
          </div>
          </div>
        </div>
      </div>

      <div className="container-lg">
        <div className="row">
          <div className="col-md-9">
            <div className="post-content-main" dangerouslySetInnerHTML={{ __html: post.content }} />
            {/* <div className="comment-form mt-4" id="commentForm">
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
            </div> */}
          </div>
          
          <div className="col-md-3 blog-sidebar-main">
            <div className="sidebar-main">
              <div className="table-of-contents">
                <span className="toc-title">Table of Contents</span>
                <ul>
                  {headings.map((heading) => (
                    <li key={heading.id} className={`toc-${heading.level}`}>
                      <a onClick={() => scrollToSection(heading.id)}>{heading.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
              {ctaImage && ctaLink && (
                <div className="cta-section">
                  <a href={ctaLink} target="_blank" rel={ctaLinkNofollow ? "nofollow" : ""}>
                    <img src={ctaImage} alt="CTA" style={{ maxWidth: "100%" }} />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  </main>
  );
};

export const query = graphql`
  query PostDetailQuery($id: String!) {
    wpPost(id: { eq: $id }) {
      databaseId
      title
      content
      excerpt
      slug
      reading_time
      date(formatString: "MMMM DD, YYYY")
      author {
        node {
          name
          userImage
          descriptionText
          slug
          designation
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
