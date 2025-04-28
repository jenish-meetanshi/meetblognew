import React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";

const AuthorGrid = () => {
  const data = useStaticQuery(graphql`
    query {
      allWpUser {
        nodes {
          id
          name
          slug
          userImage
          designation
          posts {
            nodes {
              id
            }
          }
        }
      }
    }
  `);

  // Filter out 'meetanshi-admin' and sort by number of posts
  const authors = data.allWpUser.nodes.filter(
    (author) => author.slug !== "meetanshi-admin"
  );

  return (
    <div className="author-grid-container py-5">
      <div className="container-lg">
        <div className="row">
          <div className="col-md-12">
            <h3 className="author-grid-title mb-4">Meet Our Authors</h3>
          </div>
        </div>

        <div className="row justify-content-center">
          {authors.map((author) => (
            <div key={author.id} className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mb-4">
              <div className="author-card text-center">
                <Link
                  to={`/author/${author.slug}`}
                  className="text-decoration-none d-flex align-items-center flex-column"
                >
                  <img
                    src={author.userImage}
                    alt={`Profile picture of ${author.name}, ${author.designation} at Meetanshi`}
                    className="author-avatar rounded-circle mb-3"
                    loading="lazy"
                  />
                  <h5 className="author-name">{author.name}</h5>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorGrid;
