import React from "react";
import Header from "../components/Header";
import { graphql, Link } from "gatsby";
import { Helmet } from "react-helmet";
import Footer from "../components/Footer";

const AuthorDetail = ({ data, pageContext }) => {
  const posts = data.allWpPost.nodes;
  const author = data.wpUser; // Author details from GraphQL
  const { authorSlug, currentPage, numPages } = pageContext;

  // Helper function to create pagination with ellipses
  const getPagination = () => {
    const pageNumbers = [];
    const delta = 1; // Number of pages to show around the current page

    for (let i = 1; i <= numPages; i++) {
      if (
        i === 1 || // First page
        i === numPages || // Last page
        i === currentPage || // Current page
        (i >= currentPage - delta && i <= currentPage + delta) // Pages around current page
      ) {
        pageNumbers.push(i);
      } else if (i === currentPage - delta - 1 || i === currentPage + delta + 1) {
        // Add ellipsis between distant pages
        pageNumbers.push("...");
      }
    }

    return pageNumbers;
  };

  // Function to format date
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

    // Helper function to calculate reading time
    const calculateReadingTime = (content) => {
      const wordsPerMinute = 200; // Average reading speed
      const textLength = content.split(' ').length;
      const time = Math.ceil(textLength / wordsPerMinute);
      return time;
    };

   const canonicalUrl = currentPage === 1 
    ? `https://meetanshi.com/blog/author/${authorSlug}/` 
    : `https://meetanshi.com/blog/author/${authorSlug}/page/${currentPage}/`;

  return (
    <div>
    <Helmet>
         <title>{author.seoTitle || `${author.name} - Author Page`}</title>
        <meta name="description" content={author.seoDescription || `${author.name}'s articles and posts`} />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "dateModified": new Date().toISOString(),
            "mainEntity": {
              "@type": "Person",
              "name": author.name,
              "description": author.descriptionText,
              "jobTitle": author.designation,
              "image": {
                "@type": "ImageObject",
                "url": author.fullImage,
              },
            },
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
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
          })}
        </script>
      </Helmet>
      <Header />
     <div className="author-details-hero">
        <div className="container-lg">
          <div className="row align-items-end justify-content-between">
            <div className="col-lg-auto order-2 order-lg-1">
            <div className="author-detailpage-wrapper">
                <h2 className="single-author-title"> {author.name}</h2>
                {author.designation && <span className="single-author-designation">{author.designation}</span>}
                {author.descriptionText && <p>{author.descriptionText}</p>}
            </div>
            </div>

            <div className="col-lg-auto order-1 order-lg-2">
            {author.fullImage && (
                <img
                  src={author.fullImage}
                  alt={`${author.name} Full Image`}
                  className="single-author-image img-fluid"
                />
              )}   
            </div>
          </div>
        </div>
      </div>
     <div className="container-lg blog-list-main-container mt-5">
        <div className="row">
          <div className="col-md-12">
          <span className="author-blogs-title">Articles by Author</span>
          </div>
        </div>
        {/* Post List */}
        <div className="row">
          {posts.map((post) => {
            return (
              <div
                key={post.id}
                className="col-md-6 mb-4 blog-list-content-wrapper"
              >
                <h3>
                  <Link to={`/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                <div dangerouslySetInnerHTML={{ __html: post.excerpt.replace(/<a[^>]*class="read-more"[^>]*>.*?<\/a>/, "") }} />
                <div className="listing-blog-info">
                
                <span>
                  <Link to={`/author/${post.author.node.slug}`}>{post.author.node.name}</Link>
                </span>
                <span>
                  {" | "}{formatDate(post.date)}
                </span>
                <span>
                  {" | "}{calculateReadingTime(post.excerpt)} min read
                </span>
              </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="container-lg blog-pagination-main-container">
        <div className="row">
          <div className="col-md-12">
            {/* Pagination with Ellipsis */}
            <div className="pagination">
              {getPagination().map((page, index) => {
                if (page === "...") {
                  return <span key={index} className="page-ellipsis">...</span>;
                }
                return (
                  <Link
                    key={page}
                    to={
                      page === 1
                        ? `/author/${authorSlug}/`
                        : `/author/${authorSlug}/${page}`
                    }
                    className={`page-number ${currentPage === page ? "active" : ""}`}
                  >
                    {page}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export const query = graphql`
  query ($authorSlug: String!, $skip: Int!, $limit: Int!) {
    wpUser(slug: { eq: $authorSlug }) {
      name
      avatar {
        url
      }
      description
      fullImage
      userImage  # Fetch the user image field
      designation  # Fetch the designation field
      descriptionText  # Fetch the description text field
      seoTitle 
      seoDescription
    }
    allWpPost(
      filter: { author: { node: { slug: { eq: $authorSlug } } } }
      sort: { fields: date, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        id
        title
        slug
        excerpt
        date
        author {
          node {
            name
            slug
            avatar {
              url
            }
          }
        }
      }
    }
  }
`;


export default AuthorDetail;
