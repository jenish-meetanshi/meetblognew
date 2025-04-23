import React, { useState, useRef, useEffect } from "react";
import { Link, withPrefix } from "gatsby";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const searchRef = useRef(null);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = withPrefix(`/search/?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleDropdownToggle = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

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
      <div className="header-top">
        <p className="announcement">
          Magento 2.4.8 is available.{" "}
          <a href="https://meetanshi.com/magento-upgrade-service">Upgrade now</a>
        </p>
      </div>

      <div className="nav-container">
        <Link to="https://meetanshi.com/">
          <img src={withPrefix("/images/headerlogo.svg")} alt="Meetanshi Logo" className="site-logo" />
        </Link>

        <nav className="main-menu">
          <ul className="menu-list">
            <li
              className={`menu-item ${activeDropdown === "extensions" ? "open" : ""}`}
              onClick={() => handleDropdownToggle("extensions")}
            >
              <span>
                Extensions
              </span>
              {activeDropdown === "extensions" && (
                <ul className="dropdown">
                  <li><a href="https://meetanshi.com/magento-2-extensions.html">Magento 2 Extensions</a></li>
                  <li><a href="https://meetanshi.com/graphql-compatible-magento-2-extensions.html">GraphQL Compatible M2</a></li>
                  <li><a href="https://meetanshi.com/magento-extensions.html">Magento Extensions</a></li>
                  <li><a href="https://meetanshi.com/free-magento-extensions.html">Free Extensions</a></li>
                  <li><a href="https://meetanshi.com/hyva-theme-magento-2-extensions.html">Hyva Theme</a></li>
                  <li><a href="https://meetanshi.com/shopify-apps.html">Shopify Apps</a></li>
                </ul>
              )}
            </li>

            <li
              className={`menu-item ${activeDropdown === "services" ? "open" : ""}`}
              onClick={() => handleDropdownToggle("services")}
            >
              <span>
                Services
              </span>
              {activeDropdown === "services" && (
                <ul className="dropdown">
                  <li><a href="https://meetanshi.com/magento-development-services.html">Magento Development</a></li>
                  <li><a href="https://meetanshi.com/migration-services.html">Migration Services</a></li>
                  <li><a href="https://meetanshi.com/hire-us.html">Hire Us</a></li>
                  <li><a href="https://meetanshi.com/shopify-services.html">Shopify Services</a></li>
                  <li><a href="https://meetanshi.com/shopify-migration-service.html">Shopify Migration</a></li>
                </ul>
              )}
            </li>

            <li><a href="https://meetanshi.com/blog/">Blog</a></li>
            <li><a href="https://meetanshi.com/about">About</a></li>
            <li><a href="https://meetanshi.com/contacts">Contact</a></li>
          </ul>
        </nav>

        <div className="search-box" ref={searchRef}>
          <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="search-icon">
           Button
          </button>
          {isSearchOpen && (
            <form onSubmit={handleSearchSubmit} className="search-form">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
              />
              <button type="submit">
                Button
              </button>
            </form>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
