import React, { useState, useEffect } from "react";
import { graphql, Link} from "gatsby";
import { Breadcrumb } from "gatsby-plugin-breadcrumb"; // Import Breadcrumb
import { Helmet } from "react-helmet";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WordPressContent from '../components/WordPressContent';
import { withPrefix } from "gatsby";

const PostDetail = ({ data, pageContext }) => {
  const post = data.wpPost;
  const { breadcrumb } = pageContext;
  const [headings, setHeadings] = useState([]);
  const [activeHeadingId, setActiveHeadingId] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Extract both primary and secondary CTA data
  const ctaImage = post.categories.nodes[0]?.ctaImage;
  const ctaImageAlt = post.categories.nodes[0]?.ctaImageAlt;
  const ctaLink = post.categories.nodes[0]?.ctaLink;
  const ctaLinkNofollow = post.categories.nodes[0]?.ctaLinkNofollow;
  
  // Extract secondary CTA data
  const secondaryCtaImage = post.categories.nodes[0]?.secondaryCtaImage;
  const secondaryCtaImageAlt = post.categories.nodes[0]?.secondaryCtaImageAlt;
  const secondaryCtaLink = post.categories.nodes[0]?.secondaryCtaLink;
  const secondaryCtaLinkNofollow = post.categories.nodes[0]?.secondaryCtaLinkNofollow;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const datePublished = new Date(post.date).toISOString();
  const dateModified = new Date(post.modified).toISOString();

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(post.content, "text/html");

    const extractedHeadings = Array.from(doc.querySelectorAll("h1, h2, h3")).map((heading) => {
      const headingText = heading.innerText.toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

      const headingId = `heading-${headingText}`;
      return {
        id: headingId,
        text: heading.innerText,
        level: heading.tagName.toLowerCase(),
      };
    });

    // Assign IDs to headings in the actual DOM
    setTimeout(() => {
      extractedHeadings.forEach((heading) => {
        const matchingElement = Array.from(document.querySelectorAll("h1, h2, h3")).find(
          (el) => el.textContent.trim() === heading.text.trim()
        );

        if (matchingElement) {
          matchingElement.id = heading.id;
        }
      });
    }, 0);

    setHeadings(extractedHeadings);
  }, [post.content]);

   useEffect(() => {
    const headingElements = document.querySelectorAll("h1, h2, h3");

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          setActiveHeadingId(visibleEntry.target.id);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1, // Adjust the threshold as needed
      }
    );

    headingElements.forEach((el) => observer.observe(el));

    return () => {
      headingElements.forEach((el) => observer.unobserve(el));
    };
  }, [headings]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
  <main>
    <Helmet>
        <title>{post.seoTitle ? post.seoTitle : post.title}</title>
        <meta name="description" content={post.seoDescription} />
        <link rel="canonical" href={`https://meetanshi.com/blog/${post.slug}/`} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.seoTitle} />
        <meta property="og:description" content={post.seoDescription} />
        <meta property="og:url" content="https://meetanshi.com/blog/${post.slug}" />
        <meta property="og:site_name" content="Meetanshi Blog - Learn Magento &amp; Shopify" />
        <meta property="article:publisher" content="https://www.facebook.com/MeetanshiInc/" />
        <meta property="article:section" content="Statistics" />
        <meta property="og:image" content={post.seoImage} />
        <meta property="og:image:secure_url" content={post.seoImage} />
        <meta property="og:image:type" content="image/png" />
        <meta name="twitter:title" content={post.seoTitle} />
        <meta name="twitter:description" content={post.seoDescription} />
        <meta name="twitter:image" content={post.seoImage} />
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content={post.author.node.name} />
        <meta name="twitter:label2" content="Time to read" />
        <meta name="twitter:data2" content={post.reading_time} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://meetanshi.com/blog/${post.slug}/`,
            },
            headline: post.title,
            description: post.excerpt,
            author: {
              "@type": "Person",
              name: post.author.node.name,
              url: `https://meetanshi.com/blog/author/${post.author.node.slug}/`,
              image: post.author.node.userImage, // URL of the author's image
              jobTitle: post.author.node.designation, // Author's designation
              "sameAs": [
                post.author.node.linkedinUrl,
                post.author.node.twitterUrl
              ].filter(Boolean),
            },
            datePublished: datePublished,
            dateModified: dateModified,
            image: post.seoImage,
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
              address: {
                "@type": "PostalAddress",
                streetAddress: "305, Victoria Prime, Near Water Tank, Kaliyabid",
                addressLocality: "Bhavnagar",
                addressRegion: "GJ",
                postalCode: "364002",
                addressCountry: "IN",
              },
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
              <h1>{post.title}</h1>
              <span className="postdetail-heroauthorname">By&nbsp;<Link className="blog-detail-author-link" to={`/author/${post.author.node.slug}`}>{post.author.node.name}</Link></span>
              <span className="postdetail-heromain">Updated on {formatDate(post.modified)} <span className="hero-ellipse"></span> {post.reading_time} min read</span>
          </div>
          </div>
        </div>
      </div>
          <div className={`table-of-contents-toggle-main ${isVisible ? "toc-main-hide" : "toc-main-display"}`} >
            <div className="table-of-contents-wrapper-main">
              <div className="table-of-contents-wrapper">
                {/* Toggle Button */}
                <button className={`toc-toggle ${isVisible ? "toc-hide" : "toc-display"}`} onClick={() => setIsVisible(!isVisible)} >
                   <svg fill="#f47526" height="200px" width="200px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 487.3 487.3" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M487.2,69.7c0,12.9-10.5,23.4-23.4,23.4h-322c-12.9,0-23.4-10.5-23.4-23.4s10.5-23.4,23.4-23.4h322.1 C476.8,46.4,487.2,56.8,487.2,69.7z M463.9,162.3H141.8c-12.9,0-23.4,10.5-23.4,23.4s10.5,23.4,23.4,23.4h322.1 c12.9,0,23.4-10.5,23.4-23.4C487.2,172.8,476.8,162.3,463.9,162.3z M463.9,278.3H141.8c-12.9,0-23.4,10.5-23.4,23.4 s10.5,23.4,23.4,23.4h322.1c12.9,0,23.4-10.5,23.4-23.4C487.2,288.8,476.8,278.3,463.9,278.3z M463.9,394.3H141.8 c-12.9,0-23.4,10.5-23.4,23.4s10.5,23.4,23.4,23.4h322.1c12.9,0,23.4-10.5,23.4-23.4C487.2,404.8,476.8,394.3,463.9,394.3z M38.9,30.8C17.4,30.8,0,48.2,0,69.7s17.4,39,38.9,39s38.9-17.5,38.9-39S60.4,30.8,38.9,30.8z M38.9,146.8 C17.4,146.8,0,164.2,0,185.7s17.4,38.9,38.9,38.9s38.9-17.4,38.9-38.9S60.4,146.8,38.9,146.8z M38.9,262.8 C17.4,262.8,0,280.2,0,301.7s17.4,38.9,38.9,38.9s38.9-17.4,38.9-38.9S60.4,262.8,38.9,262.8z M38.9,378.7 C17.4,378.7,0,396.1,0,417.6s17.4,38.9,38.9,38.9s38.9-17.4,38.9-38.9C77.8,396.2,60.4,378.7,38.9,378.7z"></path> </g> </g> </g></svg>
                </button>

                {/* TOC Content */}
                {isVisible && (
                  <div className="table-of-contents-toggle-content">
                    <div className="table-of-contents">
                    <span className="toc-title">Table of Contents</span>
                      <ul>
                        {headings.map((heading) => (
                          <li
                            key={heading.id}
                            className={`toc-${heading.level} ${
                              activeHeadingId === heading.id ? "active" : ""
                            }`}
                          >
                            <a
                              href={`#${heading.id}`}
                              onClick={(e) => {
                                e.preventDefault();
                                scrollToSection(heading.id);
                              }}
                            >
                              {heading.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                 )}
              </div>
            </div>
          </div>
      <div className="container">
        <div className="row">
          <div className="col-md-9">
              <div className="post-content-main">
                  <WordPressContent content={post.content} />
              </div>
            <div className="author-section-postdetail">
            <div className="row justify-content-center align-items-center">
              <div className="col-auto">
              {post.author.node.fullImage && (
                <img
                  src={post.author.node.fullImage}
                  alt={`${post.author.node.name} Full Image`}
                  className="author-section-image img-fluid"
                />
              )} 
              </div>
              <div className="col-auto">
                <div className="author-block-content ps-4">
                  <span className="author-section-title d-block">Article by</span>
                  <Link className="author-section-name" to={`/author/${post.author.node.slug}`}>{post.author.node.name}</Link>
                  {post.author.node.descriptionText && (
                    <p dangerouslySetInnerHTML={{ __html: post.author.node.descriptionText }} />
                  )}
                  <div className="social-links">
                  {post.author.node.linkedinUrl && (
                    <a href={post.author.node.linkedinUrl} target="_blank" rel="noopener noreferrer">
                       <img src={withPrefix("/images/icon-linkedin.svg")} alt="LinkedIn icon" />
                    </a>
                  )}

                  {post.author.node.twitterUrl && (
                    <a href={post.author.node.twitterUrl} target="_blank" rel="noopener noreferrer">
                       <img src={withPrefix("/images/icon-x.svg")} alt="Twitter icon" />
                    </a>
                  )}
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
          
          <div className="col-md-3 blog-sidebar-main">
            <div className="sidebar-main">
               <div className="table-of-contents">
                <span className="toc-title">Table of Contents</span>
                  <ul>
                    {headings.map((heading) => (
                      <li
                        key={heading.id}
                        className={`toc-${heading.level} ${
                          activeHeadingId === heading.id ? "active" : ""
                        }`}
                      >
                        <a
                          href={`#${heading.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToSection(heading.id);
                          }}
                        >
                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              
              {/* Primary CTA - only displayed if content exists */}
              {ctaImage && ctaLink && (
                <div className="cta-section">
                  <a href={ctaLink} target="_blank" rel={ctaLinkNofollow ? "nofollow" : ""}>
                    <img src={ctaImage} alt={ctaImageAlt} style={{ maxWidth: "100%" }} />
                  </a>
                </div>
              )}
              
              {/* Secondary CTA - only displayed if content exists */}
              {secondaryCtaImage && secondaryCtaLink && (
                <div className="secondary-cta-section">
                  <a 
                    href={secondaryCtaLink} 
                    target="_blank" 
                    rel={secondaryCtaLinkNofollow ? "nofollow" : ""}
                  >
                    <img 
                      src={secondaryCtaImage} 
                      alt={secondaryCtaImageAlt} 
                      style={{ maxWidth: "100%" }} 
                    />
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
      seoTitle
      seoDescription
      seoImage
      date
      modified
      author {
        node {
          name
          userImage
          descriptionText
          slug
          designation
          fullImage
          linkedinUrl
          twitterUrl
        }
      }
      categories {
        nodes {
          name
          ctaImage
          ctaImageAlt
          ctaLink
          ctaLinkNofollow
          secondaryCtaImage
          secondaryCtaImageAlt
          secondaryCtaLink
          secondaryCtaLinkNofollow
        }
      }
    }
  }
`;

export default PostDetail;
