import * as React from "react";
import { Link } from "gatsby";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { StaticImage } from "gatsby-plugin-image";
import { withPrefix } from "gatsby";

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
                 <img
                  src={withPrefix("/images/logo.svg")}
                  alt="Site Logo"
                  style={{ width: "250px", height: "auto", marginBottom: "0" }}
                />
              </Link>
            </div>


            {/* Navigation Menu */}
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <Link to="#" className="nav-link dropdown-toggle" role="button">
                  Extensions
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/magento-2-extensions.html" className="dropdown-item">Magento 2 Extensions</Link>
                  </li>
                  <li>
                    <Link to="/graphql-compatible-magento-2-extensions.html" className="dropdown-item">GraphQL Compatible M2 Extensions</Link>
                  </li>
                  <li>
                    <Link to="/magento-extensions.html" className="dropdown-item">Magento Extensions</Link>
                  </li>
                  <li>
                    <Link to="/free-magento-extensions.html" className="dropdown-item">Free Magento Extensions</Link>
                  </li>
                  <li>
                    <Link to="/hyva-theme-magento-2-extensions.html" className="dropdown-item">Magento 2 Hyva Theme Extensions</Link>
                  </li>
                  <li>
                    <Link to="/shopify-apps.html" className="dropdown-item">Shopify Apps</Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <Link to="#" className="nav-link dropdown-toggle" role="button">
                  Services
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/magento-development-services.html" className="dropdown-item">Magento Development Services</Link>
                  </li>
                  <li>
                    <Link to="/migration-services.html" className="dropdown-item">Migration Services</Link>
                  </li>
                  <li>
                    <Link to="/hire-us.html" className="dropdown-item">Hire Us</Link>
                  </li>
                  <li>
                    <Link to="/shopify-services.html" className="dropdown-item">Shopify Services</Link>
                  </li>
                  <li>
                    <Link to="/shopify-migration-service.html" className="dropdown-item">Shopify Migration Service</Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <Link to="/about" className="nav-link">About</Link>
              </li>

              <li className="nav-item">
                <Link to="/contacts" className="nav-link">Contact</Link>
              </li>
            </ul>

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
