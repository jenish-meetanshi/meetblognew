import React, { useState, useRef, useEffect } from "react";
import { Link, withPrefix } from "gatsby";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchRef = useRef(null);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      window.location.href = withPrefix(`/search/?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    if (isSearchOpen && searchRef.current) {
      const input = searchRef.current.querySelector("input");
      input?.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header>
      <div className="bg-dark">
        <div className="container-lg p-2">
          <p className="d-flex justify-content-center mb-0 mt-0 text-white">
            Magento 2.4.8 is available with the latest features and enhancements.
            <a
              style={{ color: "#ff7d0f", marginLeft: "5px", textAlign: "center" }}
              href="https://meetanshi.com/magento-upgrade-service"
            >
              Upgrade now
            </a>
          </p>
        </div>
      </div>

      <div className="navbar py-3">
        <div className="container-lg d-flex align-items-center justify-content-between">
          <Link to="https://meetanshi.com/" className="navbar-brand" style={{ maxWidth: "190px" }}>
            <img
              src={withPrefix("/images/headerlogo.svg")}
              alt="Site Logo"
              style={{ width: "100%", height: "27px" }}
            />
          </Link>

          <button className="navbar-toggler" onClick={toggleMenu}>
            ☰
          </button>

          <nav className={`nav-menu ${isMenuOpen ? "open" : ""}`}>
            <ul className="nav-list d-flex flex-column flex-lg-row">
              <li className={`dropdown ${openDropdown === "extensions" ? "open" : ""}`}>
                <span className="dropdown-toggle" onClick={() => toggleDropdown("extensions")}>
                  Extensions &#9662;
                </span>
                <ul className="dropdown-menu">
                  <li><a href="https://meetanshi.com/magento-2-extensions.html">Magento 2 Extensions</a></li>
                  <li><a href="https://meetanshi.com/graphql-compatible-magento-2-extensions.html">GraphQL Compatible M2 Extensions</a></li>
                  <li><a href="https://meetanshi.com/magento-extensions.html">Magento Extensions</a></li>
                  <li><a href="https://meetanshi.com/free-magento-extensions.html">Free Magento Extensions</a></li>
                  <li><a href="https://meetanshi.com/hyva-theme-magento-2-extensions.html">Hyva Theme Extensions</a></li>
                  <li><a href="https://meetanshi.com/shopify-apps.html">Shopify Apps</a></li>
                </ul>
              </li>
              <li className={`dropdown ${openDropdown === "services" ? "open" : ""}`}>
                <span className="dropdown-toggle" onClick={() => toggleDropdown("services")}>
                  Services &#9662;
                </span>
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

          {/* Search Box */}
          <div className="header-search-container" ref={searchRef}>
            <button onClick={toggleSearch} className="search-icon-btn" aria-label="Toggle Search">
              🔍
            </button>
            <form className={`search-form ${isSearchOpen ? "open" : ""}`} onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search the blog..."
                className="header-form-input"
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button type="submit" className="search-submit" aria-label="Search">
                🔍
              </button>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
