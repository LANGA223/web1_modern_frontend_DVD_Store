import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Logo from '../assets/logos/h_logo.png';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white-50 mt-auto pt-5 pb-4">
      <Container>
        <Row className="gy-4">
          <Col lg={4} md={6}>
            <h5 className="text-white fw-bold mb-3">
              <img src={Logo} alt="DVDStoreOnline logo"  width="100px" />
            </h5>
            <p className="mb-3">
              Your one-stop shop for gaming gear, laptops, and accessories.
              Quality products, delivered to your door.
            </p>
            <div className="d-flex gap-3 fs-5">
              <a className="text-white-50" href="#!" aria-label="Facebook">
                <i className="bi bi-facebook" />
              </a>
              <a className="text-white-50" href="#!" aria-label="Twitter">
                <i className="bi bi-twitter-x" />
              </a>
              <a className="text-white-50" href="#!" aria-label="Instagram">
                <i className="bi bi-instagram" />
              </a>
              <a className="text-white-50" href="#!" aria-label="YouTube">
                <i className="bi bi-youtube" />
              </a>
            </div>
          </Col>

          <Col lg={2} md={6}>
            <h6 className="text-white text-uppercase fw-bold mb-3">Shop</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link className="link-secondary text-decoration-none" to="/products?category=gaming">
                  Gaming
                </Link>
              </li>
              <li className="mb-2">
                <Link className="link-secondary text-decoration-none" to="/products?category=laptop">
                  Laptops
                </Link>
              </li>
              <li className="mb-2">
                <Link className="link-secondary text-decoration-none" to="/products?category=accessory">
                  Accessories
                </Link>
              </li>
            </ul>
          </Col>

          <Col lg={2} md={6}>
            <h6 className="text-white text-uppercase fw-bold mb-3">Company</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link className="link-secondary text-decoration-none" to="/about">
                  About us
                </Link>
              </li>
              <li className="mb-2">
                <Link className="link-secondary text-decoration-none" to="/contact">
                  Contact
                </Link>
              </li>
              <li className="mb-2">
                <Link className="link-secondary text-decoration-none" to="/products">
                  All products
                </Link>
              </li>
            </ul>
          </Col>

          <Col lg={4} md={6}>
            <h6 className="text-white text-uppercase fw-bold mb-3">Get in touch</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <i className="bi bi-geo-alt me-2" />
                Char Ampove, Phnom Penh
              </li>
              <li className="mb-2">
                <i className="bi bi-envelope me-2" />
                teachersaven@gmail.com
              </li>
              <li className="mb-2">
                <i className="bi bi-telephone me-2" />
                087 727 109
              </li>
            </ul>
          </Col>
        </Row>

        <hr className="border-secondary my-4" />

        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center small">
          <span>&copy; {year} Teacher Saven Computer Shop. All rights reserved.</span>
          {/* <span>Built with React, Vite &amp; React-Bootstrap.</span> */}
        </div>
      </Container>
    </footer>
  );
}
