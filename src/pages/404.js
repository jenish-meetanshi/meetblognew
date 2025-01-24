import React from "react";
import { Link } from "gatsby";
import { Helmet } from "react-helmet";
import Header from "../components/Header";
import Footer from "../components/Footer";

const NotFoundPage = () => {
  return (
    <main>
      <Helmet>
        <title>404 - Page Not Found</title>
        <meta name="description" content="The page you are looking for does not exist." />
        <link rel="canonical" href="https://meetanshi.com/blog/404/" />
      </Helmet>
      <Header />
      <div className="container-lg my-5 text-center">
        <h1>404 - Page Not Found</h1>
        <p>Oops! The page you’re looking for doesn’t exist.</p>
        <Link to="/" className="btn btn-primary">
          Go Back Home
        </Link>
      </div>
      <Footer />
    </main>
  );
};

export default NotFoundPage;
