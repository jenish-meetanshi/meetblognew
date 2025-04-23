import React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 

const AuthorSlider = () => {
  const data = useStaticQuery(graphql`
    query {
      allWpUser {
        nodes {
          id
          name
          userImage
          designation
          slug
        }
      }
    }
  `);

  const authors = data.allWpUser.nodes.filter(
    (author) => author.slug !== "meetanshi-admin"
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  
  return (
    <div className="author-slider-container">
      <div className="container-lg">
        <div className="row">
        <div className="col-md-12">
          <h3 className="author-slider-title mb-4">Meet Our Authors</h3>
        </div>
        {authors.map((author) => (
          <div key={author.id} className="col-xl-3 col-lg-4 col-md-6 col-sm-6 author-card mb-3">
            <Link to={`/author/${author.slug}`}>
              <img
                src={author.userImage}
                alt={`Profile picture of ${author.name}, ${author.designation} at Meetanshi`}
                className="author-avatar" loading="lazy"
              />
              <span className="author-name">{author.name}</span>
            </Link>
          </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorSlider;
