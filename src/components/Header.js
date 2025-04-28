import React, { useState } from "react";
import { Link, navigate, withPrefix } from "gatsby";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      const searchUrl = `/search/?query=${encodeURIComponent(searchQuery)}`;
      navigate(searchUrl);
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header>
      {/* Top banner */}
      <div className="bg-dark">
        <div className="container-lg p-2">
          <p className="d-flex justify-content-center mb-0 mt-0 text-white">
            Magento 2.4.8 is available with the latest features and enhancements.
            <a
              style={{ color: "#ff7d0f", marginLeft: "5px" }}
              href="https://meetanshi.com/magento-upgrade-service"
            >
              Upgrade now
            </a>
          </p>
        </div>
      </div>

      {/* Main navbar */}
      <div className="navbar py-3">
        <div className="container-lg d-flex align-items-center justify-content-between">
          {/* Logo */}
          <Link to="https://meetanshi.com/" className="navbar-brand" style={{ maxWidth: "190px" }}>
            <img
              src={withPrefix("/images/headerlogo.svg")}
              alt="Site Logo"
              style={{ width: "190px", height: "27px" }}
            />
          </Link>

          {/* Nav Menu */}
          <nav className={`nav-menu ${isMenuOpen ? "open" : ""}`}>
            <ul className="nav-list d-flex flex-column flex-lg-row mb-0">
              <li className="dropdown">
                <span className="dropdown-toggle">Extensions ▾</span>
                <ul className="dropdown-menu">
                  <li><a href="https://meetanshi.com/magento-2-extensions.html">Magento 2 Extensions</a></li>
                  <li><a href="https://meetanshi.com/graphql-compatible-magento-2-extensions.html">GraphQL Compatible M2 Extensions</a></li>
                  <li><a href="https://meetanshi.com/magento-extensions.html">Magento Extensions</a></li>
                  <li><a href="https://meetanshi.com/free-magento-extensions.html">Free Magento Extensions</a></li>
                  <li><a href="https://meetanshi.com/hyva-theme-magento-2-extensions.html">Hyva Theme Extensions</a></li>
                  <li><a href="https://meetanshi.com/shopify-apps.html">Shopify Apps</a></li>
                </ul>
              </li>
              <li className="dropdown">
                <span className="dropdown-toggle">Services ▾</span>
                <ul className="dropdown-menu">
                  <li><a href="https://meetanshi.com/magento-development-services.html">Magento Development Services</a></li>
                  <li><a href="https://meetanshi.com/migration-services.html">Migration Services</a></li>
                  <li><a href="https://meetanshi.com/hire-us.html">Hire Us</a></li>
                  <li><a href="https://meetanshi.com/shopify-services.html">Shopify Services</a></li>
                  <li><a href="https://meetanshi.com/shopify-migration-service.html">Shopify Migration Service</a></li>
                </ul>
              </li>
              <li><a href="https://meetanshi.com/blog/" className="active-link-header">Blog</a></li>
              <li><a href="https://meetanshi.com/about">About</a></li>
              <li><a href="https://meetanshi.com/contacts">Contact</a></li>
            </ul>
          </nav>

          {/* Search */}
          <div className="header-search-container d-none d-lg-block">
            <form className="search-form" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search the blog..."
                className="header-form-input"
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button type="submit" className="search-submit" aria-label="Search">
                <img src={withPrefix("/images/icon-search.svg")} alt="search icon" style={{ width: "30px", height: "30px" }} />
              </button>
            </form>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-toggle d-lg-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50">
            <path d="M 3 9 A 1.0001 1.0001 0 1 0 3 11 L 47 11 A 1.0001 1.0001 0 1 0 47 9 L 3 9 z M 3 24 A 1.0001 1.0001 0 1 0 3 26 L 47 26 A 1.0001 1.0001 0 1 0 47 24 L 3 24 z M 3 39 A 1.0001 1.0001 0 1 0 3 41 L 47 41 A 1.0001 1.0001 0 1 0 47 39 L 3 39 z"></path>
            </svg>
          </button>
              
        </div>
      </div>
    </header>
  );
};

export default Header;
