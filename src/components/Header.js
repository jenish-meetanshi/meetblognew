import * as React from "react";
import { Link } from "gatsby";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { StaticImage } from "gatsby-plugin-image";

const Header = () => {
  return (
    <header className="site-header">
      <nav className="navbar">
        <div className="container">
          <div className="navbar-row">
            
            {/* Logo Section */}
            <div className="logo">
              <Link to="/">
                  {/* Use the static logo image URL here */}
                 <StaticImage
                  src="../images/logo.svg" 
                  alt="Site Logo"
                  style={{ width: "250px", height: "auto", marginBottom: "0" }}
                />
              </Link>
            </div>

            {/* Search Section */}
            <div className="header-search">
              <form action="/search" method="GET" className="search-form">
                <input
                  type="text"
                  name="query"
                  placeholder="Search for posts..."
                  aria-label="Search"
                  required
                />
                <button type="submit" className="search-button" aria-label="Submit Search">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </form>
            </div>

          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
