import React, { useState } from "react";
import { Link, withPrefix } from "gatsby"; // Import withPrefix
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      // Use withPrefix to add a prefix to the search URL
      window.location.href = withPrefix(`/search/index.html?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header>
      <Navbar bg="light" expand="lg" className="py-3">
        <div className="container-lg">
          {/* Logo */}
          <Navbar.Brand as={Link} to="/">
            <img 
              src={withPrefix("/images/logo.svg")} 
              alt="Site Logo" 
              style={{ maxWidth: "230px", height: "auto" }} 
            />
          </Navbar.Brand>

          {/* Mobile toggle button */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* Menu items */}
          <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="me-auto ms-auto">
                {/* Dropdown Menu for Extensions */}
                <NavDropdown title="Extensions" id="extensions-dropdown">
                  <NavDropdown.Item as={Link} to="https://meetanshi.com/magento-2-extensions.html">Magento 2 Extensions</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="https://meetanshi.com/graphql-compatible-magento-2-extensions.html">GraphQL Compatible M2 Extensions</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="https://meetanshi.com/magento-extensions.html">Magento Extensions</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="https://meetanshi.com/free-magento-extensions.html">Free Magento Extensions</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="https://meetanshi.com/hyva-theme-magento-2-extensions.html">Hyva Theme Extensions</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="https://meetanshi.com/shopify-apps.html">Shopify Apps</NavDropdown.Item>
                </NavDropdown>
            
                {/* Dropdown Menu for Services */}
                <NavDropdown title="Services" id="services-dropdown">
                  <NavDropdown.Item as={Link} to="https://meetanshi.com/magento-development-services.html">Magento Development Services</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="https://meetanshi.com/migration-services.html">Migration Services</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="https://meetanshi.com/hire-us.html">Hire Us</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="https://meetanshi.com/shopify-services.html">Shopify Services</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="https://meetanshi.com/shopify-migration-service.html">Shopify Migration Service</NavDropdown.Item>
                </NavDropdown>
            
                <Nav.Link as={Link} to="https://meetanshi.com/about">About</Nav.Link>
                <Nav.Link as={Link} to="https://meetanshi.com/contacts">Contact</Nav.Link>
              </Nav>

            {/* Search Box */}
            <Form className="d-flex mt-md-3" onSubmit={handleSearchSubmit}>
              <FormControl 
                type="search" 
                placeholder="Search" 
                className="me-2" 
                aria-label="Search" 
                value={searchQuery} 
                onChange={handleSearchChange} 
              />
              <Button type="submit" variant="primary">
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </Form>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </header>
  );
};

export default Header;

