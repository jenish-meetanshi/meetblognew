// import * as React from "react";
// import { Link } from "gatsby";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import { StaticImage } from "gatsby-plugin-image";
// import { withPrefix } from "gatsby";

// const Header = () => {
//   return (
//     <header className="site-header">
//       <nav className="navbar">
//         <div className="container">
//           <div className="navbar-row">
            
//             {/* Logo Section */}
//             <div className="logo">
//               <Link to="/">
//                   {/* Use the static logo image URL here */}
//                  <img
//                   src={withPrefix("/images/logo.svg")}
//                   alt="Site Logo"
//                   style={{ width: "250px", height: "auto", marginBottom: "0" }}
//                 />
//               </Link>
//             </div>


//             {/* Navigation Menu */}
//             <ul className="navbar-nav">
//               <li className="nav-item dropdown">
//                 <Link to="#" className="nav-link dropdown-toggle" role="button">
//                   Extensions
//                 </Link>
//                 <ul className="dropdown-menu">
//                   <li>
//                     <Link to="/magento-2-extensions.html" className="dropdown-item">Magento 2 Extensions</Link>
//                   </li>
//                   <li>
//                     <Link to="/graphql-compatible-magento-2-extensions.html" className="dropdown-item">GraphQL Compatible M2 Extensions</Link>
//                   </li>
//                   <li>
//                     <Link to="/magento-extensions.html" className="dropdown-item">Magento Extensions</Link>
//                   </li>
//                   <li>
//                     <Link to="/free-magento-extensions.html" className="dropdown-item">Free Magento Extensions</Link>
//                   </li>
//                   <li>
//                     <Link to="/hyva-theme-magento-2-extensions.html" className="dropdown-item">Magento 2 Hyva Theme Extensions</Link>
//                   </li>
//                   <li>
//                     <Link to="/shopify-apps.html" className="dropdown-item">Shopify Apps</Link>
//                   </li>
//                 </ul>
//               </li>

//               <li className="nav-item dropdown">
//                 <Link to="#" className="nav-link dropdown-toggle" role="button">
//                   Services
//                 </Link>
//                 <ul className="dropdown-menu">
//                   <li>
//                     <Link to="/magento-development-services.html" className="dropdown-item">Magento Development Services</Link>
//                   </li>
//                   <li>
//                     <Link to="/migration-services.html" className="dropdown-item">Migration Services</Link>
//                   </li>
//                   <li>
//                     <Link to="/hire-us.html" className="dropdown-item">Hire Us</Link>
//                   </li>
//                   <li>
//                     <Link to="/shopify-services.html" className="dropdown-item">Shopify Services</Link>
//                   </li>
//                   <li>
//                     <Link to="/shopify-migration-service.html" className="dropdown-item">Shopify Migration Service</Link>
//                   </li>
//                 </ul>
//               </li>

//               <li className="nav-item">
//                 <Link to="/about" className="nav-link">About</Link>
//               </li>

//               <li className="nav-item">
//                 <Link to="/contacts" className="nav-link">Contact</Link>
//               </li>
//             </ul>

//             {/* Search Section */}
//             <div className="header-search">
//               <form action="/search" method="GET" className="search-form">
//                 <input
//                   type="text"
//                   name="query"
//                   placeholder="Search for posts..."
//                   aria-label="Search"
//                   required
//                 />
//                 <button type="submit" className="search-button" aria-label="Submit Search">
//                   <FontAwesomeIcon icon={faSearch} />
//                 </button>
//               </form>
//             </div>

//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Header;

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
      window.location.href = withPrefix(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header>
      <Navbar bg="light" expand="lg" className="py-3">
        <div className="container">
          {/* Logo */}
          <Navbar.Brand as={Link} to={withPrefix("/")}>
            <img 
              src={withPrefix("/images/logo.svg")} 
              alt="Site Logo" 
              style={{ width: "150px", height: "auto" }} 
            />
          </Navbar.Brand>

          {/* Mobile toggle button */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* Menu items */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={withPrefix("/")}>Home</Nav.Link>

              {/* Dropdown Menu for Extensions */}
              <NavDropdown title="Extensions" id="extensions-dropdown">
                <NavDropdown.Item as={Link} to={withPrefix("/magento-2-extensions.html")}>Magento 2 Extensions</NavDropdown.Item>
                <NavDropdown.Item as={Link} to={withPrefix("/graphql-compatible-magento-2-extensions.html")}>GraphQL Compatible M2 Extensions</NavDropdown.Item>
                <NavDropdown.Item as={Link} to={withPrefix("/magento-extensions.html")}>Magento Extensions</NavDropdown.Item>
                <NavDropdown.Item as={Link} to={withPrefix("/free-magento-extensions.html")}>Free Magento Extensions</NavDropdown.Item>
                <NavDropdown.Item as={Link} to={withPrefix("/hyva-theme-magento-2-extensions.html")}>Hyva Theme Extensions</NavDropdown.Item>
                <NavDropdown.Item as={Link} to={withPrefix("/shopify-apps.html")}>Shopify Apps</NavDropdown.Item>
              </NavDropdown>

              {/* Dropdown Menu for Services */}
              <NavDropdown title="Services" id="services-dropdown">
                <NavDropdown.Item as={Link} to={withPrefix("/magento-development-services.html")}>Magento Development Services</NavDropdown.Item>
                <NavDropdown.Item as={Link} to={withPrefix("/migration-services.html")}>Migration Services</NavDropdown.Item>
                <NavDropdown.Item as={Link} to={withPrefix("/hire-us.html")}>Hire Us</NavDropdown.Item>
                <NavDropdown.Item as={Link} to={withPrefix("/shopify-services.html")}>Shopify Services</NavDropdown.Item>
                <NavDropdown.Item as={Link} to={withPrefix("/shopify-migration-service.html")}>Shopify Migration Service</NavDropdown.Item>
              </NavDropdown>

              <Nav.Link as={Link} to={withPrefix("/about")}>About</Nav.Link>
              <Nav.Link as={Link} to={withPrefix("/contacts")}>Contact</Nav.Link>
            </Nav>

            {/* Search Box */}
            <Form className="d-flex" onSubmit={handleSearchSubmit}>
              <FormControl 
                type="search" 
                placeholder="Search" 
                className="me-2" 
                aria-label="Search" 
                value={searchQuery} 
                onChange={handleSearchChange} 
              />
              <Button type="submit" variant="outline-success">
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

