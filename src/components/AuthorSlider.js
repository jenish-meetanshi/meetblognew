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
          slug
        }
      }
    }
  `);

  const authors = data.allWpUser.nodes;

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

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1, // Doesn't matter when `variableWidth` is true
  //   slidesToScroll: 1,
  //   variableWidth: true, // Allows custom width for each slide
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         variableWidth: true,
  //         slidesToScroll: 1,
  //       },
  //     },
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         variableWidth: true,
  //         slidesToScroll: 1,
  //       },
  //     },
  //   ],
  // };
  

  return (
    <div className="author-slider-container">
      <h2 className="author-slider-title mb-4">Meet Our Authors</h2>
      <div className="container">
        <div className="row">
        {authors.map((author) => (
          <div className="col-lg-3 col-md-4 col-sm-2 author-card mb-3">
            <Link to={`/author/${author.slug}`}>
              <img
                src={author.userImage}
                alt={author.name}
                className="author-avatar"
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
