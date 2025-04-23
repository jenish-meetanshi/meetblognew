import React, { useState, useRef, useEffect } from "react";
import { Link, withPrefix } from "gatsby";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      window.location.href = withPrefix(`/search/?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  useEffect(() => {
  if (isSearchOpen && searchRef.current) {
    const inputElement = searchRef.current.querySelector("input");
    if (inputElement) {
      inputElement.focus(); // Auto-focus the input field
    }
  }
}, [isSearchOpen]);

  // Close search box when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header>
      <div className="bg-dark">
        <div className="container-lg p-2">
          <p className="d-flex justify-content-center mb-0 text-white">
          Magento 2.4.8 is available with the latest features and enhancements.
          <a
            style={{ color: "#ff7d0f", marginLeft: "5px", textAlign: "center" }}
            href="https://meetanshi.com/magento-upgrade-service">
            Upgrade now
          </a>
        </p>
        </div>
      </div>
      <Navbar expand="lg" className="py-3">
        <div className="container-lg">
          <Navbar.Brand as={Link} to="https://meetanshi.com/" style={{ maxWidth: "190px", display: "block" }}>
            <img
              src={withPrefix("/images/headerlogo.svg")}
              alt="Site Logo"
              style={{ width: "100%", height: "27px" }}
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto ms-0 ms-md-5 ps-md-3">
              <NavDropdown title={<>Extensions <FontAwesomeIcon icon={faChevronDown} className="ms-1" /></>} id="extensions-dropdown" className="menu-item menu-item-first-child">
                <NavDropdown.Item as={Link} to="https://meetanshi.com/magento-2-extensions.html">Magento 2 Extensions</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="https://meetanshi.com/graphql-compatible-magento-2-extensions.html">GraphQL Compatible M2 Extensions</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="https://meetanshi.com/magento-extensions.html">Magento Extensions</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="https://meetanshi.com/free-magento-extensions.html">Free Magento Extensions</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="https://meetanshi.com/hyva-theme-magento-2-extensions.html">Hyva Theme Extensions</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="https://meetanshi.com/shopify-apps.html">Shopify Apps</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title={<>Services <FontAwesomeIcon icon={faChevronDown} className="ms-1" /></>} id="services-dropdown" className="menu-item">
                <NavDropdown.Item as={Link} to="https://meetanshi.com/magento-development-services.html">Magento Development Services</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="https://meetanshi.com/migration-services.html">Migration Services</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="https://meetanshi.com/hire-us.html">Hire Us</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="https://meetanshi.com/shopify-services.html">Shopify Services</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="https://meetanshi.com/shopify-migration-service.html">Shopify Migration Service</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="https://meetanshi.com/blog/" className="menu-item active-link-header">Blog</Nav.Link>
              <Nav.Link as={Link} to="https://meetanshi.com/about" className="menu-item">About</Nav.Link>
              <Nav.Link as={Link} to="https://meetanshi.com/contacts" className="menu-item">Contact</Nav.Link>
            </Nav>

            {/* Search Box */}
            <div className="header-search-container" ref={searchRef}>
              <Button variant="link" onClick={toggleSearch} className="search-icon-btn">
                <FontAwesomeIcon icon={faSearch} />
              </Button>
              <Form className={`search-form ${isSearchOpen ? "open" : ""}`} onSubmit={handleSearchSubmit}>
                <FormControl
                  type="text"
                  placeholder="Search the blog..."
                  className="header-form-input"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <Button type="submit" variant="primary" aria-label="Search">
                  <FontAwesomeIcon icon={faSearch} />
                </Button>
              </Form>
            </div>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </header>
  );
};

export default Header;
