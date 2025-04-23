import React, { useState, useRef, useEffect } from "react";
import { Link, withPrefix } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      window.location.href = withPrefix(`/search/?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  useEffect(() => {
    if (isSearchOpen && searchRef.current) {
      const inputElement = searchRef.current.querySelector("input");
      if (inputElement) inputElement.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header>
      <div className="header-top">
        <div className="container">
          <p className="announcement">
            Magento 2.4.8 is available with the latest features and enhancements.
            <a href="https://meetanshi.com/magento-upgrade-service" className="highlight-link">Upgrade now</a>
          </p>
        </div>
      </div>

      <nav className="main-nav">
        <div className="container nav-container">
          <Link to="https://meetanshi.com/" className="site-logo">
            <img src={withPrefix("/images/headerlogo.svg")} alt="Site Logo" />
          </Link>

          <ul className="nav-links">
            <li className="dropdown">
              <button className="dropdown-toggle">Extensions <FontAwesomeIcon icon={faChevronDown} /></button>
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
              <button className="dropdown-toggle">Services <FontAwesomeIcon icon={faChevronDown} /></button>
              <ul className="dropdown-menu">
                <li><a href="https://meetanshi.com/magento-development-services.html">Magento Development Services</a></li>
                <li><a href="https://meetanshi.com/migration-services.html">Migration Services</a></li>
                <li><a href="https://meetanshi.com/hire-us.html">Hire Us</a></li>
                <li><a href="https://meetanshi.com/shopify-services.html">Shopify Services</a></li>
                <li><a href="https://meetanshi.com/shopify-migration-service.html">Shopify Migration Service</a></li>
              </ul>
            </li>
            <li><a href="https://meetanshi.com/blog/">Blog</a></li>
            <li><a href="https://meetanshi.com/about">About</a></li>
            <li><a href="https://meetanshi.com/contacts">Contact</a></li>
          </ul>

          <div className="search-container" ref={searchRef}>
            <button onClick={toggleSearch} className="search-btn">
              <FontAwesomeIcon icon={faSearch} />
            </button>
            {isSearchOpen && (
              <form onSubmit={handleSearchSubmit} className="search-form">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search the blog..."
                  aria-label="Search"
                />
                <button type="submit" className="submit-btn">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </form>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
