import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import Logo from '../assets/logos/h_logo.png';
import { CATEGORIES } from '../data/products';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function NavbarMenu() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { count } = useCart();
  const { isAuthenticated, user, logout } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/products?q=${encodeURIComponent(q)}` : '/products');
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary border-bottom" sticky="top">
      <Container fluid="lg">
        <Navbar.Brand as={Link} to="/">
          <img src={Logo} alt="DVDStoreOnline logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/products">
              Products
            </Nav.Link>
            <NavDropdown title="Category" id="navbarScrollingDropdown">
              {CATEGORIES.map((c) => (
                // Category pages open in a new tab, as requested.
                <NavDropdown.Item
                  key={c.key}
                  as={Link}
                  to={`/category/${c.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={`bi ${c.icon} me-2`} />
                  {c.label}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <Nav.Link as={NavLink} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact">
              Contact
            </Nav.Link>
          </Nav>

          <Form className="d-flex me-lg-3 my-2 my-lg-0" role="search" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search products"
              className="me-2"
              aria-label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button type="submit" variant="outline-primary">
              <i className="bi bi-search" />
            </Button>
          </Form>

          <Nav className="align-items-lg-center">
            <Nav.Link as={NavLink} to="/cart" className="position-relative">
              <i className="bi bi-cart3 fs-5" />
              <span className="ms-1 d-lg-none">Cart</span>
              {count > 0 && (
                <Badge
                  bg="danger"
                  pill
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {count}
                </Badge>
              )}
            </Nav.Link>

            {isAuthenticated ? (
              <NavDropdown
                align="end"
                title={
                  <span>
                    <i className="bi bi-person-circle me-1" />
                    {user.name.split(' ')[0]}
                  </span>
                }
                id="accountDropdown"
              >
                <NavDropdown.Item as={Link} to="/profile">
                  <i className="bi bi-person me-2" />
                  My profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/profile#orders">
                  <i className="bi bi-box-seam me-2" />
                  My orders
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>
                  <i className="bi bi-box-arrow-right me-2" />
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={NavLink} to="/login">
                <i className="bi bi-person me-1" />
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarMenu;
