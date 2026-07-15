import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { getProductById, categoryLabel } from '../data/products';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';

export default function ProductDetail() {
  const { id } = useParams();
  const product = getProductById(id);
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <main className="flex-shrink-0">
        <Container className="py-5 text-center">
          <i className="bi bi-box-seam display-4 text-muted d-block mb-3" />
          <h1 className="fw-bolder">Product not found</h1>
          <Button as={Link} to="/products" variant="primary" className="mt-2">
            Back to products
          </Button>
        </Container>
      </main>
    );
  }

  const buyNow = () => {
    addItem(product, qty);
    navigate('/cart');
  };

  return (
    <main className="flex-shrink-0">
      <Container className="py-5">
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/products' }}>
            Products
          </Breadcrumb.Item>
          <Breadcrumb.Item
            linkAs={Link}
            linkProps={{ to: `/category/${product.category}` }}
          >
            {categoryLabel(product.category)}
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
        </Breadcrumb>

        <Row className="gx-5 align-items-center">
          <Col lg={6} className="mb-4 mb-lg-0">
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid rounded shadow-sm product-hero-img"
            />
          </Col>
          <Col lg={6}>
            <Badge bg="secondary" className="text-uppercase mb-2">
              {product.brand}
            </Badge>
            <h1 className="fw-bolder">{product.name}</h1>
            <div className="mb-3">
              <span className="text-warning">
                {'★'.repeat(Math.round(product.rating))}
                <span className="text-muted">
                  {'★'.repeat(5 - Math.round(product.rating))}
                </span>
              </span>
              <span className="text-muted ms-2">{product.rating} / 5</span>
            </div>
            <p className="fs-2 fw-bolder text-primary mb-3">
              {formatPrice(product.price)}
            </p>
            <p className="lead text-muted">{product.description}</p>

            <p className="mb-3">
              {product.stock > 0 ? (
                <span className="text-success">
                  <i className="bi bi-check-circle me-1" />
                  In stock ({product.stock} available)
                </span>
              ) : (
                <span className="text-danger">Out of stock</span>
              )}
            </p>

            <div className="d-flex align-items-center gap-3 mb-4">
              <label htmlFor="qty" className="fw-semibold mb-0">
                Quantity
              </label>
              <div className="input-group" style={{ width: '140px' }}>
                <Button
                  variant="outline-secondary"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                >
                  −
                </Button>
                <input
                  id="qty"
                  type="number"
                  min="1"
                  className="form-control text-center"
                  value={qty}
                  onChange={(e) =>
                    setQty(Math.max(1, parseInt(e.target.value, 10) || 1))
                  }
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setQty((q) => q + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="d-flex flex-wrap gap-2">
              <Button variant="outline-primary" size="lg" onClick={() => addItem(product, qty)}>
                <i className="bi bi-cart-plus me-2" />
                Add to cart
              </Button>
              <Button variant="primary" size="lg" onClick={buyNow}>
                Buy now
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
